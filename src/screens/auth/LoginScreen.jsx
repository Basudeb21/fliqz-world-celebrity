import {
    ImageBackground,
    KeyboardAvoidingView,
    ScrollView,
    StyleSheet,
    Text,
    ToastAndroid,
    View,
    Platform,
    StatusBar
} from 'react-native';
import React, { useState } from 'react';
import { Colors, Images, NavigationStrings, Strings } from '../../constants';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import FastImage from 'react-native-fast-image';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../redux-store/slices/authSlice';
import { GradientTextButton, OutLineButton } from '../../components/framework/button';
import { Link, Spacer } from '../../components/framework/boots';
import { PasswordInputBox, TextInputBox } from '../../components/framework/input';
import { LoginApi } from '../../api/auth';

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
        <SafeAreaView style={styles.areaView}>
            <StatusBar barStyle={'light-content'} />
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                style={styles.container}
                enabled
            >
                <ScrollView keyboardShouldPersistTaps="handled">
                    <ImageBackground source={{ uri: Images.LOGIN_IMG }} style={styles.image}>
                        <FastImage
                            source={Images.TRANSPARENT_LOGO}
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
    areaView: {
        flex: 1,
        backgroundColor: Colors.THEME
    },
    container: {
        backgroundColor: Colors.WHITE,
        flex: 1
    },
    image: {
        width: "100%",
        height: verticalScale(260),
    },
    logo: {
        width: moderateScale(120),
        height: verticalScale(120),
        marginLeft: moderateScale(10),
        marginTop: verticalScale(-30)
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
