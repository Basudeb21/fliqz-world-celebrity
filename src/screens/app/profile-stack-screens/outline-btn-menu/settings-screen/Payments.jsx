import { StyleSheet, View } from 'react-native'
import React from 'react'
import { BackpressTopBar } from '../../../../../components/framework/navbar'
import { UnderMaintainence } from '../../../../../components/project-components'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Colors } from '../../../../../constants'

const Payments = () => {
    return (
        <SafeAreaView style={styles.areaView}>
            <BackpressTopBar title={"Payments"} />
            <View style={styles.container}>
                <UnderMaintainence />
            </View>
        </SafeAreaView>
    )
}

export default Payments

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