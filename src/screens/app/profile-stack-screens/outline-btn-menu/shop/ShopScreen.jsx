import { StyleSheet, FlatList, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { Colors, NavigationStrings } from '../../../../../constants';
import API from '../../../../../api/common/API';
import { FloatingActionButton } from '../../../../../components/framework/button';
import { ShopItemCard } from '../../../../../components/framework/card';
import { BackpressTopBar } from '../../../../../components/framework/navbar';
import { Loader } from '../../../../../components/framework/boots';
import { MyProductListsApi } from '../../../../../api/app/shop';
import { SafeAreaView } from 'react-native-safe-area-context';
import { verticalScale } from 'react-native-size-matters';
const ShopScreen = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const token = useSelector(state => state.auth.token);
    const navigation = useNavigation();
    const onPressShopItem = (item) => {
        navigation.navigate(NavigationStrings.HOME_SHOP_ITEM_INFO_PAGE, { product: item });
    };

    const onPressAddNewProduct = () => {
        navigation.navigate(NavigationStrings.PROFILE_ADD_NEW_PRODUCT);
    }


    useEffect(() => {
        const fetchProducts = async () => {
            const response = await MyProductListsApi(token);
            if (response?.status && Array.isArray(response?.data)) {
                setProducts(response.data);
            }
            setLoading(false);
        };
        fetchProducts();
    }, [token]);

    const renderItem = ({ item }) => (
        <ShopItemCard
            image={`${API.STORAGE_URL}${item?.file_url}`}
            productName={item?.name}
            desc={item?.description}
            price={`$${item?.price}`}
            onPress={() => onPressShopItem(item)}
        />
    );

    return (
        <SafeAreaView style={styles.container}>
            <BackpressTopBar title={"Shop"} />
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
                />
            )}
            <FloatingActionButton onPress={onPressAddNewProduct} style={styles.fabBtm} />
        </SafeAreaView>
    );
};

export default ShopScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.WHITE,
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
    loader: {
        flex: 1,
        justifyContent: 'center',
    },
    fabBtm: {
        bottom: verticalScale(70)
    }
});
