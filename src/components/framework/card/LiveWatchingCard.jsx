import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors } from '../../../constants'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome'

const LiveWatchingCard = () => {
    return (
        <View style={styles.container}>
            <FontAwesome
                name={"circle"}
                size={14}
                color={Colors.THEME}
            />
            <Text style={styles.text}>LIVE - 45 viewers</Text>
        </View>
    )
}

export default LiveWatchingCard

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.TRANSPARENT_WHITE_LIGHT,
        alignSelf: "flex-start",
        paddingVertical: verticalScale(6),
        gap: moderateScale(8),
        paddingHorizontal: moderateScale(14),
        borderRadius: scale(100),
        position: "absolute",
        zIndex: 100,
        top: 10,
        right: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    liveIcon: {

    },
    text: {
        color: Colors.WHITE,
        fontSize: scale(14)
    }
})