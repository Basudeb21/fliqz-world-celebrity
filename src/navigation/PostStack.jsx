import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationStrings } from '../constants';
import { AllComments, AllReacts, AllTips } from '../screens/app/post-related';
import { LiveShows } from '../components/framework/tables';


const PostStack = () => {
    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name={NavigationStrings.ALL_COMMENTS} component={AllComments} />
            <Stack.Screen name={NavigationStrings.ALL_REACTS} component={AllReacts} />
            <Stack.Screen name={NavigationStrings.ALL_TIPS} component={AllTips} />
            <Stack.Screen name={NavigationStrings.LIVE_SHOWS} component={LiveShows} />
        </Stack.Navigator>
    );
}

export default PostStack