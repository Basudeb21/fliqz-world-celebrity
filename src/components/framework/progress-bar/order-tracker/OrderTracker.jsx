import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import NumberTrack from './NumberTrack'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import TrackBar from './TrackBar'

const OrderTracker = ({ current }) => {
    return (
        <View style={{ alignSelf: "center", marginTop: verticalScale(20) }}>
            <View style={styles.row}>
                <View>
                    <NumberTrack number={1} current={current} />
                    <TrackBar number={1} current={current} />
                </View>
                <Text style={styles.status}>Order Confirmed</Text>
            </View>
            <View style={styles.row}>
                <View>
                    <NumberTrack number={2} current={current} />
                    <TrackBar number={2} current={current} />
                </View>
                <Text style={styles.status}>Order Processed</Text>
            </View>
            <View style={styles.row}>
                <View>
                    <NumberTrack number={3} current={current} />
                    <TrackBar number={3} current={current} />
                </View>
                <Text style={styles.status}>Shipped</Text>
            </View>
            <View style={styles.row}>
                <View>
                    <NumberTrack number={4} current={current} />
                    <TrackBar number={4} current={current} />
                </View>
                <Text style={styles.status}>Out of Delivery</Text>
            </View>
            <View style={styles.row}>
                <View>
                    <NumberTrack number={5} current={current} />
                </View>
                <Text style={styles.status}>Delivered</Text>

            </View>
        </View>
    )
}

export default OrderTracker

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
    },
    status: {
        marginStart: moderateScale(20),
        marginTop: verticalScale(2),
        fontSize: scale(18),
        fontWeight: "400"
    }
})