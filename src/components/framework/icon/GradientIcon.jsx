import React from 'react';
import { View, StyleSheet } from 'react-native';
import MaskedView from '@react-native-masked-view/masked-view';
import LinearGradient from 'react-native-linear-gradient';

const GradientIcon = ({ IconPack, name, colors, size }) => {
    const gradientSize = size * 1;

    return (
        <MaskedView
            maskElement={
                <View style={styles.center}>
                    <IconPack name={name} size={size} color="black" />
                </View>
            }
        >
            <LinearGradient
                colors={colors}
                style={{
                    width: gradientSize,
                    height: gradientSize,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            />
        </MaskedView>
    );
};

const styles = StyleSheet.create({
    center: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default GradientIcon;
