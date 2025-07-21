import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SplashInfo } from '../screens/splash';
import { NavigationStrings } from '../constants';
import AuthStack from './AuthStack';
import MainStack from './MainStack';
import LoadingScreen from '../screens/splash/LoadingScreen';

const SplashStack = () => {
    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name={NavigationStrings.SPLASH_SCREEN} component={LoadingScreen} />
            <Stack.Screen name={NavigationStrings.SPLASH_INFO} component={SplashInfo} />
            <Stack.Screen name={NavigationStrings.AUTH_STACK} component={AuthStack} />
            <Stack.Screen name={NavigationStrings.MAIN_STACK} component={MainStack} />
        </Stack.Navigator>
    );
}

export default SplashStack