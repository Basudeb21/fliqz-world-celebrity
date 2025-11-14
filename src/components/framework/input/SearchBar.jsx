import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Colors } from '../../../constants';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import Fontisto from 'react-native-vector-icons/Fontisto';

const SearchBar = ({ placeholder, value, setValue }) => {
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.inputBox}
                placeholder={placeholder}
                placeholderTextColor={Colors.PLACEHOLDER}
                cursorColor={Colors.BLACK}
                value={value}
                onChangeText={setValue}
            />
            <TouchableOpacity style={styles.searchIcon}>
                <Fontisto
                    name={"search"}
                    size={16}
                    color={Colors.PLACEHOLDER}
                />
            </TouchableOpacity>
        </View>
    );
};

export default SearchBar;

const styles = StyleSheet.create({
    container: {
        marginHorizontal: moderateScale(20),
        backgroundColor: Colors.LIGHT_GRAY,
        borderRadius: 100,
        paddingHorizontal: moderateScale(20),
        flexDirection: "row",
        alignItems: "center",
        marginBottom: verticalScale(10),
    },
    inputBox: {
        flex: 1,
        color: Colors.BLACK,
        paddingVertical: verticalScale(10),
    },
    searchIcon: {
        position: "absolute",
        right: 0,
        marginEnd: moderateScale(20),
    },
});
