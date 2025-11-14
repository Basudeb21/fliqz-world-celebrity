import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { BackpressTopBar } from '../../../../../components/framework/navbar'

const ViewCrowdfunding = () => {
    return (
        <SafeAreaView>
            <BackpressTopBar title={"View Crowdfunding"} />
            <Text>ViewCrowdfunding</Text>

        </SafeAreaView>
    )
}

export default ViewCrowdfunding

const styles = StyleSheet.create({

})