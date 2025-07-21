import { FlatList, ScrollView, StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import { Colors, Images, NavigationStrings } from '../../../constants';
import { useNavigation } from '@react-navigation/native';
import BackPressTopbarWithIcon from '../../../components/framework/navbar/BackPressTopbarWithIcon';
import ChatFriendCard from '../../../components/framework/card/ChatFriendCard';
import Spacer from '../../../components/framework/boots/Spacer';
import SearchBar from '../../../components/framework/input/SearchBar';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackpressTopBar from '../../../components/framework/navbar/BackpressTopBar';

const ChatFriendList = () => {
    const users = [
        { id: 1, image: Images.CELEBRITY_AVATAR_ONE, fanName: "Fans_10", fanActiveTime: "active 10m ago" },
        { id: 2, image: Images.CELEBRITY_AVATAR_TWO, fanName: "Fans_12", fanActiveTime: "active 1m ago" },
        { id: 3, image: Images.CELEBRITY_AVATAR_THREE, fanName: "Fans_18", fanActiveTime: "active 10d ago" },
        { id: 4, image: Images.CELEBRITY_AVATAR_FOUR, fanName: "Fans_21", fanActiveTime: "active 25m ago" },
        { id: 5, image: Images.CELEBRITY_AVATAR_FIVE, fanName: "Fans_65", fanActiveTime: "active 4s ago" },
        { id: 6, image: Images.CELEBRITY_AVATAR_ONE, fanName: "Fans_11", fanActiveTime: "active 50s ago" },
        { id: 7, image: Images.CELEBRITY_AVATAR_TWO, fanName: "Fans_1", fanActiveTime: "active 1d ago" },
        { id: 8, image: Images.CELEBRITY_AVATAR_THREE, fanName: "Fans_7", fanActiveTime: "active 12m ago" },
        { id: 9, image: Images.CELEBRITY_AVATAR_FOUR, fanName: "Fans_74", fanActiveTime: "active 10m ago" },
        { id: 10, image: Images.CELEBRITY_AVATAR_FIVE, fanName: "Fans_89", fanActiveTime: "active 10m ago" },
        { id: 12, image: Images.CELEBRITY_AVATAR_ONE, fanName: "Fans_69", fanActiveTime: "active 11m ago" },
        { id: 13, image: Images.CELEBRITY_AVATAR_TWO, fanName: "Fans_45", fanActiveTime: "active 14m ago" },


    ]

    const [searchTxt, setSearchTxt] = useState("");
    const navigation = useNavigation();
    const onPressChatClick = (user) => {
        navigation.navigate(NavigationStrings.CHAT_STACK, {
            screen: NavigationStrings.FRIEND_CHAT_SCREEN,
            params: { user }
        })
    }


    return (
        <SafeAreaView style={styles.container}>
            <BackpressTopBar title={"MyProfile_4321"} />
            <FlatList
                ListHeaderComponent={
                    <>
                        <Spacer height={20} />
                        <SearchBar value={searchTxt} setValue={setSearchTxt} placeholder={"Search"} />
                    </>
                }
                data={users}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <ChatFriendCard
                        image={item.image}
                        fanName={item.fanName}
                        fanActiveTime={item.fanActiveTime}
                        onPress={() => onPressChatClick(item)}
                    />
                )}
                ListFooterComponent={<Spacer height={100} />}
                contentContainerStyle={styles.scrollContent}
            />
        </SafeAreaView>
    );
};

export default ChatFriendList;

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.WHITE
    }
});