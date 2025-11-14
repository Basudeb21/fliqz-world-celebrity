import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import Entypo from 'react-native-vector-icons/Entypo';
import { Colors } from '../../../constants';

const MultiItemLabel = ({ label, onRemove }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <TouchableOpacity style={styles.iconContainer} onPress={onRemove}>
                <Entypo name="cross" size={14} color={Colors.THEME} />
            </TouchableOpacity>
        </View>
    );
};

export default MultiItemLabel;

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.THEME_TRANSPARENT,
        alignSelf: 'flex-start',
        paddingHorizontal: moderateScale(12),
        paddingVertical: verticalScale(5),
        borderRadius: scale(100),
        margin: moderateScale(5),
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: scale(1),
        borderColor: Colors.THEME,
    },
    label: {
        fontSize: scale(14),
        fontWeight: '500',
        color: Colors.WHITE,
    },
    iconContainer: {
        marginLeft: moderateScale(8),
        backgroundColor: Colors.WHITE,
        padding: scale(3),
        borderRadius: 100,
    },
});
