import {
    FlatList,
    StyleSheet,
    View,
    ActivityIndicator,
    RefreshControl,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Colors, Images, NavigationStrings } from '../../../../../constants';
import { moderateScale } from 'react-native-size-matters';
import { useSelector } from 'react-redux';
import { Spacer } from '../../../../../components/framework/boots';
import { EventCard } from '../../../../../components/framework/card';
import { SearchBar } from 'react-native-screens';
import { GetAllEventsApi } from '../../../../../api/app/event-api';



const AllEventsLists = () => {
    const token = useSelector((state) => state.auth?.token);
    const navigation = useNavigation();

    const [eventItems, setEventItems] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const fetchEvents = async (page = 1, isRefreshing = false) => {
        if (!token || loading) return;
        setLoading(true);

        try {
            const data = await GetAllEventsApi(token, page);
            if (data) {
                setLastPage(data.last_page);
                setCurrentPage(data.current_page);

                if (isRefreshing) {
                    setEventItems(data.data);
                    setFilteredEvents(data.data);
                } else {
                    setEventItems((prev) => {
                        const newItems = data.data.filter(
                            (newItem) =>
                                !prev.some((existingItem) => existingItem.id === newItem.id)
                        );
                        const updatedItems = [...prev, ...newItems];
                        setFilteredEvents(updatedItems);
                        return updatedItems;
                    });
                }
            }
        } catch (error) {
            console.log('Error fetching events:', error);
        }

        setLoading(false);
        setRefreshing(false);
    };

    useEffect(() => {
        fetchEvents();
    }, [token]);

    useEffect(() => {
        if (searchTerm.trim().length > 0) {
            const filtered = eventItems.filter((item) =>
                item.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredEvents(filtered);
        } else {
            setFilteredEvents(eventItems);
        }
    }, [searchTerm]);

    const handleLoadMore = () => {
        if (currentPage < lastPage && !loading) {
            fetchEvents(currentPage + 1);
        }
    };

    const handleRefresh = () => {
        setRefreshing(true);
        setSearchTerm('');
        setFilteredEvents([]);
        setEventItems([]);
        fetchEvents(1, true);
    };

    const onImagePress = ({ event }) => {
        navigation.navigate(NavigationStrings.PROFILE_EVENT_DETAILS,
            { event }
        );
    };

    const renderFooter = () => {
        if (!loading || currentPage === lastPage) return null;
        return (
            <View style={{ padding: 10 }}>
                <ActivityIndicator size="small" color="#888" />
            </View>
        );
    };

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

    return (
        <View style={styles.container}>
            <FlatList
                ListHeaderComponent={
                    <>
                        <Spacer height={10} />
                        <SearchBar
                            placeholder="Search"
                            value={searchTerm}
                            setValue={setSearchTerm}
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
                        image={eventImages[index % eventImages.length]}
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
        </View>
    );
};

export default AllEventsLists;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: 16,
    },
    columnWrapper: {
        justifyContent: 'space-between',
        marginBottom: 16,
        marginHorizontal: moderateScale(10),
    },
});
