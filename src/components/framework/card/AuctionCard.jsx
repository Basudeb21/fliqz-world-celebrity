import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Colors, Images } from '../../../constants'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'

const AuctionCard = ({ product, onPress }) => {
    return (
        <TouchableOpacity style={styles.card} onPress={onPress}>
            <Image style={styles.image} source={{ uri: product.productImage }} />
            <View style={styles.content}>
                <Text style={styles.productName}>{product.productName}</Text>
                <Text style={styles.productDescription}>{product.content}</Text>
                <View style={styles.row}>
                    <View>
                        <Text style={styles.bidTxt}>Min Bid</Text>
                        <Text style={styles.minBidAmmount}>{product.minBid}</Text>
                    </View>
                    <View>
                        <Text style={styles.bidTxt}>Currrent Bid</Text>
                        <Text style={styles.currentBidAmmount}>{product.currentBid}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default AuctionCard

const styles = StyleSheet.create({
    card: {
        backgroundColor: Colors.WHITE,
        width: "48%",
        borderRadius: scale(12),
        elevation: scale(10)
    },
    image: {
        width: "100%",
        alignSelf: "center",
        height: verticalScale(130),
        borderTopLeftRadius: scale(12),
        borderTopRightRadius: scale(12)
    },
    productName: {
        fontSize: scale(16),
        fontWeight: "500",
        color: Colors.PLACEHOLDER
    },
    content: {
        padding: scale(10)
    },
    productDescription: {
        fontSize: scale(12),
        fontWeight: "300",
        color: Colors.PLACEHOLDER
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: verticalScale(6)
    },
    bidTxt: {
        fontWeight: "600",
        fontSize: scale(12)
    },
    minBidAmmount: {
        fontSize: scale(12),
        color: Colors.PRIORITY_LOW
    },
    currentBidAmmount: {
        fontSize: scale(12),
        color: Colors.PRIORITY_MIDIUM
    }
})