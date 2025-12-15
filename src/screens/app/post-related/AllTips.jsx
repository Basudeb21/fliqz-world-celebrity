import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TipsData } from '../../../data/TipsData'
import { Colors } from '../../../constants'
import { BackpressTopBar } from '../../../components/framework/navbar'
import { TipsTable } from '../../../components/framework/tables'
import { SafeAreaView } from 'react-native-safe-area-context'

const AllTips = () => {
    const tipsData = TipsData;
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.WHITE }}>
            <BackpressTopBar title={"Tips Leader Board"} />
            <TipsTable data={tipsData} />
        </SafeAreaView>
    )
}

export default AllTips

const styles = StyleSheet.create({})