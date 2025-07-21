import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    FlatList,
} from 'react-native';
import { Colors } from '../../../constants';
import { scale } from 'react-native-size-matters';
import Ionicons from 'react-native-vector-icons/Ionicons';

const DropdownBox = ({
    value,
    setValue,
    placeholder = 'Select option',
    options = [],
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const isFocused = isOpen;

    const handleSelect = (item) => {
        setValue(item);
        setIsOpen(false);
    };

    return (
        <View>
            <TouchableOpacity
                style={[styles.txtInputBox, isFocused ? styles.active : styles.deactive]}
                onPress={() => setIsOpen(!isOpen)}
                activeOpacity={0.8}
            >
                <View style={styles.inputRow}>
                    <Text style={[styles.inputText, { color: value ? Colors.BLACK : Colors.PLACEHOLDER }]}>
                        {value || placeholder}
                    </Text>
                    <Ionicons
                        name={isOpen ? 'chevron-up' : 'chevron-down'}
                        size={18}
                        color={isFocused ? Colors.THEME : Colors.PLACEHOLDER}
                    />
                </View>
            </TouchableOpacity>

            {isOpen && (
                <View style={styles.dropdown}>
                    <FlatList
                        data={options}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={styles.option}
                                onPress={() => handleSelect(item)}
                            >
                                <Text style={styles.optionText}>{item}</Text>
                            </TouchableOpacity>
                        )}
                        keyboardShouldPersistTaps="handled"
                        nestedScrollEnabled={true}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
            )}
        </View>
    );
};

export default DropdownBox;

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
    dropdown: {
        borderWidth: scale(1),
        borderColor: Colors.INPUTBOX_DEACTIVE_BORDER_COLOR,
        borderRadius: scale(5),
        marginTop: scale(5),
        backgroundColor: Colors.WHITE,
        maxHeight: scale(160),
        overflow: 'hidden',
    },
    option: {
        padding: scale(10),
    },
    optionText: {
        fontSize: scale(13),
        color: Colors.BLACK,
    },
});
