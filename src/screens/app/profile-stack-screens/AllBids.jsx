import { StyleSheet } from 'react-native';
import React from 'react';
import AllBidsAmmount from '../../../components/framework/tables/AllBidsAmmount';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackpressTopBar from '../../../components/framework/navbar/BackpressTopBar';
import BidTopper from '../../../components/framework/card/BidTopper';
import { Colors } from '../../../constants';

const AllBids = () => {
    return (
        <SafeAreaView style={styles.container}>
            <BackpressTopBar title={"All Bids"} />
            <BidTopper />
            <AllBidsAmmount />
        </SafeAreaView>
    );
};

export default AllBids;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.WHITE
    },
});
