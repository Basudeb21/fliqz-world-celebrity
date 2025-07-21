import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Colors } from '../../../constants'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Spacer from '../boots/Spacer';

const ProductSummary = () => {
    const [hideBill, setHideBill] = useState(true)
    const onPressHideBill = () => {
        setHideBill(!hideBill)
    }
    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <Text style={styles.summary}>Payment Summary</Text>
                <TouchableOpacity onPress={onPressHideBill}>
                    <FontAwesome6
                        color={Colors.BLACK}
                        name={hideBill ? "chevron-up" : "chevron-down"}
                        size={20}
                    />
                </TouchableOpacity>
            </View>
            {hideBill &&
                <View>
                    <Text style={styles.tickitCut}>---------------------------</Text>
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
            }
            {
                !hideBill &&
                <Spacer height={20} />
            }

        </View>
    )
}

export default ProductSummary

const styles = StyleSheet.create({
    container: {
        marginHorizontal: moderateScale(20),
        borderWidth: scale(1),
        padding: scale(15),
        borderRadius: scale(8),
        borderColor: Colors.HR_COLOR
    },
    summary: {
        fontSize: scale(18),
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
        marginTop: verticalScale(5),
        alignItems: "center"
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