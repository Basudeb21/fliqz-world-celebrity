import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Colors, NavigationStrings } from '../../../constants'
import Ionicons from 'react-native-vector-icons/dist/Ionicons'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { GradientTextButton } from '../button'

const ProfileCard = () => {
    const navigation = useNavigation();
    const user = useSelector((state) => state.auth.user);
    console.log(user);

    const onPressViewProfile = () => {
        navigation.navigate(NavigationStrings.HOME_STACK, {
            screen: NavigationStrings.HOME_FRIEND_PROFILE_PAGE,
            params: { user }
        });
    };
    return (
        <View style={styles.card}>
            <View style={styles.rowOne}>
                <View>
                    <TouchableOpacity style={styles.userImgContainer}>
                        <Image source={{ uri: user?.avatar }} style={styles.userImg} />
                        <TouchableOpacity style={styles.storyAddBtn}>
                            <Ionicons
                                name={'add-circle'}
                                size={20}
                                color={Colors.THEME}
                            />
                        </TouchableOpacity>
                    </TouchableOpacity>
                </View>
                <View style={styles.topRow}>
                    <View style={styles.userNameContainer}>
                        <Text style={styles.userName}>{user?.first_name}</Text>
                        <Text style={styles.userID}>@{user?.username}</Text>

                    </View>
                    <GradientTextButton label='View Profile' fontSize={10} width='40%' height={20} onPress={onPressViewProfile} />

                </View>
            </View>
            <View style={styles.rowTwo}>
                <View style={styles.counterContainer}>
                    <Text style={styles.counter}>1,200</Text>
                    <Text style={styles.counterName}>Posts</Text>
                </View>
                <View style={styles.counterContainer}>
                    <Text style={styles.counter}>240K</Text>
                    <Text style={styles.counterName}>Followers</Text>
                </View>
                <View style={styles.counterContainer}>
                    <Text style={styles.counter}>93</Text>
                    <Text style={styles.counterName}>Following</Text>
                </View>

            </View>
        </View>
    )
}

export default ProfileCard

const styles = StyleSheet.create({
    card: {
        width: "90%",
        alignSelf: "center",
        backgroundColor: Colors.WHITE,
        borderRadius: scale(15),
        elevation: scale(5),
        position: "absolute",
        top: 100
    },
    topRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    rowOne: {
        flexDirection: "row"
    },
    rowTwo: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: 'center',
        marginBottom: verticalScale(12)

    },
    userImgContainer: {
        marginVertical: verticalScale(10),
        borderRadius: scale(100),
        height: verticalScale(48),
        width: moderateScale(48),
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center",
        marginStart: moderateScale(30)
    },

    userImg: {
        height: verticalScale(40),
        width: moderateScale(40),
        borderRadius: scale(100),
    },
    storyAddBtn: {
        position: "absolute",
        backgroundColor: Colors.WHITE,
        borderRadius: scale(100),
        top: 30,
        right: -5
    },
    userNameContainer: {
        marginStart: moderateScale(15),
        alignSelf: "center"
    },
    userName: {
        fontSize: scale(16),
        fontWeight: "400",
    },
    userID: {
        fontSize: scale(10),
        color: Colors.PLACEHOLDER
    },
    counterContainer: {
        justifyContent: "center",
        alignItems: "center"
    },
    counter: {
        fontSize: scale(13),
        fontWeight: "500",
        alignSelf: "center"
    },
    counterName: {
        fontSize: scale(10),
        fontWeight: "400",
        alignSelf: "center"
    }

})