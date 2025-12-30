import { StyleSheet, View } from 'react-native'
import React from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { moderateScale } from 'react-native-size-matters';
import { CartProduct } from '../framework/cart';
import { GradientIconButton } from '../framework/button';
import { Spacer } from '../framework/boots';

const CartItem = ({ item }) => {
    return (
        <View>
            <CartProduct item={item} />
            <Spacer height={30} />
            <View style={styles.btnRow}>
                <GradientIconButton
                    Icon={MaterialIcons}
                    label={"Remove"}
                    iconName={"delete"}
                    iconSize={20}
                    width='45%'
                    fontSize={14}
                />
            </View>
        </View>
    );
};

export default CartItem;

const styles = StyleSheet.create({
    btnRow: {
        flexDirection: "row",
        paddingStart: moderateScale(20)
    }
});
