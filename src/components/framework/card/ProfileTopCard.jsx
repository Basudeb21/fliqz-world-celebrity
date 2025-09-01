import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { GradientTextButton } from '../button'
import { Spacer } from '../boots'

const ProfileTopCard = ({ info }) => {
    return (
        <View style={styles.container}>
            <View style={styles.item}>
                <Image style={styles.image} source={{ uri: info.avatar }} />
                <Text style={styles.fanName}>{info.name}</Text>
                <Text style={styles.onlineTime}>{"20 mins ago"}</Text>
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
        width: moderateScale(80),
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