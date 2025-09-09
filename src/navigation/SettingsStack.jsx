import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationStrings } from '../constants';
import { AddSupportTicketScreen, ChangePassword, DisplayAllAddress, EditAddress, EditProfile, Payments, Privacy, Promotion, SubscriptionPrice, SupportTicket, UpdateAddress, Verify } from '../screens/app/profile-stack-screens/outline-btn-menu/settings-screen';

const SettingsStack = () => {
    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name={NavigationStrings.SETTINGS_EDIT_PROFILE_SCREEN} component={EditProfile} />
            <Stack.Screen name={NavigationStrings.SETTINGS_CHANGE_PASSWORD_SCREEN} component={ChangePassword} />
            <Stack.Screen name={NavigationStrings.SETTINGS_EDIT_ADDRESS_SCREEN} component={EditAddress} />
            <Stack.Screen name={NavigationStrings.SETTINGS_PAYMENT_SCREEN} component={Payments} />
            <Stack.Screen name={NavigationStrings.SETTINGS_SUBSCRIPTION_PRICE_SCREEN} component={SubscriptionPrice} />
            <Stack.Screen name={NavigationStrings.SETTINGS_PRIVACY_SCREEN} component={Privacy} />
            <Stack.Screen name={NavigationStrings.SETTINGS_VERIFY_ID_SCREEN} component={Verify} />
            <Stack.Screen name={NavigationStrings.SETTINGS_SUPPORT_TICKET_SCREEN} component={SupportTicket} />
            <Stack.Screen name={NavigationStrings.SETTINGS_PROMOTION_SCREEN} component={Promotion} />
            <Stack.Screen name={NavigationStrings.SETTINGS_ADD_SUPPORT_TICKET_SCREEN} component={AddSupportTicketScreen} />
            <Stack.Screen name={NavigationStrings.PROFILE_ALL_ADDRESS} component={DisplayAllAddress} />
            <Stack.Screen name={NavigationStrings.SETTINGS_UPDATE_ADDRESS} component={UpdateAddress} />

        </Stack.Navigator>
    );
}

export default SettingsStack