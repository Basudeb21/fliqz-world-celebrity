import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';
import Svg, { Rect, G, Text as SvgText, Line } from 'react-native-svg';
import { Colors } from '../../../constants';

const RecentPostPerformanceChart = React.memo(() => {
    const window = useWindowDimensions();
    const [isMounted, setIsMounted] = useState(false);

    const chartWidth = window.width - 64;
    const chartHeight = 300;
    const padding = { top: 20, right: 20, bottom: 40, left: 50 };

    useEffect(() => {
        setIsMounted(true);
        return () => setIsMounted(false);
    }, []);

    if (!isMounted) return null;

    const data = {
        labels: ['Post 1', 'Post 2', 'Post 3', 'Post 4', 'Post 5', 'Post 6'],
        series: [
            [1250, 320, 180],   // Likes, Comments, Shares for Post 1
            [1900, 440, 230],   // Post 2
            [1700, 380, 200],   // Post 3
            [2100, 520, 270],   // Post 4
            [2400, 700, 350],   // Post 5
            [1900, 400, 200],   // Post 6
        ],
        colors: [Colors.CYAN, Colors.YELLOW, Colors.PURPLE],
        legend: ['Likes', 'Comments', 'Shares']
    };

    // Calculate scales
    const xScale = (index) => padding.left + (index * (chartWidth - padding.left - padding.right)) / (data.labels.length - 1);
    const barWidth = (chartWidth - padding.left - padding.right) / data.labels.length * 0.6;

    const maxTotal = Math.max(...data.series.map(post => post.reduce((a, b) => a + b, 0)));
    const yScale = (value) => chartHeight - padding.bottom - (value / maxTotal) * (chartHeight - padding.top - padding.bottom);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Recent Post Performance</Text>

            <View style={styles.chartWrapper}>
                <Svg width={chartWidth} height={chartHeight}>
                    {/* X Axis Labels */}
                    <G>
                        {data.labels.map((label, index) => (
                            <SvgText
                                key={`label-${index}`}
                                x={xScale(index) + barWidth / 2}
                                y={chartHeight - 15}
                                fontSize="10"
                                textAnchor="middle"
                                fill={Colors.BLACK}
                            >
                                {label}
                            </SvgText>
                        ))}
                    </G>

                    {/* Y Axis Grid Lines */}
                    <G>
                        {[0.25, 0.5, 0.75, 1].map((frac, i) => {
                            const y = yScale(frac * maxTotal);
                            return (
                                <G key={`grid-${i}`}>
                                    <Line
                                        x1={padding.left}
                                        y1={y}
                                        x2={chartWidth - padding.right}
                                        y2={y}
                                        stroke={Colors.THEME}
                                        strokeDasharray="4"
                                    />
                                    <SvgText
                                        x={padding.left - 10}
                                        y={y + 4}
                                        fontSize="10"
                                        textAnchor="end"
                                        fill={Colors.BLACK}
                                    >
                                        {Math.round(frac * maxTotal)}
                                    </SvgText>
                                </G>
                            );
                        })}
                    </G>

                    {/* Stacked Bars */}
                    {data.series.map((postData, postIndex) => {
                        let currentY = yScale(0);
                        return postData.map((value, seriesIndex) => {
                            const height = yScale(0) - yScale(value);
                            const y = currentY - height;
                            currentY = y;

                            return (
                                <Rect
                                    key={`bar-${postIndex}-${seriesIndex}`}
                                    x={xScale(postIndex)}
                                    y={y}
                                    width={barWidth}
                                    height={height}
                                    fill={data.colors[seriesIndex]}
                                    rx={2}
                                    ry={2}
                                />
                            );
                        });
                    })}
                </Svg>
            </View>

            <PostLegend />
        </View>
    );
});

// Keep your existing PostLegend component and styles exactly the same
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

// Your existing styles remain unchanged
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