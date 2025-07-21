import { FlatList, StyleSheet, View } from 'react-native'
import React from 'react'
import BackpressTopBar from '../../../components/framework/navbar/BackpressTopBar'
import { Colors, Images, NavigationStrings } from '../../../constants'
import SearchBar from '../../../components/framework/input/SearchBar'
import ShopItemCard from '../../../components/framework/card/ShopItemCard'
import Spacer from '../../../components/framework/boots/Spacer'
import { scale, verticalScale } from 'react-native-size-matters'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { dummyShopItems } from '../../../data/dummyShopItems'

const ShopPage = () => {

    const navigation = useNavigation();
    const onImagePress = () => {
        navigation.navigate(NavigationStrings.HOME_SHOP_ITEM_INFO_PAGE)
    }
    const shopItems = dummyShopItems;
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.WHITE }}>
            <BackpressTopBar title={"Shop"} />
            <View>
                <FlatList
                    ListHeaderComponent={
                        <>
                            <Spacer height={10} />
                            <SearchBar placeholder={"Search"} />
                        </>
                    }
                    data={shopItems}
                    numColumns={2}
                    columnWrapperStyle={styles.row}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <ShopItemCard
                            image={item.image}
                            productName={item.itemName}
                            desc={item.desc}
                            price={item.price}
                            onPress={onImagePress}
                        />
                    )}
                    ListFooterComponent={<Spacer height={40} />}
                    contentContainerStyle={styles.scrollContent}
                />
            </View>
        </SafeAreaView>
    )
}

export default ShopPage

const styles = StyleSheet.create({
    row: {
        marginBottom: verticalScale(12),
        justifyContent: "center",
        gap: scale(10)
    },
})