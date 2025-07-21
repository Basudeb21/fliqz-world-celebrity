import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { scale } from 'react-native-size-matters';
import { Colors } from '../../../constants';

const TextInputBoxWhite = ({ value, setValue, placeholder = "Placeholder", width = "100%" }) => {

    return (
        <TextInput
            value={value}
            onChangeText={setValue}
            placeholder={placeholder}
            placeholderTextColor={Colors.PLACEHOLDER}
            style={[styles.txtInputBox, { minWidth: width, maxWidth: width }]}
        />
    );
}

export default TextInputBoxWhite

const styles = StyleSheet.create({
    txtInputBox: {
        backgroundColor: Colors.WHITE,
        borderRadius: scale(5),
        padding: scale(10),
    },
})