import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { BackpressTopBar } from '../../../../../components/framework/navbar'

const CreateNewCollaboration = () => {
    return (
        <SafeAreaView>
            <BackpressTopBar title="Create New Collaboration" />
        </SafeAreaView>
    )
}

export default CreateNewCollaboration

const styles = StyleSheet.create({})