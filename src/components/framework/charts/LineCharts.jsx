import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
    VictoryChart,
    VictoryLine,
    VictoryAxis
} from 'victory-native';

const LineCharts = () => {
    const data = [
        { x: '13 Feb', y: 168000 },
        // ...
    ];

    const formatNumber = (num) => (num / 1000).toFixed(0) + 'K';

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Followers Growth</Text>
            <View style={styles.chartContainer}>
                <VictoryChart domainPadding={20} height={250}>
                    <VictoryLine
                        data={data}
                        style={{ data: { stroke: "#4CAF50", strokeWidth: 3 } }}
                        interpolation="natural"
                    />
                    <VictoryAxis
                        dependentAxis
                        tickFormat={formatNumber}
                        style={{
                            axis: { stroke: "transparent" },
                            tickLabels: { fontSize: 10, padding: 5 },
                            grid: { stroke: "#e0e0e0", strokeDasharray: "4" }
                        }}
                    />
                    <VictoryAxis
                        tickValues={data.map(item => item.x)}
                        style={{
                            tickLabels: { fontSize: 10, padding: 5, angle: -45, textAnchor: 'end' },
                            axis: { stroke: "transparent" }
                        }}
                    />
                </VictoryChart>
            </View>
            <View style={styles.footer}>
                <Text style={styles.footerText}>Current Followers: 173.0K</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 8,
        elevation: 2,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#333',
    },
    chartContainer: {
        marginLeft: -20,
        marginRight: -20,
    },
    footer: {
        marginTop: 16,
        paddingTop: 8,
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
    },
    footerText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
    },
});

export default LineCharts;
