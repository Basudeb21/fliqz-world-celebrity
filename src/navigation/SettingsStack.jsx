import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationStrings } from '../constants';
import EditProfile from '../screens/app/profile-stack-screens/EditProfile';
import ChangePassword from '../screens/app/profile-stack-screens/outline-btn-menu/settings-screen/ChangePassword';
import EditAddress from '../screens/app/profile-stack-screens/outline-btn-menu/settings-screen/EditAddress';
import Payments from '../screens/app/profile-stack-screens/outline-btn-menu/settings-screen/Payments';
import SubscriptionPrice from '../screens/app/profile-stack-screens/outline-btn-menu/settings-screen/SubscriptionPrice';
import Privacy from '../screens/app/profile-stack-screens/outline-btn-menu/settings-screen/Privacy';
import Verify from '../screens/app/profile-stack-screens/outline-btn-menu/settings-screen/Verify';
import SupportTicket from '../screens/app/profile-stack-screens/outline-btn-menu/settings-screen/SupportTicket';
import Promotion from '../screens/app/profile-stack-screens/outline-btn-menu/settings-screen/Promotion';
import AddSupportTicketScreen from '../screens/app/profile-stack-screens/outline-btn-menu/settings-screen/AddSupportTicketScreen';
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
        </Stack.Navigator>
    );
}

export default SettingsStack