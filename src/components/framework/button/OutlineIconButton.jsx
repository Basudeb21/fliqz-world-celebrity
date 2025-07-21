import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Colors } from '../../../constants'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import Feather from 'react-native-vector-icons/dist/Feather'
import GradientIcon from '../icon/GradientIcon'

const OutlineIconButton = ({ Icon, iconName, label, onPress }) => {
    return (
        <TouchableOpacity style={styles.btn} onPress={onPress}>

            <View style={styles.icon}>
                <GradientIcon
                    name={iconName}
                    size={20}
                    IconPack={Icon}
                    colors={[Colors.BUTTON_GRADIENT_ONE, Colors.BUTTON_GRADIENT_TWO]}
                />
            </View>
            <Text style={styles.btnTxt}>{label}</Text>

            <Feather
                name="arrow-right"
                size={28}
                color={Colors.THEME}
                style={styles.iconDown}
            />
        </TouchableOpacity>
    )
}

export default OutlineIconButton

const styles = StyleSheet.create({
    btn: {
        borderWidth: scale(1),
        borderColor: Colors.THEME,
        paddingVertical: verticalScale(5),
        borderRadius: scale(25),
        flexDirection: "row",
        alignItems: "center",
        marginBottom: verticalScale(10),
        paddingRight: moderateScale(10),
    },
    icon: {
        backgroundColor: Colors.WHITE,
        padding: scale(7),
        borderRadius: scale(100),
        marginStart: moderateScale(10)
    },
    btnTxt: {
        fontWeight: "500",
        fontSize: scale(18),
        color: Colors.BLACK,
        marginStart: moderateScale(10),
        flex: 1
    },
    iconDown: {
        marginLeft: "auto",
    }
})
