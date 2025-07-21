import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors } from '../../../constants'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

const Link = ({ label, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <Text style={styles.txt}>{label}</Text>
        </TouchableOpacity>
    )
}

export default Link

const styles = StyleSheet.create({
    txt: {
        color: Colors.THEME,
        textDecorationLine: "underline",
    }
})