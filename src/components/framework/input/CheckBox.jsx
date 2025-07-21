import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { Colors } from '../../../constants';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

const Checkbox = () => {
    const [isChecked, setIsChecked] = useState(false);

    return (
        <View style={styles.container}>
            <CheckBox
                disabled={false}
                value={isChecked}
                onValueChange={(newValue) => setIsChecked(newValue)}
                tintColors={{ true: Colors.THEME, false: Colors.PLACEHOLDER }}
            />
        </View>
    );
};

export default Checkbox;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});
