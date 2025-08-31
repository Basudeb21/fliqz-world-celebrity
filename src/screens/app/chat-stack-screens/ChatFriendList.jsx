import { FlatList, StyleSheet, ActivityIndicator, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Colors, NavigationStrings } from '../../../constants';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ChatFriendCard from '../../../components/framework/card/ChatFriendCard'; // ✅ Import correctly
import { Spacer } from '../../../components/framework/boots';
import { BackpressTopBar } from '../../../components/framework/navbar';
import { SearchBar } from '../../../components/framework/input';
import AllChatsApi from '../../../api/app/chat/AllChatsApi';
import { useSelector } from 'react-redux';

const ChatFriendList = () => {
    const [searchTxt, setSearchTxt] = useState("");
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    const navigation = useNavigation();
    const token = useSelector(state => state.auth.token);

    useEffect(() => {
        const fetchChats = async () => {
            setLoading(true);
            try {
                const res = await AllChatsApi({ token });

                console.log("API Response: ", res); // ✅ Debug

                if (res.success && Array.isArray(res.data)) {
                    setUsers(res.data);
                } else {
                    setUsers([]);
                }
            } catch (error) {
                console.log("Fetch Chats Error: ", error);
                setUsers([]);
            } finally {
                setLoading(false);
            }
        };

        fetchChats();
    }, [token]);

    const onPressChatClick = (user) => {
        navigation.navigate(NavigationStrings.FRIEND_CHAT_SCREEN, { user });
    };

    const filteredUsers = users.filter(user =>
        user.name?.toLowerCase().includes(searchTxt.toLowerCase()) ||
        user.username?.toLowerCase().includes(searchTxt.toLowerCase())
    );

    return (
        <View style={styles.container}>
            <BackpressTopBar title={"My Chats"} />

            {loading ? (
                <ActivityIndicator size="large" color={Colors.THEME} style={{ marginTop: 30 }} />
            ) : (
                <FlatList
                    ListHeaderComponent={
                        <View style={{ flex: 1 }}>
                            <Spacer height={20} />
                            <SearchBar value={searchTxt} setValue={setSearchTxt} placeholder={"Search"} />
                        </View>
                    }
                    data={filteredUsers}
                    keyExtractor={(item, index) => item.id?.toString() || index.toString()}
                    renderItem={({ item }) => (
                        <ChatFriendCard
                            image={item.avatar}
                            fanName={item.name || item.username}
                            fanActiveTime={item.last_text_time || "Offline"}
                            lastMessage={item.last_text || ""}
                            unreadCount={item.unread_msg_count || 0}
                            onPress={() => onPressChatClick(item)}
                        />
                    )}
                    ListFooterComponent={<Spacer height={100} />}
                    contentContainerStyle={styles.scrollContent}
                />

            )}
        </View>
    );
};

export default ChatFriendList;

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.WHITE,
        height: '100%'
    },
    scrollContent: {
        paddingBottom: 20,
    }
});
