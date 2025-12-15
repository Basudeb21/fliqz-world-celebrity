import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Ionicons from 'react-native-vector-icons/dist/Ionicons'
import { Colors } from '../../../constants'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { Spacer } from '../boots'
import { GetTotalFunds } from '../../../api/app/wallet'
import { useSelector } from 'react-redux'

const ProfileFundCard = () => {
    const token = useSelector(state => state.auth.token);
    const [funds, setFunds] = useState();
    const getTotalFunds = async () => {
        const res = await GetTotalFunds(token);
        setFunds(res.data.total_funds);
    }

    useEffect(() => {
        getTotalFunds();
    }, [])


    return (
        <View style={styles.container}>
            <Text style={styles.ammount}>${funds}</Text>
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