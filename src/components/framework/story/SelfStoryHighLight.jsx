import {
    Image,
    ImageBackground,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

import React from 'react';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors } from '../../../constants';

const SelfStoryHighLight = ({
    image,
    userName,
    userImg,
    onPress,
    empty,
    onPressView
}) => {

    const imageSource =
        typeof image === 'string'
            ? image.startsWith('http')
                ? { uri: image }
                : image
            : image;

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.storyContainer} onPress={onPressView}>
                <View style={styles.imageWrapper}>
                    <ImageBackground
                        source={imageSource}
                        style={styles.storyImg}
                        resizeMode="cover"
                    >
                        {!empty && userImg && (
                            <View style={styles.userImgContainer}>
                                <Image
                                    source={{ uri: userImg }}
                                    style={styles.userImg}
                                />
                            </View>
                        )}
                    </ImageBackground>
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.storyAddBtn} onPress={onPress}>
                <Ionicons
                    name="add-circle"
                    size={25}
                    color={Colors.THEME}
                />
            </TouchableOpacity>

            <Text style={styles.userName}>{userName}</Text>
        </View>
    );
};

export default SelfStoryHighLight;

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
    },
    storyContainer: {
        padding: scale(3),
        marginStart: moderateScale(10),
    },
    imageWrapper: {
        height: verticalScale(120),
        width: moderateScale(95),
        borderRadius: scale(12),
        overflow: 'hidden',
        elevation: scale(8),
    },
    storyImg: {
        width: '100%',
        height: '100%',
    },
    userName: {
        fontWeight: "500",
        marginTop: verticalScale(4),
    },
    userImgContainer: {
        position: 'absolute',
        top: 15,
        left: 12,
        borderWidth: 2,
        borderColor: Colors.THEME,
        borderRadius: 100,
        padding: 2,
    },
    userImg: {
        height: 40,
        width: 40,
        borderRadius: 20,
    },
    storyAddBtn: {
        position: "absolute",
        top: 45,
        left: 52,
        backgroundColor: Colors.WHITE,
        borderRadius: 100,
    }
});
