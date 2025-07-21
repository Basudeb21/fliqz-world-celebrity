import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { Colors } from '../../../constants'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'

const ChatSend = ({ label }) => {
    return (
        <LinearGradient
            colors={[Colors.BUTTON_GRADIENT_TWO, Colors.BUTTON_GRADIENT_ONE]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.container}
        >
            <Text style={styles.text}>{label}</Text>
        </LinearGradient>
    )
}

export default ChatSend

const styles = StyleSheet.create({
    container: {
        alignSelf: "flex-end",
        marginEnd: moderateScale(45),
        paddingHorizontal: moderateScale(15),
        marginTop: verticalScale(10),
        paddingVertical: verticalScale(6),
        borderRadius: scale(12),

        maxWidth: "60%"
    },
    text: {
        color: Colors.WHITE,
        fontSize: scale(12),
        fontWeight: "500",
    }
})