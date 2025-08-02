import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Colors, Images, NavigationStrings } from '../../../../../constants'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome'
import Ionicons from 'react-native-vector-icons/dist/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import { DateFormat } from '../../../../../utils/DateFormat'
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { GradientTextButton } from '../../../../../components/framework/button'
import { BackpressTopBar } from '../../../../../components/framework/navbar'
import TimeDifference from '../../../../../utils/TimeDifference'
import { PaymentModal } from '../../../../../components/framework/modal'


const EventDetailsScreen = ({ route }) => {
    const user = useSelector((state) => state.auth?.user);
    const token = useSelector((state) => state.auth?.token);
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const navigation = useNavigation();
    const { event } = route.params;

    const isSame = user.id == event.creator_id;

    const onPressUpdateEvent = ({ event }) => {
        navigation.navigate(NavigationStrings.PROFILE_EVENT_UPDATE, { event });
    }

    return (
        <View style={{ flex: 1 }}>
            <BackpressTopBar title={"Event Details"} />
            <Image source={{ uri: Images.EVENT_EIGHT }} style={styles.eventImg} />
            <Text style={styles.eventName}>{event.title}</Text>
            <Text style={styles.eventAbout}> {event.description}</Text>
            <View style={styles.eventDetails}>
                <Image source={{ uri: Images.CELEBRITY_AVATAR_ONE }} style={styles.celebImg} />
                <View style={styles.infoContainer}>
                    <View style={styles.infoBox}>
                        <FontAwesome
                            name={"calendar"}
                            size={18}
                            color={Colors.THEME}
                        />
                        <Text style={styles.eventDate}>{DateFormat(event.start_time)}</Text>
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
                        <Text style={styles.eventDate}>{TimeDifference(event.start_time, event.end_time)}</Text>
                    </View>
                    <View style={styles.infoBox}>
                        <MaterialCommunityIcons
                            name={"seat-outline"}
                            size={18}
                            color={Colors.THEME}
                        />
                        <Text style={styles.eventDate}>Seat Available: {event.quantity_total}</Text>
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
                        <Text style={styles.eventDate}>{event.location}</Text>
                    </View>

                </View>
            </View>
            <View style={styles.orgContainer}>
                <View>
                    <Text style={styles.orgName}>Kriti Garry</Text>
                    <Text style={styles.orgProf}>{event.event_type}</Text>
                </View>
                <View style={styles.priceContainer}>
                    <Entypo
                        name={"price-tag"}
                        size={24}
                        color={Colors.THEME}
                    />
                    <Text style={styles.eventPrice}>${event.price}</Text>
                </View>
            </View>
            <View style={styles.btn}>
                {
                    isSame &&
                    <GradientTextButton width='90%' label='Update' onPress={() => onPressUpdateEvent({ event })} />
                }

                {
                    !isSame &&
                    <>
                        <GradientTextButton
                            width='90%'
                            label='Pay Now'
                            onPress={() => setShowPaymentModal(true)}
                        />
                        <PaymentModal
                            visible={showPaymentModal}
                            onClose={() => setShowPaymentModal(false)}
                            event={event}
                            token={token}
                        />
                    </>
                }

            </View>
        </View>
    )
}

export default EventDetailsScreen

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
        marginTop: verticalScale(30),
        position: "absolute",
        width: "100%",
        bottom: verticalScale(20)
    }
})