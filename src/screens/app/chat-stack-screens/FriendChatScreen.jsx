import { FlatList, StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import { Colors } from '../../../constants';
import { verticalScale } from 'react-native-size-matters';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ProfileTopCard } from '../../../components/framework/card';
import { ChatBackPressTopBar } from '../../../components/framework/navbar';
import { ChatReceive, ChatSend } from '../../../components/framework/chat';
import { MessageSendArea } from '../../../components/framework/input';

const FriendChatScreen = ({ route }) => {
    const { user } = route.params;
    const [message, setMessage] = useState('');

    const chatData = [
        { type: 'send', id: '1', label: 'Hello' },
        { type: 'send', id: '2', label: 'How are you??' },
        { type: 'receive', id: '3', label: 'Heyyy' },
        { type: 'receive', id: '4', label: 'I am fine' },
        { type: 'receive', id: '5', label: 'How are you??' },
        { type: 'send', id: '6', label: 'I am also fine' },
        { type: 'send', id: '7', label: 'Can we go for movie tonight??' },
        { type: 'receive', id: '8', label: 'Yahh' },
        { type: 'receive', id: '9', label: 'Sure why not!' },
        { type: 'receive', id: '10', label: 'That’s what I was thinking actually.....' },
        { type: 'send', id: '11', label: 'Wow nice' },
        { type: 'send', id: '12', label: 'Thank you so much' },
        { type: 'receive', id: '13', label: 'Long text ....' },
        { type: 'send', id: '14', label: 'Another long text ....' },
    ];

    return (
        <SafeAreaView style={styles.container}>
            <ChatBackPressTopBar info={user} />
            <View style={styles.chatContainer}>
                <FlatList
                    ListHeaderComponent={<ProfileTopCard info={user} />}
                    data={chatData}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.scrollContent}
                    renderItem={({ item }) => (
                        item.type == "send" ? <ChatSend label={item.label} /> : <ChatReceive label={item.label} />
                    )}
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
