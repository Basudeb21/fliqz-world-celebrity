import { StyleSheet, Text, View, Image, TouchableWithoutFeedback } from 'react-native';
import React from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Colors } from '../../../constants';
import { Spacer } from '../../../components/framework/boots';
import { BottomBar } from '../../../components/framework/navbar';

const ViewProfilePost = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { post } = route.params || {};

    if (!post) {
        return <Text>No Post Found</Text>;
    }

    const onClose = () => {
        navigation.goBack();
    };

    return (
        <View style={styles.modalBackground}>
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={styles.backgroundTouchable} />
            </TouchableWithoutFeedback>

            <View style={styles.modalContent}>
                <Image source={{ uri: post.image }} style={styles.image} />
                <Spacer height={10} />
                <BottomBar />
            </View>
        </View>
    );
};

export default ViewProfilePost;

const styles = StyleSheet.create({
    areaView: {
        flex: 1,
        backgroundColor: Colors.THEME
    },
    container: {
        backgroundColor: Colors.WHITE,
        flex: 1
    },
    modalBackground: {
        flex: 1,
        backgroundColor: Colors.TRANSPARENT_BLACK_DARK_EIGHT,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backgroundTouchable: {
        ...StyleSheet.absoluteFillObject,
    },
    modalContent: {
        backgroundColor: Colors.WHITE,
        borderRadius: 12,
        padding: 20,
        alignItems: 'center',
        width: '80%',
        zIndex: 1,
    },
    image: {
        width: 250,
        height: 250,
        borderRadius: 10,
        resizeMode: 'cover',
    },
    caption: {
        marginTop: 10,
        fontSize: 16,
        color: Colors.BLACK,
    },
});
