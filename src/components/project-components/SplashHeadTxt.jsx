import { StyleSheet, Text } from 'react-native'
import React from 'react'
import { scale } from 'react-native-size-matters';

const SplashHeadTxt = ({ label = "", color }) => {
    return (
        <Text style={[styles.head, { color: color }]}>{label}</Text>
    )
}

export default SplashHeadTxt

const styles = StyleSheet.create({
    head: {
        fontSize: scale(20),
        alignSelf: "center",
        fontWeight: "700"
    },
    content: {

    }
})