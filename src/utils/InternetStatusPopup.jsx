import React, { useEffect, useState, useRef } from 'react';
import { Animated, Text, StyleSheet, View } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import { Colors } from '../constants'; // Make sure Colors.RED and Colors.WHITE exist

const InternetStatusPopup = () => {
    const [isOffline, setIsOffline] = useState(false);
    const slideAnim = useRef(new Animated.Value(-80)).current; // initially hidden above

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            const offline = !state.isConnected || !state.isInternetReachable;
            setIsOffline(offline);
            animateBanner(offline);
        });

        return () => unsubscribe();
    }, []);

    const animateBanner = (show) => {
        Animated.timing(slideAnim, {
            toValue: show ? 0 : -80,
            duration: 300,
            useNativeDriver: true,
        }).start();
    };

    return (
        <Animated.View style={[styles.container, { transform: [{ translateY: slideAnim }] }]}>
            <Text style={styles.text}>⚠️ No internet connection</Text>
        </Animated.View>
    );
};

export default InternetStatusPopup;

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        width: '100%',
        paddingVertical: 12,
        backgroundColor: Colors.THEME,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        elevation: 10,
        shadowColor: Colors.BLACK,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    text: {
        color: Colors.WHITE,
        fontWeight: 'bold',
        fontSize: 15,
    },
});
