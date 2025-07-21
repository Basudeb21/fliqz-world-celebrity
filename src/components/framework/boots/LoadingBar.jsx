import { Animated, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

import { Colors } from '../../../constants';

const LoadingBar = () => {
    const [progress, setProgress] = useState(new Animated.Value(0));

    useEffect(() => {
        Animated.timing(progress, {
            toValue: 100,
            duration: 4000,
            useNativeDriver: false,
        }).start();
    }, []);

    const widthInterpolated = progress.interpolate({
        inputRange: [0, 100],
        outputRange: ["0%", "100%"],
    });
    return (
        <View>
            <View style={styles.loadingBar}>
                <Animated.View style={[styles.completeLoadingBar, { width: widthInterpolated }]} />
            </View>

            <Text style={styles.loadingTxt}>Loading exclusive deals</Text>
        </View>
    )
}

export default LoadingBar

const styles = StyleSheet.create({
    loadingBar: {
        height: verticalScale(5),
        width: "100%",
        backgroundColor: Colors.WHITE,
        borderRadius: 100,
        overflow: 'hidden',
        alignSelf: "center"
    },
    completeLoadingBar: {
        height: verticalScale(5),
        backgroundColor: Colors.THEME,
        borderRadius: 100,
    },
    loadingTxt: {
        marginTop: verticalScale(10),
        fontSize: scale(18),
        fontWeight: "800",
    },
})
