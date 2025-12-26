import { Image, StyleSheet, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/dist/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { Colors, NavigationStrings } from '../../../constants';
import { ChatPage, CreatePage, HomePage, LivePage, ProfilePage } from '../../../screens/app';
import { useSelector } from 'react-redux';
import { GradientIcon } from '../icon';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Streams } from '../../../screens/app/profile-stack-screens';



const BottomNavbar = () => {
    const insets = useSafeAreaInsets();
    const Tab = createBottomTabNavigator();
    const iconSize = 24;
    const user = useSelector((state) => state.auth.user);

    return (
        <Tab.Navigator
            screenOptions={{
                tabBarStyle: {
                    ...styles.navBar,
                    height: 50 + insets.bottom, // increase height
                    paddingBottom: insets.bottom, // safe padding
                },
                headerShown: false,
                tabBarShowLabel: false,
            }}

        >

            <Tab.Screen
                name={NavigationStrings.HOME_SCREEN}
                component={HomePage}
                options={{
                    tabBarLabel: NavigationStrings.HOME_SCREEN,
                    tabBarIcon: ({ focused }) => (
                        <GradientIcon
                            name={focused ? "home" : "home-outline"}
                            size={iconSize}
                            IconPack={Ionicons}
                            colors={[Colors.BUTTON_GRADIENT_ONE, Colors.BUTTON_GRADIENT_TWO]}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name={NavigationStrings.CHAT_PAGE}
                component={ChatPage}
                options={{
                    tabBarLabel: NavigationStrings.CHAT_PAGE,
                    tabBarIcon: ({ focused }) => (
                        <GradientIcon
                            name={focused ? "chatbubble-ellipses-sharp" : "chatbubble-ellipses-outline"}
                            size={iconSize}
                            IconPack={Ionicons}
                            colors={[Colors.BUTTON_GRADIENT_ONE, Colors.BUTTON_GRADIENT_TWO]}
                        />
                    ),
                }}
            />

            <Tab.Screen
                name={NavigationStrings.CREATE_SCREEN}
                component={CreatePage}
                options={{
                    tabBarLabel: NavigationStrings.CREATE_SCREEN,
                    tabBarIcon: ({ focused }) => (
                        <View style={styles.addIconContainer}>
                            <GradientIcon
                                name={focused ? 'add-circle-sharp' : 'add-circle-outline'}
                                size={60}
                                IconPack={Ionicons}
                                colors={[Colors.BUTTON_GRADIENT_ONE, Colors.BUTTON_GRADIENT_TWO]}
                            />
                        </View>
                    ),
                }}
            />


            <Tab.Screen
                name={NavigationStrings.LIVE_SCREEN}
                component={Streams}
                options={{
                    tabBarLabel: NavigationStrings.LIVE_SCREEN,
                    tabBarIcon: ({ focused }) => (
                        <GradientIcon
                            name={focused ? 'youtube-tv' : 'television-play'}
                            size={iconSize}
                            IconPack={MaterialCommunityIcons}
                            colors={[Colors.BUTTON_GRADIENT_ONE, Colors.BUTTON_GRADIENT_TWO]}
                        />
                    ),
                }}
            />


            <Tab.Screen
                name={NavigationStrings.PROFILE_SCREEN}
                component={ProfilePage}
                options={{
                    tabBarLabel: NavigationStrings.PROFILE_SCREEN,
                    tabBarIcon: ({ focused }) => (
                        <Image source={{ uri: user?.avatar }} style={focused ? styles.active : styles.img} />
                    ),
                }}
            />

        </Tab.Navigator>
    )
}

export default BottomNavbar

const styles = StyleSheet.create({

    addIconContainer: {
        width: moderateScale(40),
        height: verticalScale(40),
        borderRadius: scale(100),
        backgroundColor: Colors.WHITE,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: moderateScale(-20),
        shadowColor: Colors.BLACK,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5,
        alignSelf: 'center',
    },
    navBar: {
        // height: 60, // give it enough height
        backgroundColor: Colors.WHITE,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        position: 'absolute',
    },
    img: {
        width: moderateScale(30),
        height: verticalScale(24),
        borderRadius: scale(100),
    },
    active: {
        width: moderateScale(30),
        height: verticalScale(24),
        borderRadius: scale(100),
        borderWidth: scale(2),
        borderColor: Colors.THEME
    }
})
