import { StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { Colors } from '../../../constants'
import { moderateScale, scale } from 'react-native-size-matters'
import { SendTipAtChatApi } from '../../../api/app/chat'
import { useSelector } from 'react-redux'

const QuickAmmountCard = ({ user, ammount }) => {
    const token = useSelector(state => state.auth.token);

    const onPressAmount = async () => {
        const res = await SendTipAtChatApi({ token, id: user, price: ammount });
        ToastAndroid.show(res.message, ToastAndroid.SHORT);
    }
    return (
        <TouchableOpacity onPress={onPressAmount}>
            <LinearGradient
                colors={[Colors.BUTTON_GRADIENT_TWO, Colors.BUTTON_GRADIENT_ONE]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.card}
            >
                <Text style={styles.amount}>${ammount}</Text>

            </LinearGradient>
        </TouchableOpacity>

    )
}

export default QuickAmmountCard

const styles = StyleSheet.create({
    card: {
        padding: scale(7),
        marginStart: moderateScale(10),
        borderRadius: scale(8)
    },
    amount: {
        color: Colors.WHITE,
        fontWeight: "600"
    }
})