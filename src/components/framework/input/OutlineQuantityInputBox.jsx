import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { Colors } from '../../../constants';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';

const OutlineQuantityInputBox = ({ value, setValue, placeholder = "Placeholder", width }) => {
    const [data, setData] = useState(0);

    const onPressUp = () => {
        setData(prev => (isNaN(prev) ? 1 : prev + 1));
    };

    const onPressDown = () => {
        setData(prev => (isNaN(prev) || prev <= 0 ? 0 : prev - 1));
    };

    const handleChange = (text) => {
        const num = parseInt(text);
        if (!isNaN(num)) {
            setData(num);
        } else if (text === "") {
            setData(0);
        }
    };

    return (
        <View style={{ width: width || "100%" }}>
            <TextInput
                value={String("Quantity : " + data)}
                onChangeText={handleChange}
                placeholder={placeholder}
                keyboardType='numeric'
                placeholderTextColor={Colors.PLACEHOLDER}
                style={styles.txtInputBox}
            />
            <View style={styles.btnIncDsc}>
                <TouchableOpacity onPress={onPressUp}>
                    <Ionicons name="caret-up-outline" size={17} color={Colors.BLACK} />
                </TouchableOpacity>
                <TouchableOpacity onPress={onPressDown}>
                    <Ionicons name="caret-down-outline" size={17} color={Colors.BLACK} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default OutlineQuantityInputBox;

const styles = StyleSheet.create({
    txtInputBox: {
        borderWidth: scale(1),
        borderRadius: scale(5),
        padding: scale(10),
        paddingRight: scale(30),
        borderColor: Colors.THEME,
    },
    btnIncDsc: {
        position: "absolute",
        right: 10,
        justifyContent: 'space-between',
        height: verticalScale(30),
    }
});
