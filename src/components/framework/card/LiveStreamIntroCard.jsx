import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { Colors } from '../../../constants'
import { scale, verticalScale } from 'react-native-size-matters'
import { Spacer } from '../boots'

const LiveStreamIntroCard = ({ item, onPress }) => {
    return (
        <TouchableOpacity style={styles.liveCard} onPress={onPress}>
            <Image
                source={typeof item.imageUrl === 'string' ? { uri: item.imageUrl } : item.imageUrl}
                style={styles.liveCardImage}
            />
            <LinearGradient
                colors={[Colors.BUTTON_GRADIENT_ONE, Colors.BUTTON_GRADIENT_TWO]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.liveCardTextContainer}
            >
                <Text style={styles.liveCardText} numberOfLines={1}>
                    {item.title}
                </Text>
                <Spacer height={10} />
                <Text style={styles.liveCardSubText} numberOfLines={2}>
                    {item.description}
                </Text>
            </LinearGradient>
        </TouchableOpacity>
    )
}

export default LiveStreamIntroCard

const styles = StyleSheet.create({
    liveCard: {
        flex: 1,
        backgroundColor: Colors.FADE,
        borderRadius: scale(8),
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: Colors.LIGHT_GRAY,
        elevation: 2,
        shadowColor: Colors.BLACK,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: scale(4),
        marginHorizontal: scale(5),
        width: '49%',
    },
    liveCardImage: {
        width: '100%',
        height: verticalScale(100),
        borderTopRightRadius: scale(8),
        borderTopLeftRadius: scale(8),
        resizeMode: 'cover',
        backgroundColor: Colors.LIGHT_PLACEHOLDER,
    },
    liveCardTextContainer: {
        padding: scale(10),
        borderBottomLeftRadius: scale(8),
        borderBottomRightRadius: scale(8),
    },
    liveCardText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.WHITE,
    },
    liveCardSubText: {
        fontSize: 14,
        color: Colors.WHITE,
    },
})
