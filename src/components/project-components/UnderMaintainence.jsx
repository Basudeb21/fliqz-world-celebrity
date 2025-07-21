import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { scale } from 'react-native-size-matters'
import { Colors } from '../../constants'
import GradientTextButton from '../framework/button/GradientTextButton'
import Spacer from '../framework/boots/Spacer'
import { useNavigation } from '@react-navigation/native'

const UnderMaintainence = () => {
    const navigation = useNavigation();
    const handleBackPress = () => {
        navigation.goBack();
    };
    return (
        <View style={styles.container}>
            <Text style={styles.txt}>This Page Is Under Maintenance Please Wait For Next Update</Text>
            <Spacer height={50} />
            <GradientTextButton width='80%' label='Go Back' onPress={handleBackPress} />
        </View>
    )
}

export default UnderMaintainence

const styles = StyleSheet.create({
    txt: {
        fontWeight: "600",
        fontSize: scale(24),
        textAlign: "center",
        color: Colors.PLACEHOLDER
    },
    container: {
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
    }
})