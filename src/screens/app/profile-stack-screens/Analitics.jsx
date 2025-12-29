import * as React from 'react';
import { StyleSheet, Text, View, useWindowDimensions, BackHandler } from 'react-native';
import { TabView, TabBar } from 'react-native-tab-view';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
    engagementDataArray,
    growthDataArray,
    overviewDataArray,
    postsDataArray,
} from '../../../data/analyticsData';
import { FollowersGrowthChart, FollowersGrowthLossChart, RecentPostPerformanceChart, WeeklyEngagementChart } from '../../../components/framework/charts';
import { BackpressTopBar } from '../../../components/framework/navbar';
import { Colors } from '../../../constants';
import { OverviewScreen } from './analytics-screens';

export default function Analytics() {
    const layout = useWindowDimensions();
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'overview', title: 'Overview' },
        { key: 'growth', title: 'Growth' },
        { key: 'engagement', title: 'Engagement' },
        { key: 'posts', title: 'Posts' },
    ]);

    React.useEffect(() => {
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            () => {
                // Let default back action occur
                return false;
            }
        );

        return () => backHandler.remove();
    }, []);

    const renderScene = ({ route }) => {
        switch (route.key) {
            case 'overview':
                return (
                    <View key={`overview-${Date.now()}`} style={styles.scene}>
                        <OverviewScreen data={overviewDataArray} />
                        <FollowersGrowthChart key={`fg-chart-${Date.now()}`} />
                    </View>
                );
            case 'growth':
                return (
                    <View key={`growth-${Date.now()}`} style={styles.scene}>
                        <OverviewScreen data={growthDataArray} />
                        <FollowersGrowthLossChart key={`fgl-chart-${Date.now()}`} />
                    </View>
                );
            case 'engagement':
                return (
                    <View key={`engagement-${Date.now()}`} style={styles.scene}>
                        <OverviewScreen data={engagementDataArray} />
                        <WeeklyEngagementChart key={`we-chart-${Date.now()}`} />
                    </View>
                );
            case 'posts':
                return (
                    <View key={`posts-${Date.now()}`} style={styles.scene}>
                        <OverviewScreen data={postsDataArray} />
                        <RecentPostPerformanceChart key={`rpp-chart-${Date.now()}`} />
                    </View>
                );
            default:
                return null;
        }
    };

    return (
        <SafeAreaView style={styles.areaView}>
            <BackpressTopBar title="Analytics" />
            <View style={styles.container}>
                <TabView
                    navigationState={{ index, routes }}
                    renderScene={renderScene}
                    onIndexChange={setIndex}
                    initialLayout={{ width: layout.width }}
                    lazy
                    renderLazyPlaceholder={() => (
                        <View style={{ flex: 1, backgroundColor: Colors.WHITE }} />
                    )}
                    removeClippedSubviews={true}
                    renderTabBar={(props) => (
                        <TabBar
                            {...props}
                            indicatorStyle={{ backgroundColor: Colors.THEME }}
                            style={{ backgroundColor: Colors.WHITE, height: 40 }}
                            tabStyle={{ padding: 0, minHeight: 30 }}
                            activeColor={Colors.THEME}
                            inactiveColor={Colors.BLACK}
                            labelStyle={{
                                fontSize: 12,
                                margin: 0,
                                padding: 0,
                                fontWeight: 'normal',
                            }}
                            renderLabel={({ route, focused, color }) => (
                                <Text
                                    style={{
                                        color,
                                        fontSize: 12,
                                        fontWeight: focused ? 'bold' : 'normal',
                                        textTransform: 'capitalize',
                                        includeFontPadding: false,
                                        textAlignVertical: 'center',
                                    }}
                                >
                                    {route.title}
                                </Text>
                            )}
                        />
                    )}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    areaView: {
        flex: 1,
        backgroundColor: Colors.THEME
    },
    container: {
        backgroundColor: Colors.WHITE,
        flex: 1
    },
    scene: {
        flex: 1,
        maxWidth: '100%',
    },
});