import {
    ImageBackground,
    KeyboardAvoidingView,
    ScrollView,
    StyleSheet,
    Text,
    ToastAndroid,
    View,
    Platform
} from 'react-native';
import React, { useState } from 'react';
import { Colors, Images, NavigationStrings, Strings } from '../../constants';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import FastImage from 'react-native-fast-image';
import { useNavigation } from '@react-navigation/native';
import GradientTextButton from '../../components/framework/button/GradientTextButton';
import OutLineButton from '../../components/framework/button/OutLineButton';
import Link from '../../components/framework/boots/Link';
import Spacer from '../../components/framework/boots/Spacer';
import PasswordInputBox from '../../components/framework/input/PasswordInputBox';
import TextInputBox from '../../components/framework/input/TextInputBox';
import { SafeAreaView } from 'react-native-safe-area-context';
import LoginApi from '../../api/auth/LoginApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../redux-store/slices/authSlice';

const LoginScreen = () => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const navigation = useNavigation();
    const dispatch = useDispatch();

    const handleLoginPress = () => {
        navigation.navigate(NavigationStrings.SIGNUP_SCREEN);
    };

    const handelLoginUser = async () => {
        if (!userName || !password) {
            ToastAndroid.show("Credentials are not given.", ToastAndroid.SHORT);
            return;
        }

        try {
            const result = await LoginApi(userName, password);
            console.log("Login Response:", result);

            if (result?.data?.success === true) {
                const token = result.headers['token'];

                if (!token) {
                    ToastAndroid.show("Login failed: no token received.", ToastAndroid.SHORT);
                    return;
                }

                const userData = {
                    ...result.data,
                    token,
                };

                await AsyncStorage.setItem('userData', JSON.stringify(userData));

                dispatch(loginSuccess({
                    user: userData,
                    token: token,
                }));

                navigation.reset({
                    index: 0,
                    routes: [{ name: NavigationStrings.MAIN_STACK }],
                });
            } else {
                console.log(result?.data?.message || 'Login failed.');
                ToastAndroid.show(result?.data?.message || 'Login failed.', ToastAndroid.SHORT);
            }
        } catch (error) {
            console.error("Login Error:", error);
            ToastAndroid.show('Login failed. Please try again.', ToastAndroid.SHORT);
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.WHITE }}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                style={{ flex: 1 }}
                enabled
            >
                <ScrollView keyboardShouldPersistTaps="handled">
                    <ImageBackground source={{ uri: Images.LOGIN_IMG }} style={styles.image}>
                        <FastImage
                            source={Images.WHITE_LOGO}
                            style={styles.logo}
                            resizeMode={FastImage.resizeMode.contain}
                        />
                    </ImageBackground>

                    <Text style={styles.loginTxt}>Login</Text>
                    <Spacer height={30} />

                    <View style={styles.inputContainer}>
                        <TextInputBox
                            value={userName}
                            setValue={setUserName}
                            placeholder={Strings.EMAIL_OR_USERNAME}
                        />
                        <Spacer height={20} />
                        <PasswordInputBox
                            value={password}
                            setValue={setPassword}
                            placeholder={Strings.PASSWORD}
                        />
                    </View>

                    <View style={styles.btnContainer}>
                        <Link label={Strings.FORGOT_PASSWORD} />
                        <Spacer height={10} />
                        <GradientTextButton
                            label={Strings.LOGIN}
                            width='100%'
                            onPress={handelLoginUser}
                        />
                        <Spacer height={15} />
                        <OutLineButton
                            label_one={Strings.DONT_HAVE_ACCOUNT}
                            label_two={Strings.SIGNUP}
                            onPress={handleLoginPress}
                        />
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    image: {
        width: "100%",
        height: verticalScale(260),
    },
    logo: {
        width: moderateScale(230),
        height: verticalScale(230),
        marginLeft: moderateScale(-50),
        marginTop: verticalScale(-90),
    },
    loginTxt: {
        fontSize: scale(18),
        fontWeight: "400",
        marginStart: moderateScale(20),
        marginTop: verticalScale(20),
    },
    inputContainer: {
        paddingHorizontal: moderateScale(20),
    },
    btnContainer: {
        paddingHorizontal: moderateScale(20),
        marginTop: verticalScale(50),
    },
});
