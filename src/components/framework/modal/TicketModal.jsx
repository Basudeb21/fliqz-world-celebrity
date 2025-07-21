import { Image, ImageBackground, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { Colors, Images } from '../../../constants'
import Ionicons from 'react-native-vector-icons/Ionicons'
import HR from '../boots/HR'
import Spacer from '../boots/Spacer'

const TicketModal = ({ visible, onClose }) => {
    return (
        <Modal
            visible={visible}
            animationType="fade"
            transparent={true}
            onRequestClose={onClose}
        >
            <View style={styles.modalBackground}>
                <View style={styles.modalContainer}>
                    <View style={styles.ticket}>
                        <View style={styles.left}>
                            <Image
                                resizeMode="cover"
                                source={{ uri: Images.EVENT_SEVEN }}
                                style={styles.img}
                            />
                            <Text style={styles.ticketNumber}>#20200702</Text>
                        </View>

                        <View style={styles.middle}>
                            <HR height={1} />
                            <Spacer height={5} />
                            <View style={styles.eventDateRow}>
                                <Text style={styles.day}>WEDNESDAY</Text>
                                <Text style={styles.date}>Jun 28</Text>
                                <Text style={styles.year}>2025</Text>
                            </View>
                            <Spacer height={5} />
                            <HR height={1} />
                            <Spacer height={5} />
                            <Text style={styles.eventTitle}>#Krish4</Text>
                            <Text style={styles.eventDetails}>The new movie of Hrittik Roshan. It is the next part of Krish3.</Text>
                            <Spacer height={5} />
                            <Text style={styles.time}>07:16 AM TO TBD</Text>
                            <Spacer height={5} />
                            <HR height={1} />
                            <Spacer height={3} />
                            <View style={styles.eventDateRow}>
                                <Text style={styles.day}>THE CAT'S CRADEL</Text>
                                <Text style={styles.year}>SPAIN</Text>
                            </View>

                        </View>

                        <View style={styles.cutLine}>
                            {Array.from({ length: 25 }).map((_, index) => (
                                <View key={index} style={styles.dot} />
                            ))}
                        </View>

                        <View style={styles.right}>
                            <TouchableOpacity onPress={onClose} style={styles.closeIcon}>
                                <Ionicons name="close" size={20} color={Colors.BLACK} />
                            </TouchableOpacity>
                            <Text style={styles.yearRight}>28.06.2025</Text>
                            <Spacer height={2} />
                            <Text style={styles.timeRight}>07:16 AM TO TBD</Text>
                            <Image source={{ uri: Images.QR_CODE }} style={styles.qr} />
                            <Text style={styles.numberRight}>#20200702</Text>

                        </View>

                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default TicketModal

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
        borderRadius: 10
    },
    ticket: {
        flexDirection: "row",
        height: verticalScale(110),
        backgroundColor: Colors.WHITE,
        overflow: 'hidden',
        borderRadius: 10,
    },
    left: {
        height: verticalScale(110),
        flex: 3,
        backgroundColor: Colors.INPUTBOX_DEACTIVE_BORDER_COLOR,
    },

    img: {
        width: "100%",
        height: "100%"
    },

    middle: {
        paddingTop: verticalScale(5),
        marginStart: moderateScale(5),
        flex: 5,

    },
    right: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },

    cutLine: {
        width: moderateScale(10),
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: verticalScale(5),
    },

    dot: {
        width: scale(1),
        height: scale(1),
        borderRadius: scale(1),
        backgroundColor: Colors.BLACK,
    },
    ticketNumber: {
        color: Colors.WHITE,
        position: "absolute",
        bottom: 5,
        right: 10,
        fontSize: (9),
        fontWeight: "800"
    },
    eventDateRow: {
        flexDirection: "row",
        marginHorizontal: moderateScale(5),
        justifyContent: "space-between",

    },
    day: {
        fontSize: scale(10),
        fontWeight: "600",
        color: Colors.BLACK

    },
    date: {
        fontSize: scale(10),
        fontWeight: "600",
        color: Colors.THEME

    },
    year: {
        fontSize: scale(10),
        fontWeight: "600",
        color: Colors.BLACK
    },
    eventTitle: {
        fontSize: scale(14),
        fontWeight: "500",
        color: Colors.PURPLE
    },
    eventDetails: {
        fontSize: scale(10),
        fontWeight: "400",
        color: Colors.SILVER
    },
    time: {
        fontSize: scale(9),
        fontWeight: "400",
        color: Colors.SUGGESTION_USER_BORDER
    },
    tag: {

    },
    dataRow: {

    },
    dataOne: {

    },

    dataTow: {

    },
    yearRight: {
        marginTop: verticalScale(18),
        fontSize: scale(10),
        fontWeight: "600",
        color: Colors.PLACEHOLDER
    },
    closeIcon: {
        position: 'absolute',
        top: 5,
        right: 5,
    },
    timeRight: {
        fontSize: scale(7),
        fontWeight: "400",
        color: Colors.SUGGESTION_USER_BORDER
    },
    numberRight: {
        color: Colors.SUGGESTION_USER_BORDER,
        fontSize: (9),
        fontWeight: "800"
    },
    qr: {
        height: verticalScale(50),
        width: moderateScale(60)
    }
})