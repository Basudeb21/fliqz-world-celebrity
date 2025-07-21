import { FlatList, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { bidsTable } from '../../../data/bidsTable';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { Colors } from '../../../constants';
import LinearGradient from 'react-native-linear-gradient';

const AllBidsAmmount = () => {
    const renderItem = ({ item }) => (
        <View style={styles.row}>
            <Text style={[styles.cell, styles.rank]}>{item.rank}</Text>
            <Text style={[styles.cell, styles.name]}>{item.name}</Text>
            <Text style={[styles.cell, styles.amount]}>{item.ammount}</Text>
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

            <FlatList
                data={bidsTable}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                contentContainerStyle={styles.listContent}
            />
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
