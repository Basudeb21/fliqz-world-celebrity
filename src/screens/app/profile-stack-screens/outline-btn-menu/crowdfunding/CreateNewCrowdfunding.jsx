import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { BackpressTopBar } from '../../../../../components/framework/navbar'
import { AmmountInput, DateInputBox, GalleryPickerBox, TextAreaBox, TextInputBox } from '../../../../../components/framework/input'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { GradientTextButton } from '../../../../../components/framework/button'

const CreateNewCrowdfunding = () => {
    return (
        <SafeAreaView>
            <BackpressTopBar title={"Create Crowdfunding"} />
            <View style={styles.form}>
                <TextInputBox placeholder='Title' />
                <AmmountInput placeholder='Funding Goal' />
                <DateInputBox placeholder='Deadline' />
                <GalleryPickerBox placeholder='Cover Image' />
                <TextAreaBox placeholder='Short description' height={90} />
                <TextAreaBox placeholder='Content' height={90} />
                <GradientTextButton label='Create' />
            </View>
        </SafeAreaView>
    )
}

export default CreateNewCrowdfunding

const styles = StyleSheet.create({
    form: {
        marginTop: verticalScale(20),
        marginHorizontal: moderateScale(15),
        gap: scale(10)
    }
})