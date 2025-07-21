import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors } from '../../../constants'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import Spacer from '../boots/Spacer'

const ShippingBills = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.topic}>Shipping Details</Text>
            <Text style={styles.owner}>Jhon Doe</Text>
            <Text style={styles.address}>1600 Westheimer Rd, Houston, Texas, 77006, United States</Text>
            <Text style={styles.phoneNumber}>Phone Number: +91 9876543210</Text>
            <Spacer height={20} />
            <Text style={styles.topic}>Payment Details</Text>
            <Text style={styles.summary}>Payment Summary</Text>
            <Text style={styles.tickitCut}>---------------------------</Text>
            <View>
                <View style={styles.row}>
                    <Text style={styles.dataItem}>Price ( 1item)</Text>
                    <Text style={styles.dataAmmount}>$80.00</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.dataItem}>Fees</Text>
                    <Text style={styles.dataAmmount}>$0.25</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.dataItem}>Discount</Text>
                    <Text style={styles.dataAmmount}>$0.00</Text>
                </View>
                <Text style={styles.tickitCut}>---------------------------</Text>
                <View style={styles.row}>
                    <Text style={styles.dataItem}>Total</Text>
                    <Text style={styles.dataAmmount}>$80.25</Text>
                </View>
            </View>

        </View>
    )
}

export default ShippingBills

const styles = StyleSheet.create({
    container: {
        marginHorizontal: moderateScale(20),
        borderWidth: scale(1),
        padding: scale(15),
        borderRadius: scale(6),
        borderColor: Colors.HR_COLOR
    },
    topic: {
        color: Colors.SILVER,
        fontWeight: "500"
    },
    owner: {
        color: Colors.BLACK,
        fontWeight: "500",
        marginTop: verticalScale(10),
        fontSize: scale(18)
    },
    address: {
        color: Colors.BLACK,
        fontWeight: "500",
        marginTop: verticalScale(10),
        fontSize: scale(14)
    },
    phoneNumber: {
        color: Colors.BLACK,
        fontWeight: "400",
        marginTop: verticalScale(10),
        fontSize: scale(12)
    },
    summary: {
        fontSize: scale(22),
        marginTop: scale(10),
        fontWeight: "500"
    },
    tickitCut: {
        color: Colors.HR_COLOR,
        fontSize: scale(40),
        fontWeight: "100",
        alignSelf: "center"
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: moderateScale(10),
        marginTop: verticalScale(5)
    },
    dataItem: {
        fontWeight: "500",
        color: Colors.SILVER,
        fontSize: scale(14)
    },
    dataAmmount: {
        fontWeight: "500",
        color: Colors.BLACK,
        fontSize: scale(14)
    },

})