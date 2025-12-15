import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { Colors } from '../../../constants';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { CommentPressModal } from '../modal';

const CommentCard = ({ post_item, onDelete, onEditRequest, onCopy }) => {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <Pressable
                style={styles.container}
                onLongPress={() => setShowModal(true)}
            >
                <Image source={{ uri: post_item.user.avatar }} style={styles.image} />
                <View style={styles.rightContent}>
                    <View style={styles.commentContainer}>
                        <Text style={styles.userName}>{post_item.user.name}</Text>
                        <Text style={styles.comment}>{post_item.message}</Text>
                    </View>
                    <View style={styles.lowerContainer}>
                        <Text style={styles.time}>{post_item.created}</Text>
                        <TouchableOpacity>
                            <Text style={styles.replyTxt}>Reply</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Pressable>

            <CommentPressModal
                visible={showModal}
                onClose={() => setShowModal(false)}
                post_item={post_item}
                onDelete={onDelete}
                onEditRequest={onEditRequest}
                onCopy={onCopy}
            />
        </>
    );
};


export default CommentCard;


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    image: {
        width: moderateScale(40),
        height: verticalScale(40),
        borderRadius: scale(100),
        marginTop: verticalScale(4),
    },
    rightContent: {
        flexShrink: 1,
        flex: 1,
    },
    commentContainer: {
        marginStart: moderateScale(10),
        backgroundColor: Colors.LIGHT_GRAY,
        padding: scale(10),
        borderRadius: scale(10),
        maxWidth: '85%',
    },
    userName: {
        fontSize: scale(15),
        fontWeight: '600',
    },
    comment: {
        fontSize: scale(13),
        fontWeight: '400',
    },
    lowerContainer: {
        flexDirection: 'row',
        marginStart: moderateScale(20),
        gap: scale(10),
    },
    time: {},
    replyTxt: {},
})
