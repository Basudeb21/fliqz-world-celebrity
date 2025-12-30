import { StyleSheet, Text, View, Animated, Easing } from 'react-native';
import React, { useEffect, useRef } from 'react';
import FastImage from 'react-native-fast-image';
import { Colors, Images, NavigationStrings } from '../../../../../constants';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Spacer } from '../../../../../components/framework/boots';
import { GradientTextButton } from '../../../../../components/framework/button';
import { BackpressTopBar } from '../../../../../components/framework/navbar';

const AnimatedIcon = Animated.createAnimatedComponent(Ionicons);

const OrderSuccessfull = () => {
    const navigation = useNavigation();

    const logoOpacity = useRef(new Animated.Value(0)).current;
    const logoTranslateY = useRef(new Animated.Value(-40)).current;
    const iconScale = useRef(new Animated.Value(0)).current;
    const textOpacity = useRef(new Animated.Value(0)).current;
    const buttonTranslateY = useRef(new Animated.Value(50)).current;
    const buttonOpacity = useRef(new Animated.Value(0)).current;
    const iconColorAnim = useRef(new Animated.Value(0)).current;


    useEffect(() => {
        Animated.sequence([
            Animated.parallel([
                Animated.timing(logoOpacity, {
                    toValue: 1,
                    duration: 600,
                    useNativeDriver: true,
                }),
                Animated.timing(logoTranslateY, {
                    toValue: 0,
                    duration: 600,
                    easing: Easing.out(Easing.ease),
                    useNativeDriver: true,
                }),
            ]),

            Animated.spring(iconScale, {
                toValue: 1,
                friction: 5,
                useNativeDriver: true,
            }),

            Animated.timing(textOpacity, {
                toValue: 1,
                duration: 1700,
                useNativeDriver: true,
            }),

            Animated.parallel([
                Animated.timing(buttonTranslateY, {
                    toValue: 0,
                    duration: 500,
                    useNativeDriver: true,
                }),
                Animated.timing(buttonOpacity, {
                    toValue: 1,
                    duration: 500,
                    useNativeDriver: true,
                }),
            ]),

            Animated.timing(iconColorAnim, {
                toValue: 1,
                duration: 300,
                useNativeDriver: false,
            }),
        ]).start();
    }, []);

    const tickColor = iconColorAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [Colors.THEME, Colors.GREEN],
    });

    const openOrderDetails = () => {
        navigation.navigate(NavigationStrings.PROFILE_STACK, {
            screen: NavigationStrings.PROFILE_ORDER_SCREEN,
        });
    };

    return (
        <SafeAreaView style={styles.areaView}>
            <View style={styles.container}>
                <BackpressTopBar title="Order Status" />

                {/* Logo */}
                <Animated.View
                    style={[
                        styles.logo,
                        {
                            opacity: logoOpacity,
                            transform: [{ translateY: logoTranslateY }],
                        },
                    ]}
                >
                    <FastImage
                        source={Images.WHITE_LOGO}
                        style={{ width: '100%', height: '100%' }}
                        resizeMode={FastImage.resizeMode.contain}
                    />
                </Animated.View>

                {/* Icon + Text */}
                <View style={styles.icon}>
                    <Animated.View style={{ transform: [{ scale: iconScale }] }}>
                        <AnimatedIcon
                            name="checkmark-circle"
                            size={70}
                            color={tickColor}
                        />
                    </Animated.View>

                    <Spacer height={40} />

                    <Animated.View style={{ opacity: textOpacity }}>
                        <Text style={styles.head}>Order Placed Successfully!</Text>
                        <Text style={styles.sub}>
                            Your order’s in good hands. Get ready for something{' '}
                            <Text style={styles.red}>great!</Text>
                        </Text>
                    </Animated.View>
                </View>

                <Animated.View
                    style={[
                        styles.btn,
                        {
                            opacity: buttonOpacity,
                            transform: [{ translateY: buttonTranslateY }],
                        },
                    ]}
                >
                    <GradientTextButton
                        label="Order Details"
                        width="40%"
                        onPress={openOrderDetails}
                    />
                </Animated.View>
            </View>
        </SafeAreaView>
    );
};

export default OrderSuccessfull;

const styles = StyleSheet.create({
    areaView: {
        flex: 1,
        backgroundColor: Colors.THEME,
    },
    container: {
        backgroundColor: Colors.WHITE,
        flex: 1,
    },
    logo: {
        alignSelf: 'center',
        width: moderateScale(200),
        height: verticalScale(400),
        position: 'absolute',
        top: -50,
    },
    icon: {
        alignItems: 'center',
        top: 250,
    },
    head: {
        fontSize: scale(24),
        fontWeight: '400',
        alignSelf: 'center',
    },
    sub: {
        marginTop: verticalScale(10),
        fontSize: scale(18),
        fontWeight: '400',
        textAlign: 'center',
        alignSelf: 'center',
        color: Colors.PLACEHOLDER,
    },
    red: {
        color: Colors.THEME,
    },
    btn: {
        alignItems: 'center',
        marginTop: verticalScale(250),
    },
});
