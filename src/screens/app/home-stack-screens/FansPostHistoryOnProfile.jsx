import React, { useEffect, useState } from 'react';
import {
    FlatList,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { Colors, NavigationStrings } from '../../../constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { SharedPost } from '../../../components/framework/card';
import { Loader, Spacer } from '../../../components/framework/boots';
import { GetMyPostHistoryApi } from '../../../api/app/user';

const FansPostHistoryOnProfile = () => {
    const navigation = useNavigation();
    const token = useSelector(state => state.auth.token);

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingMore, setLoadingMore] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);

    const fetchPosts = async (page = 1, append = false) => {
        if (!token) return;

        if (page === 1) setLoading(true);
        else setLoadingMore(true);

        try {
            const res = await GetMyPostHistoryApi(token, page);
            const actualPosts = res?.data?.data || [];

            setLastPage(res?.data?.last_page || 1);
            setCurrentPage(res?.data?.current_page || 1);

            if (append) {
                setPosts(prev => {
                    const newItems = actualPosts.filter(
                        newItem => !prev.some(existing => existing.id === newItem.id)
                    );
                    return [...prev, ...newItems];
                });
            } else {
                setPosts(actualPosts);
            }
        } catch (err) {
            console.log('Error fetching posts', err);
        }

        setLoading(false);
        setLoadingMore(false);
    };

    useEffect(() => {
        fetchPosts(1, false);
    }, [token]);

    const handleOnPressPost = (item) => {
        navigation.navigate(NavigationStrings.HOME_VIEW_PROFILE_POST, { post: item });
    };

    const handleLoadMore = () => {
        if (!loadingMore && currentPage < lastPage) {
            fetchPosts(currentPage + 1, true);
        }
    };

    if (loading && posts.length === 0) {
        return (
            <SafeAreaView style={styles.container}>
                <ActivityIndicator size="large" color={Colors.PRIMARY} />
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={posts}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => handleOnPressPost(item)}>
                        <SharedPost
                            userAvatar={item.user?.avatar}
                            userName={item.user?.name}
                            postText={item.text}
                            createdAt={item.created}
                            crowdfunding={item.crowedfunding}
                            data={item}
                            badges={item.user?.badge}
                        />
                    </TouchableOpacity>
                )}
                ItemSeparatorComponent={() => <Spacer height={15} />}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
                onEndReached={handleLoadMore}
                onEndReachedThreshold={0.5}
                ListFooterComponent={
                    loadingMore ? (
                        <Loader />
                    ) : null
                }
            />
        </SafeAreaView>
    );
};

export default FansPostHistoryOnProfile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.WHITE,
    },
    scrollContent: {
        paddingBottom: moderateScale(20),
    },
});
