import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const SocialIconButton = ({ onPress, Icon, iconName, size, color }) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <Icon
                name={iconName}
                size={size}
                color={color}
            />
        </TouchableOpacity>
    )
}

export default SocialIconButton

const styles = StyleSheet.create({})