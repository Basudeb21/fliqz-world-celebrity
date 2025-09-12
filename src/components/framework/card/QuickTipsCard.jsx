import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors } from '../../../constants'
import { moderateScale, scale } from 'react-native-size-matters'
import QuickAmmountCard from './QuickAmmountCard'

const QuickTipsCard = ({ user }) => {
    return (
        <View style={styles.card}>
            <View style={styles.row}>
                <Text style={styles.head}>Quick Tips : </Text>
                <ScrollView
                    horizontal
                >
                    <QuickAmmountCard ammount={1} user={user} />
                    <QuickAmmountCard ammount={2} user={user} />
                    <QuickAmmountCard ammount={10} user={user} />
                    <QuickAmmountCard ammount={50} user={user} />
                    <QuickAmmountCard ammount={100} user={user} />
                </ScrollView>
            </View>
        </View>
    )
}

export default QuickTipsCard

const styles = StyleSheet.create({
    card: {
        backgroundColor: Colors.PLACEHOLDER,
        marginHorizontal: moderateScale(15),
        padding: scale(5),
        borderRadius: scale(8),
        alignItems: "center"
    },

    row: {
        flexDirection: "row",
        alignItems: "center"

    },
    head: {
        color: Colors.WHITE,
        fontWeight: "600"
    },
    scroll: {
        gap: scale(10)
    }

})