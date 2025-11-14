import { StyleSheet, View } from 'react-native'
import React from 'react'
import { BackpressTopBar } from '../../../../../components/framework/navbar'
import { UnderMaintainence } from '../../../../../components/project-components'
import { SafeAreaView } from 'react-native-safe-area-context'

const Payments = () => {
    return (
        <SafeAreaView>
            <BackpressTopBar title={"Payments"} />
            <UnderMaintainence />
        </SafeAreaView>
    )
}

export default Payments

const styles = StyleSheet.create({})