import { FlatList, StyleSheet, ToastAndroid, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Images, NavigationStrings } from '../../../constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { Spacer } from '../../../components/framework/boots';
import { SelfStoryHighLight, StoryHighlight } from '../../../components/framework/story';
import { BottomModal } from '../../../components/framework/modal';
import { GetStoriesApi } from '../../../api/app/story';
import { useSelector } from 'react-redux';

const StoryHighlightArea = () => {
    const [storyModal, setStoryModal] = useState(false);
    const [stories, setStories] = useState([]);
    const token = useSelector(state => state.auth.token);
    const navigation = useNavigation();

    const storyModalData = [
        { id: 1, Icon: Fontisto, iconName: "photograph", text: "View Stories" },
        { id: 2, Icon: Feather, iconName: "upload", text: "Upload Stories" },
        { id: 3, Icon: FontAwesome5, iconName: "camera-retro", text: "Open Camera" },
    ];

    useEffect(() => {
        const fetchStories = async () => {
            const res = await GetStoriesApi(token);
            console.log("SS", res);

            if (res?.story) {
                setStories(res.story);
            } else {
                ToastAndroid.show("No stories available.", ToastAndroid.SHORT);
            }
        };

        fetchStories();
    }, []);

    const onPressStoryModal = () => setStoryModal(!storyModal);

    const openStory = (image, userName, storyId) => {
        navigation.navigate(NavigationStrings.HOME_STACK, {
            screen: NavigationStrings.HOME_VIEW_STORY,
            params: { image, userName, storyId },
        });
    };

    const renderStoryItem = ({ item }) => (
        <StoryHighlight
            image={item.image_url}
            userName={item.user.name}
            onPress={() => openStory(item.image_url, item.user.name, item.id)}
        />
    );

    return (
        <SafeAreaView>
            <View style={styles.storyHighlightContainer}>
                <FlatList
                    horizontal
                    data={stories}
                    renderItem={renderStoryItem}
                    keyExtractor={(item) => item.id.toString()}
                    ListHeaderComponent={
                        <SelfStoryHighLight
                            image={Images.STORY_SELF}
                            userName={"Your Story"}
                            userImg={Images.USER_IMAGES}
                            onPress={onPressStoryModal}
                        />
                    }
                    showsHorizontalScrollIndicator={false}
                    ItemSeparatorComponent={() => <Spacer width={10} />}
                />
            </View>

            {storyModal && (
                <BottomModal
                    visible={storyModal}
                    onClose={onPressStoryModal}
                    content={storyModalData}
                />
            )}

        </SafeAreaView>
    );
};

export default StoryHighlightArea;

const styles = StyleSheet.create({
    storyHighlightContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingTop: 10,
    },
});
