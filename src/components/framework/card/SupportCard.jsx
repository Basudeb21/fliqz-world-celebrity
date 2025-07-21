import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { Colors } from '../../../constants'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const SupportCard = ({ ticketHead, category, dateTime, status, priority }) => {
    return (
        <TouchableOpacity style={styles.card}>
            <LinearGradient
                colors={[Colors.BUTTON_GRADIENT_ONE, Colors.BUTTON_GRADIENT_TWO]}
                style={styles.ticketImgContainer}
            >
                <FontAwesome
                    name="ticket"
                    color={Colors.WHITE}
                    size={30}
                />
            </LinearGradient>
            <View style={styles.ticketContentContainer}>
                <Text style={styles.ticketHead}>{ticketHead}</Text>
                <Text style={styles.category}><Text style={styles.bold}>Category:</Text> {category}</Text>
                <Text><Text style={styles.bold}>Created at :</Text> {dateTime}</Text>
                <Text><Text style={styles.bold}>Status :</Text> {status}</Text>
                <View style={styles.priority}>
                    <Text style={[styles.prioritySts, {
                        backgroundColor:
                            priority === 'High'
                                ? Colors.PRIORITY_HIGH
                                : priority === 'Medium'
                                    ? Colors.PRIORITY_MIDIUM
                                    : Colors.PRIORITY_LOW,
                    }]}>
                        {priority}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default SupportCard

const styles = StyleSheet.create({
    card: {
        width: "90%",
        alignSelf: "center",
        borderWidth: 1,
        borderColor: Colors.THEME,
        borderRadius: scale(12),
        flexDirection: "row",
    },
    ticketImgContainer: {
        width: moderateScale(50),
        borderTopLeftRadius: scale(12),
        borderBottomLeftRadius: scale(12),
        alignItems: "center",
        justifyContent: "center"
    },
    ticketContentContainer: {
        padding: scale(6),
        flex: 1,
    },
    bold: {
        fontWeight: "600",
    },
    ticketHead: {
        fontWeight: "600",
        fontSize: scale(15),
    },
    category: {
        fontWeight: "400",
        fontSize: scale(12),
        marginTop: verticalScale(6)
    },
    priority: {
        flexDirection: "row",
        alignItems: "flex-end",
        justifyContent: "flex-end",
        marginTop: verticalScale(4)
    },
    prioritySts: {
        color: Colors.WHITE,
        paddingHorizontal: moderateScale(10),
        paddingVertical: verticalScale(1),
        borderRadius: scale(6)
    }
})
