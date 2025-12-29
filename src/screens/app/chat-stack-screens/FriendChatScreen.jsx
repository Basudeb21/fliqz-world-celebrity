import { FlatList, StyleSheet, ToastAndroid, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Colors } from '../../../constants';
import { verticalScale } from 'react-native-size-matters';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ProfileTopCard, QuickTipsCard } from '../../../components/framework/card';
import { ChatBackPressTopBar } from '../../../components/framework/navbar';
import { ChatReceive, ChatSend } from '../../../components/framework/chat';
import { MessageSendArea } from '../../../components/framework/input';
import { GetChatByUserIDApi, SendMessageApi } from '../../../api/app/chat';
import { useSelector } from 'react-redux';
import FormatTime from '../../../utils/FormatTime';
import { Loader } from '../../../components/framework/boots';
import { messageSendPressSounds } from '../../../sound/SoundManager';

const FriendChatScreen = ({ route }) => {
    const { user } = route.params;
    const [message, setMessage] = useState('');
    const [chatData, setChatData] = useState([]);
    const token = useSelector(state => state.auth.token);
    const currentUser = useSelector(state => state.auth.user);
    const [loading, setLoading] = useState(true);

    const fetchChatData = async () => {

        try {
            const response = await GetChatByUserIDApi({ token, id: user.username });
            if (response.success && response.data?.chat_message) {
                setChatData(response.data.chat_message);
            } else {
                setChatData([]);
            }
        } catch (error) {
            console.log("Error fetching chat:", error);
            setChatData([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setLoading(true);
        fetchChatData();

        const interval = setInterval(fetchChatData, 1500);

        return () => clearInterval(interval);
    }, [user.id]);

    const onPressSendMessage = async () => {
        if (message.trim() === '') {
            ToastAndroid.show("Message can't be empty", ToastAndroid.SHORT);
        } else {
            const response = await SendMessageApi({ token, id: user.username, message });
            if (response.success) {
                messageSendPressSounds();
                setMessage('');
                fetchChatData();
            }
        }
    };

    return (
        <SafeAreaView style={styles.areaView}>
            <ChatBackPressTopBar info={user} />
            <View style={styles.container}>
                <View style={styles.chatContainer}>
                    {loading ? (
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Loader color={Colors.THEME} />
                        </View>
                    ) : (
                        <FlatList
                            ListHeaderComponent={<ProfileTopCard info={user} />}
                            data={chatData}
                            keyExtractor={(item) => item.id.toString()}
                            contentContainerStyle={styles.scrollContent}
                            renderItem={({ item }) =>
                                item.sender_id === currentUser.id
                                    ? <ChatSend item={item} time={FormatTime(item.created_at)} />
                                    : <ChatReceive item={item} time={FormatTime(item.created_at)} />
                            }

                        />
                    )}
                </View>
                <View>
                    <QuickTipsCard user={user.username} />

                </View>
                <MessageSendArea
                    value={message}
                    setValue={setMessage}
                    placeholder="Type a message..."
                    onPress={onPressSendMessage}
                    user={user}
                />
            </View>
        </SafeAreaView>
    );
};

export default FriendChatScreen;

const styles = StyleSheet.create({
    areaView: {
        flex: 1,
        backgroundColor: Colors.THEME
    },
    container: {
        backgroundColor: Colors.WHITE,
        flex: 1
    },
    chatContainer: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: verticalScale(20),
    },
});
