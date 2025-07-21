import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors } from '../../../constants'
import { scale } from 'react-native-size-matters'

const SizeNumberLabel = ({ lebel }) => {
    return (
        <Text style={styles.lebel}>{lebel}</Text>
    )
}

export default SizeNumberLabel

const styles = StyleSheet.create({
    lebel: {
        color: Colors.WHITE,
        backgroundColor: Colors.THEME,
        alignSelf: "flex-start",
        paddingVertical: scale(5),
        paddingHorizontal: scale(10),
        borderRadius: scale(6),
        marginTop: scale(10),
        fontSize: scale(16),
        fontWeight: "600"
    }
})