import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Colors } from '../../../constants';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome'
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons'

const ReplyInput = ({ placeholder, value, setValue }) => {
    return (
        <View style={styles.inputContainer}>
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
                    <FontAwesome
                        name={"send"}
                        size={16}
                        color={Colors.WHITE}

                    />
                </TouchableOpacity>
            </View>
            <View style={styles.iconContainer}>
                <MaterialIcons
                    name={"favorite-border"}
                    size={16}
                    color={Colors.WHITE}
                    style={styles.icon}
                />
            </View>
        </View>
    )
}

export default ReplyInput

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: "row",
        alignItems: "center"
    },
    container: {
        marginHorizontal: moderateScale(20),
        backgroundColor: Colors.BLACK,
        borderRadius: 100,
        paddingHorizontal: moderateScale(20),
        flexDirection: "row",
        alignItems: "center",
        marginBottom: verticalScale(10),
        flex: 8
    },
    iconContainer: {
        backgroundColor: Colors.BLACK,
        borderRadius: 100,
        alignItems: "center",
    },
    icon: {
        flex: 2,

    },
    inputBox: {
        color: Colors.BLACK
    },
    searchIcon: {
        position: "absolute",
        right: 0,
        marginEnd: moderateScale(20)
    }
})