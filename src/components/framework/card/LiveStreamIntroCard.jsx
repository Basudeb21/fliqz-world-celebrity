import {
    ImageBackground,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors, Images } from '../../../constants';
import { scale, verticalScale } from 'react-native-size-matters';
import { Spacer } from '../boots';

const LiveStreamIntroCard = ({ item, onPress }) => {
    const isLive = item?.isLive;

    return (
        <TouchableOpacity
            style={styles.liveCard}
            onPress={onPress}
            activeOpacity={0.85}
        >
            <ImageBackground
                source={{ uri: Images.BANNER_IMG }}
                style={styles.liveCardImage}
                resizeMode="cover"
            >
                <View style={[styles.liveBadge, isLive ? styles.liveOn : styles.liveOff]}>
                    <View style={[styles.liveDot, isLive ? styles.dotOn : styles.dotOff]} />
                    <Text style={styles.liveText}>
                        {isLive ? 'LIVE' : 'OFFLINE'}
                    </Text>
                </View>

                {item?.isPaid && (
                    <LinearGradient
                        colors={[
                            Colors.GRADIENT_GOLDEN_ONE,
                            Colors.GRADIENT_GOLDEN_TWO,
                            Colors.GRADIENT_GOLDEN_THREE,
                        ]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.paidBadge}
                    >
                        <Text style={styles.dollarSymbol}>$</Text>
                        <Text style={styles.paidText}>{item?.price}</Text>
                    </LinearGradient>
                )}
            </ImageBackground>

            <LinearGradient
                colors={[Colors.BUTTON_GRADIENT_ONE, Colors.BUTTON_GRADIENT_TWO]}
                style={styles.infoContainer}
            >
                <Text style={styles.title} numberOfLines={1}>
                    {item?.title || 'Untitled Stream'}
                </Text>

                <Text style={styles.description} numberOfLines={2}>
                    {item?.description || 'No description'}
                </Text>

                <Spacer height={6} />

                <View style={styles.metaCreatorRow}>
                    <View style={styles.metaItem}>
                        <Ionicons name="eye-outline" size={14} color={Colors.WHITE} />
                        <Text style={styles.metaText}>
                            {item?.viewerCount ?? 0}
                        </Text>
                    </View>

                    <View style={styles.creatorInline}>
                        <Ionicons
                            name="person-circle-outline"
                            size={18}
                            color={Colors.WHITE}
                        />
                        <Text
                            style={styles.creatorText}
                            numberOfLines={1}
                            ellipsizeMode="tail"
                        >
                            {item?.name || item?.username || 'Anonymous'}
                        </Text>
                    </View>

                    <View style={styles.metaItem}>
                        <MaterialCommunityIcons
                            name="video-high-definition"
                            size={16}
                            color={Colors.WHITE}
                        />
                        <Text style={styles.metaText}>
                            {item?.quality || 'HD'}
                        </Text>
                    </View>
                </View>
            </LinearGradient>
        </TouchableOpacity>
    );
};

export default LiveStreamIntroCard;


const styles = StyleSheet.create({
    liveCard: {
        width: '100%',
        borderRadius: scale(12),
        overflow: 'hidden',
        backgroundColor: Colors.WHITE,
        marginBottom: verticalScale(12),
        elevation: 4,
    },

    liveCardImage: {
        height: verticalScale(110),
        padding: scale(8),
        justifyContent: 'space-between',
        backgroundColor: Colors.LIGHT_PLACEHOLDER,
    },

    liveBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: "flex-start",
        paddingHorizontal: scale(8),
        paddingVertical: scale(3),
        borderRadius: scale(20),
    },

    liveOn: { backgroundColor: 'rgba(255,0,0,0.25)' },
    liveOff: { backgroundColor: 'rgba(0,255,0,0.25)' },

    liveDot: {
        width: scale(8),
        height: scale(8),
        borderRadius: 20,
        marginRight: scale(6),
    },

    dotOn: { backgroundColor: 'red' },
    dotOff: { backgroundColor: 'lime' },

    liveText: {
        fontSize: scale(11),
        fontWeight: '700',
        color: Colors.WHITE,
    },

    paidBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: scale(10),
        paddingVertical: scale(4),
        borderRadius: scale(20),
        alignSelf: 'flex-end',
    },

    dollarSymbol: {
        fontSize: scale(14),
        fontWeight: '900',
        color: 'red',
        marginRight: scale(4),
    },

    paidText: {
        fontSize: scale(12),
        fontWeight: '700',
        color: Colors.BLACK,
    },

    infoContainer: {
        padding: scale(10),
    },

    title: {
        fontSize: scale(14),
        fontWeight: '700',
        color: Colors.WHITE,
    },

    description: {
        fontSize: scale(12),
        color: Colors.WHITE,
        opacity: 0.85,
    },

    metaCreatorRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: scale(8),
    },

    metaItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: scale(4),
    },

    metaText: {
        fontSize: scale(11),
        color: Colors.WHITE,
    },

    creatorInline: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: scale(6),
        flex: 1,
        minWidth: 0,
    },

    creatorText: {
        fontSize: scale(12),
        fontWeight: '500',
        color: Colors.WHITE,
        flex: 1,
    },
});
