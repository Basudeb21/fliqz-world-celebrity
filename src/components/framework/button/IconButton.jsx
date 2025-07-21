import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Colors } from '../../../constants'
import { scale } from 'react-native-size-matters'

const IconButton = ({ Icon, iconName, iconSize, iconColor, bgColor }) => {
    return (
        <TouchableOpacity>
            <Icon
                name={iconName}
                size={iconSize}
                color={iconColor}
                style={[styles.icon, { backgroundColor: bgColor || Colors.WHITE }]}
            />
        </TouchableOpacity>
    )
}

export default IconButton

const styles = StyleSheet.create({
    icon: {
        alignSelf: "center",
        padding: scale(6),
        borderRadius: scale(5)
    }
})