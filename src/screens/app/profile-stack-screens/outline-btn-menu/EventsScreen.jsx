import React, { useState } from 'react';
import { Dimensions, StyleSheet, View, useWindowDimensions } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackpressTopBar from '../../../../components/framework/navbar/BackpressTopBar';
import { Colors } from '../../../../constants';
import MyEventsLists from './sub-screen/MyEventsLists';
import AllEventsLists from './sub-screen/AllEventsLists';
import { moderateScale } from 'react-native-size-matters';

const MyEvents = () => (
    <View style={styles.scene}>
        <MyEventsLists />
    </View>
);

const AllEvents = () => (
    <View style={styles.scene}>
        <AllEventsLists />
    </View>
);

const EventsScreen = () => {
    const layout = useWindowDimensions();

    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'my', title: 'My Events' },
        { key: 'all', title: 'All Events' },
    ]);

    const renderScene = SceneMap({
        my: MyEvents,
        all: AllEvents,
    });

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.WHITE }}>
            <BackpressTopBar title="Events" />
            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={{ width: layout.width }}
                renderTabBar={props => (
                    <TabBar
                        {...props}
                        indicatorStyle={{ backgroundColor: Colors.PRIMARY ?? Colors.THEME }}
                        style={{ backgroundColor: Colors.WHITE }}
                        labelStyle={{ color: Colors.BLACK, fontWeight: '600' }}
                        activeColor={Colors.PRIMARY ?? Colors.THEME}
                        inactiveColor={Colors.GRAY ?? '#999'}
                    />
                )}
            />
        </SafeAreaView>
    );
};

export default EventsScreen;

const styles = StyleSheet.create({
    scene: {
        flex: 1,
    },
});
