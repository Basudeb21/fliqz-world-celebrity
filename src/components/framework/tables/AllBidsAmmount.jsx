import { FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { Colors } from '../../../constants';
import LinearGradient from 'react-native-linear-gradient';
import { useSelector } from 'react-redux';
import { DateFormat } from '../../../utils/DateFormat';
import { GetBidListApi } from '../../../api/app/auction';


const AllBidsAmmount = ({ slug }) => {
    const [bidsTable, setBidsTable] = useState([]);
    const { token } = useSelector(state => state.auth);

    useEffect(() => {
        let isMounted = true;

        const fetchBids = async () => {
            const res = await GetBidListApi(token, slug);
            console.log("API Response:", res);

            if (res?.data && isMounted) {
                const formatted = res.data.map((item, index) => ({
                    id: item.id,
                    rank: index + 1,
                    name: item.user.name,
                    ammount: item.bid_amount,
                    time: DateFormat(item.created_at),
                }));
                setBidsTable(formatted);
            }
        };

        fetchBids();

        return () => {
            isMounted = false;
        };
    }, [slug]);

    const renderItem = ({ item }) => (
        <View style={styles.row}>
            <Text style={[styles.cell, styles.rank]}>{item.rank}</Text>
            <Text style={[styles.cell, styles.name]}>{item.name}</Text>
            <Text style={[styles.cell, styles.amount]}>₹ {item.ammount}</Text>
            <Text style={[styles.cell, styles.time]}>{item.time}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={[Colors.BUTTON_GRADIENT_ONE, Colors.BUTTON_GRADIENT_TWO]}
                style={[styles.row, styles.headerRow]}
            >
                <Text style={[styles.headerCell, styles.rank]}>Rank</Text>
                <Text style={[styles.headerCell, styles.name]}>Name</Text>
                <Text style={[styles.headerCell, styles.amount]}>Amount</Text>
                <Text style={[styles.headerCell, styles.time]}>Time</Text>
            </LinearGradient>

            {bidsTable.length === 0 ? (
                <Text style={{ textAlign: 'center', marginTop: 20 }}>No bids found</Text>
            ) : (
                <FlatList
                    data={bidsTable}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderItem}
                    contentContainerStyle={styles.listContent}
                />
            )}
        </View>
    );

};

export default AllBidsAmmount;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: moderateScale(10),
        backgroundColor: Colors.WHITE,
    },
    headerRow: {
        borderRadius: scale(5),
    },
    headerCell: {
        color: Colors.WHITE,
        fontWeight: '700',
        paddingVertical: verticalScale(8),
        textAlign: 'center',
        marginStart: moderateScale(10)

    },
    row: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: Colors.PLACEHOLDER,
        paddingVertical: verticalScale(8),
    },
    cell: {
        textAlign: 'center',
        fontSize: scale(14),
        color: Colors.TEXT_DARK,
    },
    rank: {
        flex: 0.4,
    },
    name: {
        flex: 1.8,
    },
    amount: {
        flex: 1,
    },
    time: {
        flex: 1,
    },
    listContent: {
        marginTop: verticalScale(5),
    },
});
