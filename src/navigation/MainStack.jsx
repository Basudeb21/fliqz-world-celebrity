import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationStrings } from '../constants';
import { BottomNavbar } from '../components/framework/navbar';
import HomeStack from './HomeStack';
import ChatStack from './ChatStack';
import ProfileStack from './ProfileStack';
import PostStack from './PostStack';
import AuthStack from './AuthStack';


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
            <Stack.Screen
                name={NavigationStrings.AUTH_STACK}
                component={AuthStack}
            />

        </Stack.Navigator>
    );
};

export default MainStack;
