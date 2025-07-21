import { FlatList, Image, ImageBackground, Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { Colors, Images } from '../../../constants'
import Ionicons from 'react-native-vector-icons/Ionicons'
import HR from '../boots/HR'
import Spacer from '../boots/Spacer'
import GradientTextButton from '../button/GradientTextButton'


const BottomModal = ({ visible, onClose, content = [] }) => {
    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.row} onPress={item.onPress}>
            <item.Icon
                name={item.iconName}
                size={18}
                style={styles.icon}
                color={Colors.WHITE}
            />
            <Text style={styles.optionTxt}>{item.text}</Text>
        </TouchableOpacity>
    );

    return (
        <Modal
            visible={visible}
            animationType="fade"
            transparent={true}
            onRequestClose={onClose}
        >
            <Pressable style={styles.modalBackground} onPress={onClose}>
                <Pressable style={styles.modalContainer} onPress={() => { }}>
                    <View style={styles.modalTop} />
                    <Spacer height={20} />
                    <FlatList
                        data={content}
                        keyExtractor={(_, index) => index.toString()}
                        renderItem={renderItem}
                        ItemSeparatorComponent={() => <Spacer height={15} />}
                        keyboardShouldPersistTaps="handled"
                    />
                    <Spacer height={20} />
                </Pressable>
            </Pressable>
        </Modal>
    );
};

export default BottomModal;

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalContainer: {
        position: "absolute",
        backgroundColor: Colors.WHITE,
        width: '100%',
        padding: 20,
        borderRadius: 10,
        bottom: 0,
        borderTopLeftRadius: scale(20),
        borderTopRightRadius: scale(20)
    },
    modalTop: {
        width: moderateScale(50),
        height: verticalScale(5),
        backgroundColor: Colors.PLACEHOLDER,
        alignSelf: "center",
        borderRadius: scale(100)
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        gap: scale(20)
    },
    icon: {
        backgroundColor: Colors.PLACEHOLDER,
        padding: scale(10),
        borderRadius: 100
    },
    optionTxt: {
        fontSize: scale(16),
        fontWeight: "500",
        color: Colors.PLACEHOLDER
    }
})