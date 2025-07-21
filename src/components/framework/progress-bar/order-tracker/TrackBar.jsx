import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { moderateScale, verticalScale } from 'react-native-size-matters'
import { Colors } from '../../../../constants'

const TrackBar = ({ number, current }) => {
    return (
        <View style={[styles.bar, number >= current ? styles.deactive : styles.active]} />
    )
}

export default TrackBar

const styles = StyleSheet.create({
    bar: {
        width: moderateScale(4),
        height: verticalScale(40),
        backgroundColor: Colors.THEME,
        alignSelf: "center"
    },
    deactive: {
        backgroundColor: Colors.PLACEHOLDER
    },
    active: {
        backgroundColor: Colors.THEME
    }
})