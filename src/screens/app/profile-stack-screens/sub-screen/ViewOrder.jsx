import { Image, StyleSheet, Text, View, Dimensions, ScrollView } from 'react-native';
import React from 'react';
import BackpressTopBar from '../../../../components/framework/navbar/BackpressTopBar';
import { Colors, Images } from '../../../../constants';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { SafeAreaView } from 'react-native-safe-area-context';
import Spacer from '../../../../components/framework/boots/Spacer';
import OrderTracker from '../../../../components/framework/progress-bar/order-tracker/OrderTracker';
import GradientTextButton from '../../../../components/framework/button/GradientTextButton';
import ShippingBills from '../../../../components/framework/bills/ShippingBills';
import CartProduct from '../../../../components/framework/cart/CartProduct';

const ViewOrder = () => {
    return (
        <SafeAreaView style={styles.container}>
            <BackpressTopBar title={"Order Details"} />
            <ScrollView>
                <CartProduct />
                <Text style={styles.track}>Track Order</Text>
                <OrderTracker current={3} />
                <Spacer height={20} />
                <View style={styles.btnContainer}>
                    <GradientTextButton width="80%" label='Cancel Orders' fontSize={16} />
                </View>
                <Spacer height={30} />
                <ShippingBills />
                <Spacer height={30} />
            </ScrollView>
        </SafeAreaView>
    );
};

export default ViewOrder;

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.WHITE,
        flex: 1,
    },

    track: {
        marginTop: verticalScale(20),
        marginStart: moderateScale(40),
        fontSize: scale(20),
        fontWeight: "400"
    },
    btnContainer: {
        justifyContent: "center",
        alignItems: "center"
    }
});