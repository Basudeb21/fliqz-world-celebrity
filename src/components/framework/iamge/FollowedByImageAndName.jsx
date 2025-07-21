import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import CommonSuggestionImageGroup from './CommonSuggestionImageGroup';

const FollowedByImageAndName = ({ images = [] }) => {
    return (
        <View style={styles.container}>
            <CommonSuggestionImageGroup images={images} />
            <Text style={styles.normalTxt}>
                Followed by
                <Text style={styles.commonNames}> Fans_25, Fans_290 </Text>
                and <Text style={styles.commonNames}>1256 others</Text>
            </Text>
        </View>
    )
}

export default FollowedByImageAndName

const styles = StyleSheet.create({
    container: {
        marginStart: moderateScale(20),
        marginRight: moderateScale(10),
        flexDirection: "row",
        alignItems: "center",
    },
    normalTxt: {
        flexShrink: 1,
        marginLeft: moderateScale(10), // fixed margin between image stack and text
    },
    commonNames: {
        fontWeight: "600",
    },
})
