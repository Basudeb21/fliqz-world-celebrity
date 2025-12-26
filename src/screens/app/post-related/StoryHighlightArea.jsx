import {
    FlatList,
    StyleSheet,
    View
} from 'react-native';

import React, { useState, useEffect } from 'react';

import {
    Colors,
    Images,
    NavigationStrings
} from '../../../constants';

import { SafeAreaView } from 'react-native-safe-area-context';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Feather from 'react-native-vector-icons/Feather';

import { useNavigation } from '@react-navigation/native';

import { Spacer } from '../../../components/framework/boots';

import {
    SelfStoryHighLight,
    StoryHighlight
} from '../../../components/framework/story';

import { BottomModal } from '../../../components/framework/modal';

import { GetStoriesApi } from '../../../api/app/story';

import { useSelector } from 'react-redux';
import API from '../../../api/common/API';

const StoryHighlightArea = () => {
    const [storyModal, setStoryModal] = useState(false);
    const [stories, setStories] = useState([]);
    const [myStories, setMyStories] = useState([]);

    const token = useSelector(state => state.auth.token);
    const user = useSelector(state => state.auth.user);

    const navigation = useNavigation();

    const myLatestStory = myStories?.length > 0 ? myStories[0] : null;

    const storyModalData = [
        { id: 1, Icon: Fontisto, iconName: "photograph", text: "View Stories" },
        { id: 2, Icon: Feather, iconName: "upload", text: "Upload Stories" },
        { id: 3, Icon: FontAwesome5, iconName: "camera-retro", text: "Open Camera" },
    ];

    useEffect(() => {
        const fetchStories = async () => {
            const res = await GetStoriesApi(token);
            if (res?.story) setStories(res.story);
            if (res?.my_story) setMyStories(res.my_story);
        };
        fetchStories();
    }, [token]);

    const openStory = (image, userName, storyId) => {
        navigation.navigate(NavigationStrings.HOME_STACK, {
            screen: NavigationStrings.HOME_VIEW_STORY,
            params: { image, userName, storyId },
        });
    };

    return (
        <SafeAreaView>
            <View style={styles.storyHighlightContainer}>
                <FlatList
                    horizontal
                    data={stories}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <StoryHighlight
                            image={item.image_url}
                            videoThumbnail={item.video_thumbnail_url}
                            userName={item.user.name}
                            onPress={() =>
                                openStory(item.image_url, item.user.name, item.id)
                            }
                        />
                    )}
                    ListHeaderComponent={
                        <SelfStoryHighLight
                            image={
                                myLatestStory
                                    ? myLatestStory.video_thumbnail_url
                                        ? API.STORAGE_URL + myLatestStory.video_thumbnail_url
                                        : API.STORAGE_URL + myLatestStory.image_url
                                    : Images.BANNER_IMG
                            }
                            userName="Your Story"
                            userImg={user?.avatar}
                            empty={!myLatestStory}
                            onPress={() => setStoryModal(true)}
                            onPressView={() => {
                                if (myLatestStory) {
                                    openStory(
                                        myLatestStory.image_url,
                                        user.name,
                                        myLatestStory.id
                                    );
                                } else {
                                    setStoryModal(true);
                                }
                            }}
                        />
                    }
                    ItemSeparatorComponent={() => <Spacer width={10} />}
                    showsHorizontalScrollIndicator={false}
                />
            </View>

            {storyModal && (
                <BottomModal
                    visible={storyModal}
                    onClose={() => setStoryModal(false)}
                    content={storyModalData}
                />
            )}
        </SafeAreaView>
    );
};

export default StoryHighlightArea;

const styles = StyleSheet.create({
    areaView: {
        flex: 1,
        backgroundColor: Colors.THEME
    },
    container: {
        backgroundColor: Colors.WHITE,
        flex: 1
    },
    storyHighlightContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
});
