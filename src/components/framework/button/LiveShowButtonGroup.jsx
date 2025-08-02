import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { Colors, Images, NavigationStrings } from '../../../constants';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import Feather from 'react-native-vector-icons/dist/Feather';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';

import { likePressSound, subscibePressSound } from '../../../sound/SoundManager';
import { useNavigation } from '@react-navigation/native';
import { SendTipsModal } from '../modal';
import { Spacer } from '../boots';

const LiveShowButtonGroup = ({ onLikePress }) => {
    const [isFavorite, setIsFavorite] = useState(false);
    const [isBookMarked, setIsBookmarked] = useState(false);
    const [isSendTipsVisible, setIsSendTipsVisible] = useState(false);

    const navigation = useNavigation();

    const handleOnPressFavorite = () => {
        likePressSound();
        setIsFavorite(!isFavorite);
        if (onLikePress) {
            onLikePress();
        }
    };

    const handleOnPressSubscription = () => {
        subscibePressSound();
    };

    const handleOnPressBookmark = () => {
        setIsBookmarked(!isBookMarked);
    };

    const onPressComment = () => {
        navigation.navigate(NavigationStrings.ALL_COMMENTS);
    };

    const onPressTips = () => {
        setIsSendTipsVisible(true);
    };

    const closeSendTipsModal = () => {
        setIsSendTipsVisible(false);
    };

    return (
        <View style={styles.container}>
            <View>
                <TouchableOpacity style={styles.userImgContainer}>
                    <Image source={{ uri: Images.CELEBRITY_AVATAR_FIVE }} style={styles.userImg} />
                    <TouchableOpacity style={styles.storyAddBtn}>
                        <Ionicons
                            name={'add-circle'}
                            size={16}
                            color={Colors.THEME}
                        />
                    </TouchableOpacity>
                </TouchableOpacity>
            </View>

            <Spacer />

            <View style={styles.counterContainer}>
                <TouchableOpacity onPress={handleOnPressFavorite}>
                    <MaterialIcons
                        name={isFavorite ? 'favorite' : 'favorite-outline'}
                        color={Colors.WHITE}
                        size={24}
                    />
                </TouchableOpacity>
                <Text style={styles.count}>36</Text>
            </View>

            <View style={styles.counterContainer}>
                <TouchableOpacity onPress={handleOnPressBookmark}>
                    <Ionicons
                        name={isBookMarked ? 'bookmark' : 'bookmark-outline'}
                        color={Colors.WHITE}
                        size={24}
                    />
                </TouchableOpacity>
                <Text style={styles.count}>20</Text>
            </View>

            <View style={styles.counterContainer}>
                <TouchableOpacity onPress={onPressTips}>
                    <Feather
                        name="dollar-sign"
                        color={Colors.WHITE}
                        size={24}
                    />
                </TouchableOpacity>
                <Text style={styles.count}>12</Text>
            </View>

            <View style={styles.counterContainer}>
                <TouchableOpacity onPress={handleOnPressSubscription}>
                    <MaterialIcons
                        name="subscriptions"
                        color={Colors.WHITE}
                        size={22}
                    />
                </TouchableOpacity>
                <Text style={styles.count}>1.5M</Text>
            </View>

            <View style={styles.counterContainer}>
                <TouchableOpacity onPress={onPressComment}>
                    <AntDesign
                        name="message1"
                        color={Colors.WHITE}
                        size={22}
                    />
                </TouchableOpacity>
                <Text style={styles.count}>120</Text>
            </View>

            <View style={styles.counterContainer}>
                <TouchableOpacity onPress={onPressComment}>
                    <FontAwesome
                        name="share"
                        color={Colors.WHITE}
                        size={20}
                    />
                </TouchableOpacity>
                <Text style={styles.count}>8</Text>
            </View>

            <SendTipsModal visible={isSendTipsVisible} onClose={closeSendTipsModal} />
        </View>
    );
};

export default LiveShowButtonGroup;

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 120,
        right: 10,
        zIndex: 100,
        alignSelf: 'flex-start',
        padding: scale(10),
        justifyContent: 'center',
        alignItems: 'center',
        gap: scale(15),
        borderRadius: 100,
    },
    counterContainer: {
        alignItems: 'center',
        marginTop: verticalScale(-7),
    },
    count: {
        color: Colors.WHITE,
        fontWeight: '500',
        fontSize: scale(14),
        marginTop: verticalScale(3),
    },
    userImgContainer: {
        borderRadius: scale(100),
        height: verticalScale(20),
        width: moderateScale(20),
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    userImg: {
        height: verticalScale(35),
        width: moderateScale(35),
        borderRadius: scale(100),
    },
    storyAddBtn: {
        position: 'absolute',
        backgroundColor: Colors.WHITE,
        borderRadius: scale(100),
        top: 20,
        right: -7,
    },
});
