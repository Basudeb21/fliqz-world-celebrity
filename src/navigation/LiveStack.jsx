import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationStrings } from '../constants';
import LiveShows from '../screens/app/post-related/LiveShows';
const LiveStack = () => {
    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name={NavigationStrings.LIVE_SHOWS} component={LiveShows} />
        </Stack.Navigator>
    );
}

export default LiveStack