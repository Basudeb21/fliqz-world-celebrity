import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { Colors } from '../../constants'
import Entypo from 'react-native-vector-icons/Entypo';
import { TextInputBox } from '../framework/input';
import { Spacer } from '../framework/boots';

const InputFormContainer = ({ head }) => {
    const [hideBtn, setHideBtn] = useState(true)

    const handleHidePress = () => {
        setHideBtn(!hideBtn);
    }
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headRow}>
                    <Text style={styles.headTxt}>{head}</Text>
                    <TouchableOpacity onPress={handleHidePress}>
                        <Entypo
                            color={Colors.THEME}
                            size={20}
                            name={hideBtn ? "chevron-up" : "chevron-down"}
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.body}>
                {hideBtn &&
                    <View>
                        <TextInputBox placeholder='First Name*' />
                        <Spacer height={15} />
                        <TextInputBox placeholder='Last Name*' />
                        <Spacer height={15} />
                        <TextInputBox placeholder='Address*' />
                        <Spacer height={15} />
                        <TextInputBox placeholder='City*' />
                        <Spacer height={15} />
                        <TextInputBox placeholder='State*' />
                        <Spacer height={15} />
                        <TextInputBox placeholder='Zip Code*' />
                        <Spacer height={15} />
                        <TextInputBox placeholder='Country*' />
                    </View>
                }
            </View>
        </View>
    )
}

export default InputFormContainer

const styles = StyleSheet.create({
    container: {
        marginHorizontal: moderateScale(20)
    },
    header: {
        backgroundColor: Colors.SILVER,
        paddingHorizontal: moderateScale(20),
        paddingVertical: verticalScale(10),
        borderTopRightRadius: scale(6),
        borderTopLeftRadius: scale(6)

    },
    body: {
        backgroundColor: Colors.WHITE,
        paddingHorizontal: moderateScale(20),
        paddingVertical: verticalScale(20),
        borderBottomRightRadius: scale(6),
        borderBottomLeftRadius: scale(6),
        borderWidth: scale(1),
        borderColor: Colors.SILVER
    },
    headTxt: {
        color: Colors.WHITE
    },
    headRow: {
        flexDirection: "row",
        justifyContent: "space-between"
    }

})