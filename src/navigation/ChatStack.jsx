import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationStrings } from '../constants';
import FriendChatScreen from '../screens/app/chat-stack-screens/FriendChatScreen';
// import { FriendChatScreen } from '../screens/app/chat-stack-screens';
// import { FriendChatScreen } from '../screens/app/chat-stack-screens';
const ChatStack = () => {
    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name={NavigationStrings.FRIEND_CHAT_SCREEN} component={FriendChatScreen} />


        </Stack.Navigator>
    );
}

export default ChatStack