import { StyleSheet, View } from 'react-native'
import React from 'react'
import { UnderMaintainence } from '../../../../../components/project-components'
import { BackpressTopBar } from '../../../../../components/framework/navbar'
import { SafeAreaView } from 'react-native-safe-area-context'

const Promotion = () => {
    return (
        <SafeAreaView>
            <BackpressTopBar title={"Promotion"} />
            <UnderMaintainence />
        </SafeAreaView>
    )
}

export default Promotion

const styles = StyleSheet.create({})