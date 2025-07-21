import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Colors } from '../../../constants';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import HR from '../boots/HR';

const RefaralCard = ({ image, fanName, fanActiveTime, ammount, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.container}>
                <Image style={styles.userImage} source={{ uri: image }} />

                <View style={styles.userInfoContainer}>
                    <Text style={styles.fanName}>{fanName}</Text>
                    <Text style={styles.activeTime}>{fanActiveTime}</Text>
                </View>

                <View style={styles.rightIconContainer}>
                    <Text style={styles.earned}>Earned : <Text style={styles.earnedAmmount}> ${ammount}</Text></Text>
                </View>
            </View>
            <HR height={1} color={Colors.HR_COLOR} width='90%' center={true} />
        </TouchableOpacity>
    )
}

export default RefaralCard

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: verticalScale(20),
        paddingHorizontal: moderateScale(20),
    },
    userImage: {
        width: moderateScale(40),
        height: verticalScale(40),
        borderRadius: scale(100),
    },
    userInfoContainer: {
        marginStart: moderateScale(20),
        flex: 1,
    },
    fanName: {
        color: Colors.FADE_TEXT,
        fontSize: scale(14),
        fontWeight: "500",
    },
    activeTime: {
        fontSize: scale(10),
        marginTop: verticalScale(2),
    },
    rightIconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    earned: {
        fontWeight: "600",
        color: Colors.PLACEHOLDER
    },
    earnedAmmount: {
        fontWeight: "500",
        color: Colors.THEME
    }
})