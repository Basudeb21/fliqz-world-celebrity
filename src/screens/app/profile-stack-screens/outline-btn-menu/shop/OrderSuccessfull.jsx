import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import FastImage from 'react-native-fast-image';
import { Colors, Images, NavigationStrings } from '../../../../../constants';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Spacer } from '../../../../../components/framework/boots';
import { GradientTextButton } from '../../../../../components/framework/button';
import { BackpressTopBar } from '../../../../../components/framework/navbar';

const OrderSuccessfull = () => {
    const navigation = useNavigation();
    const openOrderDetails = () => {
        navigation.navigate(NavigationStrings.PROFILE_STACK)
    }
    return (
        <SafeAreaView style={styles.areaView}>
            <View style={styles.container}>
                <BackpressTopBar title={"Order Status"} />
                <FastImage
                    source={Images.WHITE_LOGO}
                    style={styles.logo}
                    resizeMode={FastImage.resizeMode.contain}
                />
                <View style={styles.icon}>
                    <Ionicons
                        color={Colors.THEME}
                        size={70}
                        name={"checkmark-circle"}
                    />
                    <Spacer height={40} />
                    <Text style={styles.head}>Order Placed Successfully!</Text>
                    <Text style={styles.sub}>
                        Your order’s in good hands. Get ready for something <Text style={styles.red}>great!</Text>
                    </Text>
                </View>
                <View style={styles.btn}>
                    <GradientTextButton label='Order Details' width='40%' onPress={openOrderDetails} />
                </View>
            </View>
        </SafeAreaView>
    )
}

export default OrderSuccessfull

const styles = StyleSheet.create({
    areaView: {
        flex: 1,
        backgroundColor: Colors.THEME
    },
    container: {
        backgroundColor: Colors.WHITE,
        flex: 1
    },
    logo: {
        alignSelf: "center",
        width: moderateScale(600),
        height: verticalScale(400),
        position: "absolute",
        top: -50
    },
    icon: {
        alignItems: "center",
        top: 180
    },
    head: {
        fontSize: scale(24),
        fontWeight: "400"
    },
    sub: {
        marginTop: verticalScale(10),
        fontSize: scale(18),
        fontWeight: "400",
        textAlign: "center",
        color: Colors.PLACEHOLDER
    },
    red: {
        color: Colors.THEME
    },
    btn: {
        alignItems: "center",
        marginTop: verticalScale(250)
    }
})