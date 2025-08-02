import { StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import { scale, verticalScale } from 'react-native-size-matters';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Colors } from '../../../constants';
import TextInputBox from './TextInputBox';
import MulitiItemLabel from './MulitiItemLabel';
import { GradientIconButtonNoText } from '../button';

const MultiInputBox = ({
    placeholder = 'Type something...',
    items = [],
    setItems = () => { },
}) => {
    const [inputValue, setInputValue] = useState('');

    const handleAddItem = () => {
        const trimmed = inputValue.trim();
        if (trimmed !== '') {
            setItems(prev => [...prev, trimmed]);
            setInputValue('');
        }
    };

    const handleRemoveItem = index => {
        setItems(prevItems => prevItems.filter((_, i) => i !== index));
    };

    return (
        <View style={styles.container}>
            <View style={styles.inputWrapper}>
                <TextInputBox
                    value={inputValue}
                    setValue={setInputValue}
                    placeholder={placeholder}
                    style={styles.textInputWithButton}
                />
                <View style={styles.addIconWrapper}>
                    <GradientIconButtonNoText
                        Icon={MaterialIcons}
                        iconName="add"
                        iconSize={20}
                        onPress={handleAddItem}
                        width={scale(40)}
                        height={25}
                        borderRadius={100}
                    />
                </View>
            </View>

            <View style={styles.inputArea}>
                <View style={styles.itemList}>
                    {items.map((item, index) => (
                        <MulitiItemLabel
                            key={`${item}-${index}`}
                            label={item}
                            onRemove={() => handleRemoveItem(index)}
                        />
                    ))}
                </View>
            </View>
        </View>
    );
};

export default MultiInputBox;

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    inputWrapper: {
        position: 'relative',
        width: '100%',
    },
    textInputWithButton: {
        paddingRight: scale(50),
    },
    addIconWrapper: {
        position: 'absolute',
        right: scale(10),
        top: '50%',
        transform: [{ translateY: -13 }],
    },

    inputArea: {
        backgroundColor: Colors.WHITE,
        padding: scale(10),
        borderRadius: scale(10),
        minHeight: verticalScale(60),
        borderWidth: scale(1),
        borderColor: Colors.INPUTBOX_DEACTIVE_BORDER_COLOR,
        marginTop: verticalScale(10),
    },
    itemList: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
    },
});
