import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { Colors } from '../../../constants'
import { OutlineQuantityInputBox } from '../input'
import { Spacer } from '../boots'
import API from '../../../api/common/API'

const CartProduct = ({ item }) => {
    const product = item.product
    const colorValue = item.attribute?.colors
    const sizeValue = item.attribute?.sizes

    return (
        <View style={styles.productContainer}>
            <Image
                source={{ uri: API.STORAGE_URL + product.file_url }}
                style={styles.image}
            />

            <View style={styles.productInfoContainer}>
                <Text style={styles.productName}>{product.name}</Text>

                <Text style={styles.productDesc} numberOfLines={4}>
                    {product.description}
                </Text>

                <View style={styles.productInfoRow}>
                    <View style={styles.colorSizeRow}>
                        <Text style={styles.label}>Color:</Text>

                        <View
                            style={[
                                styles.colorBox,
                                { backgroundColor: colorValue || Colors.PLACEHOLDER },
                            ]}
                        />

                        <Text style={[styles.label, { marginLeft: scale(12) }]}>
                            Size: {sizeValue}
                        </Text>
                    </View>

                    <Text style={styles.price}>${product.price}</Text>
                </View>

                <Spacer height={6} />

                <OutlineQuantityInputBox
                    width="60%"
                    value={String(item.quantity)}
                />
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
        width: '100%',
    },
    productInfoContainer: {
        flex: 1,
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

    productInfoRow: {
        marginTop: verticalScale(10),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    colorSizeRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    label: {
        fontSize: scale(12),
        color: Colors.BLACK,
    },

    colorBox: {
        width: scale(16),
        height: scale(16),
        borderRadius: scale(4),
        marginLeft: scale(6),
        borderWidth: 1,
        borderColor: Colors.PLACEHOLDER,
    },

    price: {
        fontSize: scale(14),
        fontWeight: '600',
        color: Colors.BLACK,
    },
})
