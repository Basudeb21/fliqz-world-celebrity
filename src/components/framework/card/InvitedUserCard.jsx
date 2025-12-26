import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Colors } from '../../../constants';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { HR } from '../boots';

const InvitedUserCard = ({
    image,
    fanName,
    fanActiveTime,
    ammount,
    onPress
}) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.container}>
                <Image
                    style={styles.userImage}
                    source={{ uri: image }}
                />

                <View style={styles.userInfoContainer}>
                    <Text style={styles.fanName}>{fanName}</Text>
                </View>

            </View>

            <HR height={1} color={Colors.HR_COLOR} width="90%" center />
        </TouchableOpacity>
    );
};

export default InvitedUserCard;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: verticalScale(12),
        paddingHorizontal: moderateScale(15),
    },
    userImage: {
        width: scale(45),
        height: scale(45),
        borderRadius: scale(22),
    },
    userInfoContainer: {
        flex: 1,
        marginLeft: moderateScale(12),
    },
    fanName: {
        fontSize: scale(13),
        fontWeight: '700',
        color: Colors.BLACK,
    },
    activeTime: {
        fontSize: scale(11),
        color: Colors.FADE_TEXT,
        marginTop: verticalScale(2),
    },
    rightIconContainer: {
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    earned: {
        fontSize: scale(11),
        fontWeight: '600',
        color: Colors.FADE_TEXT,
    },
    earnedAmmount: {
        fontSize: scale(12),
        fontWeight: '800',
        color: Colors.THEME,
    },
});
