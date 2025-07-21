import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Feather from 'react-native-vector-icons/dist/Feather'
import { Colors } from '../../../constants'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import Spacer from '../boots/Spacer'
import HR from '../boots/HR'
import GradientIcon from '../icon/GradientIcon'

const NoOutlineIconTextButton = ({ Icon, iconName, text, onPress }) => {
    return (
        <View>
            <View style={styles.row}>
                <View style={styles.innerRow}>
                    <GradientIcon
                        IconPack={Icon}
                        name={iconName}
                        size={20}
                        colors={[Colors.BUTTON_GRADIENT_ONE, Colors.BUTTON_GRADIENT_TWO]}
                    />
                    <Text style={styles.txt}>{text}</Text>
                </View>
                <TouchableOpacity onPress={onPress}>
                    <GradientIcon
                        IconPack={Feather}
                        name={"arrow-right"}
                        size={24}
                        colors={[Colors.BUTTON_GRADIENT_ONE, Colors.BUTTON_GRADIENT_TWO]}
                    />
                </TouchableOpacity>
            </View>
            <Spacer height={10} />
            <HR height={1} />
        </View>
    )
}

export default NoOutlineIconTextButton

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: moderateScale(10),
        marginTop: verticalScale(10),
        alignItems: "center"
    },
    innerRow: {
        flexDirection: "row",
        gap: moderateScale(20),
        alignItems: "center"
    },
    txt: {
        fontSize: scale(17),
        fontWeight: "500",
        color: Colors.BLACK,
    }
})