import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Colors } from '../../../constants'
import Spacer from '../boots/Spacer'
import HR from '../boots/HR'
import { scale } from 'react-native-size-matters'
import GradientIcon from '../icon/GradientIcon'

const IconTxtHRInputButton = ({ Icon, icnonName, label }) => {
    return (
        <TouchableOpacity >
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