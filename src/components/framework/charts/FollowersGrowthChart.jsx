import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Svg, { Line, Circle, Path, G, Text as SvgText } from 'react-native-svg';
import { Colors } from '../../../constants';

const FollowersGrowthChart = () => {
    const [isMounted, setIsMounted] = React.useState(false);
    const screenWidth = Dimensions.get('window').width;
    const chartWidth = screenWidth - 64;
    const chartHeight = 220;
    const padding = 20;

    React.useEffect(() => {
        setIsMounted(true);
        return () => setIsMounted(false);
    }, []);

    const labels = ['13 Feb', '16 Feb', '19 Feb', '22 Feb', '25 Feb'];
    const dataPoints = [168, 169, 170.5, 172, 172.8];
    const yAxisSuffix = 'K';

    const xAxisLength = chartWidth - padding * 2;
    const yAxisLength = chartHeight - padding * 2;
    const x0 = padding;
    const y0 = padding + yAxisLength;

    const xStep = xAxisLength / (dataPoints.length - 1);
    const yMax = Math.max(...dataPoints) * 1.1;
    const yMin = Math.min(...dataPoints) * 0.9;
    const yScale = (value) => y0 - ((value - yMin) / (yMax - yMin)) * yAxisLength;

    let pathData = `M${x0},${yScale(dataPoints[0])}`;
    dataPoints.slice(1).forEach((point, index) => {
        pathData += ` L${x0 + (index + 1) * xStep},${yScale(point)}`;
    });

    if (!isMounted) {
        return null;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Followers Growth</Text>

            <Svg width={chartWidth} height={chartHeight} style={[styles.chart, { alignSelf: 'center' }]}>
                <G>
                    {labels.map((label, index) => (
                        <SvgText
                            key={`label-${index}`}
                            x={x0 + index * xStep}
                            y={y0 + 20}
                            fontSize="12"
                            textAnchor="middle"
                            fill={Colors.PLACEHOLDER}
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
                            fontSize="12"
                            textAnchor="end"
                            fill={Colors.PLACEHOLDER}
                        >
                            {value.toFixed(1)}{yAxisSuffix}
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
                    d={pathData}
                    fill="none"
                    stroke={Colors.PINK}
                    strokeWidth={3}
                />

                <G>
                    {dataPoints.map((point, index) => (
                        <Circle
                            key={`point-${index}`}
                            cx={x0 + index * xStep}
                            cy={yScale(point)}
                            r={5}
                            fill={Colors.WHITE}
                            stroke={Colors.PINK}
                            strokeWidth={2}
                        />
                    ))}
                </G>
            </Svg>

            <View style={styles.footer}>
                <Text style={styles.footerText}>Current Followers: 173.0K</Text>
            </View>
        </View>
    );
};

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
    },
    footer: {
        marginTop: 12,
        paddingTop: 8,
        borderTopWidth: 1,
        borderTopColor: Colors.HR_COLOR,
        alignItems: 'center',
    },
    footerText: {
        fontSize: 14,
        fontWeight: '600',
        color: Colors.BLACK,
    },
});

export default React.memo(FollowersGrowthChart);