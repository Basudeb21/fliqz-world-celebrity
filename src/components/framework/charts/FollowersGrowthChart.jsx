import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Colors } from '../../../constants';

const FollowersGrowthChart = () => {
    const [isMounted, setIsMounted] = React.useState(false);
    const screenWidth = Dimensions.get('window').width;

    React.useEffect(() => {
        setIsMounted(true);
        return () => setIsMounted(false);
    }, []);

    const data = {
        labels: ['13 Feb', '16 Feb', '19 Feb', '22 Feb', '25 Feb'],
        datasets: [
            {
                data: [168, 169, 170.5, 172, 172.8],
                color: (opacity = 1) => `rgba(251, 39, 82, ${opacity})`,
                strokeWidth: 3
            }
        ],
        legend: ["Followers Growth"]
    };

    const chartConfig = {
        backgroundGradientFrom: Colors.WHITE,
        backgroundGradientTo: Colors.WHITE,
        decimalPlaces: 1,
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        style: {
            borderRadius: 12
        },
        propsForDots: {
            r: "5",
            strokeWidth: "2",
            stroke: Colors.PINK
        }
    };

    if (!isMounted) {
        return null;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Followers Growth</Text>

            <LineChart
                data={data}
                width={screenWidth - 64}
                height={220}
                chartConfig={chartConfig}
                bezier
                style={[styles.chart, { alignSelf: 'center' }]}
                yAxisSuffix="K"
                yAxisInterval={1}
                fromZero={false}
            />

            <View style={styles.footer}>
                <Text style={styles.footerText}>Current Followers: 173.0K</Text>
            </View>
        </View>
    );
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
    },
    footer: {
        marginTop: 12,
        paddingTop: 8,
        borderTopWidth: 1,
        borderTopColor: Colors.DULL_WHITE,
        alignItems: 'center',
    },
    footerText: {
        fontSize: 14,
        fontWeight: '600',
        color: Colors.WHITE,
    },
});

export default React.memo(FollowersGrowthChart);