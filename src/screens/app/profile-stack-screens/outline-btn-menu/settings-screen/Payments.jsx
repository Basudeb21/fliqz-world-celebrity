import { StyleSheet, View } from 'react-native'
import React from 'react'
import { BackpressTopBar } from '../../../../../components/framework/navbar'
import { UnderMaintainence } from '../../../../../components/project-components'

const Payments = () => {
    return (
        <View>
            <BackpressTopBar title={"Payments"} />
            <UnderMaintainence />

        </View>
    )
}

export default Payments

const styles = StyleSheet.create({})