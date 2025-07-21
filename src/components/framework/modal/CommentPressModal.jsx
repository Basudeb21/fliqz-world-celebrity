import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { moderateScale, scale } from 'react-native-size-matters';
import { Colors } from '../../../constants';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/dist/FontAwesome5';


const CommentPressModal = ({ visible, onClose }) => {
    return (
        <Modal
            visible={visible}
            animationType="fade"
            transparent={true}
            onRequestClose={onClose}
        >
            <TouchableOpacity
                activeOpacity={1}
                onPress={onClose}
                style={styles.modalBackground}
            >
                <TouchableOpacity
                    activeOpacity={1}
                    style={styles.modalContainer}
                    onPress={() => { }}
                >
                    <View style={styles.row}>
                        <MaterialIcons
                            name="delete"
                            color={Colors.THEME}
                            size={24}
                        />
                        <TouchableOpacity>
                            <Text style={styles.btnLabel}>Delete</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.row}>
                        <FontAwesome
                            name="mail-reply"
                            color={Colors.THEME}
                            size={24}
                        />
                        <TouchableOpacity>
                            <Text style={styles.btnLabel}>Reply</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.row}>
                        <Ionicons
                            name="copy"
                            color={Colors.THEME}
                            size={24}
                        />
                        <TouchableOpacity>
                            <Text style={styles.btnLabel}>Copy</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.row}>
                        <FontAwesome5
                            name="edit"
                            color={Colors.THEME}
                            size={24}
                        />
                        <TouchableOpacity>
                            <Text style={styles.btnLabel}>Edit</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </TouchableOpacity>
        </Modal>
    );
};

export default CommentPressModal;

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        backgroundColor: Colors.TRANSPARENT_BLACK_DARK,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        backgroundColor: Colors.WHITE,
        width: '100%',
        padding: moderateScale(20),
        position: "absolute",
        bottom: 0,
        gap: scale(20)
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        gap: scale(15)
    },
    btnLabel: {
        fontSize: scale(20),
        fontWeight: "500"
    }
});
