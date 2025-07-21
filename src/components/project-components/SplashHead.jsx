import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import Images from '../../constants/Images';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { Colors } from '../../constants';
import Entypo from 'react-native-vector-icons/Entypo';

const SplashHead = () => {
    return (
        <View style={styles.container}>
            <FastImage
                source={Images.WHITE_LOGO}
                style={styles.logo}
                resizeMode={FastImage.resizeMode.contain}
            />
            <View style={styles.crossContainer}>
                <View style={styles.crossBG}>
                    <Entypo
                        name="cross"
                        color={Colors.BLACK}
                        size={20}
                        style={styles.cross}
                    />
                </View>
            </View>
        </View>
    );
};

export default SplashHead;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: Colors.WHITE,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: verticalScale(92),
    },
    logo: {
        width: moderateScale(200),
        height: verticalScale(92),
        marginLeft: moderateScale(-30),
    },
    crossContainer: {
        marginRight: moderateScale(16),
    },
    crossBG: {
        padding: scale(6),
        backgroundColor: Colors.FADE,
        borderRadius: scale(8)
    },
    cross: {
    }
});