import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors } from '../../../../constants'
import { scale } from 'react-native-size-matters'
import { SafeAreaView } from 'react-native-safe-area-context'

const NoContantPage = () => {
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.text}>No post available of this content</Text>
        </SafeAreaView>
    )
}

export default NoContantPage

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        backgroundColor: Colors.WHITE
    },
    text: {
        color: Colors.THEME,
        fontSize: scale(20),
        alignSelf: "center",
        fontWeight: '500',
    }
})