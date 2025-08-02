import {
    FlatList,
    StyleSheet,
    View,
    ActivityIndicator,
    RefreshControl,
} from 'react-native';
import React, { useEffect, useState, useMemo } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Colors, NavigationStrings, Images } from '../../../../../constants';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { useSelector } from 'react-redux';
import { Spacer } from '../../../../../components/framework/boots';
import { EventCard } from '../../../../../components/framework/card';
import { FloatingActionButton } from '../../../../../components/framework/button';
import { SearchBar } from '../../../../../components/framework/input';
import { GetAllEventsApi } from '../../../../../api/app/event-api';

const MyEventsLists = () => {
    const navigation = useNavigation();
    const token = useSelector((state) => state.auth?.token);
    const user = useSelector((state) => state.auth?.user);

    const [userEvents, setUserEvents] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const eventImages = [
        Images.EVENT_ONE,
        Images.EVENT_TWO,
        Images.EVENT_THREE,
        Images.EVENT_FOUR,
        Images.EVENT_FIVE,
        Images.EVENT_SIX,
        Images.EVENT_SEVEN,
        Images.EVENT_EIGHT,
        Images.EVENT_NINE,
        Images.EVENT_TEN,
    ];

    const fetchUserEvents = async (page = 1, isRefreshing = false) => {
        if (!token || !user?.id || loading) return;

        setLoading(true);
        try {
            const data = await GetAllEventsApi(token, page);
            if (data) {
                setLastPage(data.last_page);
                setCurrentPage(data.current_page);

                const filtered = data.data.filter(
                    (event) => event.creator_id === user.id
                );

                if (isRefreshing) {
                    setUserEvents(filtered);
                } else {
                    setUserEvents((prev) => {
                        const newItems = filtered.filter(
                            (newItem) => !prev.some((e) => e.id === newItem.id)
                        );
                        return [...prev, ...newItems];
                    });
                }
            }
        } catch (error) {
            console.log('Error fetching user events:', error);
        }

        setLoading(false);
        setRefreshing(false);
    };

    useEffect(() => {
        fetchUserEvents();
    }, [token, user]);

    const handleLoadMore = () => {
        if (currentPage < lastPage && !loading) {
            fetchUserEvents(currentPage + 1);
        }
    };

    const handleRefresh = () => {
        setRefreshing(true);
        setUserEvents([]);
        fetchUserEvents(1, true);
    };

    const onImagePress = ({ event }) => {
        navigation.navigate(NavigationStrings.PROFILE_EVENT_DETAILS,
            { event }
        );
    };

    const onPressAddNewEvent = () => {
        navigation.navigate(NavigationStrings.PROFILE_ADD_NEW_EVENT);
    };

    const renderFooter = () => {
        if (!loading || currentPage === lastPage) return null;
        return (
            <View style={{ padding: 10 }}>
                <ActivityIndicator size="small" color="#888" />
            </View>
        );
    };

    const filteredEvents = useMemo(() => {
        if (!searchQuery.trim()) return userEvents;
        return userEvents.filter((event) =>
            event.title?.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [searchQuery, userEvents]);

    return (
        <View style={styles.container}>
            <FlatList
                ListHeaderComponent={
                    <>
                        <Spacer height={10} />
                        <SearchBar
                            placeholder="Search"
                            value={searchQuery}
                            setValue={setSearchQuery}
                        />
                        <Spacer height={10} />
                    </>
                }
                data={filteredEvents}
                numColumns={2}
                columnWrapperStyle={styles.columnWrapper}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item, index }) => (
                    <EventCard
                        image={item.image || eventImages[index % eventImages.length]}
                        eventName={item.title}
                        date={new Date(item.start_time).toLocaleString('en-IN', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                            hour: 'numeric',
                            minute: '2-digit',
                            hour12: true,
                        })}
                        eventOrg={item.description}
                        onPress={() => onImagePress({ event: item })}
                    />
                )}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
                onEndReached={handleLoadMore}
                onEndReachedThreshold={0.5}
                ListFooterComponent={renderFooter}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={handleRefresh}
                        colors={[Colors.THEME]}
                    />
                }
            />
            <FloatingActionButton onPress={onPressAddNewEvent} />
        </View>
    );
};

export default MyEventsLists;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: verticalScale(16),
    },
    columnWrapper: {
        justifyContent: 'space-between',
        marginBottom: verticalScale(16),
        marginHorizontal: moderateScale(10),
    },
});
