import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { Colors } from '../../../constants'
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons'

const PressableViewProfilePostTopArea = ({ userAvatar, userName, userID, postText, badges, onPress }) => {
    const renderBadge = ({ item }) => (
        <Image
            source={{ uri: item.icon }}
            style={styles.badgeIcon}
        />
    );
    return (
        <TouchableOpacity style={styles.userContainer} onPress={onPress}>
            <Image
                source={{ uri: userAvatar }}
                style={styles.userAvatar}
            />
            <View>
                <View style={styles.userNameContainer}>
                    <Text style={styles.userName}>{userName}</Text>
                    <MaterialIcons
                        name={"verified"}
                        size={18}
                        color={Colors.FACEBOOK_LOGO}
                    />

                </View>
                <View style={styles.badgeContainer}>
                    {badges.length > 0 && (
                        <FlatList
                            data={badges}
                            renderItem={renderBadge}
                            keyExtractor={(item) => item.id.toString()}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            style={styles.badgeList}
                        />
                    )}
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default PressableViewProfilePostTopArea

const styles = StyleSheet.create({
    userContainer: {
        flexDirection: "row"
    },
    userAvatar: {
        height: verticalScale(42),
        width: moderateScale(50),
        borderRadius: scale(100),

    },
    userNameContainer: {
        flexDirection: "row",
        marginStart: moderateScale(10),
        justifyContent: "center",
        alignItems: "center",
        gap: scale(10),
    },
    userName: {
        fontSize: scale(18),
        fontWeight: "500"
    },
    userID: {
        color: Colors.USER_ID_NAME,
        fontSize: scale(10),
        fontWeight: "500"
    },
    badgeList: {
        marginTop: scale(4),
    },
    badgeIcon: {
        width: scale(22),
        height: scale(22),
        borderRadius: scale(4),
        marginRight: scale(4),
    },
    badgeContainer: {
        flexDirection: "row",
        marginStart: moderateScale(10),
    },
})