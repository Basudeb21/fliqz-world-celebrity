import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, ToastAndroid, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { scale, verticalScale } from 'react-native-size-matters';
import { Colors } from '../../../constants';
import Entypo from 'react-native-vector-icons/Entypo';
import { OutlineQuantityInputBox } from '../input';
import { EventTicketBookingPriceApi } from '../../../api/app/event-api';

const PaymentModal = ({ event, visible, onClose, token }) => {
    const [quantity, setQuantity] = useState('');
    const [loading, setLoading] = useState(false);

    const handleBuy = async () => {
        if (!quantity || isNaN(quantity) || Number(quantity) <= 0) {
            ToastAndroid.show("Enter a valid ticket quantity", ToastAndroid.SHORT);
            return;
        }

        if (!token) {
            ToastAndroid.show("Token not found...", ToastAndroid.SHORT);
            return;
        }

        setLoading(true);

        const res = await EventTicketBookingPriceApi(token, event?.id, quantity);

        setLoading(false);

        if (res?.success) {
            ToastAndroid.show(res.message, ToastAndroid.SHORT);
            setQuantity('');
            onClose();
        } else {
            ToastAndroid.show("Booking failed. Try again.", ToastAndroid.SHORT);
        }
    };

    return (
        <Modal
            visible={visible}
            animationType="fade"
            transparent
            onRequestClose={onClose}
        >
            <TouchableWithoutFeedback
                onPress={() => {
                    Keyboard.dismiss();
                    onClose();
                }}
            >
                <View style={styles.modalOverlay}>
                    <TouchableWithoutFeedback onPress={() => { }}>
                        <View style={styles.modalContainer}>
                            <Text style={styles.title}>Payment Section</Text>

                            <View style={styles.priceContainer}>
                                <Entypo
                                    name={"price-tag"}
                                    size={24}
                                    color={Colors.THEME}
                                />
                                <Text style={styles.eventPrice}>${event?.price}</Text>
                            </View>

                            <OutlineQuantityInputBox
                                placeholder='Ticket Quantity'
                                value={quantity}
                                setValue={setQuantity}
                                keyboardType="numeric"
                            />

                            <TouchableOpacity style={styles.buyBtn} onPress={handleBuy} disabled={loading}>
                                <Text style={styles.buyText}>{loading ? "Processing..." : "Buy"}</Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>

    );
};

export default PaymentModal;

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: Colors.TRANSPARENT_BLACK_DARK,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: '85%',
        backgroundColor: Colors.WHITE,
        borderRadius: scale(10),
        padding: scale(20),
        elevation: 5,
    },
    title: {
        fontSize: scale(18),
        fontWeight: '600',
        marginBottom: verticalScale(10),
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: verticalScale(10),
    },
    eventPrice: {
        fontSize: scale(16),
        fontWeight: '500',
        marginLeft: scale(8),
        color: Colors.BLACK,
    },
    buyBtn: {
        backgroundColor: Colors.THEME,
        paddingVertical: verticalScale(10),
        borderRadius: scale(8),
        alignItems: 'center',
        marginVertical: verticalScale(10),
    },
    buyText: {
        color: Colors.WHITE,
        fontWeight: '500',
    },
    closeBtn: {
        borderColor: Colors.THEME,
        borderWidth: 1,
        paddingVertical: verticalScale(8),
        borderRadius: scale(8),
        alignItems: 'center',
    },
    closeText: {
        color: Colors.THEME,
        fontWeight: '500',
    },
});
