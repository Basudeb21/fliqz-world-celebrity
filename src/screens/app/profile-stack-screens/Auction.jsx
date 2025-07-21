import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { auctionProducts } from '../../../data/auctionProducts'
import AuctionCard from '../../../components/framework/card/AuctionCard';
import BackpressTopBar from '../../../components/framework/navbar/BackpressTopBar';
import Spacer from '../../../components/framework/boots/Spacer';
import { SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { useNavigation } from '@react-navigation/native';
import { NavigationStrings } from '../../../constants';

const Auction = () => {

    const navigation = useNavigation();
    const openProductItem = (product) => {
        navigation.navigate(NavigationStrings.PROFILE_AUTION_ITEM_SCREEN,
            { product }
        )

    }
    return (
        <SafeAreaView>
            <BackpressTopBar title={"Auction"} />
            <FlatList
                data={auctionProducts}
                numColumns={2}
                columnWrapperStyle={styles.wrapper}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <AuctionCard
                        product={item}
                        onPress={() => openProductItem(item)}
                    />
                )}
                ListFooterComponent={<Spacer height={50} />}
                contentContainerStyle={styles.scrollContent}
            />
        </SafeAreaView>
    )
}

export default Auction

const styles = StyleSheet.create({
    scrollContent: {
        marginTop: verticalScale(10),
        marginHorizontal: moderateScale(10),
        gap: scale(15)
    },
    wrapper: {
        justifyContent: 'space-between',
    }
})