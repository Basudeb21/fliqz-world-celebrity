import { KeyboardAvoidingView, ScrollView, StyleSheet, Text, ToastAndroid, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { Colors } from '../../../../../constants';
import { Spacer } from '../../../../../components/framework/boots';
import { GradientTextButton } from '../../../../../components/framework/button';
import { BackpressTopBar, DropdownBox } from '../../../../../components/framework/navbar';
import { PhoneNumberInput, TextAreaBox, TextInputBox } from '../../../../../components/framework/input';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GetAllCountryApi } from '../../../../../api/app/user';
import { useSelector } from 'react-redux';
import { CreateAddressApi } from '../../../../../api/app/address';
import { useNavigation } from '@react-navigation/native';

const EditAddress = () => {
    const [countryCode, setCountryCode] = useState('IN');
    const [callingCode, setCallingCode] = useState('91');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [title, setTitle] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [address, setAddress] = useState('');
    const [address2, setAddress2] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zipcode, setZipCode] = useState('');
    const [countryOptions, setCountryOptions] = useState([]);

    const token = useSelector(state => state.auth.token);
    const user = useSelector(state => state.auth.user);

    const navigation = useNavigation();

    useEffect(() => {
        const fetchCountries = async () => {
            const res = await GetAllCountryApi(token);
            if (res && res.success) {
                setCountryOptions(res.data);
                if (user?.country_id) {
                    const selected = res.data.find(c => c.id === user.country_id);
                    if (selected) {
                        setSelectedCountry(selected);
                        setCallingCode(selected.phone_code || '91');
                        setCountryCode(selected.country_code || 'IN');
                    }
                }
            }
        };
        fetchCountries();
    }, [token, user?.country_id]);

    const onPressCreateAddress = async () => {
        const res = await CreateAddressApi({
            token,
            address_title: title,
            name,
            email,
            phone: phoneNumber,
            address,
            address2,
            state,
            city,
            zipcode,
            country_id: selectedCountry?.id,
        });

        ToastAndroid.show(res.message, ToastAndroid.SHORT);

        // 🔥 FIX: Go back so the list screen can refresh
        if (res.success) {
            navigation.goBack();
        }
    };

    return (
        <SafeAreaView style={styles.areaView}>
            <BackpressTopBar title={"Edit Address"} />
            <ScrollView style={styles.container}>
                <KeyboardAvoidingView style={styles.body}>
                    <TextInputBox
                        placeholder='Enter Address Title'
                        value={title}
                        setValue={setTitle}
                    />
                    <Spacer height={10} />
                    <TextInputBox
                        placeholder='Enter name'
                        value={name}
                        setValue={setName}
                    />
                    <Spacer height={10} />
                    <TextInputBox
                        placeholder='Enter email'
                        value={email}
                        setValue={setEmail}
                    />
                    <Spacer height={10} />

                    <PhoneNumberInput
                        placeholder="Phone Number"
                        countryCode={countryCode}
                        setCountryCode={setCountryCode}
                        callingCode={callingCode}
                        setCallingCode={setCallingCode}
                        phoneNumber={phoneNumber}
                        setphoneNumber={setPhoneNumber}
                    />

                    <Spacer height={10} />
                    <TextAreaBox
                        placeholder='Enter Address'
                        height={80}
                        value={address}
                        setValue={setAddress}
                    />
                    <Spacer height={10} />
                    <TextAreaBox
                        placeholder='Enter Address2'
                        height={80}
                        value={address2}
                        setValue={setAddress2}
                    />
                    <Spacer height={10} />
                    <TextInputBox
                        placeholder='Enter City'
                        value={city}
                        setValue={setCity}
                    />
                    <Spacer height={10} />
                    <TextInputBox
                        placeholder='Enter State'
                        value={state}
                        setValue={setState}
                    />
                    <Spacer height={10} />
                    <TextInputBox
                        placeholder='Enter Zipcode'
                        value={zipcode}
                        setValue={setZipCode}
                    />
                    <Spacer height={10} />

                    <DropdownBox
                        value={selectedCountry ? selectedCountry.name : ''}
                        setValue={(val) => {
                            const found = countryOptions.find(c => c.name === val);
                            setSelectedCountry(found);
                            if (found) {
                                setCallingCode(found.phone_code || '91');
                                setCountryCode(found.country_code || 'IN');
                            }
                        }}
                        placeholder="Select Country"
                        options={countryOptions.map(c => c.name)}
                    />
                </KeyboardAvoidingView>

                <Spacer height={20} />
                <View style={styles.btn}>
                    <GradientTextButton
                        width='90%'
                        label='Submit'
                        onPress={onPressCreateAddress}
                    />
                </View>
                <Spacer height={20} />
            </ScrollView>

        </SafeAreaView>
    );
};

export default EditAddress;

const styles = StyleSheet.create({
    areaView: {
        flex: 1,
        backgroundColor: Colors.THEME
    },
    container: {
        backgroundColor: Colors.WHITE,
        flex: 1
    },
    body: {
        marginTop: verticalScale(20),
        marginHorizontal: moderateScale(20),
    },
    btn: {
        justifyContent: "center",
        alignItems: "center",
    },
});
