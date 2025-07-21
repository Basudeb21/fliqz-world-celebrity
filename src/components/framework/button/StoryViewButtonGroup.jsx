import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Colors, NavigationStrings } from '../../../constants';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { likePressSound, subscibePressSound } from '../../../sound/SoundManager';
import SendTipsModal from '../modal/SendTipsModal';
import { scale } from 'react-native-size-matters';
import { useNavigation } from '@react-navigation/native';

const StoryViewButtonGroup = ({ onPause, onResume }) => {
    const [isFavorite, setIsFavorite] = useState(false);
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const navigation = useNavigation();

    const handleOnPressFavorite = () => {
        likePressSound();
        setIsFavorite(!isFavorite);
    };

    const handleOnPressBookmarked = () => {
        setIsBookmarked(!isBookmarked);
    };

    const handleOnPressSubscribe = () => {
        subscibePressSound();
    };

    const handleSendModal = () => {
        if (onPause) onPause();
        setModalVisible(true);
    };


    const handelOnPressComment = () => {
        navigation.navigate(NavigationStrings.POST_STACK, {
            screen: NavigationStrings.ALL_COMMENTS
        });
    }

    const handleCloseModal = () => {
        if (onResume) onResume();
        setModalVisible(false);
    };

    const iconSize = 18;

    return (
        <>
            <View style={styles.container}>
                <TouchableOpacity onPress={handleOnPressBookmarked}>
                    <FontAwesome
                        name={isBookmarked ? 'bookmark' : 'bookmark-o'}
                        color={Colors.WHITE}
                        size={iconSize}
                    />
                </TouchableOpacity>

                <TouchableOpacity onPress={handleOnPressFavorite}>
                    <MaterialIcons
                        name={isFavorite ? 'favorite' : 'favorite-outline'}
                        color={Colors.WHITE}
                        size={iconSize}
                    />
                </TouchableOpacity>

                <FontAwesome5
                    name="user-plus"
                    color={Colors.WHITE}
                    size={iconSize - 4}
                />

                <TouchableOpacity onPress={handleOnPressSubscribe}>
                    <MaterialIcons
                        name="subscriptions"
                        color={Colors.WHITE}
                        size={iconSize}
                    />
                </TouchableOpacity>

                <TouchableOpacity onPress={handleSendModal}>
                    <Feather name="dollar-sign" color={Colors.WHITE} size={iconSize} />
                </TouchableOpacity>

                <TouchableOpacity onPress={handelOnPressComment}>
                    <AntDesign name="message1" color={Colors.WHITE} size={iconSize} />
                </TouchableOpacity>
                <Entypo name="share" color={Colors.WHITE} size={iconSize} />
            </View>

            <SendTipsModal visible={modalVisible} onClose={handleCloseModal} />
        </>
    );
};

export default StoryViewButtonGroup;

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 20,
        zIndex: 100,
        backgroundColor: Colors.TRANSPARENT_WHITE_LIGHT,
        flexDirection: 'row',
        alignSelf: 'center',
        padding: scale(10),
        justifyContent: 'center',
        alignItems: 'center',
        gap: scale(15),
        borderRadius: 100,
    },
});
