import { FlatList, StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Colors } from '../../../constants';
import { verticalScale } from 'react-native-size-matters';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ProfileTopCard } from '../../../components/framework/card';
import { ChatBackPressTopBar } from '../../../components/framework/navbar';
import { ChatReceive, ChatSend } from '../../../components/framework/chat';
import { MessageSendArea } from '../../../components/framework/input';
import { GetChatByUserIDApi } from '../../../api/app/chat';
import { useSelector } from 'react-redux';
import FormatTime from '../../../utils/FormatTime';

const FriendChatScreen = ({ route }) => {
    const { user } = route.params;
    const [message, setMessage] = useState('');
    const [chatData, setChatData] = useState([]);
    const token = useSelector(state => state.auth.token);
    const currentUser = useSelector(state => state.auth.user);

    useEffect(() => {
        const fetchChatData = async () => {
            const response = await GetChatByUserIDApi({ token, id: user.username });

            if (response.success && response.data?.chat_message) {
                setChatData(response.data.chat_message);
            } else {
                setChatData([]);
            }
        };

        fetchChatData();
    }, [user.id]);


    return (
        <SafeAreaView style={styles.container}>
            <ChatBackPressTopBar info={user} />
            <View style={styles.chatContainer}>
                <FlatList
                    ListHeaderComponent={<ProfileTopCard info={user} />}
                    data={chatData}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.scrollContent}
                    renderItem={({ item }) =>
                        item.sender_id === currentUser.id
                            ? <ChatSend label={item.message} time={FormatTime(item.time)} />
                            : <ChatReceive label={item.message} time={FormatTime(item.time)} />
                    }
                />

            </View>
            <MessageSendArea
                value={message}
                setValue={setMessage}
                placeholder="Type a message..."
            />
        </SafeAreaView>
    );
};

export default FriendChatScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.WHITE,
    },
    chatContainer: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: verticalScale(20),
    },
});
