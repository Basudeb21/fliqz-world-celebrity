import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { Colors } from '../../../../constants'

const NumberTrack = ({ number, current }) => {
    return (
        <Text style={[styles.number, number > current ? styles.deactive : styles.active]}>{number}</Text>
    )
}

export default NumberTrack

const styles = StyleSheet.create({
    number: {
        borderWidth: scale(3),
        paddingHorizontal: moderateScale(6),
        paddingVertical: verticalScale(2),
        borderRadius: scale(100),
        fontSize: scale(12),
        fontWeight: "900",
    },
    deactive: {
        borderColor: Colors.PLACEHOLDER
    },
    active: {
        borderColor: Colors.THEME
    }
})