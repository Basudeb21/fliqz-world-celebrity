import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Colors } from '../../../constants';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import Ionicons from 'react-native-vector-icons/Ionicons';

const OutlineQuantityInputBox = ({ value, setValue, placeholder = "Placeholder", width }) => {
    const onPressUp = () => {
        const num = parseInt(value) || 0;
        setValue(String(num + 1));
    };

    const onPressDown = () => {
        const num = parseInt(value) || 0;
        setValue(String(Math.max(0, num - 1)));
    };

    const handleChange = (text) => {
        if (/^\d*$/.test(text)) {
            setValue(text);
        }
    };

    return (
        <View style={[styles.container, { width: width || "100%" }]}>
            <View>
                <TextInput
                    value={value}
                    onChangeText={handleChange}
                    placeholder={placeholder}
                    keyboardType='numeric'
                    placeholderTextColor={Colors.PLACEHOLDER}
                    style={styles.txtInputBox}
                />
                <View style={styles.btnIncDsc}>
                    <TouchableOpacity onPress={onPressUp}>
                        <Ionicons name="caret-up-outline" size={17} color={Colors.BLACK} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={onPressDown}>
                        <Ionicons name="caret-down-outline" size={17} color={Colors.BLACK} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default OutlineQuantityInputBox;

const styles = StyleSheet.create({
    container: {
        marginBottom: verticalScale(10),
    },
    label: {
        fontSize: moderateScale(14),
        color: Colors.BLACK,
        marginBottom: verticalScale(5),
    },
    txtInputBox: {
        borderWidth: scale(1),
        borderRadius: scale(5),
        padding: scale(10),
        paddingRight: scale(30),
        borderColor: Colors.THEME,
        fontSize: moderateScale(14),
        color: Colors.BLACK,
    },
    btnIncDsc: {
        position: "absolute",
        right: 10,
        justifyContent: 'space-between',
        height: verticalScale(30),
        top: scale(3),
    },
});
