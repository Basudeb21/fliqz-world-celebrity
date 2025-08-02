import { Modal, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Colors } from '../../../constants'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import Feather from 'react-native-vector-icons/dist/Feather'
import Ionicons from 'react-native-vector-icons/dist/Ionicons'
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons'
import Entypo from 'react-native-vector-icons/dist/Entypo'
import Octicons from 'react-native-vector-icons/dist/Octicons'
import { followPressSounds, subscibePressSound } from '../../../sound/SoundManager'
import { useSelector } from 'react-redux'
import { BlockUserApi, FollowUserApi } from '../../../api/app/user'

const PostThreeDotsModal = ({ id, visible, onClose, followState, blockState }) => {
    const iconSize = 20;
    const [isFollowed, setIsFollowed] = useState(followState);
    const [isBlocked, setIsBlocked] = useState(followState);
    const token = useSelector(state => state.auth.token);
    const onPressSubscribe = () => {
        subscibePressSound();
    }

    const onPressFollow = async () => {
        try {
            const result = await FollowUserApi(token, id);

            console.log("result : ", result);

            if (result?.success) {
                setIsFollowed(!isFollowed);
                ToastAndroid.show(result.message, ToastAndroid.SHORT);
                followPressSounds();
            } else {
                console.warn('Follow API failed:', result?.message || 'Unknown error');
            }
        } catch (error) {
            console.error('Follow API Error:', error);
        }
    }

    const onPressBlock = async () => {
        try {
            const result = await BlockUserApi(token, id);

            console.log("result : ", result);

            if (result?.success) {
                setIsBlocked(!isBlocked);
                ToastAndroid.show(result.message, ToastAndroid.SHORT);
                followPressSounds();
            } else {
                console.log('Block API failed:', result?.message || 'Unknown error');
            }
        } catch (error) {
            console.error('Block API Error:', error);
        }
    }

    return (
        <Modal
            visible={visible}
            animationType="fade"
            transparent={true}
            onRequestClose={onClose}
        >
            <TouchableOpacity
                style={styles.overlay}
                activeOpacity={1}
                onPress={onClose}
            >
                <TouchableOpacity
                    activeOpacity={1}
                    style={styles.modalContent}
                    onPress={() => { }}
                >
                    <TouchableOpacity style={styles.row}>
                        <Feather name="copy" size={iconSize} color={Colors.THEME} />
                        <Text style={styles.txt}>Copy Link</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.row} onPress={onPressFollow}>
                        <Ionicons
                            name={isFollowed ? "person-add" : "person-add-outline"}
                            size={iconSize}
                            color={Colors.THEME} />
                        <Text style={styles.txt}>Follow</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.row} onPress={onPressSubscribe}>
                        <MaterialIcons name="subscriptions" size={iconSize} color={Colors.THEME} />
                        <Text style={styles.txt}>Subscription</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.row} onPress={onPressBlock}>
                        <Entypo name="block" size={16} color={Colors.THEME} />
                        <Text style={styles.txt}>Block</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.row}>
                        <Octicons name="report" size={16} color={Colors.THEME} />
                        <Text style={styles.txt}>Report</Text>
                    </TouchableOpacity>
                </TouchableOpacity>
            </TouchableOpacity>
        </Modal>
    )
}

export default PostThreeDotsModal

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingEnd: moderateScale(20),
    },
    modalContent: {
        elevation: scale(20),
        backgroundColor: 'white',
        paddingVertical: verticalScale(10),
        paddingHorizontal: moderateScale(15),
        borderRadius: 8,
        gap: verticalScale(5),
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: moderateScale(10),
        marginVertical: 4,
    },
    txt: {
        fontSize: scale(14),
        fontWeight: '500',
    },
})
