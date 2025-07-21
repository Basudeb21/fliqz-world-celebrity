import { FlatList, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import SendCommentArea from '../../../components/framework/input/SendCommentArea';
import CommentCard from '../../../components/framework/card/CommentCard';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { Colors } from '../../../constants';
import BackpressTopBar from '../../../components/framework/navbar/BackpressTopBar';
import { useRoute } from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/dist/Entypo'

const AllComments = () => {
    const route = useRoute();
    const comments = route.params?.comments || [];

    const renderEmptyComponent = () => (
        <View style={styles.emptyContainer}>
            <Entypo
                name={"chat"}
                size={90}
                color={Colors.PLACEHOLDER}
            />
            <Text style={styles.defaultMsg}>{"No comments yet.\nBe the first to comment."}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <BackpressTopBar title={"Comments"} />

            <FlatList
                data={comments}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <CommentCard
                        image={item.user?.avatar}
                        userName={item.user?.name}
                        comment={item.message}
                        time={item.created}
                    />
                )}
                ListEmptyComponent={renderEmptyComponent}
                contentContainerStyle={comments.length === 0 ? styles.emptyListStyle : styles.flatListContainer}
                showsVerticalScrollIndicator={false}
            />

            <View style={styles.sendCommentWrapper}>
                <SendCommentArea placeholder={'Write a comment...'} />
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
        paddingBottom: verticalScale(20),
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
    },
    emptyContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    defaultMsg: {
        fontSize: scale(16),
        textAlign: "center",
        fontWeight: "700",
        color: Colors.PLACEHOLDER,
        paddingHorizontal: moderateScale(20),
    },
});
