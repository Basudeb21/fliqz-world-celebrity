import { ImageBackground, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Video from 'react-native-video' // 👈 add this
import { moderateScale, verticalScale } from 'react-native-size-matters'
import { Colors, Images } from '../../../constants'
import { BottomBar, Topbar } from '../navbar'
import { HR, Spacer } from '../boots'
import { QuizDisplayModal } from '../modal'
import SensitiveContent from './SensitiveContent'
import BlockableTextCard from './BlockableTextCard'


const SharedPost = ({
    userName,
    userAvatar,
    createdAt,
    crowdfunding,
    data,
    badges
}) => {
    const [isShow, setIsShow] = useState(data?.attachment[0]?.flagged_by_ai);
    const [isPersonalText, setIsPersonalText] = useState(data.is_personal_details_detected);
    const [isMinorText, setIsMinorText] = useState(data.is_minor_message_detected);
    const isPoll = data?.poll && !Array.isArray(data.poll);

    const onPressShow = () => {
        setIsShow(0)
    }

    const attachment = data?.attachment?.[0]
    const isVideo = attachment?.type === "videos"

    const imageSource =
        isPoll && (!data.attachment || data.attachment.length === 0)
            ? { uri: Images.BANNER_IMG }
            : data.attachment?.length > 0
                ? { uri: attachment.path }
                : null

    const hasSensitiveText = (isMinorText == 1 || isPersonalText == 1);
    const hasSensitiveMedia = (isShow == 1);

    let contentToRender = null;

    if (hasSensitiveText && !isPoll) {
        contentToRender = (
            <>
                <BlockableTextCard />
                {imageSource && !hasSensitiveMedia && (
                    <ImageBackground source={imageSource} style={styles.postImage}>
                        {isPoll && (
                            <QuizDisplayModal
                                text={data.text}
                                pollAnswers={data.poll.poll_answer}
                            />
                        )}
                    </ImageBackground>
                )}
            </>
        );
    } else if (hasSensitiveMedia) {
        // If media is sensitive, show SensitiveContent
        contentToRender = (
            <>
                <Text style={styles.postTxt}>{data.text}</Text>
                <SensitiveContent onPress={onPressShow} />
            </>
        );
    } else {
        // Show normal content
        contentToRender = (
            <>
                <Text style={styles.postTxt}>{data.text}</Text>
                {imageSource && (
                    isVideo ? (
                        <Video
                            source={{ uri: attachment.path }}
                            style={styles.postVideo}
                            controls
                            resizeMode="cover"
                            paused={true}
                        />
                    ) : (
                        <ImageBackground source={imageSource} style={styles.postImage}>
                            {isPoll && (
                                <QuizDisplayModal
                                    text={data.text}
                                    pollAnswers={data.poll.poll_answer}
                                />
                            )}
                        </ImageBackground>
                    )
                )}
            </>
        );
    }

    return (
        <View style={styles.container}>
            <Topbar
                userAvatar={userAvatar}
                userName={userName}
                postText={data.text}
                data={data}
                badges={badges}
            />

            {contentToRender}

            {crowdfunding && crowdfunding.title ? (
                <Text style={styles.crowdfundingTitle}>
                    {crowdfunding.title}
                </Text>
            ) : null}

            <BottomBar createdAt={createdAt} data={data} />
            <Spacer height={7} />
            <HR width="95%" center={true} height={0.5} />
        </View>
    )
}

export default SharedPost

const styles = StyleSheet.create({
    postImage: {
        marginTop: verticalScale(10),
        width: "100%",
        height: verticalScale(220),
        justifyContent: "center",
        alignItems: "center",
    },
    postVideo: {
        marginTop: verticalScale(10),
        width: "100%",
        height: verticalScale(220),
        borderRadius: moderateScale(8),
        backgroundColor: "#000",
    },
    crowdfundingTitle: {
        marginVertical: verticalScale(10),
        fontSize: moderateScale(16),
        fontWeight: '500',
        color: Colors.BLACK,
        marginStart: moderateScale(20),
    },
    postTxt: {
        marginBottom: verticalScale(4),
        marginStart: moderateScale(20),
        fontWeight: "500",
    },
})
