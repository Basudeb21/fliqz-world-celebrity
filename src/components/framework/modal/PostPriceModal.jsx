import { Image, Modal, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Colors, Images } from '../../../constants'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import Entypo from 'react-native-vector-icons/dist/Entypo'
import { paymentDoneSendPressSounds } from '../../../sound/SoundManager'
import { useSelector } from 'react-redux'
import { AmmountInput } from '../input'
import { GradientTextButton } from '../button'
import { Spacer } from '../boots'
import { SendTipsApi } from '../../../api/app/post'

const PostPriceModal = ({ visible, price, setPrice, onClose }) => {

    return (
        <Modal visible={visible} transparent animationType="fade">
            <View style={styles.modalBackground}>
                <View style={styles.modalContainer}>

                    <View style={styles.modalTop}>
                        <Text style={styles.topText}>Price for post</Text>
                        <TouchableOpacity onPress={onClose}>
                            <Entypo name="cross" size={20} color={Colors.THEME} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.body}>
                        <Text style={styles.tipSLabel}>Set a price for the post</Text>

                        <AmmountInput
                            value={price}
                            setValue={setPrice}
                            placeholder="Enter amount"
                        />

                        <Spacer height={20} />

                        <GradientTextButton
                            label="Update Price"
                            onPress={() => {
                                if (!price || Number(price) <= 0) {
                                    ToastAndroid.show("Enter valid price", ToastAndroid.SHORT);
                                    return;
                                }
                                paymentDoneSendPressSounds();
                                onClose();
                            }}
                        />
                    </View>

                </View>
            </View>
        </Modal>
    )
}

export default PostPriceModal;

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