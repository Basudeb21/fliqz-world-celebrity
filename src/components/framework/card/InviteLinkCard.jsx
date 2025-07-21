import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors } from '../../../constants'
import { scale, verticalScale } from 'react-native-size-matters'
import Spacer from '../boots/Spacer'
import TextInputBoxWhite from '../input/TextInputBoxWhite'
import Ionicons from 'react-native-vector-icons/dist/Ionicons'
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome'
import IconButton from '../button/IconButton'


const InviteLinkCard = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.head}>Referrals Invite others to earn more</Text>
            <Spacer height={5} />
            <Text style={styles.body}>Copy your referral link and invite others to earn from their subscriptions.</Text>
            <Spacer height={20} />
            <View style={styles.lowerRow}>
                <TextInputBoxWhite width='45%' placeholder='https://www.google.com/' />
                <Spacer width={10} />
                <IconButton
                    Icon={Ionicons}
                    iconName={"copy-outline"}
                    iconSize={22}
                    iconColor={Colors.THEME}
                />
                <Spacer width={10} />
                <IconButton
                    Icon={FontAwesome}
                    iconName={"share"}
                    iconSize={22}
                    iconColor={Colors.THEME}
                />
            </View>
        </View>
    )
}

export default InviteLinkCard

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.THEME,
        paddingVertical: verticalScale(20),
    },
    lowerRow: {
        flexDirection: "row",
        justifyContent: "center",
    },
    head: {
        color: Colors.WHITE,
        fontSize: scale(16),
        alignSelf: "center",
        fontWeight: "600"
    },
    body: {
        color: Colors.WHITE,
        fontSize: scale(10),
        alignSelf: "center",
        fontWeight: "400"
    },


})