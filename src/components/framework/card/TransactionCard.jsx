import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Feather from 'react-native-vector-icons/dist/Feather'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { Colors } from '../../../constants'
const TransactionCard = ({ content, date, time, ammount, type }) => {
    const sym = type ? "+" : "-";
    return (
        <View style={styles.card}>
            <View style={styles.colOne}>
                <Feather
                    name={type ? "arrow-down-left" : "arrow-up-right"}
                    size={24}
                    color={type ? Colors.INCOME : Colors.THEME}
                />
            </View>

            <View style={styles.colTwo}>
                <Text style={styles.txt}>{content}</Text>
                <Text style={styles.txt}>{date + " " + time}</Text>
            </View>

            <View style={styles.colThree}>
                <Text style={[styles.ammount, { color: type ? Colors.INCOME : Colors.THEME }]}>{sym + ammount}</Text>
            </View>


        </View>
    )
}

export default TransactionCard

const styles = StyleSheet.create({
    card: {
        width: "90%",
        borderWidth: scale(1),
        marginTop: verticalScale(10),
        marginHorizontal: moderateScale(20),
        borderRadius: scale(6),
        borderColor: Colors.SUGGESTION_USER_BORDER,
        flexDirection: "row",
        alignSelf: "center",
        paddingVertical: verticalScale(8)
    },
    colOne: {
        maxWidth: "15%",
        minWidth: "15%",
        alignItems: "center",
        justifyContent: "center"
    },
    colTwo: {
        maxWidth: "65%",
        minWidth: "65%",
        justifyContent: "center"
    },
    colThree: {
        maxWidth: "20%",
        minWidth: "20%",
        alignItems: "center",
        justifyContent: "center",
        paddingRight: moderateScale(5),
    },
    txt: {
        fontSize: scale(12),
        color: Colors.PLACEHOLDER
    },
    ammount: {
        color: Colors.THEME,
        fontWeight: "500",
        fontSize: scale(13)
    }
})