import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';
import { StackedBarChart } from 'react-native-chart-kit';
import { Colors } from '../../../constants';

const RecentPostPerformanceChart = React.memo(() => {
    const window = useWindowDimensions();
    const [isMounted, setIsMounted] = useState(false);

    const chartDimensions = {
        width: window.width - 64,
        height: 300
    };

    useEffect(() => {
        setIsMounted(true);
        return () => setIsMounted(false);
    }, []);

    if (!isMounted) return null;

    const data = {
        labels: ['Post 1', 'Post 2', 'Post 3', 'Post 4', 'Post 5', 'Post 6'],
        legend: ['Likes', 'Comments', 'Shares'],
        data: [
            [1250, 320, 180],
            [1900, 440, 230],
            [1700, 380, 200],
            [2100, 520, 270],
            [2400, 700, 350],
            [1900, 400, 200],
        ],
        barColors: [Colors.CYAN, Colors.YELLOW, Colors.PURPLE],
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Recent Post Performance</Text>
            <View style={styles.chartWrapper}>
                <StackedBarChart
                    data={data}
                    width={chartDimensions.width}
                    height={chartDimensions.height}
                    chartConfig={chartConfig}
                    style={styles.chart}
                    hideLegend
                />
            </View>
            <PostLegend />
        </View>
    );
});

const PostLegend = React.memo(() => (
    <View style={styles.legendContainer}>
        <View style={styles.legendItem}>
            <View style={[styles.legendIndicator, { backgroundColor: Colors.CYAN }]} />
            <Text style={styles.legendText}>Likes</Text>
        </View>
        <View style={styles.legendItem}>
            <View style={[styles.legendIndicator, { backgroundColor: Colors.YELLOW }]} />
            <Text style={styles.legendText}>Comments</Text>
        </View>
        <View style={styles.legendItem}>
            <View style={[styles.legendIndicator, { backgroundColor: Colors.PURPLE }]} />
            <Text style={styles.legendText}>Shares</Text>
        </View>
    </View>
));

const chartConfig = {
    backgroundGradientFrom: Colors.WHITE,
    backgroundGradientTo: Colors.WHITE,
    decimalPlaces: 0,
    color: () => Colors.BLACK,
    labelColor: () => Colors.BLACK,
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.WHITE,
        borderRadius: 12,
        padding: 16,
        margin: 16,
        shadowColor: Colors.BLACK,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 16,
        color: Colors.BLACK,
        textAlign: 'left',
    },
    chartWrapper: {
        alignItems: 'center'
    },
    chart: {
        borderRadius: 8,
    },
    legendContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 16,
        paddingTop: 12,
        borderTopWidth: 1,
        borderTopColor: Colors.LIGHT_GRAY,
        flexWrap: 'wrap',
    },
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 12,
        marginVertical: 4,
    },
    legendIndicator: {
        width: 12,
        height: 12,
        borderRadius: 6,
        marginRight: 6,
    },
    legendText: {
        fontSize: 12,
        color: Colors.DARK_GRAY,
    },
});

export default RecentPostPerformanceChart;