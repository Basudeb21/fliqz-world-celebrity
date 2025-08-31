import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors, NavigationStrings } from '../../../../constants'
import { moderateScale } from 'react-native-size-matters'
import FontAwesome5 from 'react-native-vector-icons/dist/FontAwesome5'
import Entypo from 'react-native-vector-icons/dist/Entypo'
import FontAwesome6 from 'react-native-vector-icons/dist/FontAwesome6'
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons'
import Fontisto from 'react-native-vector-icons/dist/Fontisto'
import { useNavigation } from '@react-navigation/native'
import { NoOutlineIconTextButton } from '../../../../components/framework/button'
import { HR, Spacer } from '../../../../components/framework/boots'
import { BackpressTopBar } from '../../../../components/framework/navbar'
import { SafeAreaView } from 'react-native-safe-area-context'




const SettingsScreen = () => {

    const navigation = useNavigation();
    const onPressEditProfile = () => {
        navigation.navigate(NavigationStrings.SETTINGS_STACK, {
            screen: NavigationStrings.SETTINGS_EDIT_PROFILE_SCREEN
        })
    }

    const onPressChangePassword = () => {
        navigation.navigate(NavigationStrings.SETTINGS_STACK, {
            screen: NavigationStrings.SETTINGS_CHANGE_PASSWORD_SCREEN
        })
    }

    const onPressEditAddress = () => {
        navigation.navigate(NavigationStrings.SETTINGS_STACK, {
            screen: NavigationStrings.SETTINGS_EDIT_ADDRESS_SCREEN
        })
    }

    const onPressPayments = () => {
        navigation.navigate(NavigationStrings.SETTINGS_STACK, {
            screen: NavigationStrings.SETTINGS_PAYMENT_SCREEN
        })
    }

    const onPressSubscribtionPrice = () => {
        navigation.navigate(NavigationStrings.SETTINGS_STACK, {
            screen: NavigationStrings.SETTINGS_SUBSCRIPTION_PRICE_SCREEN
        })
    }

    const onPressPrivacy = () => {
        navigation.navigate(NavigationStrings.SETTINGS_STACK, {
            screen: NavigationStrings.SETTINGS_PRIVACY_SCREEN
        })
    }

    const onPressVerify = () => {
        navigation.navigate(NavigationStrings.SETTINGS_STACK, {
            screen: NavigationStrings.SETTINGS_VERIFY_ID_SCREEN
        })
    }

    const onPressSupportTicket = () => {
        navigation.navigate(NavigationStrings.SETTINGS_STACK, {
            screen: NavigationStrings.SETTINGS_SUPPORT_TICKET_SCREEN
        })
    }

    const onPressPromotion = () => {
        navigation.navigate(NavigationStrings.SETTINGS_STACK, {
            screen: NavigationStrings.SETTINGS_PROMOTION_SCREEN
        })
    }

    const buttonContents = [
        { id: 1, Icon: FontAwesome5, iconName: "user-edit", text: "Edit Profile", onPress: onPressEditProfile },
        { id: 2, Icon: Entypo, iconName: "key", text: "Change Your Password", onPress: onPressChangePassword },
        { id: 3, Icon: FontAwesome6, iconName: "map-location-dot", text: "Edit Address", onPress: onPressEditAddress },
        { id: 4, Icon: Entypo, iconName: "credit-card", text: "Payments", onPress: onPressPayments },
        { id: 6, Icon: FontAwesome6, iconName: "user-shield", text: "Privacy", onPress: onPressPrivacy },
        { id: 7, Icon: MaterialIcons, iconName: "verified", text: "Verify", onPress: onPressVerify },
        { id: 8, Icon: Fontisto, iconName: "ticket-alt", text: "Support Ticket", onPress: onPressSupportTicket },
        { id: 9, Icon: FontAwesome6, iconName: "bullhorn", text: "Promotion", onPress: onPressPromotion },
        { id: 10, Icon: FontAwesome6, iconName: "tags", text: "Subscription Price", onPress: onPressSubscribtionPrice },

    ]
    return (
        <SafeAreaView style={{ backgroundColor: Colors.WHITE, flex: 1 }}>
            <BackpressTopBar title={"Settings"} />
            <Spacer height={10} />
            <Text style={styles.txt}>Manage your account</Text>
            <Spacer height={20} />
            <View style={styles.container}>
                <HR height={1} />
                <FlatList
                    data={buttonContents}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <NoOutlineIconTextButton
                            Icon={item.Icon}
                            iconName={item.iconName}
                            text={item.text}
                            onPress={item.onPress}
                        />
                    )}
                />


            </View>
        </SafeAreaView>
    )
}

export default SettingsScreen

const styles = StyleSheet.create({
    txt: {
        color: Colors.PLACEHOLDER,
        marginStart: moderateScale(20)
    },
    container: {
        marginHorizontal: moderateScale(20)
    }
})