import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import TipsTable from '../../../components/framework/tables/TipsTable'
import { TipsData } from '../../../data/TipsData'
import BackpressTopBar from '../../../components/framework/navbar/BackpressTopBar'
import { Colors } from '../../../constants'

const AllTips = () => {
    const tipsData = TipsData;
    return (
        <View style={{ flex: 1, backgroundColor: Colors.WHITE }}>
            <BackpressTopBar title={"Tips Leader Board"} />
            <TipsTable data={tipsData} />
        </View>
    )
}

export default AllTips

const styles = StyleSheet.create({})