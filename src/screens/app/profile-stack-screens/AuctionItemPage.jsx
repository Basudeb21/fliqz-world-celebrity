import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import BackpressTopBar from '../../../components/framework/navbar/BackpressTopBar';
import { Colors, NavigationStrings } from '../../../constants';
import AmmountInput from '../../../components/framework/input/AmmountInput';
import Spacer from '../../../components/framework/boots/Spacer';
import GradientTextButton from '../../../components/framework/button/GradientTextButton';
import OutLineButton from '../../../components/framework/button/OutLineButton';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

const AuctionItemPage = ({ route }) => {
    const { product } = route.params;
    const navigation = useNavigation();
    const openAllBids = () => {
        navigation.navigate(NavigationStrings.PROFILE_ALL_BIDS);
    }

    return (
        <SafeAreaView style={{ backgroundColor: Colors.WHITE, flex: 1 }}>
            <BackpressTopBar title={"Product Item"} />
            <View style={styles.row}>
                <Image style={styles.image} source={{ uri: product.productImage }} />
                <View style={styles.container}>
                    <Text style={styles.productName}>{product.productName}</Text>
                    <Text style={styles.desc}>{product.content}</Text>
                    <Text style={styles.data}>Starting Bid: {"\n" + product.minBid}</Text>
                    <Text style={styles.data}>Current Bid: {"\n" + product.currentBid}</Text>
                    <Text style={styles.data}>Auction Start: {"\n" + product.auctionStart}</Text>
                    <Text style={styles.data}>Auction End: {"\n" + product.auctionEnd}</Text>
                    <Spacer height={10} />
                    <Text>Enter Bid Ammount</Text>
                    <Spacer height={5} />
                    <AmmountInput />
                </View>

            </View>
            <Spacer height={20} />
            <View style={styles.btnGrp}>
                <OutLineButton label_two={'View All Bids'} onPress={openAllBids} />
                <GradientTextButton label='Place Bid' />
            </View>
        </SafeAreaView>
    )
}

export default AuctionItemPage

const styles = StyleSheet.create({
    container: {
        width: "50%"
    },
    row: {
        flexDirection: "row",
        marginHorizontal: moderateScale(20),
        marginTop: verticalScale(20),
        gap: scale(10)
    },
    image: {
        width: "50%",
        height: verticalScale(220),
        borderRadius: scale(12)
    },
    productName: {
        fontSize: scale(18),
        fontWeight: "500",
        color: Colors.PLACEHOLDER
    },
    desc: {
        fontSize: scale(12),
        fontWeight: "400",
        marginBottom: verticalScale(10)
    },
    data: {
        fontSize: scale(12),
        fontWeight: "600",
    },
    btnGrp: {
        marginHorizontal: moderateScale(20),
        gap: scale(10)
    }
})