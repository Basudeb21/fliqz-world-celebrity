import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationStrings } from '../constants';
import { FansProfilePage, NotificationScreen, SearchScreen, WalletScreen } from '../screens/app/home-stack-screens';
import { CartScreen, CheckoutPage, OrderSuccessfull, ShopItemInfoPage, ShopPage, ViewOrder } from '../screens/app/profile-stack-screens/outline-btn-menu/shop';
import { ViewTicket } from '../screens/app/profile-stack-screens/sub-screen';
import { ViewProfilePost, ViewStory } from '../screens/app/post-related';
const HomeStack = () => {
    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name={NavigationStrings.HOME_NOTIFICATION_SCREEN} component={NotificationScreen} />
            <Stack.Screen name={NavigationStrings.HOME_SEARCH_SCREEN} component={SearchScreen} />
            <Stack.Screen name={NavigationStrings.HOME_WALLET_SCREEN} component={WalletScreen} />
            <Stack.Screen name={NavigationStrings.HOME_CART_SCREEN} component={CartScreen} />
            <Stack.Screen name={NavigationStrings.HOME_CART_CHECKOUT_SCREEN} component={CheckoutPage} />
            <Stack.Screen name={NavigationStrings.HOME_PLACE_ORDER_SCREEN} component={OrderSuccessfull} />
            <Stack.Screen name={NavigationStrings.VIEW_ORDER} component={ViewOrder} />
            <Stack.Screen name={NavigationStrings.VIEW_TICKET_SCREEN} component={ViewTicket} />
            <Stack.Screen name={NavigationStrings.HOME_FRIEND_PROFILE_PAGE} component={FansProfilePage} />
            <Stack.Screen name={NavigationStrings.HOME_SHOP_SCREEN} component={ShopPage} />
            <Stack.Screen name={NavigationStrings.HOME_SHOP_ITEM_INFO_PAGE} component={ShopItemInfoPage} />
            <Stack.Screen name={NavigationStrings.HOME_VIEW_STORY} component={ViewStory} />
            <Stack.Screen name={NavigationStrings.HOME_VIEW_PROFILE_POST} component={ViewProfilePost}
                options={{
                    presentation: 'transparentModal',
                    animation: 'fade',
                }}
            />
        </Stack.Navigator>
    );
}

export default HomeStack