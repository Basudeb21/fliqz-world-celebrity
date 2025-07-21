import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Colors } from '../../../constants';
import { scale } from 'react-native-size-matters';
import moment from 'moment';
import Ionicons from 'react-native-vector-icons/Ionicons';

const DateTimeInputBox = ({
    datetime,
    setDatetime,
    placeholder = 'Select date and time',
    focusedInput,
    setFocusedInput,
    inputKey = 'datetime'
}) => {
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);

    const isFocused = focusedInput === inputKey;

    const handleDateChange = (event, selectedDate) => {
        setShowDatePicker(false);
        if (selectedDate) {
            const newDate = new Date(datetime || new Date());
            newDate.setFullYear(selectedDate.getFullYear());
            newDate.setMonth(selectedDate.getMonth());
            newDate.setDate(selectedDate.getDate());
            setDatetime(newDate);

            setTimeout(() => {
                setShowTimePicker(true);
            }, 250);
        } else {
            setFocusedInput(null);
        }
    };

    const handleTimeChange = (event, selectedTime) => {
        setShowTimePicker(false);
        if (selectedTime) {
            const newDate = new Date(datetime || new Date());
            newDate.setHours(selectedTime.getHours());
            newDate.setMinutes(selectedTime.getMinutes());
            setDatetime(newDate);
        }
        setFocusedInput(null);
    };

    const displayValue = datetime ? moment(datetime).format('MMM DD, YYYY - hh:mm A') : placeholder;

    return (
        <>
            <TouchableOpacity
                style={[styles.txtInputBox, isFocused ? styles.active : styles.deactive]}
                onPress={() => {
                    setShowDatePicker(true);
                    setFocusedInput(inputKey);
                }}
                activeOpacity={0.8}
            >
                <View style={styles.inputRow}>
                    <Text style={[styles.inputText, { color: datetime ? Colors.BLACK : Colors.PLACEHOLDER }]}>
                        {displayValue}
                    </Text>
                    <Ionicons name="calendar-outline" size={18} color={isFocused ? Colors.THEME : Colors.PLACEHOLDER} />
                </View>
            </TouchableOpacity>

            {showDatePicker && (
                <DateTimePicker
                    value={datetime || new Date()}
                    mode="date"
                    display="default"
                    onChange={handleDateChange}
                />
            )}

            {showTimePicker && (
                <DateTimePicker
                    value={datetime || new Date()}
                    mode="time"
                    display="default"
                    onChange={handleTimeChange}
                />
            )}
        </>
    );
};

export default DateTimeInputBox;

const styles = StyleSheet.create({
    txtInputBox: {
        borderWidth: scale(1),
        borderRadius: scale(5),
        padding: scale(10),
        marginBottom: scale(8),
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
