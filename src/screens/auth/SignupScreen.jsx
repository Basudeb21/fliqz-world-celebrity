import { ImageBackground, KeyboardAvoidingView, ScrollView, StyleSheet, Text, ToastAndroid, View } from 'react-native'
import React, { useState } from 'react'
import { Colors, Images, NavigationStrings, Strings } from '../../constants'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import FastImage from 'react-native-fast-image';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import { termsOfData } from '../../data/termsOfUseData';
import { privacyAndPolicyData } from '../../data/privacyAndPolicyData';
import { GradientTextButton, OutLineButton, SocialIconButton } from '../../components/framework/button';
import { HR, Link, Spacer } from '../../components/framework/boots';
import { Checkbox, PasswordInputBox, PhoneNumberInput, TextInputBox } from '../../components/framework/input';
import { PrivacyModal } from '../../components/framework/modal';
import { RegisterApi } from '../../api/auth';

const SignupScreen = () => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [refferalCode, setRefferalCode] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [phoneNumber, setphoneNumber] = useState('')
    const [countryCode, setCountryCode] = useState('IN');
    const [callingCode, setCallingCode] = useState('91');
    const [privacyModal, setPrivacyModal] = useState(false);
    const [termsModal, setTermsModal] = useState(false);

    const handelRegister = async () => {
        try {
            const result = await RegisterApi(
                "creator",
                refferalCode,
                firstName,
                lastName,
                email,
                phoneNumber,
                password,
                confirmPassword,
                callingCode
            )
            console.log(result);

            if (result.success == false) {
                ToastAndroid.show(result.message, ToastAndroid.SHORT);
            }

            if (result.success == true) {
                ToastAndroid.show(result.message, ToastAndroid.SHORT);
                handleSignupPress();
            }

        } catch (error) {
            console.log(error);
            ToastAndroid.show(error, ToastAndroid.SHORT);
        }
    }

    const navigation = useNavigation();

    const handleSignupPress = () => {
        navigation.navigate(NavigationStrings.LOGIN_SCREEN)
    }

    const handlehomePress = () => {
        navigation.navigate(NavigationStrings.MAIN_STACK, {
            screen: NavigationStrings.HOME_SCREEN
        })

    }


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.WHITE }}>
            <ScrollView >
                <KeyboardAvoidingView>
                    <ImageBackground source={{ uri: Images.SIGNUP_IMG }} style={styles.image}>
                        <FastImage
                            source={Images.WHITE_LOGO}
                            style={styles.logo}
                            resizeMode={FastImage.resizeMode.contain}
                        />
                    </ImageBackground>

                    <View style={styles.txtContainer}>
                        <Text style={styles.loginTxt}>Create Account</Text>
                        <Text style={[styles.loginTxt, styles.subs]}>For Celebrity</Text>
                    </View>
                    <Spacer height={13} />

                    <View style={styles.inputContainer}>
                        <TextInputBox value={firstName} setValue={setFirstName} placeholder={Strings.FIRST_NAME} />
                        <Spacer height={20} />
                        <TextInputBox value={lastName} setValue={setLastName} placeholder={Strings.LAST_NAME} />
                        <Spacer height={20} />
                        <TextInputBox value={refferalCode} setValue={setRefferalCode} placeholder={Strings.REFFERAL_CODE} />
                        <Spacer height={20} />
                        <TextInputBox value={email} setValue={setEmail} placeholder={Strings.EMAIL} />
                        <Spacer height={20} />
                        <PhoneNumberInput
                            placeholder={Strings.PHONE_NUMBER}
                            phoneNumber={phoneNumber}
                            setphoneNumber={setphoneNumber}
                            countryCode={countryCode}
                            setCountryCode={setCountryCode}
                            callingCode={callingCode}
                            setCallingCode={setCallingCode}
                        />
                        <Spacer height={20} />
                        <PasswordInputBox value={password} setValue={setPassword} placeholder={Strings.PASSWORD} />
                        <Spacer height={20} />
                        <PasswordInputBox value={confirmPassword} setValue={setConfirmPassword} placeholder={Strings.CONFIRM_PASSWORD} />
                        <Spacer height={20} />
                    </View>
                    <View style={styles.checkBocContainer}>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <Checkbox />
                            <Text>I agree to the </Text>
                            <Link
                                label={Strings.TERMS_OF_USE}
                                onPress={() => setTermsModal(true)}
                            />
                            <Text> and </Text>
                            <Link
                                label={Strings.PRIVACY_POLICY}
                                onPress={() => setPrivacyModal(true)}
                            />
                        </View>
                    </View>
                    <Spacer height={10} />
                    <View style={styles.btnContainer}>
                        <GradientTextButton label={Strings.SIGNUP} onPress={handelRegister} />
                        <Spacer height={10} />
                        <OutLineButton label_one={Strings.ALLREADY_HAVE_ACCOUNT} label_two={Strings.LOGIN} onPress={handleSignupPress} />
                    </View>
                    <Spacer height={20} />
                </KeyboardAvoidingView>
                <View style={styles.dividerContainer}>
                    <HR height={1} width='45%' />
                    <Text style={styles.orText}>OR</Text>
                    <HR height={1} width='45%' />
                </View>
                <Spacer height={10} />
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", gap: moderateScale(10) }}>
                    <SocialIconButton Icon={Ionicons} iconName={"logo-facebook"} size={26} color={Colors.FACEBOOK_LOGO} />
                    <SocialIconButton Icon={Ionicons} iconName={"logo-google"} size={22} color={Colors.GOOGLE_LOGO} />
                    <SocialIconButton Icon={Entypo} iconName={"twitter-with-circle"} size={26} color={Colors.TWITTER_LOGO} />
                    <SocialIconButton Icon={Entypo} iconName={"instagram-with-circle"} size={26} color={Colors.INSTAGRAM_LOGO} />
                </View>
                <Spacer height={20} />
            </ScrollView>
            {termsModal && (
                <PrivacyModal
                    visible={termsModal}
                    onClose={() => setTermsModal(false)}
                    head={"Terms and conditions"}
                    contentType={"Terms and conditions"}
                    updateDate={"Last updated: 2021-09-30"}
                    data={termsOfData}
                />
            )}
            {privacyModal && (
                <PrivacyModal
                    visible={privacyModal}
                    onClose={() => setPrivacyModal(false)}
                    head={"Privacy and Policy"}
                    contentType={"Privacy and Policy"}
                    updateDate={Strings.LAST_UPDATE}
                    data={privacyAndPolicyData}
                />
            )}

        </SafeAreaView>
    )
}

