import React, { useEffect, useState } from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    FlatList,
    RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { Colors, NavigationStrings } from '../../../../../constants';
import { AuctionCard } from '../../../../../components/framework/card';
import { Loader, Spacer } from '../../../../../components/framework/boots';
import { FloatingActionButton } from '../../../../../components/framework/button';
import { AuctionListApi, MyAuctionListApi } from '../../../../../api/app/auction';
import { BackpressTopBar } from '../../../../../components/framework/navbar';

const SCREEN_WIDTH = Dimensions.get('window').width;

const AuctionTab = ({ type }) => {
    const token = useSelector(state => state.auth.token);
    const navigation = useNavigation();
    const [auctions, setAuctions] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);



    const fetchAuctionItems = async (page = 1, isRefreshing = false) => {
        if (!token || loading) return;
        setLoading(true);
        try {
            const apiCall = type === 'my' ? MyAuctionListApi : AuctionListApi;
            const data = await apiCall(token, page);

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
        } catch (error) {
            console.error('Error fetching auction items:', error);
        }
        setLoading(false);
        setRefreshing(false);
    };
    const handleRefresh = () => {
        setRefreshing(true);
        setCurrentPage(1);
        fetchAuctionItems(1, true);
    };

    const handleLoadMore = () => {
        if (!loading && currentPage < lastPage) {
            fetchAuctionItems(currentPage + 1);
        }
    };
    useEffect(() => {
        fetchAuctionItems(1, true);
    }, [type]);

    return (
        <FlatList
            data={auctions}
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
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.5}
            ListFooterComponent={loading ? <Loader /> : null}
            ItemSeparatorComponent={<Spacer height={20} />}
        />
    );
};

const AllAuctions = () => {
    return (
        <View style={styles.scene}>
            <AuctionTab type="all" />
        </View>
    );
}

const MyAuctions = () => {
    const navigation = useNavigation();
    const onPressAddNewAuction = () => {
        navigation.navigate(NavigationStrings.PROFILE_ADD_NEW_AUCTION);
    }
    return (
        <View style={styles.scene}>
            <AuctionTab type="my" />
            <FloatingActionButton onPress={onPressAddNewAuction} />
        </View>
    );
}

const Auction = () => {
    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'all', title: 'All Auctions' },
        { key: 'my', title: 'My Auctions' },
    ]);

    const renderScene = SceneMap({
        all: AllAuctions,
        my: MyAuctions,
    });

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.WHITE }}>
            <BackpressTopBar title="Auctions" />
            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={{ width: SCREEN_WIDTH }}
                renderTabBar={props => (
                    <TabBar
                        {...props}
                        indicatorStyle={{ backgroundColor: Colors.THEME }}
                        style={{ backgroundColor: Colors.WHITE }}
                        labelStyle={{ color: Colors.BLACK, fontWeight: '600' }}
                        activeColor={Colors.THEME}
                        inactiveColor={Colors.PLACEHOLDER}
                    />
                )}
            />
        </SafeAreaView>
    );
};

export default Auction;

const styles = StyleSheet.create({
    areaView: {
        flex: 1,
        backgroundColor: Colors.THEME
    },
    container: {
        backgroundColor: Colors.WHITE,
        flex: 1
    },
    scene: {
        flex: 1,
    },
    content: {
        padding: 10,
        paddingBottom: 40,
    },
    row: {
        justifyContent: 'space-between',
    },
});
