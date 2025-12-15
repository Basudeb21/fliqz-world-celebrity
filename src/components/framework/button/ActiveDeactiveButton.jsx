import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Colors } from '../../../constants'
import { scale } from 'react-native-size-matters'

const ActiveDeactiveButton = ({ width, height }) => {
    return (
        <TouchableOpacity style={[{ width: width, height: height, backgroundColor: Colors.GOOGLE_LOGO }, styles.btn]}>
            <Text>ActiveDeactiveButton</Text>
        </TouchableOpacity>
    )
}

export default ActiveDeactiveButton;

const styles = StyleSheet.create({
    btn: {
        borderRadius: scale(8),
        alignItems: "center",
        justifyContent: "center"
    }
})