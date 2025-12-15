import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { MessageSendArea } from '../../../../../../components/framework/input'
import { Colors } from '../../../../../../constants'
import { ChatReceive, ChatSend } from '../../../../../../components/framework/chat'

const ChatbotMessage = () => {
    return (
        <View style={styles.container}>
            <View style={styles.screen}>
                <ChatSend item={{ isAttached: 0, message: "Hello" }} />
                <ChatReceive item={{ isAttached: 0, message: "Hello" }} />
            </View>
            <View style={styles.footer}>
                <MessageSendArea showOthersMenu={false} />
            </View>
        </View>
    )
}

export default ChatbotMessage

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    screen: {
        flex: 1,
    },
    footer: {
        flex: 1,
        width: "100%",
        position: "absolute",
        bottom: 10,
    }
})