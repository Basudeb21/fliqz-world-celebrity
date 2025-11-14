import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { Colors } from '../../../constants'

const RoundHighLight = ({ key, image, name }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.imgContainer}>
                <Image source={{ uri: image }} style={styles.image} />
            </TouchableOpacity>
            <Text style={styles.title}>{name}</Text>
        </View>
    )
}

export default RoundHighLight

const styles = StyleSheet.create({

    container: {
        marginStart: moderateScale(10),
        alignItems: "center",
        alignSelf: "flex-start",
    },
    imgContainer: {
        borderWidth: scale(2),
        borderRadius: scale(100),
        padding: scale(2),
        borderColor: Colors.THEME,
    },
    image: {
        width: moderateScale(50),
        height: verticalScale(50),
        borderRadius: scale(100)
    },
    title: {
        fontSize: scale(10),
        marginTop: verticalScale(4),
        fontWeight: "400",
        color: Colors.SILVER
    }
})