import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Colors, Images } from '../../../constants'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'

const ShopItemCard = ({ image, productName, desc, price, onPress }) => {
    const summary = desc ? desc.substring(0, 20) : ""



    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
                <Image
                    style={styles.image}
                    source={{ uri: image == null ? Images.BANNER_IMG : image }}
                    resizeMode="cover"
                />
            </TouchableOpacity>

            <View style={styles.textArea}>
                <Text style={styles.productName} numberOfLines={1}>
                    {productName}
                </Text>

                <Text style={styles.productSummary} numberOfLines={2}>
                    {summary}{summary.length >= 20 ? "..." : ""}
                </Text>

                <Text style={styles.productPrice}>{price}</Text>
            </View>
        </View>
    )
}

export default ShopItemCard

const styles = StyleSheet.create({
    container: {
        width: "47%",
        borderWidth: scale(2),
        borderRadius: scale(14),
        borderColor: Colors.THEME
    },
    image: {
        width: "100%",
        height: verticalScale(200),
        borderRadius: scale(12),
        backgroundColor: Colors.WHITE
    },
    placeholderImage: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.PLACEHOLDER
    },
    placeholderText: {
        color: Colors.PLACEHOLDER,
        fontSize: scale(12)
    },
    productName: {
        marginTop: verticalScale(7),
        fontWeight: "500",
        fontSize: scale(12),
        color: Colors.WHITE
    },
    productSummary: {
        fontWeight: "400",
        fontSize: scale(12),
        color: Colors.PLACEHOLDER,
        marginTop: verticalScale(3)
    },
    productPrice: {
        fontWeight: "600",
        fontSize: scale(12),
        color: Colors.WHITE,
        marginTop: verticalScale(5)
    },
    textArea: {
        flex: 1,
        width: "100%",
        position: "absolute",
        bottom: scale(0),
        backgroundColor: Colors.TRANSPARENT_BLACK_DARK,
        paddingHorizontal: moderateScale(10),
        borderBottomRightRadius: scale(10),
        borderBottomLeftRadius: scale(12),
        paddingBottom: verticalScale(5)
    }
})