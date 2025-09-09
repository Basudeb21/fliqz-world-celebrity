import { StyleSheet, ToastAndroid, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { moderateScale, verticalScale } from 'react-native-size-matters'
import { Colors } from '../../../../../constants'
import { Spacer } from '../../../../../components/framework/boots'
import { GradientTextButton } from '../../../../../components/framework/button'
import { PasswordInputBox } from '../../../../../components/framework/input'
import { BackpressTopBar } from '../../../../../components/framework/navbar'
import { ChangePasswordApi } from '../../../../../api/app/user'
import { useSelector } from 'react-redux'


const ChangePassword = () => {
    const token = useSelector(state => state.auth.token);
    const [currentPassword, setCurrentPassword] = useState();
    const [newPassword, setNewPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();

    const onPressChangePassword = async () => {
        const res = await ChangePasswordApi(token, currentPassword, newPassword, confirmPassword);
        console.log(res);
        ToastAndroid.show(res.message, ToastAndroid.SHORT);

    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.WHITE }}>
            <BackpressTopBar title={"Change Password"} />
            <View style={styles.form}>
                <PasswordInputBox
                    placeholder={"Enter your current password"}
                    value={currentPassword}
                    setValue={setCurrentPassword}
                />
                <Spacer height={20} />
                <PasswordInputBox
                    placeholder={"Enter new password"}
                    value={newPassword}
                    setValue={setNewPassword}
                />
                <Spacer height={20} />
                <PasswordInputBox
                    placeholder={"Confirm password"}
                    value={confirmPassword}
                    setValue={setConfirmPassword}
                />
                <Spacer height={20} />
                <GradientTextButton label='Change Password' onPress={onPressChangePassword} />
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