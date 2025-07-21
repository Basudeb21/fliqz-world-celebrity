import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Colors } from '../../../constants';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

const EventCard = ({ image, eventName, date, eventOrg, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.card}>
            <ImageBackground
                source={{ uri: image }}
                style={styles.image}
                imageStyle={styles.imageStyle}
            >
                <View style={styles.overlay} />

                <View style={styles.textContainer}>
                    <Text style={styles.eventName} numberOfLines={1}>{eventName}</Text>
                    <Text style={styles.eventDate}>{date}</Text>
                    <Text style={styles.eventOrg} numberOfLines={1}>{eventOrg}</Text>
                </View>
            </ImageBackground>
        </TouchableOpacity>
    );
};

export default EventCard;

const styles = StyleSheet.create({
    card: {
        width: '49%',
        borderRadius: scale(12),
        overflow: 'hidden',
    },
    image: {
        height: verticalScale(200),
        justifyContent: 'flex-end',
    },
    imageStyle: {
        borderRadius: scale(12),
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: Colors.TRANSPARENT_BLACK_DARK,
        borderRadius: scale(12),
    },
    textContainer: {
        padding: moderateScale(10),
    },
    eventName: {
        fontSize: scale(15),
        fontWeight: '600',
        color: Colors.WHITE,
        marginBottom: verticalScale(2),
    },
    eventDate: {
        fontSize: scale(12),
        fontWeight: '400',
        color: Colors.WHITE,
    },
    eventOrg: {
        fontSize: scale(13),
        fontWeight: '500',
        color: Colors.SILVER,
        marginTop: verticalScale(4),
    },
});
