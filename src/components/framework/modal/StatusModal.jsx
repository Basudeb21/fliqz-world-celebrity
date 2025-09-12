
import { Modal, StyleSheet, Text, ToastAndroid, TouchableOpacity } from 'react-native'
import React from 'react'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { useDispatch, useSelector } from 'react-redux'
import UpdateProfileStatusApi from '../../../api/app/user/UpdateProfileStatusApi'
import { updateUser } from '../../../redux-store/slices/authSlice'

const StatusModal = ({ visible, onClose }) => {
    const token = useSelector(state => state.auth.token);
    const user = useSelector(state => state.auth.user);

    const dispatch = useDispatch();
    const onPressChangeStatus = async (status) => {
        try {
            const res = await UpdateProfileStatusApi({ token, status });
            if (res?.message) {
                ToastAndroid.show(res.message, ToastAndroid.SHORT);
                dispatch(updateUser(res.data));
                console.log("USER ++ ", user);

            } else {
                ToastAndroid.show("Failed to update status", ToastAndroid.SHORT);
            }
            onClose();
        } catch (error) {
            ToastAndroid.show("Something went wrong", ToastAndroid.SHORT);
            console.error("Status update error:", error);
        }
    }

    return (
        <Modal
            visible={visible}
            animationType="fade"
            transparent={true}
            onRequestClose={onClose}
        >
            <TouchableOpacity
                style={styles.overlay}
                activeOpacity={1}
                onPress={onClose}
            >
                <TouchableOpacity
                    activeOpacity={1}
                    style={styles.modalContent}
                    onPress={() => { }}
                >
                    <TouchableOpacity style={styles.row} onPress={() => onPressChangeStatus("available")}>
                        <Text style={styles.txt}>Available Now</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.row} onPress={() => onPressChangeStatus("idle")}>
                        <Text style={styles.txt}>Idle</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.row} onPress={() => onPressChangeStatus("busy")}>
                        <Text style={styles.txt}>Busy</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.row} onPress={() => onPressChangeStatus("anonymous")}>
                        <Text style={styles.txt}>Anonymous</Text>
                    </TouchableOpacity>
                </TouchableOpacity>
            </TouchableOpacity>
        </Modal>
    )
}

export default StatusModal

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingEnd: moderateScale(20),
    },
    modalContent: {
        elevation: scale(20),
        backgroundColor: 'white',
        paddingVertical: verticalScale(10),
        paddingHorizontal: moderateScale(15),
        borderRadius: 8,
        gap: verticalScale(5),
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: moderateScale(10),
        marginVertical: 4,
    },
    txt: {
        fontSize: scale(14),
        fontWeight: '500',
    },
})

