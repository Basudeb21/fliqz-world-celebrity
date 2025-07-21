import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome'
import Ionicons from 'react-native-vector-icons/dist/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import { Colors, Images } from '../../../../constants'
import GradientTextButton from '../../../../components/framework/button/GradientTextButton'
import TicketModal from '../../../../components/framework/modal/TicketModal'


const ViewTicket = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const handleCloseModal = () => {
        setModalVisible(false);
    };
    return (
        <View>
            <Image source={{ uri: Images.EVENT_EIGHT }} style={styles.eventImg} />
            <Text style={styles.eventName}>Event One</Text>
            <Text style={styles.eventAbout}> Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nulla soluta qui, architecto beatae quasi totam alias molestias a magnam iste!</Text>
            <View style={styles.eventDetails}>
                <Image source={{ uri: Images.CELEBRITY_AVATAR_ONE }} style={styles.celebImg} />
                <View style={styles.infoContainer}>
                    <View style={styles.infoBox}>
                        <FontAwesome
                            name={"calendar"}
                            size={18}
                            color={Colors.THEME}
                        />
                        <Text style={styles.eventDate}>25-02-05</Text>
                    </View>

                    <View style={styles.infoBox}>
                        <Ionicons
                            name={"time-outline"}
                            size={18}
                            color={Colors.THEME}
                        />
                        <Text style={styles.eventDate}>11:24 UTC</Text>
                    </View>
                    <View style={styles.infoBox}>
                        <MaterialCommunityIcons
                            name={"timer-sand"}
                            size={18}
                            color={Colors.THEME}
                        />
                        <Text style={styles.eventDate}>25-02-05</Text>
                    </View>
                    <View style={styles.infoBox}>
                        <MaterialCommunityIcons
                            name={"seat-outline"}
                            size={18}
                            color={Colors.THEME}
                        />
                        <Text style={styles.eventDate}>Seat Available: 100</Text>
                    </View>
                    <View style={styles.infoBox}>
                        <FontAwesome
                            name={"language"}
                            size={18}
                            color={Colors.THEME}
                        />
                        <Text style={styles.eventDate}>Language: English</Text>
                    </View>
                    <View style={styles.infoBox}>
                        <Entypo
                            name={"location"}
                            size={18}
                            color={Colors.THEME}
                        />
                        <Text style={styles.eventDate}>USA</Text>
                    </View>

                </View>
            </View>
            <View style={styles.orgContainer}>
                <View>
                    <Text style={styles.orgName}>Kriti Garry</Text>
                    <Text style={styles.orgProf}>Musician</Text>
                </View>
                <View style={styles.priceContainer}>
                    <Entypo
                        name={"price-tag"}
                        size={24}
                        color={Colors.THEME}
                    />
                    <Text style={styles.eventPrice}>$60</Text>
                </View>
            </View>
            <View style={styles.btn}>
                <GradientTextButton width='90%' label='View Ticket' onPress={() => setModalVisible(true)} />
            </View>
            <TicketModal visible={modalVisible} onClose={handleCloseModal} />
        </View>
    )
}

export default ViewTicket

const styles = StyleSheet.create({
    eventImg: {
        width: "100%",
        height: verticalScale(170)
    },
    celebImg: {
        width: moderateScale(120),
        height: verticalScale(180),
        borderRadius: scale(12),
    },
    eventName: {
        fontSize: scale(24),
        marginTop: verticalScale(5),
        marginStart: moderateScale(10),
        fontWeight: "500"
    },
    eventAbout: {
        fontSize: scale(14),
        marginTop: verticalScale(5),
        marginHorizontal: moderateScale(10),
        fontWeight: "400",
        color: Colors.SILVER
    },
    eventDetails: {
        marginHorizontal: moderateScale(20),
        marginTop: verticalScale(20),
        flexDirection: "row"
    },
    orgContainer: {
        flexDirection: "row",
        marginHorizontal: moderateScale(25),
        marginTop: verticalScale(5),
        justifyContent: "space-between"
    },
    orgName: {
        fontSize: scale(18),
        fontWeight: "400"
    },
    orgProf: {
        fontSize: scale(12),
        fontWeight: "400"
    },
    infoContainer: {
        marginStart: moderateScale(20),
        marginTop: verticalScale(12),
        gap: verticalScale(10)
    },
    infoBox: {
        flexDirection: "row",
        gap: moderateScale(12)
    },
    eventDate: {
        fontWeight: "500"
    },
    priceContainer: {
        flexDirection: "row",
        gap: moderateScale(10),
        justifyContent: "center",
        alignItems: "center"
    },
    eventPrice: {
        fontWeight: "500",
        fontSize: scale(20)
    },
    btn: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: verticalScale(30)
    }
})