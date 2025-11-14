import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Colors } from '../../../../constants';
import AnalyticsOverviewTop from './AnalyticsOverviewTop';


const OverviewScreen = ({ data }) => {
    console.log("...", data);

    return (
        <View style={{ backgroundColor: Colors.WHITE }}>
            <AnalyticsOverviewTop data={data} />
        </View>
    );
};

export default OverviewScreen;

const styles = StyleSheet.create({});
