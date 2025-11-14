import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationStrings } from '../constants';
import MainStack from './MainStack';
import { LoginScreen, SignupScreen } from '../screens/auth';

const AuthStack = () => {
    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name={NavigationStrings.LOGIN_SCREEN} component={LoginScreen} />
            <Stack.Screen name={NavigationStrings.SIGNUP_SCREEN} component={SignupScreen} />
            <Stack.Screen name={NavigationStrings.MAIN_STACK} component={MainStack} />

        </Stack.Navigator>
    )
}

export default AuthStack