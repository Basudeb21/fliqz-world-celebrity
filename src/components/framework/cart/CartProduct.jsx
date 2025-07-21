import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import OutlineQuantityInputBox from '../input/OutlineQuantityInputBox'
import { Colors, Images } from '../../../constants'
import Spacer from '../boots/Spacer'
const CartProduct = () => {
    return (
        <View style={styles.productContainer}>
            <Image source={{ uri: Images.PRODUCT_ONE }} style={styles.image} />
            <View style={styles.productInfoContainer}>
                <Text style={styles.productName}>PUMA</Text>
                <Text style={styles.productDesc} numberOfLines={4}>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est, voluptas!
                </Text>
                <View style={styles.productInfo}>
                    <Text>Color: Black, Size: 8</Text>
                    <Text>$80</Text>
                </View>
                <Spacer height={5} />
                <OutlineQuantityInputBox width={"60%"} />
            </View>
        </View>
    )
}

export default CartProduct

const styles = StyleSheet.create({
    image: {
        width: moderateScale(100),
        height: verticalScale(140),
        borderRadius: scale(10),
    },
    productContainer: {
        paddingHorizontal: moderateScale(20),
        marginTop: verticalScale(10),
        flexDirection: 'row',
        alignItems: 'flex-start',
        width: '100%',
    },
    productInfoContainer: {
        flex: 1,
        flexShrink: 1,
        marginStart: moderateScale(12),
    },
    productName: {
        fontSize: scale(18),
        fontWeight: '500',
        color: Colors.BLACK,
        marginBottom: verticalScale(4),
    },
    productDesc: {
        fontSize: scale(12),
        color: Colors.PLACEHOLDER,
    },
    productInfo: {
        marginTop: verticalScale(10)
    },
})