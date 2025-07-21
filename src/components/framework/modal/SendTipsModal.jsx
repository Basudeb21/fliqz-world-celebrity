import { Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Colors, Images } from '../../../constants'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import Entypo from 'react-native-vector-icons/dist/Entypo'
import AmmountInput from '../input/AmmountInput'
import GradientTextButton from '../button/GradientTextButton'
import Spacer from '../boots/Spacer'
import { paymentDoneSendPressSounds } from '../../../sound/SoundManager'

const SendTipsModal = ({ visible, onClose }) => {
    const onPressSendTips = () => {
        paymentDoneSendPressSounds()
    }
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
                        <Text style={styles.topText}>Send a Tip</Text>
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
                        <View style={styles.profileInfo}>
                            <Image style={styles.profileImage} source={{ uri: Images.CELEBRITY_AVATAR_ONE }} />
                            <View>
                                <Text style={styles.profileOwner}>Fans_21</Text>
                                <Text style={styles.profileID}>@u9876543210</Text>
                            </View>
                        </View>
                        <View style={styles.tipsContainer}>
                            <Text style={styles.tipSLabel}>Send a tip to the user</Text>
                            <View style={styles.tipsInput}>
                                <AmmountInput />
                            </View>

                        </View>
                        <View style={styles.paymentContainer}>
                            <Text style={styles.paymentHead}>Payment Summery</Text>
                            <View style={styles.paymentRow}>
                                <Text style={styles.paymentText}>Subtotal:</Text>
                                <Text style={styles.paymentText}>$0.00</Text>
                            </View>
                            <View style={styles.paymentRow}>
                                <Text style={styles.paymentText}>Tax:</Text>
                                <Text style={styles.paymentText}>$0.00</Text>
                            </View>
                            <View style={styles.paymentRow}>
                                <Text style={styles.paymentText}>Fees:</Text>
                                <Text style={styles.paymentText}>$0.00</Text>
                            </View>
                            <View style={styles.paymentRow}>
                                <Text style={styles.paymentText}>Total:</Text>
                                <Text style={styles.paymentText}>$0.00</Text>
                            </View>
                        </View>
                        <Spacer height={20} />
                        <GradientTextButton label='Send Tips' onPress={onPressSendTips} />
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default SendTipsModal

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