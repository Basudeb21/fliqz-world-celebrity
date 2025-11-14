// ProfilePage.js
import { FlatList, StyleSheet, View } from 'react-native'
import React from 'react'
import { moderateScale, verticalScale } from 'react-native-size-matters'
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome'
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons'
import Entypo from 'react-native-vector-icons/dist/Entypo'
import Ionicons from 'react-native-vector-icons/dist/Ionicons'
import FontAwesome5 from 'react-native-vector-icons/dist/FontAwesome5'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux-store/slices/authSlice';
import Octicons from 'react-native-vector-icons/dist/Octicons'
import FontAwesome6 from 'react-native-vector-icons/dist/FontAwesome6'
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from '@react-navigation/native'
import { Colors, NavigationStrings, Strings } from '../../constants'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ProfileCard, ProfileSingleMenuCard } from '../../components/framework/card'
import { OutLineButton, OutlineIconButton } from '../../components/framework/button'
import { Spacer } from '../../components/framework/boots'
import { BackpressProfileTopBar } from '../../components/framework/navbar'

const ProfilePage = () => {

    const dispatch = useDispatch();
    const navigation = useNavigation();

    const onPressLogout = async () => {
        try {
            await AsyncStorage.removeItem('userData');
            dispatch(logout());

            navigation.reset({
                index: 0,
                routes: [{ name: NavigationStrings.AUTH_STACK }],
            });
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    const onPressAnalytics = () => {
        navigation.navigate(NavigationStrings.PROFILE_STACK, {
            screen: NavigationStrings.PROFILE_BECOME_A_CREATOR
        })
    }

    const onPressCollaborations = () => {
        navigation.navigate(NavigationStrings.PROFILE_STACK, {
            screen: NavigationStrings.PROFILE_COLLABORATION_LIST
        })
    }

    const onPressOrders = () => {
        navigation.navigate(NavigationStrings.PROFILE_STACK, {
            screen: NavigationStrings.PROFILE_ORDER_SCREEN
        })
    }

    const onPressLists = () => {
        navigation.navigate(NavigationStrings.PROFILE_STACK, {
            screen: NavigationStrings.PROFILE_LISTS_SCREEN
        })
    }

    const onPressBookmarks = () => {
        navigation.navigate(NavigationStrings.PROFILE_STACK, {
            screen: NavigationStrings.PROFILE_BOOKMARK_SCREEN
        })
    }

    const onPressCrowdfunding = () => {
        navigation.navigate(NavigationStrings.PROFILE_STACK, {
            screen: NavigationStrings.PROFILE_ALL_CROWDFUNDING
        })
    }

    const onPressSubscriptions = () => {
        navigation.navigate(NavigationStrings.PROFILE_STACK, {
            screen: NavigationStrings.PROFILE_SUBSCRIPTIONS_SCREEN
        })
    }

    const onPressReferrals = () => {
        navigation.navigate(NavigationStrings.PROFILE_STACK, {
            screen: NavigationStrings.PROFILE_REFERALS_SCREEN
        })
    }

    const onPressShop = () => {
        navigation.navigate(NavigationStrings.PROFILE_STACK, {
            screen: NavigationStrings.PROFILE_SHOP_SCREEN
        })
    }

    const onPressEvents = () => {
        navigation.navigate(NavigationStrings.PROFILE_STACK, {
            screen: NavigationStrings.PROFILE_EVENT_SCREEN
        })
    }

    const onPressAuction = () => {
        navigation.navigate(NavigationStrings.PROFILE_STACK, {
            screen: NavigationStrings.PROFILE_AUCTION_SCREEN
        })
    }

    const onPressHelpAndSupport = () => {
        navigation.navigate(NavigationStrings.PROFILE_STACK, {
            screen: NavigationStrings.PROFILE_HELP_AND_SUPPORT_SCREEN
        })
    }

    const onPressSettings = () => {
        navigation.navigate(NavigationStrings.PROFILE_STACK, {
            screen: NavigationStrings.PROFILE_SETTINGS_SCREEN
        })
    }


    const onPressRewards = () => {
        const rewardsScreen = NavigationStrings.PROFILE_REWARDS_SCREEN || NavigationStrings.PROFILE_SHOP_SCREEN;
        navigation.navigate(NavigationStrings.PROFILE_STACK, { screen: rewardsScreen });
    }

    const cardData = [
        { id: 1, icon: Entypo, iconName: "line-graph", text: "Analytics", onPress: onPressAnalytics },
        { id: 2, icon: FontAwesome6, iconName: "handshake-simple", text: "Collaborations", onPress: onPressCollaborations },
        { id: 3, icon: Entypo, iconName: "shopping-basket", text: "Orders", onPress: onPressOrders },
        { id: 4, icon: FontAwesome, iconName: "list-ul", text: "Lists", onPress: onPressLists },
        { id: 5, icon: FontAwesome, iconName: "bookmark", text: "Bookmarks", onPress: onPressBookmarks },
        { id: 6, icon: MaterialCommunityIcons, iconName: "hand-heart", text: "Crowdfunding", onPress: onPressCrowdfunding },
        { id: 7, icon: Octicons, iconName: "video", text: "Subscriptions", onPress: onPressSubscriptions },
        { id: 8, icon: FontAwesome6, iconName: "users-line", text: "Referrals", onPress: onPressReferrals },
        { id: 9, icon: Entypo, iconName: "shop", text: "Shop", onPress: onPressShop },
        { id: 10, icon: MaterialIcons, iconName: "event", text: "Events", onPress: onPressEvents },
        { id: 11, icon: Ionicons, iconName: "gift", text: "Rewards", onPress: onPressRewards },
        { id: 12, icon: FontAwesome5, iconName: "hammer", text: "Auction", onPress: onPressAuction },
    ]

    const buttonData = [
        { id: 1, icon: FontAwesome, iconName: "legal", label: "Legal", onPress: onPressShop },
        { id: 3, icon: MaterialIcons, iconName: "support-agent", label: "Help & Support", onPress: onPressHelpAndSupport },
        { id: 4, icon: Ionicons, iconName: "settings-sharp", label: "Settings", onPress: onPressSettings },
    ]
    const user = useSelector((state) => state.auth.user);
    const userName = user?.first_name;

    return (
        <SafeAreaView style={styles.container}>

            <FlatList
                ListHeaderComponent={
                    <View>
                        <BackpressProfileTopBar title={userName} />
                        <ProfileCard />
                        <Spacer height={90} />

                    </View>
                }
                data={cardData}
                keyExtractor={(item) => item.id.toString()}
                numColumns={2}
                columnWrapperStyle={styles.row}
                renderItem={({ item }) => (
                    <ProfileSingleMenuCard
                        Icon={item.icon}
                        iconName={item.iconName}
                        text={item.text}
                        onPress={item.onPress}
                        style={styles.card}
                    />
                )}
                contentContainerStyle={styles.contentContainer}
                ListFooterComponent={
                    <>
                        <View style={styles.btnContainer}>
                            {buttonData.map((item) => (
                                <OutlineIconButton
                                    key={item.id}
                                    Icon={item.icon}
                                    iconName={item.iconName}
                                    label={item.label}
                                    onPress={item.onPress}
                                />
                            ))}
                        </View>
                        <Spacer height={5} />
                        <View style={{ justifyContent: "center", alignItems: "center" }}>
                            <OutLineButton label_two={Strings.LOGOUT} width={"90%"} onPress={onPressLogout} />
                        </View>
                        <Spacer height={50} />

                    </>
                }
                showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
    )
}

export default ProfilePage

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.WHITE
    },
    contentContainer: {
        paddingBottom: verticalScale(20),
    },
    row: {
        justifyContent: 'space-between',
        marginBottom: verticalScale(12),
        paddingHorizontal: moderateScale(16),
        gap: moderateScale(15)
    },
    btnContainer: {
        marginTop: verticalScale(20),
        paddingHorizontal: moderateScale(16),
        gap: moderateScale(5)
    }
})
