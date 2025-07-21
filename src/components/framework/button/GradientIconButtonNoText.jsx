import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient';
import { Colors } from '../../../constants';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import Spacer from '../boots/Spacer';

const GradientIconButtonNoText = ({ Icon, iconName, iconSize, height = 33, width = "100%", onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={{ width }}>
            <LinearGradient
                colors={[Colors.BUTTON_GRADIENT_TWO, Colors.BUTTON_GRADIENT_ONE]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={[styles.button, { height: verticalScale(height) }]}
            >
                <Icon
                    name={iconName}
                    color={Colors.WHITE}
                    size={iconSize}
                    style={styles.cross}
                />
            </LinearGradient>
        </TouchableOpacity>
    )
}

export default GradientIconButtonNoText

const styles = StyleSheet.create({
    button: {
        borderRadius: 6,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
})