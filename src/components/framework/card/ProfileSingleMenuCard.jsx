import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Colors } from '../../../constants'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import GradientIcon from '../icon/GradientIcon'

const ProfileSingleMenuCard = ({ Icon, iconName, text, onPress }) => {
    return (
        <TouchableOpacity style={styles.card} onPress={onPress}>
            <GradientIcon
                name={iconName}
                size={16}
                IconPack={Icon}
                colors={[Colors.BUTTON_GRADIENT_ONE, Colors.BUTTON_GRADIENT_TWO]}
            />
            <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
    )
}

export default ProfileSingleMenuCard

const styles = StyleSheet.create({
    card: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: Colors.WHITE,
        minWidth: "48%",
        maxWidth: "48%",
        paddingVertical: verticalScale(10),
        elevation: scale(10),
        borderRadius: scale(8),
        paddingStart: moderateScale(10),
        gap: scale(10)

    },
    text: {
        fontWeight: "600",
        fontSize: scale(13)
    }
})