import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    ImageBackground,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    Animated,
    Image,
    TouchableWithoutFeedback,
} from 'react-native';
import { Colors } from '../../../constants';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StoryViewButtonGroup } from '../../../components/framework/button';
import { StoryHead } from '../../../components/framework/navbar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { GetStoriesByID } from '../../../api/app/story';
import Images from "../../../constants/Images";
import { useSafeAreaInsets } from 'react-native-safe-area-context';


const { width } = Dimensions.get('window');

const ViewStory = () => {
    const [storyList, setStoryList] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [imageHeight, setImageHeight] = useState(300);
    const insets = useSafeAreaInsets();
    const progress = useRef(new Animated.Value(0)).current;
    const animationRef = useRef(null);
    const hasFinished = useRef(false);

    const navigation = useNavigation();
    const route = useRoute();
    const token = useSelector(state => state.auth.token);

    useEffect(() => {
        const fetchStory = async () => {
            const storyId = route.params?.storyId;
            const res = await GetStoriesByID({ token, id: storyId });
            setStoryList(res || []);
        };
        fetchStory();
    }, []);

    const currentStory = storyList[currentIndex];

    useEffect(() => {
        if (!currentStory?.image_url) return;

        Image.getSize(
            currentStory.image_url,
            (w, h) => {
                const ratio = h / w;
                setImageHeight(width * ratio);
            },
            () => setImageHeight(300)
        );
    }, [currentStory]);

    useEffect(() => {
        if (!storyList.length) return;
        startProgress();
    }, [currentIndex, storyList]);

    const startProgress = () => {
        progress.setValue(0);
        hasFinished.current = false;

        animationRef.current = Animated.timing(progress, {
            toValue: 1,
            duration: 4000,
            useNativeDriver: false,
        });

        animationRef.current.start(({ finished }) => {
            if (!finished) return;

            hasFinished.current = true;

            if (currentIndex < storyList.length - 1) {
                setCurrentIndex(prev => prev + 1);
            } else {
                navigation.goBack();
            }
        });
    };

    const pauseProgress = () => animationRef.current?.stop();

    const resumeProgress = () => {
        if (hasFinished.current && currentIndex === storyList.length - 1) {
            navigation.goBack();
            return;
        }

        const current = progress.__getValue();

        animationRef.current = Animated.timing(progress, {
            toValue: 1,
            duration: 4000 * (1 - current),
            useNativeDriver: false,
        });

        animationRef.current.start(({ finished }) => {
            if (!finished) return;
            hasFinished.current = true;

            if (currentIndex < storyList.length - 1) {
                setCurrentIndex(prev => prev + 1);
            } else {
                navigation.goBack();
            }
        });
    };

    // -------------------- NEXT / PREV HANDLERS --------------------
    const handleNext = () => {
        if (currentIndex < storyList.length - 1) {
            setCurrentIndex(prev => prev + 1);
        } else navigation.goBack();
    };

    const handlePrev = () => {
        if (currentIndex > 0) setCurrentIndex(prev => prev - 1);
    };

    // -------------------- SAFE RETURN AFTER HOOKS --------------------
    const hasData = storyList.length > 0;

    return (
        <SafeAreaView style={[styles.container, {
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
        }]}>
            <StoryViewButtonGroup onPause={pauseProgress} onResume={resumeProgress} />

            {!hasData ? (
                <Image
                    source={Images.BANNER_IMG}
                    style={{ width: "100%", height: 300 }}
                    resizeMode="cover"
                />
            ) : (
                <>
                    <TouchableOpacity style={styles.leftTouch} onPress={handlePrev} />
                    <TouchableOpacity style={styles.rightTouch} onPress={handleNext} />

                    <TouchableWithoutFeedback onPressIn={pauseProgress} onPressOut={resumeProgress}>
                        <View style={styles.imageWrapper}>
                            <ImageBackground
                                source={{ uri: currentStory.image_url }}
                                style={[styles.storyImage, { height: imageHeight }]}
                                resizeMode="stretch"
                            />
                        </View>
                    </TouchableWithoutFeedback>


                    <View style={[styles.overlay, { top: insets.top }]} >
                        <View style={styles.progressBarContainer}>
                            {storyList.map((_, index) => (
                                <View key={index} style={styles.progressBarBackground}>
                                    {index === currentIndex ? (
                                        <Animated.View
                                            style={[
                                                styles.progressBarFill,
                                                {
                                                    backgroundColor: Colors.THEME,
                                                    width: progress.interpolate({
                                                        inputRange: [0, 1],
                                                        outputRange: ['0%', '100%'],
                                                    }),
                                                },
                                            ]}
                                        />
                                    ) : (
                                        <View
                                            style={[
                                                styles.progressBarFill,
                                                {
                                                    backgroundColor:
                                                        index < currentIndex
                                                            ? Colors.THEME
                                                            : Colors.PLACEHOLDER,
                                                    width: "100%",
                                                },
                                            ]}
                                        />
                                    )}
                                </View>
                            ))}
                        </View>

                        <StoryHead
                            title={currentStory.user.name}
                            time={currentStory?.time_elapsed || ""}
                            image={currentStory?.user.avatar}
                        />
                    </View>
                </>
            )}
        </SafeAreaView>
    );
};

export default ViewStory;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.STORY_BACKGROUND
    },
    progressBarContainer: {
        flexDirection: 'row'
    },
    progressBarBackground: {
        flex: 1,
        height: 2,
        backgroundColor: Colors.PLACEHOLDER,
        marginHorizontal: 2,
        borderRadius: 3,
        overflow: 'hidden',
    },
    progressBarFill: {
        height: 2
    },
    imageWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    storyImage: {
        width: width
    },
    leftTouch: {
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        width: '30%',
        zIndex: 1,
    },
    rightTouch: {
        position: 'absolute',
        right: 0,
        top: 0,
        bottom: 0,
        width: '30%',
        zIndex: 1,
    },
    overlay: {
        position: 'absolute',
        width: '100%',
        paddingTop: 10,
        paddingHorizontal: 10,
        zIndex: 10,
    },
});
