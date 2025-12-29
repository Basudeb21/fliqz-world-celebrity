import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Colors } from '../../../constants';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import API from '../../../api/common/API';

const StoryHighlight = ({ image, videoThumbnail, userName, onPress }) => {
    const isVideo = image?.endsWith('.mp4');

    const imageUrl = image?.startsWith('http')
        ? image
        : API.STORAGE_URL + image;

    const thumbnailUrl = videoThumbnail
        ? API.STORAGE_URL + videoThumbnail
        : null;


    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.storyContainer} onPress={onPress}>
                <View style={styles.imageWrapper}>
                    {isVideo && thumbnailUrl ? (
                        <Image
                            source={{ uri: thumbnailUrl }}
                            style={styles.storyImg}
                            resizeMode="cover"
                        />
                    ) : (
                        <Image
                            source={{ uri: imageUrl }}
                            style={styles.storyImg}
                            resizeMode="cover"
                        />
                    )}

                </View>
            </TouchableOpacity>

            <Text style={styles.userName}>{userName}</Text>
        </View>
    );
};

export default StoryHighlight;

const styles = StyleSheet.create({
    container: {
        alignSelf: "flex-start",
        justifyContent: "center",
        alignItems: "center",
    },
    storyContainer: {
        alignSelf: "flex-start",
        padding: scale(3),
        marginStart: moderateScale(1),
    },
    imageWrapper: {
        height: verticalScale(120),
        width: moderateScale(95),
        borderRadius: scale(12),
        overflow: 'hidden',
        elevation: scale(8),
        backgroundColor: '#000',
    },
    storyImg: {
        width: '100%',
        height: '100%',
    },
    userName: {
        fontWeight: "500",
        alignSelf: "flex-start",
        marginStart: moderateScale(7),
        marginTop: verticalScale(4),
        color: Colors.BLACK,
    },
});
