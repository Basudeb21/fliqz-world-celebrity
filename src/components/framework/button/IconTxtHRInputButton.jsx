import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Colors } from '../../../constants'
import { scale } from 'react-native-size-matters'
import { HR, Spacer } from '../boots'
import { GradientIcon } from '../icon'

const IconTxtHRInputButton = ({ Icon, icnonName, label, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.row}>
                <GradientIcon
                    name={icnonName}
                    size={24}
                    IconPack={Icon}
                    colors={[Colors.BUTTON_GRADIENT_ONE, Colors.BUTTON_GRADIENT_TWO]}
                />
                <Spacer width={10} />
                <Text style={styles.txt}>{label}</Text>
            </View>
            <Spacer height={10} />
            <HR height={1} />
        </TouchableOpacity>
    )
}

export default IconTxtHRInputButton

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        alignItems: "center"
    },
    txt: {
        fontWeight: "500",
        fontSize: scale(16),
        color: Colors.BLACK
    }
})