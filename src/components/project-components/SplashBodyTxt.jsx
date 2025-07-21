import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

const SplashBodyTxt = ({
    label = "" }) => {
    return (
        <Text style={styles.txt}>{label}</Text>
    )
}

export default SplashBodyTxt

const styles = StyleSheet.create({
    txt: {
        textAlign: "center",
        fontSize: scale(10),
        fontWeight: "500"
    }
})

