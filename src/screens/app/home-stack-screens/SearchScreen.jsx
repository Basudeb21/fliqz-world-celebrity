import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { BackpressTopBar } from '../../../components/framework/navbar'
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