import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Colors } from '../../../constants';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { Spacer } from '../boots';

const BlockableTextCard = () => {
    return (
        <View style={styles.card}>
            <FontAwesome5
                name="lock"
                size={30}
                color={Colors.THEME}
            />
            <Spacer height={25} />
            <Text style={styles.msg}>This post is hidden by fliqzworld security system</Text>
        </View>
    )
}

export default BlockableTextCard

const styles = StyleSheet.create({
    card: {
        alignItems: "center",
        backgroundColor: Colors.THEME_TRANSPARENT,
        borderColor: Colors.THEME,
        borderWidth: scale(2),
        marginTop: scale(10),
        borderRadius: scale(6),
        paddingHorizontal: moderateScale(20),
        paddingVertical: verticalScale(50),
    },
    msg: {
        color: Colors.WHITE,
        fontWeight: "700"
    }
})