import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { Colors, NavigationStrings } from '../../../constants';
import { useNavigation } from '@react-navigation/native';
import { likePressSound } from '../../../sound/SoundManager';
import { useSelector } from 'react-redux';
import { PostThreeDotsModal, SendTipsModal } from '../modal';
import { GradientIcon } from '../icon';
import { LikePostApi } from '../../../api/app/post';



const BottomBar = ({ focused = true, createdAt, data }) => {
    const [favoriteFocused, setFavoriteFocused] = useState(data.is_liked);
    const [likeCount, setLikeCount] = useState(data.like_count);
    const [commentFocused, setCommentFocused] = useState(false);
    const [giftFocused, setGiftFocused] = useState(false);
    const [threeDotsVisible, setThreeDotsVisible] = useState(false);

    const navigation = useNavigation();
    const token = useSelector(state => state.auth.token);

    const handleSetFavorite = async () => {
        try {
            const result = await LikePostApi(token, data.id);

            if (result?.success) {
                const newLikeState = !favoriteFocused;
                setFavoriteFocused(newLikeState);
                setLikeCount(prev => newLikeState ? prev + 1 : prev - 1);
                likePressSound();
            } else {
                console.log('Like API failed:', result?.message || 'Unknown error');
            }
        } catch (error) {
            console.error('Like API Error:', error);
        }
    };

    const openTips = () => {
        navigation.navigate(NavigationStrings.POST_STACK, {
            screen: NavigationStrings.ALL_TIPS,
        });
    };

    const handleSetComment = () => {
        setCommentFocused(!commentFocused);
        navigation.navigate(NavigationStrings.POST_STACK, {
            screen: NavigationStrings.ALL_COMMENTS,
            params: {
                postID: data.id,
                comments: data.comment,
            },
        });
    };

    const handleSetGift = () => {
        setGiftFocused(!giftFocused);
    };

    return (
        <View style={styles.container}>
            <View style={styles.left}>
                <TouchableOpacity style={styles.iconContainer} onPress={handleSetFavorite}>
                    <GradientIcon
                        name={favoriteFocused ? 'favorite' : 'favorite-border'}
                        size={24}
                        IconPack={MaterialIcons}
                        colors={[Colors.BUTTON_GRADIENT_ONE, Colors.BUTTON_GRADIENT_TWO]}
                    />
                    <Text style={styles.counter}>{likeCount}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.iconContainer} onPress={handleSetComment}>
                    <GradientIcon
                        name={'chatbox-ellipses-outline'}
                        size={24}
                        IconPack={Ionicons}
                        colors={[Colors.BUTTON_GRADIENT_ONE, Colors.BUTTON_GRADIENT_TWO]}
                    />
                    <Text style={styles.counter}>{data.comment_count}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.iconContainer} onPress={handleSetGift}>
                    <GradientIcon
                        name={'dollar'}
                        size={16}
                        IconPack={FontAwesome}
                        colors={[Colors.BUTTON_GRADIENT_ONE, Colors.BUTTON_GRADIENT_TWO]}
                    />
                    <TouchableOpacity onPress={openTips}>
                        <Text style={styles.counter}>{data.tip_count}</Text>
                    </TouchableOpacity>
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconContainer} onPress={handleSetGift}>
                    <GradientIcon
                        name={'share-alt'}
                        size={16}
                        IconPack={FontAwesome5}
                        colors={[Colors.BUTTON_GRADIENT_ONE, Colors.BUTTON_GRADIENT_TWO]}
                    />
                </TouchableOpacity>
            </View>

            <View style={styles.right}>
                <Text>{createdAt}</Text>
                <TouchableOpacity onPress={() => setThreeDotsVisible(!threeDotsVisible)}>
                    <Entypo
                        name="dots-three-horizontal"
                        size={16}
                        color={Colors.BLACK}
                        style={styles.icon}
                    />
                </TouchableOpacity>
            </View>

            {giftFocused && <SendTipsModal visible={giftFocused} onClose={() => setGiftFocused(false)} data={data} />}
            <PostThreeDotsModal
                blockState={data.is_blocked}
                followState={data.is_followed}
                id={data.user_id}
                visible={threeDotsVisible}
                data={data}
                onClose={() => setThreeDotsVisible(false)}
            />
        </View>
    );
};

export default BottomBar;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    left: {
        flexDirection: 'row',
        marginTop: verticalScale(10),
    },
    right: {
        marginTop: verticalScale(10),
        marginEnd: moderateScale(10),
        flexDirection: 'row',
    },
    iconContainer: {
        flexDirection: 'row',
        marginStart: moderateScale(10),
        justifyContent: 'center',
        alignItems: 'center',
    },
    counter: {
        marginStart: moderateScale(5),
    },
    icon: {
        marginStart: moderateScale(10),
        marginTop: verticalScale(2),
    },
});
