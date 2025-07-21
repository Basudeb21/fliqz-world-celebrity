import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import BottomBar from '../navbar/shared-post-components/BottomBar'
import Topbar from '../navbar/shared-post-components/Topbar'
import { Colors } from '../../../constants';
import HR from '../boots/HR';
import Spacer from '../boots/Spacer';


const SharedPost = ({
    userName,
    userAvatar,
    createdAt,
    crowdfunding,
    data
}) => {

    return (
        <View style={styles.container}>
            <Topbar userAvatar={userAvatar} userName={userName} />

            {crowdfunding && crowdfunding.title ? (
                <Text style={styles.crowdfundingTitle}>
                    {crowdfunding.title}
                </Text>
            ) : (
                data.attachment?.length > 0 && (
                    <Image
                        source={{ uri: data.attachment[0].path }}
                        style={styles.postImage}
                    />
                )
            )}

            <BottomBar createdAt={createdAt} data={data} />
            <Spacer height={7} />
            <HR width='95%' center={true} height={0.5} />

        </View>
    )
}

export default SharedPost

const styles = StyleSheet.create({

    postImage: {
        marginTop: verticalScale(10),
        width: "100%",
        height: verticalScale(220),
    },
    crowdfundingTitle: {
        marginVertical: verticalScale(10),
        fontSize: moderateScale(16),
        fontWeight: '500',
        color: Colors.BLACK,
        marginStart: moderateScale(20)
    },
})