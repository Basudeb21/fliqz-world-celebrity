import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors } from '../../../constants';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import Feather from 'react-native-vector-icons/Feather';

const AnalycisCard = ({ head, numeric, Icon, iconName, color, iconSize = 20, growthRate, growthType }) => {
    return (
        <View style={styles.card}>
            <Text style={styles.head}>{head}</Text>
            <View style={styles.row}>
                <Text style={[styles.numeric, { color: color }]}>{numeric}</Text>
                <View style={[
                    styles.iconContainer,
                    {
                        backgroundColor: color + '30',
                        width: scale(iconSize + 15),
                        height: scale(iconSize + 15),
                    }
                ]}>
                    <Icon
                        name={iconName}
                        size={scale(iconSize)}
                        color={color}
                    />
                </View>
            </View>
            {(growthType === "inc" || growthType === "dec") && (
                <View style={styles.growthContainer}>
                    <Feather
                        name={growthType === "inc" ? "arrow-up" : "arrow-down"}
                        color={growthType === "inc" ? Colors.LIGHT_BLUE : Colors.PINK}
                    />
                    <Text
                        style={[
                            styles.growthRate,
                            growthType === "inc"
                                ? { color: Colors.LIGHT_BLUE }
                                : { color: Colors.PINK },
                        ]}
                    >
                        {growthRate}
                    </Text>
                </View>
            )}

        </View>
    )
}

export default AnalycisCard

const styles = StyleSheet.create({
    card: {
        backgroundColor: Colors.WHITE,
        elevation: scale(5),
        alignSelf: "flex-start",
        padding: scale(10),
        borderRadius: scale(10),
        width: "32%",
        marginVertical: verticalScale(7),
    },
    row: {
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'center',
        width: '100%',
        marginTop: verticalScale(10),
    },
    head: {
        fontSize: scale(16),
        fontWeight: "600",
        color: Colors.PLACEHOLDER,
        alignSelf: "flex-start"
    },
    numeric: {
        fontWeight: "600",
        fontSize: scale(16)
    },
    growthContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: verticalScale(10),
        marginHorizontal: moderateScale(-5)

    },
    iconContainer: {
        borderRadius: scale(100),
        justifyContent: 'center',
        alignItems: 'center',
    },
    growthRate: {
        fontSize: scale(10),
    }
});
