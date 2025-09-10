import { Image, Modal, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Colors, Images } from '../../../constants'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import Entypo from 'react-native-vector-icons/dist/Entypo'
import { paymentDoneSendPressSounds } from '../../../sound/SoundManager'
import { useSelector } from 'react-redux'
import { AmmountInput, TextInputBox } from '../input'
import { GradientTextButton } from '../button'
import { Spacer } from '../boots'
import { CreateNewListApi } from '../../../api/app/lists'


const AddListModal = ({ visible, data, onClose }) => {
    const [name, setName] = useState();
    const token = useSelector(state => state.auth.token);

    const onPressSendTips = async () => {
        try {
            const result = await CreateNewListApi(token, name);

            if (result?.success) {
                ToastAndroid.show(result.message, ToastAndroid.SHORT);
                paymentDoneSendPressSounds();
                setName("");
                onClose();
            } else {
                ToastAndroid.show(result?.message || "Something went wrong", ToastAndroid.SHORT);
            }
        } catch (error) {
            console.error("Create list error:", error);
            ToastAndroid.show("Unexpected error occurred.", ToastAndroid.SHORT);
        }
    };

    return (
        <Modal
            visible={visible}
            animationType="fade"
            transparent={true}
            onRequestClose={onClose}
        >
            <View style={styles.modalBackground}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalTop}>

                        <Text style={styles.topText}>Add New Lists</Text>
                        <TouchableOpacity onPress={onClose}>
                            <Entypo
                                name={"cross"}
                                color={Colors.THEME}
                                size={scale(20)}
                                style={styles.icon}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.body}>
                        <View style={styles.tipsContainer}>
                            <Text style={styles.tipSLabel}>Create a new list</Text>
                            <View style={styles.tipsInput}>
                                <TextInputBox value={name} setValue={setName} placeholder='Enter list name' />
                            </View>

                        </View>
                        <Spacer height={20} />
                        <GradientTextButton label='Add Lists' onPress={onPressSendTips} />
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default AddListModal

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalContainer: {
        width: '100%',
        padding: 20,
        borderRadius: 10,
        paddingHorizontal: moderateScale(20)
    },
    modalTop: {
        backgroundColor: Colors.THEME,
        padding: scale(10),
        borderTopRightRadius: scale(10),
        borderTopLeftRadius: scale(10),
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    topText: {
        color: Colors.WHITE,
        fontSize: scale(20),
        fontWeight: "600"
    },
    body: {
        padding: scale(10),
        backgroundColor: Colors.WHITE,
        borderBottomRightRadius: scale(10),
        borderBottomLeftRadius: scale(10),

    },
    icon: {
        backgroundColor: Colors.WHITE,
        borderRadius: scale(100),

    },
    profileInfo: {
        flexDirection: "row",
        alignItems: "center",
        gap: scale(10)
    },
    profileImage: {
        width: moderateScale(50),
        height: verticalScale(50),
        borderRadius: scale(100)
    },
    profileOwner: {
        fontSize: scale(15),
        fontWeight: "500"
    },
    profileID: {
        fontSize: scale(9),
        color: Colors.PLACEHOLDER
    },
    tipsContainer: {
        marginTop: verticalScale(15),
    },
    tipSLabel: {
        fontSize: scale(14),
        marginStart: moderateScale(10)
    },
    tipsInput: {
        marginTop: verticalScale(10)
    },
    paymentContainer: {
        marginTop: verticalScale(10)
    },
    paymentHead: {
        fontWeight: "500",
        fontSize: scale(14)
    },
    paymentText: {

    },
    paymentRow: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
})