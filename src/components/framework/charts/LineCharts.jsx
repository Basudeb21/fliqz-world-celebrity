import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, Animated, TouchableWithoutFeedback } from 'react-native';
import Svg, { Path, G, Text as SvgText, Line, Circle, Rect } from 'react-native-svg';
import * as d3 from 'd3-shape';

const LineCharts = () => {
    const [tooltip, setTooltip] = useState({ visible: false, x: 0, y: 0, value: '' });
    const animation = useRef(new Animated.Value(0)).current;
    const [dimensions, setDimensions] = useState({
        width: Dimensions.get('window').width - 32,
        height: 250
    });

    const data = [
        { x: '13 Feb', y: 168000 },
        { x: '16 Feb', y: 178000 },
        { x: '19 Feb', y: 160000 },
        { x: '22 Feb', y: 198000 }
    ];

    const padding = { top: 20, right: 20, bottom: 40, left: 40 };

    useEffect(() => {
        Animated.timing(animation, {
            toValue: 1,
            duration: 1500,
            useNativeDriver: true,
        }).start();

        const updateDimensions = ({ window }) => {
            setDimensions({
                width: window.width - 32,
                height: 250
            });
        };

        Dimensions.addEventListener('change', updateDimensions);
        return () => Dimensions.removeEventListener('change', updateDimensions);
    }, []);

    const formatNumber = (num) => (num / 1000).toFixed(0) + 'K';

    const xScale = (index) =>
        padding.left + (index * (dimensions.width - padding.left - padding.right)) / (data.length - 1);

    const yMax = Math.max(...data.map(d => d.y)) * 1.1;
    const yMin = Math.min(...data.map(d => d.y)) * 0.9;
    const yScale = (value) =>
        dimensions.height - padding.bottom - ((value - yMin) / (yMax - yMin)) * (dimensions.height - padding.top - padding.bottom);

    const lineGenerator = d3.line()
        .curve(d3.curveNatural)
        .x((d, i) => xScale(i))
        .y(d => yScale(d.y));

    const fullPath = lineGenerator(data);
    const animatedPath = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [
            lineGenerator(data.map((d, i) => ({ ...d, y: yMin }))), // Start from bottom
            fullPath // End at actual path
        ]
    });

    const handlePress = (event) => {
        const touchX = event.nativeEvent.locationX;
        const closestIndex = Math.round(
            ((touchX - padding.left) / (dimensions.width - padding.left - padding.right)) * (data.length - 1)
        );

        if (closestIndex >= 0 && closestIndex < data.length) {
            setTooltip({
                visible: true,
                x: xScale(closestIndex),
                y: yScale(data[closestIndex].y) - 30,
                value: `${data[closestIndex].x}: ${formatNumber(data[closestIndex].y)}`
            });

            setTimeout(() => setTooltip({ ...tooltip, visible: false }), 2000);
        }
    };

    const yTicks = [yMin, (yMin + yMax) / 2, yMax].map(v => ({
        value: v,
        yPos: yScale(v)
    }));

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Followers Growth</Text>

            <TouchableWithoutFeedback onPress={handlePress}>
                <View>
                    <Svg width={dimensions.width} height={dimensions.height} style={styles.chartContainer}>
                        {/* Y Axis Grid Lines */}
                        <G>
                            {yTicks.map((tick, i) => (
                                <Line
                                    key={`grid-${i}`}
                                    x1={padding.left}
                                    y1={tick.yPos}
                                    x2={dimensions.width - padding.right}
                                    y2={tick.yPos}
                                    stroke="#e0e0e0"
                                    strokeDasharray="4"
                                    strokeWidth={1}
                                />
                            ))}
                        </G>

                        {/* Y Axis Labels */}
                        <G>
                            {yTicks.map((tick, i) => (
                                <SvgText
                                    key={`y-label-${i}`}
                                    x={padding.left - 10}
                                    y={tick.yPos + 4}
                                    fontSize={10}
                                    textAnchor="end"
                                    fill="#333"
                                >
                                    {formatNumber(tick.value)}
                                </SvgText>
                            ))}
                        </G>

                        {/* X Axis Labels */}
                        <G>
                            {data.map((item, i) => (
                                <SvgText
                                    key={`x-label-${i}`}
                                    x={xScale(i)}
                                    y={dimensions.height - 10}
                                    fontSize={10}
                                    textAnchor="end"
                                    fill="#333"
                                    rotation={-45}
                                    origin={`${xScale(i)}, ${dimensions.height - 10}`}
                                >
                                    {item.x}
                                </SvgText>
                            ))}
                        </G>

                        {/* Animated Data Line */}
                        <Path
                            d={animatedPath.__getValue()}
                            fill="none"
                            stroke="#4CAF50"
                            strokeWidth={3}
                        />

                        {/* Data Points */}
                        <G>
                            {data.map((item, i) => (
                                <Circle
                                    key={`point-${i}`}
                                    cx={xScale(i)}
                                    cy={yScale(item.y)}
                                    r={4}
                                    fill="#4CAF50"
                                    stroke="white"
                                    strokeWidth={1}
                                />
                            ))}
                        </G>

                        {/* Tooltip */}
                        {tooltip.visible && (
                            <G>
                                <Rect
                                    x={tooltip.x - 50}
                                    y={tooltip.y - 20}
                                    width={100}
                                    height={30}
                                    fill="white"
                                    stroke="#4CAF50"
                                    rx={4}
                                />
                                <SvgText
                                    x={tooltip.x}
                                    y={tooltip.y}
                                    fontSize={10}
                                    textAnchor="middle"
                                    fill="#333"
                                >
                                    {tooltip.value}
                                </SvgText>
                            </G>
                        )}
                    </Svg>
                </View>
            </TouchableWithoutFeedback>

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