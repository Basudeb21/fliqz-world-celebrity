import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React from 'react';
import { Colors } from '../../../../../constants';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Spacer } from '../../../../../components/framework/boots';
import { GradientTextButton } from '../../../../../components/framework/button';
import { ShippingBills } from '../../../../../components/framework/bills';
import { CartProduct } from '../../../../../components/framework/cart';
import { BackpressTopBar } from '../../../../../components/framework/navbar';
import { OrderTracker } from '../../../../../components/framework/progress-bar';

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