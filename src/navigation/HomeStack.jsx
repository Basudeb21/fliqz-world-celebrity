import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationStrings } from '../constants';
import { CartScreen, NotificationScreen, SearchScreen, WalletScreen } from '../screens/app/home-stack-screens';
import CheckoutPage from '../screens/app/home-stack-screens/CheckoutPage';
import OrderSuccessfull from '../screens/app/home-stack-screens/OrderSuccessfull';
import ViewOrder from '../screens/app/profile-stack-screens/sub-screen/ViewOrder';
import FansProfilePage from '../screens/app/home-stack-screens/FansProfilePage';
import ShopPage from '../screens/app/home-stack-screens/ShopPage';
import ShopItemInfoPage from '../screens/app/home-stack-screens/ShopItemInfoPage';
import ViewTicket from '../screens/app/profile-stack-screens/sub-screen/ViewTicket';
import ViewStory from '../screens/app/post-related/ViewStory';
import ViewProfilePost from '../screens/app/post-related/ViewProfilePost';
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