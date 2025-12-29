import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { UnderMaintainence } from '../../../../../components/project-components'
import { BackpressTopBar } from '../../../../../components/framework/navbar'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Colors } from '../../../../../constants'

const SubscriptionPrice = () => {
    return (
        <SafeAreaView style={styles.areaView}>
            <BackpressTopBar title={"Subscription Price"} />
            <View style={styles.container}>
                <UnderMaintainence />
            </View>
        </SafeAreaView>
    )
}

export default SubscriptionPrice

const styles = StyleSheet.create({
    areaView: {
        flex: 1,
        backgroundColor: Colors.THEME
    },
    container: {
        backgroundColor: Colors.WHITE,
        flex: 1
    },
})