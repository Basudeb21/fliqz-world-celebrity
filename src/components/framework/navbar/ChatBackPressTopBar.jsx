import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/dist/Ionicons'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { Colors } from '../../../constants';
import { GradientIcon } from '../icon';

const ChatBackPressTopBar = ({ info }) => {
    const navigation = useNavigation();
    const handleBackPress = () => {
        navigation.goBack();
    };
    return (
        <View style={styles.container}>
            <View style={styles.sideContainer}>
                <TouchableOpacity onPress={handleBackPress}>
                    <GradientIcon
                        name={"arrow-back-outline"}
                        size={24}
                        IconPack={Ionicons}
                        colors={[Colors.BUTTON_GRADIENT_ONE, Colors.BUTTON_GRADIENT_TWO]}
                    />

                </TouchableOpacity>
            </View>

            <View style={styles.centerContainer}>
                <Image
                    style={styles.image}
                    source={{ uri: info.avatar }}
                />
                <View>
                    <Text style={styles.title}>{info.name}</Text>
                    <Text style={styles.time}>{"20m ago"}</Text>
                </View>
            </View>

            <View style={styles.sideContainer} />
        </View>
    )
}

export default ChatBackPressTopBar

const styles = StyleSheet.create({
    container: {
        height: verticalScale(70),
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
        justifyContent: "flex-start",
        flexDirection: "row",
        alignItems: "center",
        right: scale(50)
    },
    title: {
        color: Colors.BLACK,
        fontSize: scale(16),
        fontWeight: "500",
    },
    image: {
        height: verticalScale(40),
        width: moderateScale(40),
        borderRadius: scale(100),
        marginEnd: moderateScale(15)
    },
    time: {
        color: Colors.PLACEHOLDER,
        fontSize: scale(10),
        fontWeight: "500",
    }
})