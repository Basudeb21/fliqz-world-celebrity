import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { Colors } from '../../../constants'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'

const ChatReceive = ({ label }) => {
    return (
        <View
            style={styles.container}
        >
            <Text style={styles.text}>{label}</Text>
        </View>
    )
}

export default ChatReceive

const styles = StyleSheet.create({
    container: {
        alignSelf: "flex-start",
        marginStart: moderateScale(45),
        paddingHorizontal: moderateScale(15),
        marginTop: verticalScale(10),
        paddingVertical: verticalScale(6),
        maxWidth: "60%",
        backgroundColor: Colors.LIGHT_GRAY,
        borderRadius: scale(12)

    },
    text: {
        color: Colors.BLACK,
        fontSize: scale(12),
        fontWeight: "500",
    }
})