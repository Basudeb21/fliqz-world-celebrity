import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationStrings } from '../constants';
import { Analytics, Bookmarks, Lists, Referals, Streams, Subscriptions, Wallet } from '../screens/app/profile-stack-screens';
import { AddNewProduct, Orders, ShopItemInfoPage, ShopScreen, UpdateProductScreen, ViewOrder } from '../screens/app/profile-stack-screens/outline-btn-menu/shop';
import { ViewListContent } from '../screens/app/profile-stack-screens/sub-screen';
import { HelpAndSettingsScreen, SettingsScreen } from '../screens/app/profile-stack-screens/outline-btn-menu';
import SettingsStack from './SettingsStack';
import { AddNewAuction, AllBids, Auction, AuctionItemPage, EditAuctionItem } from '../screens/app/profile-stack-screens/outline-btn-menu/auction';
import { AddNewEvent, EventDetailsScreen, EventsScreen, UpdateEventScreen } from '../screens/app/profile-stack-screens/outline-btn-menu/event';
import AuthStack from './AuthStack';
import FAQ from '../screens/app/profile-stack-screens/outline-btn-menu/FAQ';
import { CollaborationList, CreateNewCollaboration, EditCollaboration } from '../screens/app/profile-stack-screens/outline-btn-menu/collaboration';
import { ChatBotPage, DisplayAllAddress, EditProfile } from '../screens/app/profile-stack-screens/outline-btn-menu/settings-screen';
import { AllCrowdfunding, CreateNewCrowdfunding, ViewCrowdfunding } from '../screens/app/profile-stack-screens/outline-btn-menu/crowdfunding';
import { Rewards } from '../screens/app/profile-stack-screens/outline-btn-menu/rewards';

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
            <Stack.Screen name={NavigationStrings.PROFILE_BECOME_A_CREATOR} component={Analytics} />

            {/* Settings */}
            <Stack.Screen name={NavigationStrings.PROFILE_HELP_AND_SUPPORT_SCREEN} component={HelpAndSettingsScreen} />
            <Stack.Screen name={NavigationStrings.PROFILE_SETTINGS_SCREEN} component={SettingsScreen} />
            <Stack.Screen name={NavigationStrings.PROFILE_FAQ_SCREEN} component={FAQ} />
            <Stack.Screen name={NavigationStrings.SETTINGS_STACK} component={SettingsStack} />
            <Stack.Screen name={NavigationStrings.SETTINGS_CHAT_BOT} component={ChatBotPage} />


            {/* Auction */}
            <Stack.Screen name={NavigationStrings.PROFILE_AUCTION_SCREEN} component={Auction} />
            <Stack.Screen name={NavigationStrings.PROFILE_AUTION_ITEM_SCREEN} component={AuctionItemPage} />
            <Stack.Screen name={NavigationStrings.PROFILE_ADD_NEW_AUCTION} component={AddNewAuction} />
            <Stack.Screen name={NavigationStrings.PROFILE_ALL_BIDS} component={AllBids} />
            <Stack.Screen name={NavigationStrings.PROFILE_EDIT_AUCTION_ITEM} component={EditAuctionItem} />

            {/* Event */}
            <Stack.Screen name={NavigationStrings.PROFILE_EVENT_SCREEN} component={EventsScreen} />
            <Stack.Screen name={NavigationStrings.PROFILE_EVENT_DETAILS} component={EventDetailsScreen} />
            <Stack.Screen name={NavigationStrings.PROFILE_EVENT_UPDATE} component={UpdateEventScreen} />
            <Stack.Screen name={NavigationStrings.PROFILE_ADD_NEW_EVENT} component={AddNewEvent} />

            {/* Shop */}
            <Stack.Screen name={NavigationStrings.PROFILE_SHOP_SCREEN} component={ShopScreen} />
            <Stack.Screen name={NavigationStrings.HOME_SHOP_ITEM_INFO_PAGE} component={ShopItemInfoPage} />
            <Stack.Screen name={NavigationStrings.PROFILE_ADD_NEW_PRODUCT} component={AddNewProduct} />
            <Stack.Screen name={NavigationStrings.PROFILE_UPDATE_SHOP_ITEM} component={UpdateProductScreen} />



            {/* Collaboration */}
            <Stack.Screen name={NavigationStrings.PROFILE_COLLABORATION_LIST} component={CollaborationList} />
            <Stack.Screen name={NavigationStrings.PROFILE_CREATE_NEW_COLLABORATION} component={CreateNewCollaboration} />
            <Stack.Screen name={NavigationStrings.PROFILE_EDIT_COLLABORATION} component={EditCollaboration} />

            {/* Crowdfunding */}
            <Stack.Screen name={NavigationStrings.PROFILE_ALL_CROWDFUNDING} component={AllCrowdfunding} />
            <Stack.Screen name={NavigationStrings.PROFILE_VIEW_CROWDFUNDING} component={ViewCrowdfunding} />
            <Stack.Screen name={NavigationStrings.PROFILE_CREATE_CROWDFUNDING} component={CreateNewCrowdfunding} />

            {/* Rewards */}
            <Stack.Screen name={NavigationStrings.PROFILE_REWARDS} component={Rewards} />



            <Stack.Screen name={NavigationStrings.AUTH_STACK} component={AuthStack} />
        </Stack.Navigator>
    );
}

export default ProfileStack