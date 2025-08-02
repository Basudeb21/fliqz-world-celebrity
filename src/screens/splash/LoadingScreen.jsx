import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { Colors, Images, NavigationStrings, Strings } from '../../constants';
import FastImage from 'react-native-fast-image';
import { useNavigation } from '@react-navigation/native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../redux-store/slices/authSlice';
import { LoadingBar } from '../../components/framework/boots';

const LoadingScreen = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    useEffect(() => {
        const checkLogin = async () => {
            try {
                const userData = await AsyncStorage.getItem('userData');
                const parsed = userData ? JSON.parse(userData) : null;


                if (parsed?.token) {

                    dispatch(loginSuccess({
                        user: parsed.data,
                        token: parsed.token,
                    }));

                    navigation.reset({
                        index: 0,
                        routes: [{ name: NavigationStrings.MAIN_STACK }],
                    });
                } else {
                    navigation.reset({
                        index: 0,
                        routes: [{ name: NavigationStrings.AUTH_STACK }],
                    });
                }
            } catch (error) {
                console.log('Error reading login info:', error);
                navigation.reset({
                    index: 0,
                    routes: [{ name: NavigationStrings.AUTH_STACK }],
                });
            }
        };

        const timer = setTimeout(() => {
            checkLogin();
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <SafeAreaView style={styles.screen}>
            <FastImage
                source={Images.BLACK_LOGO}
                style={styles.logo}
                resizeMode={FastImage.resizeMode.contain}
            />
            <View style={styles.loadingContainer}>
                <LoadingBar />
                <Text style={styles.loadingTxt}>{Strings.LOADING}</Text>
            </View>
        </SafeAreaView>
    );
};

export default LoadingScreen;

const styles = StyleSheet.create({
    screen: {
        backgroundColor: Colors.BLACK,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        width: moderateScale(300),
        height: verticalScale(169),
    },
    loadingContainer: {
        position: 'absolute',
        bottom: 60,
    },
    loadingTxt: {
        color: Colors.WHITE,
        alignSelf: 'center',
        fontSize: scale(17),
        fontWeight: '800',
        position: 'absolute',
        top: 20,
        fontFamily: 'DMSans-Regular',
    },
});
