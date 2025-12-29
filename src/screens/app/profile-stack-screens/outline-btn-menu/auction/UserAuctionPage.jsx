import React, { useEffect, useState } from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    FlatList,
    RefreshControl,
    Text,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Colors, NavigationStrings } from '../../../../../constants';
import { AuctionCard } from '../../../../../components/framework/card';
import { Loader, Spacer } from '../../../../../components/framework/boots';
import { BackpressTopBar } from '../../../../../components/framework/navbar';
import { GetUserAuctionsApi } from '../../../../../api/app/auction';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

const UserAuctionPage = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const token = useSelector(state => state.auth.token);

    const { userId, userName } = route.params;

    const [auctions, setAuctions] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const fetchUserAuctions = async (page = 1, isRefreshing = false) => {
        if (!token || loading) return;

        setLoading(true);
        try {
            console.log(`etching auctions for user ${userId}, page ${page}`);
            const data = await GetUserAuctionsApi(token, userId, page);

            const actualAuctionList = data?.data?.data || [];

            setLastPage(data?.data?.last_page || 1);
            setCurrentPage(data?.data?.current_page || 1);

            if (isRefreshing) {
                setAuctions(actualAuctionList);
            } else {
                setAuctions(prev => {
                    const newItems = actualAuctionList.filter(
                        newItem => !prev.some(existing => existing.id === newItem.id)
                    );
                    return [...prev, ...newItems];
                });
            }

            console.log(`Loaded ${actualAuctionList.length} auctions for ${userName}`);
        } catch (error) {
            console.error('Error fetching user auctions:', error);
            setAuctions([]);
        }
        setLoading(false);
        setRefreshing(false);
    };

    const handleRefresh = () => {
        setRefreshing(true);
        setCurrentPage(1);
        fetchUserAuctions(1, true);
    };

    const handleLoadMore = () => {
        if (!loading && currentPage < lastPage) {
            fetchUserAuctions(currentPage + 1);
        }
    };

    useEffect(() => {
        if (userId && token) {
            fetchUserAuctions(1, true);
        }
    }, [userId]);

    return (
        <SafeAreaView style={styles.areaView}>
            <BackpressTopBar title={`${userName}'s Auctions`} />

            <FlatList
                data={auctions}
                style={styles.container}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    <AuctionCard
                        product={item}
                        onPress={() =>
                            navigation.navigate(NavigationStrings.PROFILE_AUTION_ITEM_SCREEN, {
                                product: item,
                            })
                        }
                    />
                )}
                numColumns={2}
                columnWrapperStyle={styles.row}
                contentContainerStyle={styles.content}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={handleRefresh}
                    />
                }
                onEndReached={handleLoadMore}
                onEndReachedThreshold={0.5}
                ListFooterComponent={loading && !refreshing ? <Loader /> : <Spacer height={20} />}
                ItemSeparatorComponent={<Spacer height={20} />}
                ListEmptyComponent={
                    !loading && (
                        <View style={styles.emptyContainer}>
                            <Spacer height={50} />
                            <Text style={styles.emptyText}>
                                {userName} hasn't created any auctions yet
                            </Text>
                        </View>
                    )
                }
            />
        </SafeAreaView>
    );
};

export default UserAuctionPage;

const styles = StyleSheet.create({
    areaView: {
        flex: 1,
        backgroundColor: Colors.THEME
    },
    container: {
        backgroundColor: Colors.WHITE,
        flex: 1
    },
    content: {
        padding: scale(10),
        paddingBottom: verticalScale(40),
    },
    row: {
        justifyContent: 'space-between',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: moderateScale(20),
    },
    emptyText: {
        fontSize: scale(16),
        color: '#999',
        textAlign: 'center',
    },
});