export default SignupScreen

const styles = StyleSheet.create({
    txtContainer: {
        marginTop: verticalScale(12)
    },
    checkBocContainer: {
        marginStart: moderateScale(20),
        flexDirection: "row",
        alignItems: "center"
    },
    dividerContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginHorizontal: moderateScale(20),
    },
    hr: {
        flex: 1,
        height: 1,
        backgroundColor: Colors.GRAY,
    },
    orText: {
        marginHorizontal: moderateScale(10),
        fontSize: scale(14),
        color: Colors.BLACK,
        fontWeight: "500",
        marginTop: verticalScale(-8)
    },

    image: {
        width: "100%",
        height: verticalScale(180)
    },
    logo: {
        width: moderateScale(230),
        height: verticalScale(230),
        marginLeft: moderateScale(-50),
        marginTop: verticalScale(-90)
    },
    loginTxt: {
        fontSize: scale(18),
        fontWeight: "400",
        marginStart: moderateScale(20),
    },
    subs: {
        color: Colors.THEME,
        fontSize: scale(14)
    },
    inputContainer: {
        paddingHorizontal: moderateScale(20)
    },
    btnContainer: {
        paddingHorizontal: moderateScale(20),
    },
    linkContainer: {
        alignSelf: "flex-end",
        marginEnd: moderateScale(30)
    }
})