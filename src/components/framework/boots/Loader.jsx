import React from 'react';
import {
    ActivityIndicator,
    View,
    StyleSheet
} from 'react-native';
import { Colors } from '../../../constants';

const Loader = ({
    size = 'large',
    color = Colors.THEME,
    fullScreen = false
}) => {
    return (
        <View style={[
            styles.container,
            fullScreen && styles.fullScreen
        ]}>
            <ActivityIndicator
                size={size}
                color={color}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    fullScreen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.WHITE,
    },
});

export default Loader;
