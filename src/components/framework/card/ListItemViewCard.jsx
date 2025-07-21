import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Colors } from '../../../constants';
import Entypo from 'react-native-vector-icons/Entypo'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

import HR from '../boots/HR';

const ListItemViewCard = ({ image, fanName, fanID, onPress }) => {
    return (
        <View onPress={onPress}>
            <View style={styles.container}>
                <TouchableOpacity>
                    <Image style={styles.userImage} source={{ uri: image }} />
                </TouchableOpacity>
                <View style={styles.userInfoContainer}>
                    <Text style={styles.fanName}>{fanName}</Text>
                    <Text style={styles.activeTime}>{fanID}</Text>
                </View>

                <TouchableOpacity style={styles.rightIconContainer}>
                    <Entypo
                        name={"dots-three-vertical"}
                        size={20}
                        color={Colors.BLACK}
                    />
                </TouchableOpacity>
            </View>
            <HR height={1} color={Colors.HR_COLOR} width='90%' center={true} />
        </View>
    )
}

export default ListItemViewCard

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: verticalScale(10),
        paddingHorizontal: moderateScale(20),
        justifyContent: "center"
    },
    userImage: {
        width: moderateScale(40),
        height: verticalScale(40),
        borderRadius: scale(100),
    },
    userInfoContainer: {
        marginStart: moderateScale(20),
        justifyContent: "center",
        flex: 1,
    },
    fanName: {
        color: Colors.FADE_TEXT,
        fontSize: scale(18),
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
})