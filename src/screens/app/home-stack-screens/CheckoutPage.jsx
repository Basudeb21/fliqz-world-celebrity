import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import BackpressTopBar from '../../../components/framework/navbar/BackpressTopBar'
import InputFormContainer from '../../../components/project-components/InputFormContainer'
import Spacer from '../../../components/framework/boots/Spacer'
import GradientTextButton from '../../../components/framework/button/GradientTextButton'
import { Colors, NavigationStrings } from '../../../constants'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Checkbox from '../../../components/framework/input/CheckBox'
import { moderateScale, scale } from 'react-native-size-matters'

const CheckoutPage = () => {
    const navigation = useNavigation();
    const handlePlaceOrder = () => {
        navigation.navigate(NavigationStrings.HOME_PLACE_ORDER_SCREEN)
    }
    return (
        <SafeAreaView style={{ backgroundColor: Colors.WHITE, flex: 1 }}>
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
        </SafeAreaView>
    )
}

export default CheckoutPage

const styles = StyleSheet.create({
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