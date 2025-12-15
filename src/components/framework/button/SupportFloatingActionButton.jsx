import React from 'react';
import {
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { scale } from 'react-native-size-matters';
import { Colors } from '../../../constants';

const SupportFloatingActionButton = ({
    onPress,
    style
}) => {

    return (
        <TouchableOpacity style={[styles.fab, style]} onPress={onPress}>
            <MaterialIcons name="support-agent" size={26} color={Colors.WHITE} />
        </TouchableOpacity>
    );
};

export default SupportFloatingActionButton;

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