import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationStrings } from '../constants';
import HomeStack from './HomeStack';
import ChatStack from './ChatStack';
import BottomNavbar from '../components/framework/navbar/BottomNavbar';
import ProfileStack from './ProfileStack';
import PostStack from './PostStack';

const MainStack = () => {
    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen
                name={NavigationStrings.BOTTOM_NAVBAR}
                component={BottomNavbar}
            />
            <Stack.Screen
                name={NavigationStrings.HOME_STACK}
                component={HomeStack}
            />
            <Stack.Screen
                name={NavigationStrings.CHAT_STACK}
                component={ChatStack}
            />
            <Stack.Screen
                name={NavigationStrings.PROFILE_STACK}
                component={ProfileStack}
            />
            <Stack.Screen name={NavigationStrings.POST_STACK} component={PostStack} />

        </Stack.Navigator>
    );
};

export default MainStack;
