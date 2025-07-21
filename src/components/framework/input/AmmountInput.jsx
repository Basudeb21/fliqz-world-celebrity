import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { Colors } from '../../../constants';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const AmmountInput = ({ value, setValue, placeholder = "Placeholder", width }) => {
    const [data, setData] = useState(0);
    const [isFocused, setIsFocused] = useState(false);

    const onPressUp = () => {
        const updated = data + 1;
        setData(updated);
        setValue?.(updated);
    };

    const onPressDown = () => {
        const updated = data > 0 ? data - 1 : 0;
        setData(updated);
        setValue?.(updated);
    };

    const handleChange = (text) => {
        const num = parseInt(text.replace(/\D/g, ''), 10);
        const updated = !isNaN(num) ? num : 0;
        setData(updated);
        setValue?.(updated);
    };

    return (
        <View style={{ width: width || "100%" }}>
            <View style={[
                styles.inputWrapper,
                { borderColor: isFocused ? Colors.THEME : Colors.PLACEHOLDER }
            ]}>
                <FontAwesome
                    name="dollar"
                    size={16}
                    color={Colors.THEME}
                    style={styles.dollarIcon}
                />
                <TextInput
                    value={data.toString()}
                    onChangeText={handleChange}
                    placeholder={placeholder}
                    keyboardType='numeric'
                    placeholderTextColor={Colors.PLACEHOLDER}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
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

export default AmmountInput;

const styles = StyleSheet.create({
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: scale(1),
        borderRadius: scale(5),
    },
    dollarIcon: {
        marginRight: moderateScale(8),
        backgroundColor: Colors.SUGGESTION_USER_BORDER,
        height: "100%",
        paddingHorizontal: moderateScale(10),
        alignSelf: "center",
        borderTopLeftRadius: scale(5),
        borderBottomLeftRadius: scale(5),
        verticalAlign: "middle"
    },
    txtInputBox: {
        flex: 1,
        paddingVertical: 0,
        paddingRight: scale(30),
        fontSize: scale(13),
        color: Colors.BLACK,
    },
    btnIncDsc: {
        justifyContent: 'space-between',
        height: verticalScale(30),
        marginVertical: verticalScale(5),
        marginEnd: moderateScale(10)
    },
});
