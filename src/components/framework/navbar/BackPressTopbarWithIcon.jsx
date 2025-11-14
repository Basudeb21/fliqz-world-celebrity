import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/dist/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors } from '../../../constants';
import { useNavigation } from '@react-navigation/native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';


const BackPressTopbarWithIcon = ({ title }) => {

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
            <TouchableOpacity>
                <MaterialCommunityIcons
                    name={"chat-plus-outline"}
                    size={24}
                    color={Colors.THEME}
                />
            </TouchableOpacity>

        </View>
    )
}

export default BackPressTopbarWithIcon;

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
        fontSize: scale(20),
        fontWeight: "400",
        alignSelf: "flex-start",
        position: "absolute",
        left: -20
    },

    chatBtn: {

    }

})