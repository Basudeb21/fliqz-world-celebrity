import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { BackpressTopBar } from '../../../../../components/framework/navbar'

const EditCollaboration = () => {
    return (
        <SafeAreaView>
            <BackpressTopBar title="Edit Collaboration" />
        </SafeAreaView>
    )
}

export default EditCollaboration

const styles = StyleSheet.create({})