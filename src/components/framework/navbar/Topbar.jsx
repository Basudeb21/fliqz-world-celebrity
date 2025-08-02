import { StyleSheet, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Colors, NavigationStrings } from '../../../constants'
import { moderateScale } from 'react-native-size-matters';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome'
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import PressableViewProfilePostTopArea from './PressableViewProfilePostTopArea';
import { GradientIcon } from '../icon';
import { BookMarkPostApi } from '../../../api/app/post';

const Topbar = ({ userAvatar, userName, postText, data }) => {
    const [focused, setFocused] = useState(data.is_bookmarked);
    const token = useSelector(state => state.auth.token);
    const handleOnpress = async () => {
        try {
            const result = await BookMarkPostApi(token, data.id);

            if (result?.success) {
                ToastAndroid.show("Bookmarked successfully done.", ToastAndroid.SHORT);
            } else {
                console.log('Bookmark API failed:', result?.message || 'Unknown error');
            }
        } catch (error) {
            console.error('Bookmark API Error:', error);
        }
        setFocused(!focused);
    }
    const navigation = useNavigation()

    const handlePressProfileIcon = () => {
        navigation.navigate(NavigationStrings.HOME_STACK, {
            screen: NavigationStrings.HOME_FRIEND_PROFILE_PAGE,
            params: { user: data.user },
        });
    };

    return (
        <View style={styles.container}>

            <View style={styles.top}>
                <PressableViewProfilePostTopArea
                    userAvatar={userAvatar}
                    userName={userName}
                    userID={"@u987654321"}
                    postText={postText}
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