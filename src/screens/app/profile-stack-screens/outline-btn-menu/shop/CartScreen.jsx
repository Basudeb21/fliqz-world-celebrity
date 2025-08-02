import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors, NavigationStrings } from '../../../../../constants'
import { SafeAreaView } from 'react-native-safe-area-context'
import Fontisto from 'react-native-vector-icons/Fontisto';
import { useNavigation } from '@react-navigation/native'
import { verticalScale } from 'react-native-size-matters'
import { Spacer } from '../../../../../components/framework/boots'
import { ProductSummary } from '../../../../../components/framework/cart'
import { GradientIconButton } from '../../../../../components/framework/button'
import { CartItem } from '../../../../../components/project-components'
import { BackpressTopBar } from '../../../../../components/framework/navbar';

const CartScreen = () => {
    const navigation = useNavigation();
    const onPressCheckout = () => {
        navigation.navigate(NavigationStrings.HOME_CART_CHECKOUT_SCREEN)
    }
    return (
        <SafeAreaView style={styles.container}>
            <BackpressTopBar title={"Cart"} />
            <ScrollView>
                <Spacer height={10} />
                <CartItem />
                <Spacer height={40} />
                <CartItem />
                <Spacer height={20} />
                <ProductSummary />
                <View style={styles.btnRow}>
                    <GradientIconButton
                        Icon={Fontisto}
                        label={"Checkout"}
                        iconName={"mastercard"}
                        iconSize={14}
                        width='90%'
                        fontSize={14}
                        onPress={onPressCheckout}
                    />
                </View>
                <Spacer height={80} />

            </ScrollView>
        </SafeAreaView>
    )
}

export default CartScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.WHITE
    },
    btnRow: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        marginTop: verticalScale(15),
    }
})