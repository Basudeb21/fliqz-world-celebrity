import React, { useState, useEffect, useCallback, useRef } from 'react';
import { StyleSheet, View, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { useSelector } from 'react-redux';
import { SubscribersApi, SubscriptionApi } from '../../../api/app/subscription';
import { SimpleTable } from '../../../components/framework/tables';
import { BackpressTopBar } from '../../../components/framework/navbar';
import { Spacer } from '../../../components/framework/boots';
import { Colors } from '../../../constants';

const SubscriptionsTab = ({ subscriptionsData, loading, onRefresh }) => (
    <View style={styles.tabContainer}>
        <SimpleTable
            data={subscriptionsData}
            loading={loading}
            type="subscriptions"
            onRefresh={onRefresh}
        />
    </View>
);

const SubscribersTab = ({ subscribersData, loading, onRefresh }) => (
    <View style={styles.tabContainer}>
        <SimpleTable
            data={subscribersData}
            loading={loading}
            type="subscribers"
            onRefresh={onRefresh}
        />
    </View>
);

const Subscriptions = () => {
    const layout = useWindowDimensions();
    const token = useSelector(state => state.auth.token);

    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'subscriptions', title: 'Subscriptions' },
        { key: 'subscribers', title: 'Subscribers' },
    ]);

    const [subscriptionsData, setSubscriptionsData] = useState([]);
    const [subscribersData, setSubscribersData] = useState([]);
    const [loading, setLoading] = useState({
        subscriptions: false,
        subscribers: false
    });
    const [refreshing, setRefreshing] = useState(false);

    // Use refs to track if data has been fetched
    const hasFetchedSubscriptions = useRef(false);
    const hasFetchedSubscribers = useRef(false);

    const fetchSubscriptions = useCallback(async (isRefreshing = false) => {
        if (!token) {
            console.log("No token available");
            return;
        }

        if (loading.subscriptions && !isRefreshing) return;

        setLoading(prev => ({ ...prev, subscriptions: true }));
        if (isRefreshing) setRefreshing(true);

        try {
            const response = await SubscriptionApi(token);
            console.log("Subscriptions Response:", response);

            if (response?.success === true) {
                setSubscriptionsData(response.data || []);
                if (!isRefreshing) {
                    hasFetchedSubscriptions.current = true;
                }
            } else {
                console.log("Failed to fetch subscriptions:", response?.message);
                setSubscriptionsData([]);
            }
        } catch (error) {
            console.log("Error fetching subscriptions:", error);
            setSubscriptionsData([]);
        } finally {
            setLoading(prev => ({ ...prev, subscriptions: false }));
            if (isRefreshing) setRefreshing(false);
        }
    }, [token]);

    const fetchSubscribers = useCallback(async (isRefreshing = false) => {
        if (!token) {
            console.log("No token available");
            return;
        }

        if (loading.subscribers && !isRefreshing) return;

        setLoading(prev => ({ ...prev, subscribers: true }));
        if (isRefreshing) setRefreshing(true);

        try {
            const response = await SubscribersApi(token);
            console.log("Subscribers Response:", response);

            if (response?.success === true) {
                setSubscribersData(response.data || []);
                if (!isRefreshing) {
                    hasFetchedSubscribers.current = true;
                }
            } else {
                console.log("Failed to fetch subscribers:", response?.message);
                setSubscribersData([]);
            }
        } catch (error) {
            console.log("Error fetching subscribers:", error);
            setSubscribersData([]);
        } finally {
            setLoading(prev => ({ ...prev, subscribers: false }));
            if (isRefreshing) setRefreshing(false);
        }
    }, [token]);

    useEffect(() => {
        if (token && !hasFetchedSubscriptions.current) {
            fetchSubscriptions();
        }
    }, [token, fetchSubscriptions]);

    const handleRefresh = useCallback(() => {
        if (index === 0) {
            fetchSubscriptions(true);
        } else {
            fetchSubscribers(true);
        }
    }, [index, fetchSubscriptions, fetchSubscribers]);

    const handleIndexChange = (newIndex) => {
        setIndex(newIndex);
        if (newIndex === 0 && !hasFetchedSubscriptions.current) {
            fetchSubscriptions();
        } else if (newIndex === 1 && !hasFetchedSubscribers.current) {
            fetchSubscribers();
        }
    };

    const renderScene = ({ route }) => {
        switch (route.key) {
            case 'subscriptions':
                return (
                    <SubscriptionsTab
                        subscriptionsData={subscriptionsData}
                        loading={loading.subscriptions}
                        onRefresh={handleRefresh}
                    />
                );
            case 'subscribers':
                return (
                    <SubscribersTab
                        subscribersData={subscribersData}
                        loading={loading.subscribers}
                        onRefresh={handleRefresh}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <BackpressTopBar title="My Subscriptions" />
            <Spacer height={10} />
            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={handleIndexChange}
                initialLayout={{ width: layout.width }}
                lazy={true}
                renderTabBar={props => (
                    <TabBar
                        {...props}
                        indicatorStyle={{ backgroundColor: Colors.THEME }}
                        style={{ backgroundColor: Colors.WHITE }}
                        labelStyle={{
                            color: Colors.THEME,
                            fontWeight: 'bold',
                            fontSize: 14,
                            textTransform: 'none'
                        }}
                        inactiveColor={Colors.BLACK}
                        activeColor={Colors.THEME}
                        pressColor={Colors.LIGHT_THEME}
                        tabStyle={{ paddingVertical: 8 }}
                    />
                )}
            />
        </SafeAreaView>
    );
};

export default Subscriptions;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.WHITE,
    },
    tabContainer: {
        flex: 1,
        backgroundColor: Colors.WHITE,
    },
});