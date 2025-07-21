import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import BackpressTopBar from '../../../components/framework/navbar/BackpressTopBar'
import { SafeAreaView } from 'react-native-safe-area-context'
const SearchScreen = () => {
    return (
        <SafeAreaView>
            <BackpressTopBar title={"Search"} />

            <Text>SearchScreen</Text>
        </SafeAreaView>
    )
}

export default SearchScreen

const styles = StyleSheet.create({})