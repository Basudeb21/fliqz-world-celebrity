import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ChatFriendList } from './chat-stack-screens'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../constants';


const ChatPage = () => {
    return (
        <SafeAreaView style={styles.areaView}>
            <ChatFriendList />
        </SafeAreaView>
    )
}

export default ChatPage

const styles = StyleSheet.create({
    areaView: {
        flex: 1,
        backgroundColor: Colors.THEME
    },
    container: {
        backgroundColor: Colors.WHITE,
        flex: 1,
    }
})