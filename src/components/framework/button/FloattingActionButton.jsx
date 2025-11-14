import React from 'react';
import {
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { scale } from 'react-native-size-matters';
import { Colors } from '../../../constants';

const FloatingActionButton = ({
    onPress,
    style
}) => {

    return (
        <TouchableOpacity style={[styles.fab, style]} onPress={onPress}>
            <AntDesign name="plus" size={26} color={Colors.WHITE} />
        </TouchableOpacity>
    );
};

export default FloatingActionButton;

const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        bottom: scale(30),
        right: scale(30),
        width: scale(50),
        height: scale(50),
        borderRadius: scale(100),
        backgroundColor: Colors.THEME,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 15,
        shadowColor: Colors.BLACK,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        zIndex: 999
    },
});