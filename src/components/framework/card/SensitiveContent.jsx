import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors } from '../../../constants'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { GradientTextButton } from '../button';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { Spacer } from '../boots';


const SensitiveContent = ({ onPress }) => {
    return (
        <View style={styles.card}>
            <AntDesign
                name="warning"
                size={30}
                color={Colors.THEME}
            />
            <Spacer height={10} />
            <Text style={styles.contentHead}>Sensitive Content</Text>
            <Spacer height={10} />
            <Text style={styles.contentBody}>This post may contains sensitive or explicit content</Text>
            <Spacer height={20} />
            <GradientTextButton label='Show content' onPress={onPress} />

        </View>
    )
}

export default SensitiveContent

const styles = StyleSheet.create({
    card: {
        backgroundColor: Colors.SENSITIVE_CARD_BG,
        borderColor: Colors.THEME,
        borderWidth: scale(2),
        borderRadius: scale(6),
        paddingHorizontal: moderateScale(20),
        paddingVertical: verticalScale(50),
        alignItems: "center"
    },
    contentHead: {
        color: Colors.WHITE,
        fontWeight: "600",
        fontSize: scale(18)
    },
    contentBody: {
        color: Colors.WHITE

    }
})