import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { Colors } from '../../../constants';
import { moderateScale, scale } from 'react-native-size-matters';
import { GradientIcon } from '../icon';

const BidTopper = ({ name, amount, date }) => {
    return (
        <View style={styles.card}>
            <GradientIcon
                IconPack={FontAwesome6}
                name="crown"
                colors={[Colors.ICON_GRADIENT_ONE, Colors.ICON_GRADIENT_Two]}
                size={50}
            />
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.ammount}>₹{amount}</Text>
            <Text style={styles.date}>{date}</Text>
        </View>
    );
};

export default BidTopper;

const styles = StyleSheet.create({
    card: {
        alignItems: 'center',
        marginVertical: 20,
        borderRadius: scale(12),
        backgroundColor: Colors.WHITE,
        elevation: scale(10),
        alignSelf: "center",
        padding: scale(10),
        overflow: 'hidden',
        paddingHorizontal: moderateScale(60)
    },

    name: {
        color: Colors.PLACEHOLDER,
        fontWeight: "600",
        fontSize: scale(20),
    },

    ammount: {
        color: Colors.PINK,
        fontWeight: "600",
        fontSize: scale(16),
    },

    date: {
        color: Colors.PLACEHOLDER,
        fontWeight: "600",
        fontSize: scale(12),
    },
});
