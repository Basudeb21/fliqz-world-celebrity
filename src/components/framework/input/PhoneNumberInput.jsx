import { View, Text, TextInput, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import CountryPicker from 'react-native-country-picker-modal';
import { Colors } from '../../../constants';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';



const PhoneNumberInput = (
    {
        placeholder,
        phoneNumber,
        setphoneNumber,
        countryCode,
        setCountryCode,
        callingCode,
        setCallingCode
    }

) => {
    const [isFocused, setIsFocused] = useState(false);
    const handleCountrySelect = (country) => {
        setCountryCode(country.cca2);
        setCallingCode(country.callingCode[0]);
    };
    return (
        <View>
            <View style={[styles.inputContainer, styles.loginCredStyle, isFocused ? styles.active : styles.deactive]}>
                <View style={styles.codeContainer}>
                    <CountryPicker
                        countryCode={countryCode}
                        withFilter
                        withFlag
                        withCallingCode
                        onSelect={handleCountrySelect}
                    />
                    <Text style={styles.countryCodeText}>+{callingCode}</Text>
                </View>

                <TextInput
                    placeholderTextColor={Colors.PLACEHOLDER}
                    placeholder={placeholder}
                    value={phoneNumber}
                    onChangeText={setphoneNumber}
                    keyboardType="phone-pad"
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                />
            </View>
        </View>
    )
}

export default PhoneNumberInput

const styles = StyleSheet.create({
    loginCredStyle: {
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: Colors.WHITE,
        borderColor: Colors.THEME,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 8,
        borderColor: '#ccc',
        backgroundColor: Colors.WHITE,
        paddingHorizontal: 10,
    },

    codeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 8,
    },

    countryCodeText: {
        fontSize: 14,
        marginLeft: 5,
    },
    active: {
        borderColor: Colors.THEME,
    },
    deactive: {
        borderColor: Colors.INPUTBOX_DEACTIVE_BORDER_COLOR,
    },

})