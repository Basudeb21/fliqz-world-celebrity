import {
    FlatList,
    StyleSheet,
    Text,
    View,
    Keyboard,
    ToastAndroid,
} from 'react-native';
import React, { useState, useRef } from 'react';
import {
    moderateScale,
    scale,
    verticalScale,
} from 'react-native-size-matters';
import { Colors } from '../../../constants';
import { useRoute } from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';
import { useSelector } from 'react-redux';
import { postDonePressSounds } from '../../../sound/SoundManager';
import { CommentCard } from '../../../components/framework/card';
import { SendCommentApi, UpdateCommentApi } from '../../../api/app/post';
import { BackpressTopBar } from '../../../components/framework/navbar';
import { SendCommentArea } from '../../../components/framework/input';

const AllComments = () => {
    const route = useRoute();
    const initialComments = route.params?.comments || [];
    const postID = route.params?.postID;
    const token = useSelector(state => state.auth.token);

    const [value, setValue] = useState('');
    const [comments, setComments] = useState(initialComments);
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editingInitialValue, setEditingInitialValue] = useState('');

    const flatListRef = useRef();


    const onPressPostComment = async () => {
        if (value.trim()) {
            try {
                if (editingCommentId) {
                    const result = await UpdateCommentApi(token, postID, editingCommentId, value.trim());
                    console.log("UPD COM : ", result);

                    if (result?.success) {
                        setComments(prev =>
                            prev.map(c =>
                                c.id === editingCommentId ? { ...c, message: value.trim() } : c
                            )
                        );
                        ToastAndroid.show("Comment updated", ToastAndroid.SHORT);
                    } else {
                        ToastAndroid.show("Failed to update comment", ToastAndroid.SHORT);
                    }
                    setEditingCommentId(null);
                    setEditingInitialValue('');
                    setValue('');
                    Keyboard.dismiss();
                } else {
                    const result = await SendCommentApi(token, postID, value.trim());
                    if (result?.success === true) {
                        postDonePressSounds();
                        setValue('');
                        Keyboard.dismiss();
                        ToastAndroid.show(result.message, ToastAndroid.SHORT);
                        setComments(prev => {
                            const updated = [result.data, ...prev];
                            setTimeout(() => {
                                flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
                            }, 100);
                            return updated;
                        });
                    } else {
                        console.warn('Comment API failed:', result?.message || 'Unknown error');
                    }
                }
            } catch (error) {
                console.error('Comment Send/Update Error:', error);
            }
        } else {
            ToastAndroid.show('Comment cannot be empty.', ToastAndroid.SHORT);
        }
    };


    const renderEmptyComponent = () => (
        <View style={styles.emptyContainer}>
            <Entypo name={'chat'} size={90} color={Colors.PLACEHOLDER} />
            <Text style={styles.defaultMsg}>
                {'No comments yet.\nBe the first to comment.'}
            </Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <BackpressTopBar title={'Comments'} />

            <FlatList
                ref={flatListRef}
                data={comments}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    <CommentCard
                        post_item={item}
                        onDelete={(deletedCommentId) => {
                            setComments(prev => prev.filter(c => c.id !== deletedCommentId));
                        }}
                        onEditRequest={(id, message) => {
                            setEditingCommentId(id);
                            setEditingInitialValue(message);
                            setValue(message);
                        }}
                    />

                )}
                ListEmptyComponent={renderEmptyComponent}
                contentContainerStyle={
                    comments.length === 0
                        ? styles.emptyListStyle
                        : styles.flatListContainer
                }
                showsVerticalScrollIndicator={false}
            />

            <View style={styles.sendCommentWrapper}>
                <SendCommentArea
                    placeholder={'Write a comment...'}
                    postId={postID}
                    onPress={onPressPostComment}
                    value={value}
                    setValue={setValue}
                />
            </View>
        </View>
    );
};

export default AllComments;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.WHITE,
    },
    flatListContainer: {
        marginTop: verticalScale(10),
        gap: verticalScale(10),
        paddingBottom: verticalScale(80),
        paddingStart: moderateScale(10),
        paddingEnd: moderateScale(10),
    },
    emptyListStyle: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    sendCommentWrapper: {
        backgroundColor: Colors.WHITE,
        width: '100%',
        height: verticalScale(63),
        borderTopWidth: 1,
        borderTopColor: Colors.INPUTBOX_DEACTIVE_BORDER_COLOR,
        position: 'absolute',
        bottom: 0,
        justifyContent: 'center',
    },
    emptyContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    defaultMsg: {
        fontSize: scale(16),
        textAlign: 'center',
        fontWeight: '700',
        color: Colors.PLACEHOLDER,
        paddingHorizontal: moderateScale(20),
    },
});
