import { StyleSheet, Text, Image } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { Colors } from '../../../constants'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'

const ChatSend = ({ item }) => {
    // If it's an image only, render image without gradient bg
    if (item.isAttached === 1 && item.fileUrl) {
        return (
            <Image source={{ uri: item.fileUrl }} style={styles.imageOnly} />
        )
    }

    return (
        <LinearGradient
            colors={[Colors.BUTTON_GRADIENT_TWO, Colors.BUTTON_GRADIENT_ONE]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.container}
        >
            {item.isAttached === 0 && item.message && (
                <Text style={styles.text}>{item.message}</Text>
            )}

            {item.price && (
                <Text style={styles.price}>${item.price}</Text>
            )}
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
        maxWidth: "70%"
    },
    text: {
        color: Colors.WHITE,
        fontSize: scale(12),
        fontWeight: "500",
    },
    imageOnly: {
        alignSelf: "flex-end",
        marginEnd: moderateScale(45),
        marginTop: verticalScale(10),
        width: scale(150),
        height: scale(180),
        borderRadius: scale(8),
    },
    price: {
        fontSize: scale(14),
        fontWeight: "bold",
        color: Colors.WHITE,
        marginTop: verticalScale(5)
    }
})
