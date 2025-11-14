import React, { useState } from 'react';
import { StyleSheet, View, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { Colors } from '../../../constants';
import { dummySubscriptionData } from '../../../data/dummySubscriptionData';
import { Spacer } from '../../../components/framework/boots';
import { BackpressTopBar } from '../../../components/framework/navbar';
import { SimpleTable } from '../../../components/framework/tables';

const SubscriptionsTab = () => (
    <View style={styles.tabContainer}>
        <SimpleTable data={dummySubscriptionData} />
    </View>
);

const SubscribersTab = () => (
    <View style={styles.tabContainer}>
        <SimpleTable data={dummySubscriptionData} />
    </View>
);

const Subscriptions = () => {
    const layout = useWindowDimensions();
    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'subscriptions', title: 'Subscriptions' },
        { key: 'subscribers', title: 'Subscribers' },
    ]);

    const renderScene = SceneMap({
        subscriptions: SubscriptionsTab,
        subscribers: SubscribersTab,
    });

    return (
        <SafeAreaView style={styles.container}>
            <BackpressTopBar title="My Subscriptions" />
            <Spacer height={10} />
            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={{ width: layout.width }}
                renderTabBar={props => (
                    <TabBar
                        {...props}
                        indicatorStyle={{ backgroundColor: Colors.THEME }}
                        style={{ backgroundColor: Colors.WHITE }}
                        labelStyle={{ color: Colors.THEME, fontWeight: 'bold' }}
                        inactiveColor={Colors.BLACK}
                        activeColor={Colors.THEME}
                    />
                )}
            />
        </SafeAreaView>
    );
};

export default Subscriptions;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.WHITE,
    },
    tabContainer: {
        flex: 1,
    },
});
