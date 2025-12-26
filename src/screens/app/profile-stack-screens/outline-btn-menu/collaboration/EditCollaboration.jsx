import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { BackpressTopBar } from '../../../../../components/framework/navbar'
import { Colors } from '../../../../../constants'

const EditCollaboration = () => {
    return (
        <SafeAreaView>
            <BackpressTopBar title="Edit Collaboration" />
        </SafeAreaView>
    )
}

export default EditCollaboration

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