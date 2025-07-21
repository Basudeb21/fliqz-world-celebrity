import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import BackpressTopBar from '../../../../../components/framework/navbar/BackpressTopBar'
import { Colors } from '../../../../../constants'
import DropdownBox from '../../../../../components/framework/navbar/DropdownBox'
import { moderateScale, verticalScale } from 'react-native-size-matters'
import TextInputBox from '../../../../../components/framework/input/TextInputBox'
import TextAreaBox from '../../../../../components/framework/input/TextAreaBox'
import GradientTextButton from '../../../../../components/framework/button/GradientTextButton'

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
        <View style={{ flex: 1, backgroundColor: Colors.WHITE }}>
            <BackpressTopBar title={"Add support ticket"} />
            <View style={styles.form}>
                <DropdownBox placeholder='Select Category' options={categoryOptions} />
                <TextInputBox placeholder='Enter subject' />
                <TextAreaBox placeholder='Enter Message' height={120} />
                <DropdownBox placeholder='Select Category' options={priorityOptions} />
                <GradientTextButton label='Submit' />
            </View>
        </View>
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