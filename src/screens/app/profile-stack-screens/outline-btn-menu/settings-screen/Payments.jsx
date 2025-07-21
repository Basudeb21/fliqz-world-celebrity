import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import UnderMaintainence from '../../../../../components/project-components/UnderMaintainence'
import BackpressTopBar from '../../../../../components/framework/navbar/BackpressTopBar'

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