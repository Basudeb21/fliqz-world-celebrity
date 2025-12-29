import React from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { AnalycisCard } from '../../../../components/framework/card';
import { Colors } from '../../../../constants';

const AnalyticsOverviewTop = ({ data }) => {

    return (
        <FlatList
            data={data}
            keyExtractor={(item, index) => item.id.toString() + index}
            numColumns={3}
            contentContainerStyle={styles.listContainer}
            columnWrapperStyle={styles.row}
            renderItem={({ item }) => (
                <AnalycisCard
                    head={item.head}
                    numeric={item.numeric}
                    Icon={item.Icon}
                    iconName={item.iconName}
                    color={item.color}
                    iconSize={item.iconSize}
                    growthRate={item.growthRate}
                    growthType={item.growthType}
                />
            )}
        />
    );
};

export default AnalyticsOverviewTop;

const styles = StyleSheet.create({
    areaView: {
        flex: 1,
        backgroundColor: Colors.THEME
    },
    container: {
        backgroundColor: Colors.WHITE,
        flex: 1
    },
    listContainer: {
        marginTop: verticalScale(10),
        marginHorizontal: moderateScale(10),
    },
    row: {
        justifyContent: 'space-between',
    },
});
