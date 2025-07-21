import { ScrollView, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { Images, NavigationStrings } from '../../../constants';
import SelfStoryHighLight from '../../../components/framework/story/SelfStoryHighLight';
import StoryHighlight from '../../../components/framework/story/StoryHighlight';
import Spacer from '../../../components/framework/boots/Spacer';
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Feather from 'react-native-vector-icons/Feather';
import BottomModal from '../../../components/framework/modal/BottomModal';
import { useNavigation } from '@react-navigation/native';

const StoryArea = () => {
    const storyModalData = [
        { id: 1, Icon: Fontisto, iconName: "photograph", text: "View Stories" },
        { id: 2, Icon: Feather, iconName: "upload", text: "Upload Stories" },
        { id: 3, Icon: FontAwesome5, iconName: "camera-retro", text: "Open Camera" },
    ];

    const [storyModal, setStoryModal] = useState(false);
    const onPressStoryModal = () => setStoryModal(!storyModal);
    const navigation = useNavigation();
    const openStory = (image, userName) => {
        navigation.navigate(NavigationStrings.HOME_STACK, {
            screen: NavigationStrings.HOME_VIEW_STORY
        });
    };

    return (
        <SafeAreaView>
            <ScrollView horizontal style={styles.storyHighlightContainer} showsHorizontalScrollIndicator={false}>
                <SelfStoryHighLight
                    image={Images.STORY_SELF}
                    userName={"Your Story"}
                    userImg={Images.USER_IMAGES}
                    onPress={onPressStoryModal}
                />
                <StoryHighlight image={Images.STORY_ONE} userName={"MS Dhoni"} onPress={openStory} />
                <StoryHighlight image={Images.STORY_TWO} userName={"Virat Kohli"} onPress={openStory} />
                <StoryHighlight image={Images.STORY_THREE} userName={"Suresh Raina"} onPress={openStory} />
                <StoryHighlight image={Images.STORY_FOUR} userName={"Rohit Sharma"} onPress={openStory} />
                <StoryHighlight image={Images.STORY_FIVE} userName={"Manish Pandey"} onPress={openStory} />
                <Spacer width={10} />
            </ScrollView>

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

export default StoryArea;

const styles = StyleSheet.create({

});
