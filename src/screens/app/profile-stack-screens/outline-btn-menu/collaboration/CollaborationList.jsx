import { FlatList, StyleSheet, View, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BackpressTopBar } from '../../../../../components/framework/navbar';
import { moderateScale, s } from 'react-native-size-matters';
import { FloatingActionButton } from '../../../../../components/framework/button';
import { Colors, NavigationStrings } from '../../../../../constants';
import { CollaborationOverviewCard } from '../../../../../components/framework/card';
import { useSelector } from 'react-redux';
import { CollabListApi } from '../../../../../api/app/collaboration';
import { Loader, Spacer } from '../../../../../components/framework/boots';
import { useNavigation } from '@react-navigation/native';
import { DateFormat } from '../../../../../utils/DateFormat';

const CollaborationList = () => {
    const token = useSelector(state => state.auth.token);
    const navigation = useNavigation()

    const [allCollabs, setAllCollabs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const onPressAddCollab = () => {
        navigation.navigate(NavigationStrings.PROFILE_CREATE_NEW_COLLABORATION);
    }


    const fetchCollabs = async (page = 1, isRefreshing = false) => {
        if (!token || loading) return;
        setLoading(true);
        try {
            const res = await CollabListApi(token, page);
            const data = res?.data;

            if (data) {
                setLastPage(data.last_page || 1);
                setCurrentPage(data.current_page || 1);

                if (isRefreshing) {
                    setAllCollabs(data.data || []);
                } else {
                    setAllCollabs(prev => {
                        const newItems = (data.data || []).filter(
                            item => !prev.some(existing => existing.id === item.id)
                        );
                        return [...prev, ...newItems];
                    });
                }
            }
        } catch (error) {
            console.log('Error fetching collaborations:', error);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        fetchCollabs(1, true);
    }, [token]);

    const handleLoadMore = () => {
        if (currentPage < lastPage && !loading) {
            fetchCollabs(currentPage + 1);
        }
    };

    const handleRefresh = () => {
        setRefreshing(true);
        fetchCollabs(1, true);
    };

    return (
        <SafeAreaView style={styles.areaView}>
            <BackpressTopBar title="My Collaboration" />
            <View style={styles.container}>
                <Spacer height={10} />

                <FlatList
                    data={allCollabs}
                    numColumns={2}
                    columnWrapperStyle={{ justifyContent: "flex-start", marginHorizontal: moderateScale(10) }}
                    keyExtractor={(item, index) => item.id?.toString() || index.toString()}
                    renderItem={({ item, index }) => (

                        <CollaborationOverviewCard
                            data={item}
                            id={item.id}
                            image={item.image_url}
                            title={item.title}
                            date={DateFormat(item.created_at)}
                            users={item.invited_user}
                            style={{
                                flex: 1,
                                margin: s(5),
                            }}
                        />
                    )}
                    onEndReached={handleLoadMore}
                    onEndReachedThreshold={0.5}
                    refreshing={refreshing}
                    onRefresh={handleRefresh}
                    ListFooterComponent={loading ? <Loader /> : null}
                />


                <View style={styles.fabBtn}>
                    <FloatingActionButton onPress={onPressAddCollab} />
                </View>
            </View>
        </SafeAreaView>
    );
};

export default CollaborationList;

const styles = StyleSheet.create({
    areaView: {
        flex: 1,
        backgroundColor: Colors.THEME
    },
    container: {
        backgroundColor: Colors.WHITE,
        flex: 1
    },
    fabBtn: {
        position: 'absolute',
        bottom: s(60),
        right: s(10),
    },
});
