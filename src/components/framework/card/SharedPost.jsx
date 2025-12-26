import React, { useState, useRef } from 'react';
import {
    FlatList,
    ImageBackground,
    StyleSheet,
    Text,
    View,
    Dimensions,
} from 'react-native';
import Video from 'react-native-video';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { Colors, Images } from '../../../constants';
import { BottomBar, Topbar } from '../navbar';
import { HR, Spacer, ThreeDots } from '../boots';
import { QuizDisplayModal } from '../modal';
import SensitiveContent from './SensitiveContent';
import BlockableTextCard from './BlockableTextCard';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const SharedPost = ({ userName, userAvatar, createdAt, crowdfunding, data, badges }) => {
    const attachments = Array.isArray(data?.attachment) ? data.attachment : [];

    const [isShow, setIsShow] = useState(attachments?.[0]?.flagged_by_ai || 0);
    const [activeIndex, setActiveIndex] = useState(1);

    const isPersonalText = data?.is_personal_details_detected == 1;
    const isMinorText = data?.is_minor_message_detected == 1;

    const hasSensitiveText = isPersonalText || isMinorText;
    const hasSensitiveMedia = isShow == 1;

    const isPoll = data?.poll && !Array.isArray(data.poll) && Object.keys(data.poll).length > 0;

    const onPressShow = () => setIsShow(0);

    const onViewableItemsChanged = useRef(({ viewableItems }) => {
        if (viewableItems?.length > 0 && viewableItems[0]?.index != null) {
            setActiveIndex(viewableItems[0].index + 1);
        }
    }).current;

    const viewabilityConfig = useRef({
        itemVisiblePercentThreshold: 60,
    }).current;

    const renderAttachment = ({ item }) => {
        const mediaType = item?.type?.toLowerCase();

        if (mediaType === 'video' || mediaType === 'videos') {
            return (
                <Video
                    source={{ uri: item.path }}
                    style={styles.postVideo}
                    resizeMode="cover"
                    controls
                    paused
                />
            );
        }

        return (
            <ImageBackground
                source={{ uri: item.path }}
                style={styles.postImage}
            >
                {isPoll && (
                    <QuizDisplayModal
                        text={data.text}
                        pollAnswers={data.poll.poll_answer}
                    />
                )}
            </ImageBackground>
        );
    };

    return (
        <View style={styles.container}>
            <Topbar
                userAvatar={userAvatar}
                userName={userName}
                postText={data.text}
                data={data}
                badges={badges}
            />

            {hasSensitiveText && !isPoll ? (
                <BlockableTextCard />
            ) : (
                <>
                    <Text style={styles.postTxt}>{data.text}</Text>

                    {hasSensitiveMedia ? (
                        <SensitiveContent onPress={onPressShow} />
                    ) : (
                        <>
                            {attachments.length > 0 ? (
                                <>
                                    <FlatList
                                        data={attachments}
                                        horizontal
                                        pagingEnabled
                                        keyExtractor={(item) => String(item.id)}
                                        renderItem={renderAttachment}
                                        showsHorizontalScrollIndicator={false}
                                        onViewableItemsChanged={onViewableItemsChanged}
                                        viewabilityConfig={viewabilityConfig}
                                        snapToAlignment="center"
                                        decelerationRate="fast"
                                    />
                                    {attachments.length > 1 && (
                                        <View style={styles.dots}>
                                            <ThreeDots
                                                active={activeIndex}
                                                total={attachments.length}
                                            />
                                        </View>
                                    )}
                                </>
                            ) : (
                                isPoll && (
                                    <ImageBackground
                                        source={{ uri: Images.BANNER_IMG }}
                                        style={styles.postImage}
                                    >
                                        <QuizDisplayModal
                                            text={data.text}
                                            pollAnswers={data.poll.poll_answer}
                                        />
                                    </ImageBackground>
                                )
                            )}
                        </>
                    )}
                </>
            )}

            {crowdfunding?.title && (
                <Text style={styles.crowdfundingTitle}>
                    {crowdfunding.title}
                </Text>
            )}

            <BottomBar createdAt={createdAt} data={data} />
            <Spacer height={7} />
            <HR width="95%" center height={0.5} />
        </View>
    );
};

export default SharedPost;

const styles = StyleSheet.create({
    postImage: {
        width: SCREEN_WIDTH,
        height: verticalScale(220),
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: verticalScale(10),
    },
    postVideo: {
        width: SCREEN_WIDTH,
        height: verticalScale(220),
        backgroundColor: Colors.BLACK,
        marginTop: verticalScale(10),
    },
    postTxt: {
        marginBottom: verticalScale(4),
        marginStart: moderateScale(20),
        fontWeight: '500',
    },
    crowdfundingTitle: {
        marginVertical: verticalScale(10),
        fontSize: moderateScale(16),
        fontWeight: '500',
        color: Colors.BLACK,
        marginStart: moderateScale(20),
    },
    dots: {
        marginTop: verticalScale(8),
        alignItems: 'center',
    },
});
