import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import Ionicons from 'react-native-vector-icons/dist/Ionicons'
import { Colors } from '../../../constants'


const SelfStoryHighLight = ({ image, userName, userImg, onPress }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.storyContainer} >
                <View style={styles.imageWrapper}>
                    <ImageBackground
                        source={{ uri: image }}
                        style={styles.storyImg}
                        resizeMode='cover'
                    >
                        <TouchableOpacity style={styles.userImgContainer} onPress={onPress}>
                            <Image source={{ uri: userImg }} style={styles.userImg} />

                        </TouchableOpacity>
                    </ImageBackground>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.storyAddBtn} onPress={onPress}>
                <Ionicons
                    name={'add-circle'}
                    size={25}
                    color={Colors.THEME}
                />
            </TouchableOpacity>
            <Text style={styles.userName}>{userName}</Text>
        </View>
    )
}

export default SelfStoryHighLight

const styles = StyleSheet.create({
    container: {
        alignSelf: "flex-start",
        justifyContent: "center",
        alignItems: "center"
    },
    storyContainer: {
        alignSelf: "flex-start",
        padding: scale(3),
        marginStart: moderateScale(10),
    },

    imageWrapper: {
        height: verticalScale(120),
        width: moderateScale(80),
        borderRadius: scale(12),
        overflow: 'hidden',
        elevation: scale(8),
    },

    storyImg: {
        flex: 1,
        width: null,
        height: null,
    },
    userName: {
        fontWeight: "500",
        alignSelf: "center",
        marginStart: moderateScale(7),
        marginTop: verticalScale(4),

    },

    userImgContainer: {
        marginTop: verticalScale(10),
        borderWidth: scale(2),
        borderColor: Colors.THEME,
        borderRadius: scale(100),
        height: verticalScale(48),
        width: moderateScale(48),
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center"

    },

    userImg: {
        height: verticalScale(40),
        width: moderateScale(40),
        borderRadius: scale(100),

    },
    storyAddBtn: {
        position: "absolute",
        backgroundColor: Colors.WHITE,
        borderRadius: scale(100),
        top: 48,
        right: 20
    }
})