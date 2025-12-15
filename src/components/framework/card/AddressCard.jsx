import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { scale } from 'react-native-size-matters';
import { Colors } from '../../../constants';
import { GradientTextButton } from '../button';
import { GradientIcon } from '../icon';
import Entypo from 'react-native-vector-icons/Entypo';
import { HR, Spacer } from '../boots';

const AddressCard = ({
    data,
    onPressEdit,
    onPressDelete
}) => {
    return (
        <View style={styles.card}>
            <View style={styles.headRow}>
                <GradientIcon
                    IconPack={Entypo}
                    name="address"
                    size={20}
                    colors={[Colors.BUTTON_GRADIENT_ONE, Colors.BUTTON_GRADIENT_TWO]}
                />
                <Text style={styles.heading} numberOfLines={1}>
                    {data.address_title}
                </Text>

            </View>

            <Spacer height={8} />
            <HR height={1} color={Colors.LIGHT_GRAY} />
            <Spacer height={8} />

            <View style={styles.body}>
                <Text style={styles.text}>{data.address}</Text>
                <Text style={styles.text}>{data.address2}</Text>
                <Text style={styles.text}>{data.state}</Text>
                <Text style={styles.text}> {data.city} - {data.zipcode}</Text>
            </View>

            <Spacer height={16} />

            <View style={styles.btnRow}>
                <GradientTextButton
                    label="Edit"
                    fontSize={11}
                    width="48%"
                    height={scale(22)}
                    onPress={onPressEdit}
                />
                <GradientTextButton
                    label="Delete"
                    fontSize={11}
                    width="48%"
                    height={scale(22)}
                    onPress={onPressDelete}
                />
            </View>
        </View>
    );
};

export default AddressCard;

const styles = StyleSheet.create({
    card: {
        backgroundColor: Colors.WHITE,
        borderColor: Colors.THEME,
        borderWidth: scale(1),
        borderRadius: scale(10),
        padding: scale(12),
        flex: 1,
        margin: scale(6),
        minHeight: scale(180),
        justifyContent: 'space-between',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    headRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: scale(8),
    },
    heading: {
        fontWeight: '700',
        fontSize: scale(14),
        color: Colors.THEME,
        flex: 1,
    },
    body: {
        flex: 1,
    },
    text: {
        fontSize: scale(12),
        color: Colors.DARK_GRAY,
        marginBottom: scale(2),
    },
    btnRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});
