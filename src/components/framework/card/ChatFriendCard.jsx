import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Colors } from '../../../constants';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

import HR from '../boots/HR';
import GradientIcon from '../icon/GradientIcon';

const ChatFriendCard = ({ image, fanName, fanActiveTime, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.container}>
                <Image style={styles.userImage} source={{ uri: image }} />

                <View style={styles.userInfoContainer}>
                    <Text style={styles.fanName}>{fanName}</Text>
                    <Text style={styles.activeTime}>{fanActiveTime}</Text>
                </View>

                <View style={styles.rightIconContainer}>

                    <GradientIcon
                        name={"logo-wechat"}
                        size={24}
                        IconPack={Ionicons}
                        colors={[Colors.BUTTON_GRADIENT_ONE, Colors.BUTTON_GRADIENT_TWO]}
                    />
                </View>
            </View>
            <HR height={1} color={Colors.HR_COLOR} width='90%' center={true} />
        </TouchableOpacity>
    )
}

export default ChatFriendCard

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: verticalScale(10),
        paddingHorizontal: moderateScale(20),
    },
    userImage: {
        width: moderateScale(40),
        height: verticalScale(40),
        borderRadius: scale(100),
    },
    userInfoContainer: {
        marginStart: moderateScale(20),
        flex: 1,
    },
    fanName: {
        color: Colors.FADE_TEXT,
        fontSize: scale(14),
        fontWeight: "500",
    },
    activeTime: {
        fontSize: scale(10),
        marginTop: verticalScale(2),
    },
    rightIconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
})
