import * as React from 'react';
import { StyleSheet, Text, View, useWindowDimensions, BackHandler } from 'react-native';
import { TabView, TabBar } from 'react-native-tab-view';
import BackpressTopBar from '../../../components/framework/navbar/BackpressTopBar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../../constants';
import {
    engagementDataArray,
    growthDataArray,
    overviewDataArray,
    postsDataArray,
} from '../../../data/analyticsData';
import OverviewScreen from './analytics-screens/OverviewScreen';
import FollowersGrowthChart from '../../../components/framework/charts/FollowersGrowthChart';
import FollowersGrowthLossChart from '../../../components/framework/charts/FollowersGrowthLossChart';
import WeeklyEngagementChart from '../../../components/framework/charts/WeeklyEngagementChart';
import RecentPostPerformanceChart from '../../../components/framework/charts/RecentPostPerformanceChart';

export default function Analytics() {
    const layout = useWindowDimensions();
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'overview', title: 'Overview' },
        { key: 'growth', title: 'Growth' },
        { key: 'engagement', title: 'Engagement' },
        { key: 'posts', title: 'Posts' },
    ]);

    // Handle back press
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
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.WHITE }}>
            <BackpressTopBar title="Analytics" />
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
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    scene: {
        flex: 1,
        maxWidth: '100%',
    },
});