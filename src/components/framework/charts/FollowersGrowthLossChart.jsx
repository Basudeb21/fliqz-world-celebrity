import React from 'react';
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';
import Svg, { Line, Circle, Path, G, Text as SvgText } from 'react-native-svg';
import { Colors } from '../../../constants';

const FollowersGrowthLossChart = React.memo(() => {
    const window = useWindowDimensions();
    const [isMounted, setIsMounted] = React.useState(false);
    const chartWidth = window.width - 64;
    const chartHeight = 220;
    const padding = 20;

    React.useEffect(() => {
        setIsMounted(true);
        return () => setIsMounted(false);
    }, []);

    const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    const growthData = [12000, 8000, 14000, 10000, 16000, 12000];
    const lossData = [4000, 6000, 2000, 8000, 4000, 6000];

    const xAxisLength = chartWidth - padding * 2;
    const yAxisLength = chartHeight - padding * 2;
    const x0 = padding;
    const y0 = padding + yAxisLength;

    const xStep = xAxisLength / (labels.length - 1);
    const allData = [...growthData, ...lossData];
    const yMax = Math.max(...allData) * 1.1;
    const yMin = Math.min(...allData) * 0.9;
    const yScale = (value) => y0 - ((value - yMin) / (yMax - yMin)) * yAxisLength;

    const createPathData = (data) => {
        let path = `M${x0},${yScale(data[0])}`;
        data.slice(1).forEach((point, index) => {
            path += ` L${x0 + (index + 1) * xStep},${yScale(point)}`;
        });
        return path;
    };

    if (!isMounted) return null;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Followers Growth & Loss</Text>

            <Svg width={chartWidth} height={chartHeight} style={styles.chart}>
                <G>
                    {labels.map((label, index) => (
                        <SvgText
                            key={`label-${index}`}
                            x={x0 + index * xStep}
                            y={y0 + 20}
                            fontSize="10"
                            textAnchor="middle"
                            fill={Colors.BLACK}
                        >
                            {label}
                        </SvgText>
                    ))}
                </G>

                <G>
                    {[yMin, (yMin + yMax) / 2, yMax].map((value, index) => (
                        <SvgText
                            key={`y-label-${index}`}
                            x={x0 - 10}
                            y={yScale(value) + 4}
                            fontSize="10"
                            textAnchor="end"
                            fill={Colors.BLACK}
                        >
                            {Math.round(value)}
                        </SvgText>
                    ))}
                </G>

                <G>
                    {[yMin, (yMin + yMax) / 2, yMax].map((value, index) => (
                        <Line
                            key={`grid-${index}`}
                            x1={x0}
                            y1={yScale(value)}
                            x2={x0 + xAxisLength}
                            y2={yScale(value)}
                            stroke={Colors.THEME}
                            strokeWidth={0.5}
                            strokeDasharray="4 4"
                        />
                    ))}
                </G>

                <Path
                    d={createPathData(growthData)}
                    fill="none"
                    stroke={Colors.PINK}
                    strokeWidth={3}
                />

                <Path
                    d={createPathData(lossData)}
                    fill="none"
                    stroke={Colors.YELLOW}
                    strokeWidth={3}
                />

                <G>
                    {growthData.map((point, index) => (
                        <Circle
                            key={`growth-point-${index}`}
                            cx={x0 + index * xStep}
                            cy={yScale(point)}
                            r={6}
                            fill={Colors.PINK}
                            stroke={Colors.THEME}
                            strokeWidth={2}
                        />
                    ))}
                </G>

                <G>
                    {lossData.map((point, index) => (
                        <Circle
                            key={`loss-point-${index}`}
                            cx={x0 + index * xStep}
                            cy={yScale(point)}
                            r={6}
                            fill={Colors.YELLOW}
                            stroke={Colors.THEME}
                            strokeWidth={2}
                        />
                    ))}
                </G>
            </Svg>

            <View style={styles.footer}>
                <View style={styles.legendItem}>
                    <View style={[styles.legendIndicator, { backgroundColor: Colors.PINK }]} />
                    <Text style={styles.legendText}>New Followers</Text>
                </View>
                <View style={styles.legendItem}>
                    <View style={[styles.legendIndicator, { backgroundColor: Colors.YELLOW }]} />
                    <Text style={styles.legendText}>Lost Followers</Text>
                </View>
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
        borderTopColor: Colors.HR_COLOR,
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

export default FollowersGrowthLossChart;