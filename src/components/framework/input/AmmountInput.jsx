import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { Colors } from '../../../constants';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';

const AmmountInput = ({ value = 0, setValue, placeholder = "Placeholder", width }) => {
    const [isFocused, setIsFocused] = useState(false);

    const onPressUp = () => {
        const updated = (parseInt(value) || 0) + 1;
        setValue?.(updated);
    };

    const onPressDown = () => {
        const updated = (parseInt(value) || 0) > 0 ? parseInt(value) - 1 : 0;
        setValue?.(updated);
    };

    const handleChange = (text) => {
        const num = parseInt(text.replace(/\D/g, ''), 10);
        setValue?.(!isNaN(num) ? num : "");
    };

    return (
        <View style={{ width: width || "100%" }}>
            <View style={[
                styles.inputWrapper,
                { borderColor: isFocused ? Colors.THEME : Colors.PLACEHOLDER }
            ]}>
                <LinearGradient
                    colors={[Colors.BUTTON_GRADIENT_TWO, Colors.BUTTON_GRADIENT_ONE]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.dollarIconGradient}
                >
                    <FontAwesome
                        name="dollar"
                        size={16}
                        color={Colors.WHITE}
                        style={styles.icon}
                    />
                </LinearGradient>

                <TextInput
                    value={value?.toString()}
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
    dollarIconGradient: {
        height: '100%',
        paddingHorizontal: moderateScale(15),
        borderTopLeftRadius: scale(5),
        borderBottomLeftRadius: scale(5),
        alignItems: 'center',
    },
    txtInputBox: {
        flex: 1,
        paddingVertical: 0,
        paddingRight: scale(30),
        fontSize: scale(13),
        color: Colors.BLACK,
        marginStart: moderateScale(10)
    },
    btnIncDsc: {
        justifyContent: 'space-between',
        height: verticalScale(30),
        marginVertical: verticalScale(5),
        marginEnd: moderateScale(10)
    },
    icon: {
        position: "absolute",
        flex: 1,
        height: "100%",
        verticalAlign: "middle"
    }
});
