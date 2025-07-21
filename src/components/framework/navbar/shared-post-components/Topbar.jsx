import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Colors, NavigationStrings } from '../../../../constants'
import { moderateScale } from 'react-native-size-matters';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome'
import PressableViewProfilePostTopArea from './PressableViewProfilePostTopArea';
import { useNavigation } from '@react-navigation/native';
import GradientIcon from '../../icon/GradientIcon';

const Topbar = ({ userAvatar, userName }) => {
    const [focused, setFocused] = useState(false);
    const handleOnpress = () => {
        setFocused(!focused);
    }
    const navigation = useNavigation()
    const handlePressProfileIcon = () => {
        navigation.navigate(NavigationStrings.HOME_STACK, {
            screen: NavigationStrings.HOME_FRIEND_PROFILE_PAGE,
            params: { userName }
        })
    }

    return (
        <View style={styles.container}>

            <View style={styles.top}>
                <PressableViewProfilePostTopArea
                    userAvatar={userAvatar}
                    userName={userName}
                    userID={"@u987654321"}
                    onPress={handlePressProfileIcon}
                />
            </View>
            <TouchableOpacity onPress={handleOnpress}>
                <GradientIcon
                    name={focused ? "bookmark" : "bookmark-o"}
                    size={24}
                    IconPack={FontAwesome}
                    colors={[Colors.BUTTON_GRADIENT_ONE, Colors.BUTTON_GRADIENT_TWO]}
                />
            </TouchableOpacity>
        </View>
    )
}

export default Topbar

const styles = StyleSheet.create({
    container: {
        paddingRight: moderateScale(20),
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
    },
    top: {
        marginStart: moderateScale(10)
    },

    bookmark: {
        alignSelf: "center"
    }
})