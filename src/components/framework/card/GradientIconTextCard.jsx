import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient';
import { Colors } from '../../../constants';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

const GradientIconTextCard = ({ Icon, iconName, label = "Swipe to next", content, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={styles.cardWrapper}>
            <LinearGradient
                colors={[Colors.BUTTON_GRADIENT_TWO, Colors.BUTTON_GRADIENT_ONE]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.button}
            >
                <View style={styles.contentContainer}>
                    <Icon
                        name={iconName}
                        color={Colors.THEME}
                        size={24}
                        style={styles.iconStyle}
                    />
                    <Text style={styles.text}>{label.toString()}</Text>
                    <Text style={styles.content}>{content.toString()}</Text>
                </View>
            </LinearGradient>
        </TouchableOpacity>
    )
}

export default GradientIconTextCard

const styles = StyleSheet.create({
    cardWrapper: {
        width: "48%",
        marginBottom: verticalScale(12),
    },
    button: {
        borderRadius: 18,
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: verticalScale(20)
    },
    text: {
        color: Colors.WHITE,
        fontWeight: "700",
        marginTop: verticalScale(10),
        textAlign: "center"
    },
    content: {
        color: Colors.WHITE,
        fontWeight: "500",
        marginTop: verticalScale(10),
        textAlign: "center",
        fontSize: scale(12),
        marginHorizontal: moderateScale(10)
    },
    iconStyle: {
        backgroundColor: Colors.WHITE,
        alignSelf: "center",
        padding: scale(8),
        borderRadius: scale(100)
    },
    contentContainer: {
        alignItems: "center"
    }
})
