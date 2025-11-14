import { View, Text, TextInput, StyleSheet } from 'react-native'
import React, { useState, useEffect } from 'react'
import CountryPicker from 'react-native-country-picker-modal';
import { Colors } from '../../../constants';
import { GetAllCountryApi } from '../../../api/app/user';
import { useSelector } from 'react-redux';

const PhoneNumberInput = ({
    placeholder,
    phoneNumber,
    setphoneNumber,
    countryCode,
    setCountryCode,
    callingCode,
    setCallingCode
}) => {
    const [isFocused, setIsFocused] = useState(false);
    const [countryCodes, setCountryCodes] = useState([]);
    const token = useSelector(state => state.auth.token);

    useEffect(() => {
        const fetchCountries = async () => {
            const res = await GetAllCountryApi(token);
            if (res && res.success) {
                const codes = res.data.map(country => country.country_code).filter(code => code);
                setCountryCodes(codes);
            }
        };
        fetchCountries();
    }, [token]);

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
                        countryCodes={countryCodes}
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