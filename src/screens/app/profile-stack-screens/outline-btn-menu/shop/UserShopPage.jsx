import { FlatList, StyleSheet, View, Text, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors, NavigationStrings } from '../../../../../constants'
import { scale, verticalScale } from 'react-native-size-matters'
import { useNavigation, useRoute } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ShopItemCard } from '../../../../../components/framework/card'
import { Spacer } from '../../../../../components/framework/boots'
import { BackpressTopBar } from '../../../../../components/framework/navbar'
import { useSelector } from 'react-redux'
import API from '../../../../../api/common/API'
import { GetUserProductsApi } from '../../../../../api/app/shop'

const UserShopPage = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const token = useSelector(state => state.auth.token);

    const { userId, userName } = route.params;

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const onImagePress = (item) => {
        navigation.navigate(NavigationStrings.HOME_SHOP_ITEM_INFO_PAGE, {
            product: item
        });
    };

    const fetchUserProducts = async () => {
        setLoading(true);
        try {
            const response = await GetUserProductsApi(token, userId);
            console.log("User products response:", response);

            if (response?.status && response?.data?.data) {
                setProducts(response.data.data);
                console.log(` Loaded ${response.data.data.length} products for user ${userId}`);
            } else {
                setProducts([]);
            }
        } catch (error) {
            console.error("Error fetching user products:", error);
            setProducts([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserProducts();
    }, [userId]);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.WHITE }}>
            <BackpressTopBar title={`${userName}'s Shop`} />

            {loading ? (
                <View style={styles.loaderContainer}>
                    <ActivityIndicator size="large" color={Colors.PRIMARY} />
                </View>
            ) : (
                <FlatList
                    ListHeaderComponent={<Spacer height={12} />}
                    data={products}
                    numColumns={2}
                    columnWrapperStyle={styles.columnWrapper}

                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => {
                        const imageUrl = item.file_url
                            ? `${API.STORAGE_URL}${item.file_url}`
                            : null;

                        return (
                            <ShopItemCard
                                image={imageUrl}
                                productName={item.name}
                                desc={item.description}
                                price={`$${item.price}`}
                                onPress={() => onImagePress(item)}
                            />
                        );
                    }}
                    ListEmptyComponent={
                        <View style={styles.emptyContainer}>
                            <Text style={styles.emptyText}>
                                {userName} hasn't added any products yet
                            </Text>
                        </View>
                    }
                    ListFooterComponent={<Spacer height={40} />}
                    contentContainerStyle={styles.scrollContent}
                />
            )}
        </SafeAreaView>
    );
};

export default UserShopPage;

const styles = StyleSheet.create({
    columnWrapper: {
        justifyContent: 'space-between',
        paddingHorizontal: scale(12),
        marginBottom: verticalScale(12),
    },

    scrollContent: {
        flexGrow: 1
    },
    loaderContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    emptyContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: verticalScale(100)
    },
    emptyText: {
        fontSize: scale(16),
        color: Colors.SILVER || '#999',
        textAlign: 'center',
        paddingHorizontal: scale(20)
    }
});