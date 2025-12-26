import React, { useEffect, useState } from 'react';
import {
    View,
    StyleSheet,
    FlatList,
    RefreshControl,
    Text,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { Colors, Images, NavigationStrings } from '../../../../../constants';
import { EventCard } from '../../../../../components/framework/card';
import { Loader, Spacer } from '../../../../../components/framework/boots';
import { BackpressTopBar } from '../../../../../components/framework/navbar';
import GetUserEventsApi from '../../../../../api/app/event-api/GetUserEventsApi';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

const UserEventsPage = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const token = useSelector(state => state.auth.token);

    const { userId, userName } = route.params;

    const [events, setEvents] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const fetchUserEvents = async (page = 1, isRefreshing = false) => {
        if (!token || loading) return;

        setLoading(true);

        try {
            const res = await GetUserEventsApi(token, userId, page);

            const eventList = res?.data || [];

            setCurrentPage(1);
            setLastPage(1);

            if (isRefreshing) {
                setEvents(eventList);
            } else {
                setEvents(prev => {
                    const newItems = eventList.filter(
                        e => !prev.some(p => p.id === e.id)
                    );
                    return [...prev, ...newItems];
                });
            }
        } catch (err) {
            console.error("Error fetching user events:", err);
            setEvents([]);
        }

        setLoading(false);
        setRefreshing(false);
    };


    const handleRefresh = () => {
        setRefreshing(true);
        setCurrentPage(1);
        fetchUserEvents(1, true);
    };

    const handleLoadMore = () => {
        if (!loading && currentPage < lastPage) {
            fetchUserEvents(currentPage + 1);
        }
    };

    useEffect(() => {
        if (userId && token) {
            fetchUserEvents(1, true);
        }
    }, [userId]);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.WHITE }}>
            <BackpressTopBar title={`${userName}'s Events`} />

            <FlatList
                data={events}
                keyExtractor={item => item.id.toString()}
                numColumns={2}
                columnWrapperStyle={styles.row}
                contentContainerStyle={styles.content}
                renderItem={({ item }) => (
                    <EventCard
                        image={Images.EVENT_ONE}
                        eventName={item.title}
                        date={new Date(item.start_time).toLocaleString()}
                        eventOrg={item.description}
                        onPress={() =>
                            navigation.navigate(
                                NavigationStrings.PROFILE_EVENT_DETAILS,
                                { event: item }
                            )
                        }
                    />
                )}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={handleRefresh}
                        colors={[Colors.THEME]}
                    />
                }
                onEndReached={handleLoadMore}
                onEndReachedThreshold={0.5}
                ListFooterComponent={
                    loading && !refreshing ? <Loader /> : <Spacer height={20} />
                }
                ListEmptyComponent={
                    !loading && (
                        <View style={styles.emptyContainer}>
                            <Spacer height={40} />
                            <Text style={styles.emptyText}>
                                {userName} hasn't created any events yet
                            </Text>
                        </View>
                    )
                }
            />
        </SafeAreaView>
    );
};

export default UserEventsPage;

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
        marginBottom: scale(5)
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

