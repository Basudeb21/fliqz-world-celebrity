import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors } from '../../../../../../constants'
import { scale } from 'react-native-size-matters'
import { Spacer } from '../../../../../../components/framework/boots'

const ChatbotHome = () => {
    return (
        <View>
            <View style={styles.bigCard}>
                <View >
                    <Text style={styles.head}>Ask any question</Text>
                    <Spacer height={5} />
                    <Text style={styles.body}>AI agent and team can help</Text>
                </View>
                <View>

                </View>
            </View>
            <View style={styles.bigCard}>
                <Text style={styles.body}>AI agent and team can help</Text>
                <Text style={styles.body}>AI agent and team can help</Text>
                <Text style={styles.body}>AI agent and team can help</Text>
            </View>
        </View>
    )
}


export default ChatbotHome

const styles = StyleSheet.create({
    bigCard: {
        backgroundColor: Colors.WHITE,
        elevation: scale(4),
        margin: scale(15),
        borderRadius: scale(12),
        padding: scale(10)
    },
    head: {
        fontWeight: "800",
        fontSize: scale(13)
    }
})