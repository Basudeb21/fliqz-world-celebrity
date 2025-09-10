import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors, Images } from '../../../constants'
import { scale } from 'react-native-size-matters'

const EmptyContentCard = ({ text }) => {
    return (
        <View style={styles.container}>
            <Image source={Images.MAINTAIN_IMG} style={styles.img} />
            <Text style={styles.txt}>{text}</Text>
        </View>
    )
}

export default EmptyContentCard

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        elevation: 4,
        backgroundColor: Colors.THEME,
        alignSelf: "center",
        padding: scale(20),
        borderRadius: scale(20)
    },
    img: {
        width: scale(200),
        height: scale(200)
    },
    txt: {
        fontSize: scale(20),
        fontWeight: "700",
        color: Colors.WHITE
    }
})