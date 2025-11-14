import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ChatFriendList } from './chat-stack-screens'
import { SafeAreaView } from 'react-native-safe-area-context';


const ChatPage = () => {
    return (
        <SafeAreaView>
            <ChatFriendList />
        </SafeAreaView>
    )
}

export default ChatPage

const styles = StyleSheet.create({})