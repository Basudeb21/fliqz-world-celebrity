import { StyleSheet, FlatList, View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { Colors, NavigationStrings } from '../../../../../constants';
import API from '../../../../../api/common/API';
import { FloatingActionButton } from '../../../../../components/framework/button';
import { ShopItemCard } from '../../../../../components/framework/card';
import { BackpressTopBar } from '../../../../../components/framework/navbar';
import { Loader } from '../../../../../components/framework/boots';
import { ProductListsApi } from '../../../../../api/app/shop';
import { SafeAreaView } from 'react-native-safe-area-context';
import { verticalScale } from 'react-native-size-matters';

const ShopScreen = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const token = useSelector(state => state.auth.token);
    const navigation = useNavigation();

    const onPressShopItem = (item) => {
        navigation.navigate(
            NavigationStrings.HOME_SHOP_ITEM_INFO_PAGE,
            { product: item }
        );
    };

    const onPressAddNewProduct = () => {
        navigation.navigate(NavigationStrings.PROFILE_ADD_NEW_PRODUCT);
    };

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);


            const response = await ProductListsApi(token);

            if (response?.status && response?.data?.data) {
                setProducts(response.data.data);
                console.log("Products loaded:", response.data.data.length);
            } else {
                setProducts([]);
                console.log("No products found");
            }

            setLoading(false);
        };

        fetchProducts();
    }, [token]);

    const renderItem = ({ item }) => {
        const imageUrl =
            item.thumbnail_url && Array.isArray(item.thumbnail_url) && item.thumbnail_url.length > 0
                ? `${API.STORAGE_URL}${item.thumbnail_url[0]}`
                : null;

        console.log("Rendering item:", item.name, "Image:", imageUrl);

        return (
            <ShopItemCard
                image={API.STORAGE_URL + item.file_url}
                productName={item.name}
                desc={item.description}
                price={`₹${item.price}`}
                onPress={() => onPressShopItem(item)}
            />
        );
    };

    return (
        <SafeAreaView style={styles.areaView}>
            <BackpressTopBar title={"Shop"} />
            <View style={styles.container}>
                {loading ? (
                    <Loader />
                ) : (
                    <FlatList
                        data={products}
                        renderItem={renderItem}
                        keyExtractor={item => item.id.toString()}
                        numColumns={2}
                        columnWrapperStyle={styles.row}
                        contentContainerStyle={styles.listContent}
                        ListEmptyComponent={
                            <View style={styles.emptyContainer}>
                                <Text style={styles.emptyText}>No products available</Text>
                            </View>
                        }
                    />
                )}

                <FloatingActionButton
                    onPress={onPressAddNewProduct}
                    style={styles.fabBtm}
                />
            </View>
        </SafeAreaView>
    );
};

export default ShopScreen;

const styles = StyleSheet.create({
    areaView: {
        flex: 1,
        backgroundColor: Colors.THEME
    },
    container: {
        backgroundColor: Colors.WHITE,
        flex: 1
    },
    row: {
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        marginBottom: 15,
    },
    listContent: {
        paddingTop: 10,
        paddingBottom: 20,
    },
    fabBtm: {
        bottom: verticalScale(70),
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: verticalScale(100)
    },
    emptyText: {
        fontSize: 16,
        color: Colors.SILVER
    }
});