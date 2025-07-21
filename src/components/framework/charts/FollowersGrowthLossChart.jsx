import React from 'react';
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Colors } from '../../../constants';

const FollowersGrowthLossChart = React.memo(() => {
    const window = useWindowDimensions();
    const [isMounted, setIsMounted] = React.useState(false);

    React.useEffect(() => {
        setIsMounted(true);
        return () => setIsMounted(false);
    }, []);

    if (!isMounted) return null;

    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
            {
                data: [12000, 8000, 14000, 10000, 16000, 12000],
                color: () => Colors.PINK,
                strokeWidth: 3
            },
            {
                data: [4000, 6000, 2000, 8000, 4000, 6000],
                color: () => Colors.YELLOW,
                strokeWidth: 3
            }
        ]
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Followers Growth & Loss</Text>

            <LineChart
                data={data}
                width={window.width - 64}
                height={220}
                chartConfig={chartConfig}
                bezier
                style={styles.chart}
                yAxisSuffix=""
                yAxisInterval={2000}
                fromZero={false}
                withVerticalLines={false}
                propsForDots={{
                    0: {
                        r: 6,
                        strokeWidth: 2,
                        stroke: Colors.WHITE,
                        fill: Colors.PINK
                    },
                    1: {
                        r: 6,
                        strokeWidth: 2,
                        stroke: Colors.WHITE,
                        fill: Colors.YELLOW
                    }
                }}
            />

            <View style={styles.footer}>
                <View style={styles.legendItem}>
                    <View style={[styles.legendIndicator, { backgroundColor: Colors.PINK }]} />
                    <Text style={styles.legendText}>New Followers</Text>
                </View>
                <View style={styles.legendItem}>
                    <View style={[styles.legendIndicator, { backgroundColor: Colors.YELLOW, borderRadius: 100 }]} />
                    <Text style={styles.legendText}>Lost Followers</Text>
                </View>
            </View>
        </View>
    );
});

const chartConfig = {
    backgroundGradientFrom: Colors.BLUE,
    backgroundGradientTo: Colors.BLUE,
    decimalPlaces: 0,
    color: () => Colors.WHITE,
    labelColor: () => Colors.WHITE,
    style: {
        borderRadius: 12
    },
    propsForLabels: {
        fontSize: 10
    }
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.BLUE,
        borderRadius: 12,
        padding: 16,
        margin: 16,
        overflow: 'hidden',
        shadowColor: Colors.WHITE,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
        color: Colors.WHITE,
    },
    chart: {
        marginVertical: 8,
        borderRadius: 8,
        alignSelf: 'center'
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 12,
        paddingTop: 8,
        borderTopWidth: 1,
        borderTopColor: Colors.DULL_WHITE,
    },
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 12
    },
    legendIndicator: {
        width: 12,
        height: 12,
        borderRadius: 6,
        marginRight: 6,
    },
    legendText: {
        fontSize: 12,
        color: Colors.WHITE,
    },
});

export default FollowersGrowthLossChart;