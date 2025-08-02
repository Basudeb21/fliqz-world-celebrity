import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';
import Svg, { Path, G, Text as SvgText, Line, Circle, Defs, LinearGradient, Stop, Rect } from 'react-native-svg';
import * as d3 from 'd3-shape';
import { Colors } from '../../../constants';

const WeeklyEngagementChart = React.memo(() => {
    const window = useWindowDimensions();
    const [isMounted, setIsMounted] = useState(false);

    const chartWidth = window.width - 64;
    const chartHeight = 220;
    const padding = { top: 20, right: 20, bottom: 40, left: 40 };

    useEffect(() => {
        setIsMounted(true);
        return () => setIsMounted(false);
    }, []);

    if (!isMounted) return null;

    const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const datasets = [
        { data: [1200, 1850, 1700, 2100, 2400, 1800, 1200], color: Colors.PINK, label: 'Likes' },
        { data: [300, 420, 380, 520, 570, 430, 320], color: Colors.YELLOW, label: 'Comments' },
        { data: [150, 230, 200, 270, 310, 250, 170], color: Colors.GREEN, label: 'Shares' }
    ];

    const xScale = (index) => padding.left + (index * (chartWidth - padding.left - padding.right)) / (labels.length - 1);

    const allData = datasets.flatMap(d => d.data);
    const yMax = Math.max(...allData) * 1.1;
    const yMin = Math.min(...allData) * 0.9;
    const yScale = (value) => chartHeight - padding.bottom - ((value - yMin) / (yMax - yMin)) * (chartHeight - padding.top - padding.bottom);

    const createPath = (data) => {
        const line = d3.line()
            .curve(d3.curveLinear)
            .x((_, i) => xScale(i))
            .y(d => yScale(d));
        return line(data);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Weekly Engagement Metrics</Text>

            <Svg width={chartWidth} height={chartHeight} style={styles.chart}>
                <Defs>
                    <LinearGradient id="background" x1="0%" y1="0%" x2="0%" y2="100%">
                        <Stop offset="0%" stopColor={Colors.WHITE} />
                        <Stop offset="100%" stopColor={Colors.WHITE} />
                    </LinearGradient>
                </Defs>
                <Rect x="0" y="0" width={chartWidth} height={chartHeight} fill="url(#background)" rx="12" ry="12" />

                {[500, 1000, 1500, 2000, 2500].map((value) => {
                    if (value > yMax) return null;
                    return (
                        <Line
                            key={`grid-${value}`}
                            x1={padding.left}
                            y1={yScale(value)}
                            x2={chartWidth - padding.right}
                            y2={yScale(value)}
                            stroke={Colors.THEME}
                            strokeWidth={0.5}
                            strokeDasharray="4"
                        />
                    );
                })}

                {[500, 1000, 1500, 2000, 2500].map((value) => {
                    if (value > yMax) return null;
                    return (
                        <SvgText
                            key={`y-label-${value}`}
                            x={padding.left - 10}
                            y={yScale(value) + 4}
                            fontSize="10"
                            textAnchor="end"
                            fill={Colors.PLACEHOLDER}
                        >
                            {value}
                        </SvgText>
                    );
                })}

                <G>
                    {labels.map((label, index) => (
                        <SvgText
                            key={`label-${index}`}
                            x={xScale(index)}
                            y={chartHeight - 15}
                            fontSize="10"
                            textAnchor="middle"
                            fill={Colors.PLACEHOLDER}
                        >
                            {label}
                        </SvgText>
                    ))}
                </G>

                {datasets.map((dataset, datasetIndex) => (
                    <G key={`dataset-${datasetIndex}`}>
                        <Path
                            d={createPath(dataset.data)}
                            fill="none"
                            stroke={dataset.color}
                            strokeWidth={3}
                        />
                        {dataset.data.map((value, index) => (
                            <Circle
                                key={`point-${datasetIndex}-${index}`}
                                cx={xScale(index)}
                                cy={yScale(value)}
                                r={6}
                                fill={dataset.color}
                                stroke={Colors.THEME}
                                strokeWidth={2}
                            />
                        ))}
                    </G>
                ))}
            </Svg>

            <View style={styles.footer}>
                {datasets.map((dataset, index) => (
                    <View key={`legend-${index}`} style={styles.legendItem}>
                        <View style={[styles.legendIndicator, { backgroundColor: dataset.color }]} />
                        <Text style={styles.legendText}>{dataset.label}</Text>
                    </View>
                ))}
            </View>
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.WHITE,
        borderRadius: 12,
        padding: 16,
        margin: 16,
        overflow: 'hidden',
        shadowColor: Colors.BLACK,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
        color: Colors.THEME,
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
        color: Colors.BLACK,
    },
});

export default WeeklyEngagementChart;