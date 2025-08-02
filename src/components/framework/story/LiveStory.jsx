import React, { useRef, useState } from 'react';
import {
    View,
    TouchableOpacity,
    StyleSheet,
    Animated,
    Dimensions
} from 'react-native';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Colors } from '../../../constants';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { LiveShowButtonGroup } from '../button';
import { SendCommentArea } from '../input';
import { GradientIcon } from '../icon';
import LiveWatchingCard from '../card/LiveWatchingCard';

const { width, height } = Dimensions.get('window');

export default function LiveStory({ video, paused: externalPaused, creator, caption }) {
    const playerRef = useRef(null);
    const [localPaused, setLocalPaused] = useState(false);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [floatingHearts, setFloatingHearts] = useState([]);
    const [floatingComments, setFloatingComments] = useState([]);
    const [lastTap, setLastTap] = useState(0);

    const togglePlayPause = () => {
        const now = Date.now();
        const DOUBLE_PRESS_DELAY = 300;

        if (lastTap && (now - lastTap) < DOUBLE_PRESS_DELAY) {
            addFloatingHeart();
            return;
        }

        setLastTap(now);

        if (!externalPaused) {
            setLocalPaused(prev => !prev);
        }
    };

    const onLoad = (data) => {
        setDuration(data.duration);
    };

    const onProgress = (data) => {
        setCurrentTime(data.currentTime);
    };

    const progress = duration > 0 ? currentTime / duration : 0;
    const effectivePaused = externalPaused || localPaused;

    const addFloatingHeart = () => {
        const id = Date.now();
        const animatedValue = new Animated.Value(0);
        setFloatingHearts((prev) => [...prev, { id, animatedValue }]);

        Animated.timing(animatedValue, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
        }).start(() => {
            setFloatingHearts((prev) => prev.filter((heart) => heart.id !== id));
        });
    };

    const addFloatingComment = (text) => {
        const id = Date.now();
        const animatedValue = new Animated.Value(0);
        setFloatingComments((prev) => [...prev, { id, text, animatedValue }]);

        Animated.timing(animatedValue, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
        }).start(() => {
            setFloatingComments((prev) => prev.filter((comment) => comment.id !== id));
        });
    };

    return (
        <View style={styles.container}>
            <Video
                ref={playerRef}
                source={{ uri: video }}
                style={styles.video}
                resizeMode="cover"
                paused={effectivePaused}
                repeat
                onLoad={onLoad}
                onProgress={onProgress}
            />

            <TouchableOpacity
                style={styles.touchableArea}
                activeOpacity={1}
                onPress={togglePlayPause}
            >
                {effectivePaused && (
                    <View style={styles.playIconWrapper}>
                        <Icon name="play-arrow" size={70} color={Colors.WHITE} />
                    </View>
                )}
            </TouchableOpacity>

            <View style={styles.uiLayer} pointerEvents="box-none">
                <LiveWatchingCard />
                <LiveShowButtonGroup onLikePress={addFloatingHeart} />

                {floatingHearts.map((heart) => {
                    const translateY = heart.animatedValue.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, -200],
                    });

                    const opacity = heart.animatedValue.interpolate({
                        inputRange: [0, 0.3, 1],
                        outputRange: [0, 1, 0],
                    });

                    const translateX = heart.animatedValue.interpolate({
                        inputRange: [0, 0.5, 1],
                        outputRange: [0, Math.random() * 30 - 15, 0],
                    });

                    return (
                        <Animated.View
                            key={heart.id}
                            style={[
                                styles.floatingHeart,
                                {
                                    transform: [{ translateY }, { translateX }],
                                    opacity,
                                },
                            ]}>
                            <GradientIcon
                                IconPack={Icon}
                                size={30}
                                name={'favorite'}
                                colors={[Colors.BUTTON_GRADIENT_ONE, Colors.BUTTON_GRADIENT_TWO]}
                            />
                        </Animated.View>
                    );
                })}

                {floatingComments.map((comment) => {
                    const translateY = comment.animatedValue.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, -200],
                    });

                    const opacity = comment.animatedValue.interpolate({
                        inputRange: [0, 0.3, 1],
                        outputRange: [0, 1, 0],
                    });

                    return (
                        <Animated.Text
                            key={comment.id}
                            style={[
                                styles.floatingComment,
                                {
                                    transform: [{ translateY }],
                                    opacity,
                                },
                            ]}>
                            {comment.text}
                        </Animated.Text>
                    );
                })}

                {effectivePaused && (
                    <View style={styles.progressContainer}>
                        <View
                            style={[
                                styles.progressBar,
                                { width: `${progress * 100}%` },
                            ]}
                        />
                    </View>
                )}

                <View style={styles.commentAreaWrapper}>
                    <SendCommentArea
                        placeholder={'Send a comment'}
                        bgColor={Colors.TRANSPARENT_BLACK_DARK}
                        fontColor={Colors.WHITE}
                        onSendComment={addFloatingComment}
                    />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.BLACK,
    },
    video: {
        flex: 1,
    },
    touchableArea: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
    },
    uiLayer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 2,
    },
    playIconWrapper: {
        backgroundColor: Colors.TRANSPARENT_BLACK_DARK,
        borderRadius: 50,
        padding: 20,
    },
    progressContainer: {
        position: 'absolute',
        bottom: 10,
        left: moderateScale(10),
        right: moderateScale(10),
        height: 4,
        backgroundColor: Colors.TRANSPARENT_WHITE,
        borderRadius: scale(100),
        zIndex: 3,
    },
    progressBar: {
        height: 4,
        backgroundColor: Colors.THEME,
        borderRadius: scale(100),
    },
    floatingHeart: {
        position: 'absolute',
        bottom: 150,
        left: 50,
        zIndex: 4,
    },
    floatingComment: {
        position: 'absolute',
        bottom: 150,
        left: 100,
        color: Colors.WHITE,
        fontSize: 16,
        backgroundColor: Colors.TRANSPARENT_WHITE,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
        zIndex: 4,
    },
    commentAreaWrapper: {
        paddingHorizontal: moderateScale(14),
        position: 'absolute',
        bottom: verticalScale(10),
        left: 0,
        right: 0,
        zIndex: 5,
    },
});