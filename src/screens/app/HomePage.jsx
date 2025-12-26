import React, { useEffect, useState } from 'react';
import {
    BackHandler,
    FlatList,
    StatusBar,
    StyleSheet,
    ToastAndroid,
    View,
} from 'react-native';
import { Colors, NavigationStrings } from '../../constants';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { SharedPost } from '../../components/framework/card';
import { Spacer } from '../../components/framework/boots';
import { GetAllPostsApi } from '../../api/app/post';
import { HomeTopBar } from '../../components/framework/navbar';
import { StoryHighlightArea } from './post-related';
import { SafeAreaView } from 'react-native-safe-area-context';
import { updateUser } from '../../redux-store/slices/authSlice';
import { ViewProfileApi } from '../../api/app/user';

let backPressedOnce = false;

const HomePage = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const token = useSelector(state => state.auth.token);
    const user = useSelector(state => state.auth.user);

    console.log(token);



    const [allPosts, setAllPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const fetchUserProfile = async () => {
        if (!token) return;
        try {
            const profileRes = await ViewProfileApi(token);
            if (profileRes?.success && profileRes?.data) {
                dispatch(updateUser(profileRes.data));
            }
        } catch (error) {
            console.log("Error fetching user profile:", error);
        }
    };

    useEffect(() => {
        if (!token || !user) {
            navigation.replace(NavigationStrings.AUTH_STACK);
            return;
        }

        fetchUserProfile();

        const backAction = () => {
            if (backPressedOnce) {
                navigation.goBack();
                return true;
            }
            ToastAndroid.show("Press again to back.", ToastAndroid.SHORT);
            backPressedOnce = true;

            setTimeout(() => {
                backPressedOnce = false;
            }, 2000);

            return true;
        };

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction
        );

        return () => backHandler.remove();
    }, [token]);

    const fetchPosts = async (page = 1, isRefreshing = false) => {
        if (!token || loading) return;
        setLoading(true);

        try {
            const data = await GetAllPostsApi(token, page);
            const actualPosts = data?.data?.data || [];

            if (Array.isArray(actualPosts)) {
                setLastPage(data.data.last_page);
                setCurrentPage(data.data.current_page);

                if (isRefreshing) {
                    setAllPosts(actualPosts);
                    setFilteredPosts(actualPosts);
                } else {
                    setAllPosts(prev => {
                        const newItems = actualPosts.filter(
                            newItem => !prev.some(existing => existing.id === newItem.id)
                        );
                        const updatedItems = [...prev, ...newItems];
                        setFilteredPosts(updatedItems);
                        return updatedItems;
                    });
                }
            } else {
                console.log('Invalid post format:', data);
            }
        } catch (error) {
            console.log('Error fetching posts:', error);
        }

        setLoading(false);
        setRefreshing(false);
    };

    useEffect(() => {
        fetchPosts();
    }, [token]);

    const handleLoadMore = () => {
        if (currentPage < lastPage && !loading) {
            fetchPosts(currentPage + 1);
        }
    };

    const handleRefresh = () => {
        setRefreshing(true);
        fetchPosts(1, true);
        fetchUserProfile();
    };

    return (
        <SafeAreaView style={styles.areaView}>
            <StatusBar barStyle={'light-content'} />
            <View style={styles.container}>
                <HomeTopBar
                    searchOnPress={() =>
                        navigation.navigate(NavigationStrings.HOME_STACK, {
                            screen: NavigationStrings.HOME_SEARCH_SCREEN,
                        })
                    }
                    notificationOnPress={() =>
                        navigation.navigate(NavigationStrings.HOME_STACK, {
                            screen: NavigationStrings.HOME_NOTIFICATION_SCREEN,
                        })
                    }
                    walletOnPress={() =>
                        navigation.navigate(NavigationStrings.HOME_STACK, {
                            screen: NavigationStrings.HOME_WALLET_SCREEN,
                        })
                    }
                    cartOnPress={() =>
                        navigation.navigate(NavigationStrings.HOME_STACK, {
                            screen: NavigationStrings.HOME_CART_SCREEN,
                        })
                    }
                />

                <FlatList
                    data={filteredPosts}
                    keyExtractor={(item) => item.id.toString()}
                    ListHeaderComponent={
                        <>
                            <StoryHighlightArea />
                            <Spacer height={20} />
                        </>
                    }
                    renderItem={({ item }) => (
                        <SharedPost
                            userAvatar={item.user?.avatar}
                            userName={item.user?.name}
                            postText={item.text}
                            createdAt={item.created}
                            crowdfunding={item.crowedfunding}
                            data={item}
                            badges={item.user?.badge}
                        />
                    )}
                    ItemSeparatorComponent={() => <Spacer height={20} />}
                    ListFooterComponent={<Spacer height={30} />}
                    onEndReached={handleLoadMore}
                    onEndReachedThreshold={0.5}
                    refreshing={refreshing}
                    onRefresh={handleRefresh}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </SafeAreaView>
    );
};

export default HomePage;


const styles = StyleSheet.create({

    areaView: {
        flex: 1,
        backgroundColor: Colors.THEME
    },
    container: {
        backgroundColor: Colors.WHITE,
        flex: 1,
    }

})
