import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationStrings } from '../constants';
import EditProfile from '../screens/app/profile-stack-screens/EditProfile';
import Streams from '../screens/app/profile-stack-screens/Streams';
import Orders from '../screens/app/profile-stack-screens/Orders';
import Lists from '../screens/app/profile-stack-screens/Lists';
import Bookmarks from '../screens/app/profile-stack-screens/Bookmarks';
import Wallet from '../screens/app/profile-stack-screens/Wallet';
import Subscriptions from '../screens/app/profile-stack-screens/Subscriptions';
import Referals from '../screens/app/profile-stack-screens/Referals';
import ViewOrder from '../screens/app/profile-stack-screens/sub-screen/ViewOrder';
import ViewListContent from '../screens/app/profile-stack-screens/sub-screen/ViewListContent';
import ShopScreen from '../screens/app/profile-stack-screens/outline-btn-menu/ShopScreen';
import HelpAndSettingsScreen from '../screens/app/profile-stack-screens/outline-btn-menu/HelpAndSettingsScreen';
import SettingsScreen from '../screens/app/profile-stack-screens/outline-btn-menu/SettingsScreen';
import EventsScreen from '../screens/app/profile-stack-screens/outline-btn-menu/EventsScreen';
import EventDetailsScreen from '../screens/app/profile-stack-screens/outline-btn-menu/sub-screen/EventDetailsScreen';
import SettingsStack from './SettingsStack';
import Analitics from '../screens/app/profile-stack-screens/Analitics';
import Auction from '../screens/app/profile-stack-screens/Auction';
import AuctionItemPage from '../screens/app/profile-stack-screens/AuctionItemPage';
import AllBids from '../screens/app/profile-stack-screens/AllBids';
import AuthStack from './AuthStack';
import AddNewEvent from '../screens/app/profile-stack-screens/outline-btn-menu/sub-screen/AddNewEvent';
const ProfileStack = () => {
    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name={NavigationStrings.PROFILE_EDIT_SCREEN} component={EditProfile} />
            <Stack.Screen name={NavigationStrings.PROFILE_STREAM_SCREEN} component={Streams} />
            <Stack.Screen name={NavigationStrings.PROFILE_ORDER_SCREEN} component={Orders} />
            <Stack.Screen name={NavigationStrings.PROFILE_LISTS_SCREEN} component={Lists} />
            <Stack.Screen name={NavigationStrings.PROFILE_BOOKMARK_SCREEN} component={Bookmarks} />
            <Stack.Screen name={NavigationStrings.PROFILE_WALLET_SCREEN} component={Wallet} />
            <Stack.Screen name={NavigationStrings.PROFILE_SUBSCRIPTIONS_SCREEN} component={Subscriptions} />
            <Stack.Screen name={NavigationStrings.PROFILE_REFERALS_SCREEN} component={Referals} />
            <Stack.Screen name={NavigationStrings.VIEW_ORDER} component={ViewOrder} />
            <Stack.Screen name={NavigationStrings.HOME_VIEW_LIST_CONTENT} component={ViewListContent} />
            <Stack.Screen name={NavigationStrings.PROFILE_SHOP_SCREEN} component={ShopScreen} />
            <Stack.Screen name={NavigationStrings.PROFILE_EVENT_SCREEN} component={EventsScreen} />
            <Stack.Screen name={NavigationStrings.PROFILE_EVENT_DETAILS} component={EventDetailsScreen} />
            <Stack.Screen name={NavigationStrings.PROFILE_HELP_AND_SUPPORT_SCREEN} component={HelpAndSettingsScreen} />
            <Stack.Screen name={NavigationStrings.PROFILE_SETTINGS_SCREEN} component={SettingsScreen} />
            <Stack.Screen name={NavigationStrings.SETTINGS_STACK} component={SettingsStack} />
            <Stack.Screen name={NavigationStrings.PROFILE_BECOME_A_CREATOR} component={Analitics} />
            <Stack.Screen name={NavigationStrings.PROFILE_AUCTION_SCREEN} component={Auction} />
            <Stack.Screen name={NavigationStrings.PROFILE_AUTION_ITEM_SCREEN} component={AuctionItemPage} />
            <Stack.Screen name={NavigationStrings.PROFILE_ALL_BIDS} component={AllBids} />
            <Stack.Screen name={NavigationStrings.PROFILE_ADD_NEW_EVENT} component={AddNewEvent} />
            <Stack.Screen name={NavigationStrings.AUTH_STACK} component={AuthStack} />
        </Stack.Navigator>
    );
}

export default ProfileStack