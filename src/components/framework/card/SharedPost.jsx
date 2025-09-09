import { ImageBackground, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { moderateScale, verticalScale } from 'react-native-size-matters'
import { Colors } from '../../../constants'
import { BottomBar, Topbar } from '../navbar'
import { HR, Spacer } from '../boots'
import { QuizDisplayModal } from '../modal'

const SharedPost = ({
    userName,
    userAvatar,
    createdAt,
    crowdfunding,
    data,
    badges
}) => {
    const isPoll = data?.poll && !Array.isArray(data.poll);


    const imageSource =
        isPoll && (!data.attachment || data.attachment.length === 0)
            ? { uri: "https://myvault-web.codextechnolife.com/assets/images/banner.jpg" }
            : data.attachment?.length > 0
                ? { uri: data.attachment[0].path }
                : null

    return (
        <View style={styles.container}>
            <Topbar
                userAvatar={userAvatar}
                userName={userName}
                postText={data.text}
                data={data}
                badges={badges}
            />
            {!isPoll && <Text style={styles.postTxt}>{data.text}</Text>}
            {crowdfunding && crowdfunding.title ? (
                <Text style={styles.crowdfundingTitle}>
                    {crowdfunding.title}
                </Text>
            ) : (
                imageSource && (

                    <ImageBackground
                        source={imageSource}
                        style={styles.postImage}
                    >
                        {isPoll && (
                            <QuizDisplayModal text={data.text} pollAnswers={data.poll.poll_answer} />
                        )}
                    </ImageBackground>
                )
            )}

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
    pollText: {
        color: Colors.WHITE,
        fontSize: moderateScale(16),
        fontWeight: "600",
        textAlign: "center",
        backgroundColor: 'rgba(0,0,0,0.5)',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 6,
    },
})
