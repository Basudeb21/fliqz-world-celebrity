import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import FastImage from 'react-native-fast-image';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import Entypo from 'react-native-vector-icons/dist/Entypo';
import FontAwesome5 from 'react-native-vector-icons/dist/FontAwesome5';
import { Colors, Images } from '../../../constants';
import Spacer from '../boots/Spacer';
import GradientIcon from '../icon/GradientIcon';



const HomeTopBar = ({ notificationOnPress, searchOnPress, walletOnPress, cartOnPress }) => {
    const ICON_SIZE = 20;
    const ICON_SPACE = 8;
    return (
        <View style={styles.container}>
            <FastImage
                source={Images.BLACK_LOGO}
                style={styles.logo}
                resizeMode={FastImage.resizeMode.contain}
            />
            <View style={styles.iconContainer}>
                <TouchableOpacity onPress={searchOnPress}>
                    <GradientIcon
                        name={"search"}
                        size={ICON_SIZE}
                        IconPack={FontAwesome5}
                        colors={[Colors.BUTTON_GRADIENT_ONE, Colors.BUTTON_GRADIENT_TWO]}
                    />
                </TouchableOpacity>
                <Spacer width={ICON_SPACE} />
                <TouchableOpacity onPress={notificationOnPress}>
                    <GradientIcon
                        name="notifications"
                        size={ICON_SIZE}
                        IconPack={Ionicons}
                        colors={[Colors.BUTTON_GRADIENT_ONE, Colors.BUTTON_GRADIENT_TWO]}
                    />
                </TouchableOpacity>
                <Spacer width={ICON_SPACE} />

                <TouchableOpacity onPress={walletOnPress}>
                    <GradientIcon
                        name="wallet"
                        size={ICON_SIZE}
                        IconPack={Entypo}
                        colors={[Colors.BUTTON_GRADIENT_ONE, Colors.BUTTON_GRADIENT_TWO]}
                    />
                </TouchableOpacity>
                <Spacer width={ICON_SPACE} />

                <TouchableOpacity onPress={cartOnPress}>
                    <GradientIcon
                        name="shopping-cart"
                        size={ICON_SIZE}
                        IconPack={FontAwesome5}
                        colors={[Colors.BUTTON_GRADIENT_ONE, Colors.BUTTON_GRADIENT_TWO]}
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default HomeTopBar

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        maxHeight: verticalScale(65),
        minHeight: verticalScale(65)
    },
    iconContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginEnd: verticalScale(8),
        justifyContent: "space-evenly"
    },
    logo: {
        width: moderateScale(150),
        height: verticalScale(60),
        marginTop: verticalScale(-6),
        marginLeft: (-20)
    },
})