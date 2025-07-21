import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { Colors } from '../../../constants'
import { scale, verticalScale } from 'react-native-size-matters'
import GradientIcon from '../icon/GradientIcon'

const GradientOutlineIconButton = ({
    Icon,
    iconName,
    iconSize = 18,
    onPress,
    height = 33,
    width = '100%',
    borderRadius = 8,
    style = {},
}) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.8}
            style={[{ width }, style]}
        >
            <LinearGradient
                colors={[Colors.BUTTON_GRADIENT_ONE, Colors.BUTTON_GRADIENT_TWO]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={[styles.gradientBorder, { borderRadius: scale(borderRadius) }]}
            >
                <View
                    style={[
                        styles.innerContent,
                        {
                            height: verticalScale(height),
                            borderRadius: scale(borderRadius - 2),
                        },
                    ]}
                >
                    <GradientIcon
                        name={iconName}
                        size={iconSize}
                        IconPack={Icon}
                        colors={[Colors.BUTTON_GRADIENT_ONE, Colors.BUTTON_GRADIENT_TWO]}
                    />
                </View>
            </LinearGradient>
        </TouchableOpacity>
    )
}

export default GradientOutlineIconButton

const styles = StyleSheet.create({
    gradientBorder: {
        padding: scale(1.5),
    },
    innerContent: {
        backgroundColor: Colors.WHITE,
        alignItems: 'center',
        justifyContent: 'center',
    },
})
