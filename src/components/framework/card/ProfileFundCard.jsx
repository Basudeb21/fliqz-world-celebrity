import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/dist/Ionicons'
import { Colors } from '../../../constants'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import Spacer from '../boots/Spacer'

const ProfileFundCard = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.ammount}>$53.06</Text>
            <View style={styles.row}>
                <TouchableOpacity>
                    <Ionicons
                        name={"information-circle-outline"}
                        size={15}
                        color={Colors.THEME}
                    />
                </TouchableOpacity>
                <Spacer width={5} />
                <Text style={styles.txt}>Available funds. You can deposit more money or become a creator to earn more.</Text>
            </View>
        </View>
    )
}

export default ProfileFundCard

const styles = StyleSheet.create({
    container: {
        marginTop: verticalScale(30),
        marginHorizontal: moderateScale(10),
        borderWidth: scale(1),
        padding: scale(15),
        borderColor: Colors.THEME,
        borderRadius: scale(6)
    },
    ammount: {
        fontWeight: "400",
        fontSize: scale(22)
    },
    row: {
        flexDirection: "row",
        marginTop: verticalScale(15)
    },
    icon: {

    },
    txt: {
        color: Colors.PLACEHOLDER,
        fontWeight: "400",
        fontSize: scale(12)
    }
})