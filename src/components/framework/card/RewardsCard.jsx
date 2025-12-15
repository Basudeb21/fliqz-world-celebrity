import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Colors } from '../../../constants'
import { scale, verticalScale } from 'react-native-size-matters'
import { Spacer } from '../boots'

const RewardsCard = ({ logo = "😇", text = "Loading...", value, setValue }) => {
    return (
        <TouchableOpacity style={styles.card}>
            <Text style={styles.logo}>{logo}</Text>
            <Spacer height={10} />
            <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
    )
}

export default RewardsCard

const styles = StyleSheet.create({
    card: {
        borderColor: Colors.SILVER,
        borderWidth: scale(2),
        padding: scale(12),
        width: "30%",
        alignItems: "center",
        borderRadius: scale(12),
        height: verticalScale(120),
        justifyContent: "center",
        textAlign: "center"
    },
    logo: {
        fontSize: scale(25)
    },
    text: {
        fontSize: scale(12),
        fontWeight: "600",
        alignSelf: "center",
        textAlign: "center"

    }
})