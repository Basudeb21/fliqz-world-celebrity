import { View, Text, TouchableOpacity, StyleSheet, Platform, StatusBar, ImageBackground } from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { useNavigation } from '@react-navigation/native';
import { Colors, Images } from '../../../constants';
import { useSelector } from 'react-redux';

const BackpressProfileTopBar = ({ title }) => {
    const navigation = useNavigation();
    const handleBackPress = () => {
        navigation.goBack();
    };

    const user = useSelector((state) => state.auth.user);

    return (
        <ImageBackground style={styles.container} source={{ uri: user?.cover }}>
            <View style={styles.row}>
                <TouchableOpacity onPress={handleBackPress} style={styles.icon}>
                    <Ionicons
                        name="arrow-back-outline"
                        size={28}
                        color={Colors.BLACK}
                    />
                </TouchableOpacity>
                <Text style={styles.title}>{title}</Text>
            </View>
        </ImageBackground>
    );
};

export default BackpressProfileTopBar;

const styles = StyleSheet.create({
    container: {
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : verticalScale(40),
        height: verticalScale(130),
        backgroundColor: Colors.THEME,
        justifyContent: 'center',
        paddingHorizontal: moderateScale(16),
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        position: "absolute",
        top: 20,
        left: 15
    },
    icon: {
        marginRight: moderateScale(10),
    },
    title: {
        color: Colors.BLACK,
        fontSize: scale(20),
        fontWeight: '400',
    },
});
