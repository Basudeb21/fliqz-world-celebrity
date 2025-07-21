import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/dist/Ionicons'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

import { useNavigation } from '@react-navigation/native';
import { Colors, Images, NavigationStrings } from '../../../constants';

const StoryHead = ({ title, time }) => {
    const navigation = useNavigation();
    const handleBackPress = () => {
        navigation.goBack(); // ⬅ better than navigate in this context
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={handleBackPress} style={styles.backBtn}>
                <Ionicons
                    name="arrow-back-outline"
                    size={24}
                    color={Colors.WHITE}
                />
            </TouchableOpacity>

            <View style={styles.userContainer}>
                <Image style={styles.image} source={{ uri: Images.CELEBRITY_AVATAR_ONE }} />
                <View style={styles.centerContainer}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.time}>{time}</Text>
                </View>
            </View>
        </View>
    );
};


export default StoryHead;

const styles = StyleSheet.create({
    container: {
        height: verticalScale(60),
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: moderateScale(16),
        zIndex: 15,
        elevation: 15,
        position: 'relative',
    },
    backBtn: {
        marginRight: moderateScale(12),
    },
    userContainer: {
        flexDirection: "row",
        alignItems: 'center',
        flex: 1,
    },
    image: {
        width: moderateScale(40),
        height: verticalScale(40),
        borderRadius: scale(100),
        marginRight: moderateScale(10),
    },
    centerContainer: {
        justifyContent: 'center',
    },
    title: {
        color: Colors.WHITE,
        fontSize: scale(16),
        fontWeight: "600",
    },
    time: {
        color: Colors.SILVER,
        fontSize: scale(11),
        marginTop: verticalScale(2),
    },
});
