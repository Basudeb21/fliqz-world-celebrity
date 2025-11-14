import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { scale } from 'react-native-size-matters'
import { Colors } from '../../../constants'

const ChatTime = ({ label }) => {
    return (
        <Text style={styles.time}>{label}</Text>
    )
}

export default ChatTime

const styles = StyleSheet.create({
    time: {
        fontSize: scale(10),
        fontWeight: "500",
        color: Colors.PLACEHOLDER,
        alignSelf: "center"
    }
})