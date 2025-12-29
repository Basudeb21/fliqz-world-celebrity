import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';

import { Colors } from '../../../../../constants';
import { DateFormat } from '../../../../../utils/DateFormat';
import { BidTopper } from '../../../../../components/framework/card';
import { BackpressTopBar } from '../../../../../components/framework/navbar';
import { AllBidsAmmount } from '../../../../../components/framework/tables';
import { GetBidListApi } from '../../../../../api/app/auction';

const AllBids = ({ route }) => {
    const { slug } = route.params;
    const { token } = useSelector(state => state.auth);
    const [topper, setTopper] = useState(null);

    useEffect(() => {
        const fetchBids = async () => {
            const res = await GetBidListApi(token, slug);
            if (res?.data?.length > 0) {
                const sorted = res.data.sort((a, b) => b.bid_amount - a.bid_amount);
                const top = sorted[0];
                setTopper({
                    name: top.user.name,
                    amount: top.bid_amount,
                    date: DateFormat(top.created_at),
                });
            }
        };

        fetchBids();
    }, [slug]);

    return (
        <SafeAreaView style={styles.areaView}>
            <BackpressTopBar title={"All Bids"} />
            <View style={styles.container}>
                <BidTopper
                    name={topper?.name || '---'}
                    amount={topper?.amount || '---'}
                    date={topper?.date || '---'}
                />
                <AllBidsAmmount slug={slug} />
            </View>
        </SafeAreaView>
    );
};

export default AllBids;

const styles = StyleSheet.create({
    areaView: {
        flex: 1,
        backgroundColor: Colors.THEME
    },
    container: {
        backgroundColor: Colors.WHITE,
        flex: 1
    },
});
