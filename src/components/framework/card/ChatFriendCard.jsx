import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Colors } from '../../../constants';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { HR } from '../boots';

const ChatFriendCard = ({ image, fanName, fanActiveTime, lastMessage, unreadCount, onPress }) => {

    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.container}>
                <Image
                    style={styles.userImage}
                    source={{ uri: image }}
                />

                <View style={styles.userInfoContainer}>
                    <Text style={styles.fanName}>{fanName || "Unknown"}</Text>
                    <Text style={styles.lastMessage} numberOfLines={1}>
                        {lastMessage || "No messages yet"}
                    </Text>
                </View>

                <View style={styles.rightContainer}>
                    <Text style={styles.activeTime}>
                        {fanActiveTime || "Offline"}
                    </Text>

                    {unreadCount > 0 && (
                        <View style={styles.badge}>
                            <Text style={styles.badgeText}>{unreadCount}</Text>
                        </View>
                    )}
                </View>
            </View>

            <HR height={1} color={Colors.HR_COLOR} width='90%' center />
        </TouchableOpacity>
    )
}

export default ChatFriendCard;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: verticalScale(12),
        paddingHorizontal: moderateScale(20),
    },
    userImage: {
        width: moderateScale(45),
        height: moderateScale(45),
        borderRadius: moderateScale(45) / 2,
    },
    userInfoContainer: {
        marginStart: moderateScale(15),
        flex: 1,
    },
    fanName: {
        color: Colors.TEXT_PRIMARY,
        fontSize: scale(14),
        fontWeight: "600",
    },
    lastMessage: {
        fontSize: scale(12),
        color: Colors.FADE_TEXT,
        marginTop: 2,
    },
    rightContainer: {
        alignItems: 'flex-end',
        justifyContent: 'center',
        minWidth: 60,
    },
    activeTime: {
        fontSize: scale(10),
        color: Colors.FADE_TEXT,
        marginBottom: 4,
    },
    badge: {
        backgroundColor: Colors.THEME,
        borderRadius: 12,
        paddingHorizontal: 6,
        paddingVertical: 2,
        alignItems: "center",
        justifyContent: "center",
        minWidth: 20,
    },
    badgeText: {
        color: Colors.WHITE,
        fontSize: scale(10),
        fontWeight: "600",
        textAlign: "center"
    }
});
