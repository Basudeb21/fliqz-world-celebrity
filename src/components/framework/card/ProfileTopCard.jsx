import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import GradientTextButton from '../button/GradientTextButton'
import Spacer from '../boots/Spacer'
import { Colors } from '../../../constants'

const ProfileTopCard = ({ info }) => {
    return (
        <View style={styles.container}>
            <View style={styles.item}>
                <Image style={styles.image} source={{ uri: info.image }} />
                <Text style={styles.fanName}>{info.fanName}</Text>
                <Text style={styles.onlineTime}>{info.fanActiveTime}</Text>
            </View>
            <Spacer height={10} />
            <GradientTextButton label='View Profile' height={24} fontSize={10} width='30%' />
        </View>
    )
}

export default ProfileTopCard

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
    },
    item: {
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center"
    },
    image: {
        height: verticalScale(70),
        width: moderateScale(70),
        borderRadius: scale(100)
    },
    fanName: {
        fontSize: scale(18),
        fontWeight: "400",
        marginTop: verticalScale(10)
    },
    onlineTime: {
        fontSize: scale(10),
        fontWeight: "400",
        marginTop: verticalScale(4)
    },

})