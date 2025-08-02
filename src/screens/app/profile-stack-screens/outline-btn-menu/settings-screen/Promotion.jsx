import { StyleSheet, View } from 'react-native'
import React from 'react'
import { UnderMaintainence } from '../../../../../components/project-components'
import { BackpressTopBar } from '../../../../../components/framework/navbar'

const Promotion = () => {
    return (
        <View>
            <BackpressTopBar title={"Promotion"} />
            <UnderMaintainence />
        </View>
    )
}

export default Promotion

const styles = StyleSheet.create({})