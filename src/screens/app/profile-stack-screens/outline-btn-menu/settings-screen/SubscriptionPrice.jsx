import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import UnderMaintainence from '../../../../../components/project-components/UnderMaintainence'
import BackpressTopBar from '../../../../../components/framework/navbar/BackpressTopBar'

const SubscriptionPrice = () => {
    return (
        <View>
            <BackpressTopBar title={"Subscription Price"} />
            <UnderMaintainence />

        </View>
    )
}

export default SubscriptionPrice

const styles = StyleSheet.create({})