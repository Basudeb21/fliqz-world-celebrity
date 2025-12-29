import React, { useRef, useState, useEffect } from 'react';
import {
    FlatList,
    View,
    Dimensions,
    KeyboardAvoidingView,
    Platform,
    Keyboard,
    StyleSheet
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { dummyReels } from '../../../data/dummyVideos';
import { LiveStory } from '../story';
import { Colors } from '../../../constants';

const { height } = Dimensions.get('window');
const videos = dummyReels;

export default function LiveShows() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const flatListRef = useRef(null);
    const [keyboardVisible, setKeyboardVisible] = useState(false);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => setKeyboardVisible(true)
        );
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                setKeyboardVisible(false);
                scrollToCurrentItem();
            }
        );

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);

    const onViewRef = useRef(({ viewableItems }) => {
        if (viewableItems.length > 0 && !keyboardVisible) {
            setCurrentIndex(viewableItems[0].index);
        }
    });

    const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 80 });

    const scrollToCurrentItem = () => {
        setTimeout(() => {
            flatListRef.current?.scrollToIndex({
                index: currentIndex,
                animated: false,
                viewPosition: 0
            });
        }, 50);
    };

    return (
        <SafeAreaView style={styles.areaView}>
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : null}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
            >
                <FlatList
                    ref={flatListRef}
                    data={videos}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item, index }) => (
                        <View style={{ height }}>
                            <LiveStory
                                video={item.video}
                                creator={item.creator}
                                caption={item.caption}
                                paused={currentIndex !== index}
                            />
                        </View>
                    )}
                    pagingEnabled
                    snapToInterval={height}
                    snapToAlignment="start"
                    decelerationRate="fast"
                    horizontal={false}
                    showsVerticalScrollIndicator={false}
                    onViewableItemsChanged={onViewRef.current}
                    viewabilityConfig={viewConfigRef.current}
                    windowSize={2}
                    removeClippedSubviews
                    initialNumToRender={1}
                    keyboardDismissMode="on-drag"
                    getItemLayout={(data, index) => ({
                        length: height,
                        offset: height * index,
                        index,
                    })}
                    onScrollToIndexFailed={() => { }}
                />
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    areaView: {
        flex: 1,
        backgroundColor: Colors.THEME
    },
    container: {
        backgroundColor: Colors.WHITE,
        flex: 1
    },


})