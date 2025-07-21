import { StyleSheet, View } from 'react-native';
import React from 'react';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { Colors } from '../../../constants';
import Spacer from '../boots/Spacer';

const ThreeDots = ({ active = 1, total = 3 }) => {
    const dots = Array.from({ length: total }, (_, i) => i + 1);

    return (
        <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
            {dots.map((dot, index) => (
                <View key={index} style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View
                        style={[
                            styles.dot,
                            {
                                backgroundColor: active >= dot ? Colors.THEME : Colors.PLACEHOLDER,
                                borderColor: active >= dot ? Colors.THEME : Colors.PLACEHOLDER,
                            },
                        ]}
                    />
                    {index < total - 1 && <Spacer width={5} />}
                </View>
            ))}
        </View>
    );
};

export default ThreeDots;

const styles = StyleSheet.create({
    dot: {
        borderRadius: 100,
        height: verticalScale(7),
        width: moderateScale(7),
        borderWidth: scale(1),
    },
});
