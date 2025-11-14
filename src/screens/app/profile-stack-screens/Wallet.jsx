import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Colors } from '../../../constants'
import { UnderMaintainence } from '../../../components/project-components'

const Wallet = () => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.WHITE }}>
            <UnderMaintainence />
        </SafeAreaView>
    )
}

export default Wallet

const styles = StyleSheet.create({})