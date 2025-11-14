import { StyleSheet, View } from 'react-native'
import React from 'react'
import { Colors } from '../../../../../constants'
import { moderateScale, verticalScale } from 'react-native-size-matters'
import { GradientTextButton } from '../../../../../components/framework/button'
import { BackpressTopBar, DropdownBox } from '../../../../../components/framework/navbar'
import { TextAreaBox, TextInputBox } from '../../../../../components/framework/input'
import { SafeAreaView } from 'react-native-safe-area-context'


const AddSupportTicketScreen = () => {
    const categoryOptions = [
        "Select Category",
        "Account Settings",
        "Privacy and Security",
        "Marketplace",
        "Groups",
        "Pages"
    ]

    const priorityOptions = [
        "Low",
        "High",
        "Medium"
    ]

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.WHITE }}>
            <BackpressTopBar title={"Add support ticket"} />
            <View style={styles.form}>
                <DropdownBox placeholder='Select Category' options={categoryOptions} />
                <TextInputBox placeholder='Enter subject' />
                <TextAreaBox placeholder='Enter Message' height={120} />
                <DropdownBox placeholder='Select Category' options={priorityOptions} />
                <GradientTextButton label='Submit' />
            </View>
        </SafeAreaView>
    )
}

export default AddSupportTicketScreen

const styles = StyleSheet.create({
    form: {
        marginTop: verticalScale(20),
        marginHorizontal: moderateScale(20),
        gap: verticalScale(10)
    }
})