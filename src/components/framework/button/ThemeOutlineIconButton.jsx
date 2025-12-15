import { StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors } from '../../../constants'
import { scale, verticalScale } from 'react-native-size-matters'
import { GradientIcon } from '../icon'

const ThemeOutlineIconButton = ({ Icon, iconName, iconSize, height = 33, width = "100%", onPress }) => {
    return (
        <TouchableOpacity
            style={[
                styles.btn,
                { height: verticalScale(height), width }
            ]}
            onPress={onPress}
            activeOpacity={0.8}
        >
            <GradientIcon
                name={iconName}
                size={iconSize}
                IconPack={Icon}
                colors={[Colors.BUTTON_GRADIENT_ONE, Colors.BUTTON_GRADIENT_TWO]}
            />
        </TouchableOpacity>
    )
}

export default ThemeOutlineIconButton

const styles = StyleSheet.create({
    btn: {
        borderWidth: scale(1),
        borderColor: Colors.THEME,
        borderRadius: scale(6),
        alignItems: "center",
        justifyContent: "center",
        overflow: "visible",
        paddingVertical: 0,
        paddingHorizontal: 0,
    },
})
