import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors } from '../../../constants'
import { scale } from 'react-native-size-matters'

const TimeCountCard = ({ color, count = "00", label = "XX" }) => {
    return (
        <View style={styles.container}>
            <View style={[styles.card, { backgroundColor: color }]}>
                <Text style={styles.count}>{count}</Text>
            </View>
            <Text style={styles.label}>{label}</Text>
        </View>
    )
}

export default TimeCountCard

const styles = StyleSheet.create({
    container: {
        alignItems: "center"
    },
    card: {
        padding: scale(8),
        borderRadius: scale(6)
    },
    count: {
        color: Colors.WHITE
    },
    label: {
        fontSize: scale(10),
        color: Colors.PLACEHOLDER,
        fontWeight: "800"
    }
})