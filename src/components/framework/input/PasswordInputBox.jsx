import { StyleSheet, TextInput, View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { moderateScale, scale } from 'react-native-size-matters';
import LinearGradient from 'react-native-linear-gradient';

import { Colors } from '../../../constants';
import Icon from 'react-native-vector-icons/Feather';

const PasswordInputBox = ({ value, setValue, placeholder }) => {
    const [isFocused, setIsFocused] = useState(false);
    const [secure, setSecure] = useState(true);

    return (
        <View style={[
            styles.inputContainer,
            isFocused ? styles.active : styles.deactive,
        ]}>
            <TextInput
                value={value}
                onChangeText={setValue}
                placeholder={placeholder}
                placeholderTextColor={Colors.PLACEHOLDER}
                secureTextEntry={secure}
                style={styles.txtInputBox}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
            />
            <TouchableOpacity onPress={() => setSecure(!secure)}>
                <LinearGradient
                    colors={[Colors.BUTTON_GRADIENT_ONE, Colors.BUTTON_GRADIENT_TWO]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.iconContainer}
                >
                    <Icon
                        name={secure ? 'eye-off' : 'eye'}
                        size={scale(16)}
                        color={Colors.WHITE}
                    />
                </LinearGradient>
            </TouchableOpacity>
        </View>
    );
};

export default PasswordInputBox;

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: scale(1),
        borderRadius: scale(5),
        paddingLeft: scale(10),
        overflow: 'hidden',
    },
    txtInputBox: {
        flex: 1,
        paddingVertical: scale(10),
        paddingRight: scale(10),
        color: Colors.BLACK,
    },
    active: {
        borderColor: Colors.THEME,
    },
    deactive: {
        borderColor: Colors.INPUTBOX_DEACTIVE_BORDER_COLOR,
    },
    iconContainer: {
        backgroundColor: Colors.THEME,
        justifyContent: 'center',
        paddingHorizontal: scale(12),
        position: "relative",
        flex: 1
    },
});
