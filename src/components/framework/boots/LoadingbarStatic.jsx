import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors } from '../../../constants'
import { scale, verticalScale } from 'react-native-size-matters'

const LoadingbarStatic = ({ width = "0%" }) => {
    return (
        <View style={styles.bar}>
            <View style={[styles.complete, { width: width }]} />
        </View>
    )
}

export default LoadingbarStatic

const styles = StyleSheet.create({
    bar: {
        width: "95%",
        backgroundColor: Colors.DULL_WHITE,
        height: scale(5),
        alignSelf: "center",
        marginTop: verticalScale(10),
        borderRadius: scale(100)
    },
    complete: {
        backgroundColor: Colors.THEME,
        height: scale(5),
        borderRadius: scale(20)
    }
})