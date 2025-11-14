import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/dist/Ionicons'
import Entypo from 'react-native-vector-icons/dist/Entypo'

import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

import { useNavigation } from '@react-navigation/native';
import { Colors } from '../../../constants';
const BackpressTopBarWithNotificationAndThreeDots = ({ title }) => {
    const navigation = useNavigation();
    const handleBackPress = () => {
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <View style={styles.sideContainer}>
                <TouchableOpacity onPress={handleBackPress}>
                    <Ionicons
                        name="arrow-back-outline"
                        size={24}
                        color={Colors.BLACK}
                    />
                </TouchableOpacity>
            </View>

            <View style={styles.centerContainer}>
                <Text style={styles.title}>{title}</Text>
            </View>

            <View style={styles.sideContainer} />
            <View style={styles.iconContainer}>
                <TouchableOpacity>
                    <Ionicons
                        name="notifications"
                        size={22}
                        color={Colors.THEME}
                    />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Entypo
                        name="dots-three-vertical"
                        size={22}
                        color={Colors.THEME}
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default BackpressTopBarWithNotificationAndThreeDots

const styles = StyleSheet.create({
    container: {
        height: verticalScale(60),
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: moderateScale(16),
    },
    sideContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    centerContainer: {
        flex: 2,
        justifyContent: 'center',
    },
    title: {
        color: Colors.BLACK,
        fontSize: scale(22),
        fontWeight: "500",
        position: "absolute",
        left: -35
    },
    iconContainer: {
        flexDirection: "row",
        gap: moderateScale(15)
    }
})