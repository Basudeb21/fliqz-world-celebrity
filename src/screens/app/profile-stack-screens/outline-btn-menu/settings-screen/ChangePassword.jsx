import { StyleSheet, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { moderateScale, verticalScale } from 'react-native-size-matters'
import { Colors } from '../../../../../constants'
import { Spacer } from '../../../../../components/framework/boots'
import { GradientTextButton } from '../../../../../components/framework/button'
import { PasswordInputBox } from '../../../../../components/framework/input'
import { BackpressTopBar } from '../../../../../components/framework/navbar'


const ChangePassword = () => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.WHITE }}>
            <BackpressTopBar title={"Change Password"} />
            <View style={styles.form}>
                <PasswordInputBox placeholder={"Enter your current password"} />
                <Spacer height={20} />
                <PasswordInputBox placeholder={"Enter new password"} />
                <Spacer height={20} />
                <PasswordInputBox placeholder={"Confirm password"} />
                <Spacer height={20} />
                <GradientTextButton label='Change Password' />
            </View>
        </SafeAreaView>
    )
}

export default ChangePassword

const styles = StyleSheet.create({
    form: {
        marginTop: verticalScale(50),
        marginHorizontal: moderateScale(20)
    }
})