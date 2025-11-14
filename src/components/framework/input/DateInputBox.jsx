import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Colors } from '../../../constants';
import { scale } from 'react-native-size-matters';
import moment from 'moment';
import Ionicons from 'react-native-vector-icons/Ionicons';

const DateInputBox = ({
    date,
    setDate,
    placeholder = 'Select date',
    focusedInput,
    setFocusedInput,
    inputKey = 'date'
}) => {
    const [showPicker, setShowPicker] = useState(false);

    const handleChange = (event, selectedDate) => {
        setShowPicker(false);
        if (selectedDate) setDate(selectedDate);
        setFocusedInput(null);
    };

    const isFocused = focusedInput === inputKey;

    return (
        <>
            <TouchableOpacity
                style={[styles.txtInputBox, isFocused ? styles.active : styles.deactive]}
                onPress={() => {
                    setShowPicker(true);
                    setFocusedInput(inputKey);
                }}
                activeOpacity={0.8}
            >
                <View style={styles.inputRow}>
                    <Text style={[styles.inputText, { color: date ? Colors.BLACK : Colors.PLACEHOLDER }]}>
                        {date ? moment(date).format('MMM DD, YYYY') : placeholder}
                    </Text>
                    <Ionicons name="calendar-outline" size={18} color={isFocused ? Colors.THEME : Colors.PLACEHOLDER} />
                </View>
            </TouchableOpacity>

            {showPicker && (
                <DateTimePicker
                    value={date || new Date()}
                    mode="date"
                    display="default"
                    onChange={handleChange}
                />
            )}
        </>
    );
};


export default DateInputBox;

const styles = StyleSheet.create({
    txtInputBox: {
        borderWidth: scale(1),
        borderRadius: scale(5),
        padding: scale(10),
    },
    active: {
        borderColor: Colors.THEME,
    },
    deactive: {
        borderColor: Colors.INPUTBOX_DEACTIVE_BORDER_COLOR,
    },
    inputRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    inputText: {
        fontSize: scale(13),
    },
});
