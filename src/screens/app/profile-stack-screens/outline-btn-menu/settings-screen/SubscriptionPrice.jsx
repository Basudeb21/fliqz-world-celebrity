import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { UnderMaintainence } from '../../../../../components/project-components'
import { BackpressTopBar } from '../../../../../components/framework/navbar'
import { SafeAreaView } from 'react-native-safe-area-context'

const SubscriptionPrice = () => {
    return (
        <SafeAreaView>
            <BackpressTopBar title={"Subscription Price"} />
            <UnderMaintainence />

        </SafeAreaView>
    )
}

export default SubscriptionPrice

const styles = StyleSheet.create({})