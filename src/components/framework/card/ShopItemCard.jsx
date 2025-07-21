import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Colors, Images } from '../../../constants'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

const ShopItemCard = ({ image, productName, desc, price, onPress }) => {
    const summery = desc.substring(0, 20);
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={onPress}><Image style={styles.image} source={{ uri: image }} /></TouchableOpacity>
            <Text style={styles.productName}>{productName}</Text>
            <Text style={styles.productSummary}>{summery + "..."}</Text>
            <Text style={styles.productPrice}>{price}</Text>
        </View>
    )
}

export default ShopItemCard

const styles = StyleSheet.create({
    container: {
        minWidth: "43%",
    },
    image: {
        height: verticalScale(200),
        borderRadius: scale(12)
    },
    productName: {
        marginTop: verticalScale(7),
        fontWeight: "500",
        fontSize: scale(17),
        color: Colors.FADE_TEXT
    },
    productSummary: {
        fontWeight: "400",
        fontSize: scale(12),
        color: Colors.SILVER
    },
    productPrice: {

    }
})