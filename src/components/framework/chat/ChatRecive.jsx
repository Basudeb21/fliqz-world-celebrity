import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { Colors } from '../../../constants'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'

const ChatReceive = ({ item }) => {
    if (item.isAttached === 1 && item.fileUrl) {
        return (
            <Image source={{ uri: item.fileUrl }} style={styles.imageOnly} />
        )
    }

    return (
        <View style={styles.container}>
            {item.isAttached === 0 && item.message && (
                <Text style={styles.text}>{item.message}</Text>
            )}

            {item.price && (
                <Text style={styles.price}>${item.price}</Text>
            )}
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
        maxWidth: "70%",
        backgroundColor: Colors.LIGHT_GRAY,
        borderRadius: scale(12)
    },
    text: {
        color: Colors.BLACK,
        fontSize: scale(12),
        fontWeight: "500",
    },
    imageOnly: {
        alignSelf: "flex-start",
        marginStart: moderateScale(45),
        marginTop: verticalScale(10),
        width: scale(150),
        height: scale(180),
        borderRadius: scale(8),
    },
    price: {
        fontSize: scale(14),
        fontWeight: "bold",
        color: Colors.THEME,
        marginTop: verticalScale(5)
    }
})
