import { Image, StyleSheet, Text, View, Pressable, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { Colors, Images } from '../../../constants';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
const LiveOwnerPostCard = ({ creator, caption }) => {
    const about = caption || "";
    const [expanded, setExpanded] = useState(false);
    const [isFollowed, setIsFollowed] = useState(false);
    const shouldShowSeeMore = about.length > 70;
    const displayText = expanded ? about : about.slice(0, 70) + (shouldShowSeeMore ? '...' : '');

    const handleFollowChange = () => {
        setIsFollowed(!isFollowed);
    }

    return (
        <View style={styles.container}>
            <Image
                style={styles.image}
                source={{ uri: Images.CELEBRITY_AVATAR_ONE }}
            />
            <View style={{ flex: 1 }}>
                <View style={styles.userRow}>
                    <Text style={styles.userName}>{creator || "User"}</Text>
                    <TouchableOpacity onPress={handleFollowChange}>
                        <Text style={styles.followTxt}>{isFollowed ? "Following" : "Follow"}</Text>
                    </TouchableOpacity>
                </View>
                <Text style={styles.postAbout}>{displayText}</Text>

                {shouldShowSeeMore && (
                    <Pressable onPress={() => setExpanded(!expanded)}>
                        <Text style={styles.seeMore}>
                            {expanded ? 'See less' : 'See more'}
                        </Text>
                    </Pressable>
                )}
            </View>
        </View>
    );
};

export default LiveOwnerPostCard;

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.TRANSPARENT_WHITE_LIGHT,
        flexDirection: 'row',
        gap: scale(10),
        position: 'absolute',
        zIndex: 10,
        left: moderateScale(10),
        right: moderateScale(10),
        bottom: 20,
        paddingHorizontal: moderateScale(10),
        paddingVertical: verticalScale(8),
        borderRadius: scale(12),
    },
    image: {
        height: verticalScale(45),
        width: moderateScale(45),
        borderRadius: scale(100),
    },
    userName: {
        fontSize: scale(15),
        color: Colors.WHITE,
        fontWeight: '600',
    },
    postAbout: {
        fontSize: scale(12),
        color: Colors.WHITE,
        opacity: 0.9,
    },
    seeMore: {
        fontSize: scale(12),
        color: Colors.THEME,
        marginTop: 2,
        fontWeight: 'bold',
    },
    userRow: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    followTxt: {
        fontSize: scale(12),
        color: Colors.WHITE,
        fontWeight: '400',
        marginEnd: moderateScale(10),
        borderWidth: scale(1),
        borderColor: Colors.WHITE,
        paddingHorizontal: moderateScale(10),
        paddingVertical: verticalScale(2),
        borderRadius: scale(6),
    }
});
