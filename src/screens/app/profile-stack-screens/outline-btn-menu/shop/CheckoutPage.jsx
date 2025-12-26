import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors, NavigationStrings } from '../../../../../constants'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { moderateScale, scale } from 'react-native-size-matters'
import { Spacer } from '../../../../../components/framework/boots'
import { GradientTextButton } from '../../../../../components/framework/button'
import { BackpressTopBar } from '../../../../../components/framework/navbar'
import { InputFormContainer } from '../../../../../components/project-components'
import { Checkbox } from '../../../../../components/framework/input'

const CheckoutPage = () => {
    const navigation = useNavigation();
    const handlePlaceOrder = () => {
        navigation.navigate(NavigationStrings.HOME_PLACE_ORDER_SCREEN)
    }
    return (
        <SafeAreaView style={styles.areaView}>
            <View style={styles.container}>
                <BackpressTopBar title={"Checkout"} />
                <ScrollView>
                    <Spacer height={10} />
                    <InputFormContainer head={"Billing Address"} />
                    <Spacer height={5} />

                    <View style={styles.chkBoxView}>
                        <Checkbox />
                        <Text style={styles.txt}>Same as biling address</Text>
                    </View>

                    <InputFormContainer head={"Shipping Address"} />
                    <Spacer height={40} />
                    <View style={styles.btn}>
                        <GradientTextButton
                            width='90%'
                            label='Place Order'
                            onPress={handlePlaceOrder}
                        />
                    </View>
                    <Spacer height={20} />
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

export default CheckoutPage

const styles = StyleSheet.create({
    areaView: {
        flex: 1,
        backgroundColor: Colors.THEME
    },
    container: {
        backgroundColor: Colors.WHITE,
        flex: 1
    },
    btn: {
        alignItems: "center"
    },
    chkBoxView: {
        marginStart: moderateScale(20),
        flexDirection: "row",
        alignItems: "center"
    },
    txt: {
        color: Colors.THEME,
        fontSize: scale(14),
        fontWeight: "500"
    }
})