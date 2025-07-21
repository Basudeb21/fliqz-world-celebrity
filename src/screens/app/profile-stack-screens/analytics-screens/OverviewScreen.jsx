import React from 'react';
import { StyleSheet, View } from 'react-native';
import AnalyticsOverviewTop from './AnalyticsOverviewTop';
import { Colors } from '../../../../constants';
import { verticalScale } from 'react-native-size-matters';

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
