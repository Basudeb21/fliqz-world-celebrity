import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { BackpressTopBar } from '../../../components/framework/navbar'
import { Colors } from '../../../constants'
const SearchScreen = () => {
    return (
        <SafeAreaView style={styles.areaView}>
            <View style={styles.container}>
                <BackpressTopBar title={"Search"} />
                <Text>SearchScreen</Text>
            </View>
        </SafeAreaView>
    )
}

export default SearchScreen

const styles = StyleSheet.create({
    areaView: {
        flex: 1,
        backgroundColor: Colors.THEME
    },
    container: {
        backgroundColor: Colors.WHITE,
        flex: 1
    }
})