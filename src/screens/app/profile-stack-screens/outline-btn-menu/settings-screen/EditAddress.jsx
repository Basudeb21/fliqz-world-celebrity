import { KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { moderateScale, verticalScale } from 'react-native-size-matters'
import { countries } from '../../../../../data/CountryArray'
import { Colors } from '../../../../../constants'
import { Spacer } from '../../../../../components/framework/boots'
import { GradientTextButton } from '../../../../../components/framework/button'
import { BackpressTopBar, DropdownBox } from '../../../../../components/framework/navbar'
import { TextAreaBox, TextInputBox } from '../../../../../components/framework/input'


const EditAddress = () => {

    const [selectedCountry, setSelectedCountry] = useState('');
    return (
        <View style={{ flex: 1, backgroundColor: Colors.WHITE }}>
            <BackpressTopBar title={"Edit Address"} />
            <KeyboardAvoidingView style={styles.body}>
                <TextInputBox placeholder='Enter Address Title' />
                <Spacer height={10} />
                <TextAreaBox placeholder='Enter Address' height={80} />
                <Spacer height={10} />
                <TextInputBox placeholder='Enter City' />
                <Spacer height={10} />
                <TextInputBox placeholder='Enter State' />
                <Spacer height={10} />
                <TextInputBox placeholder='Enter Zipcode' />
                <Spacer height={10} />
                <DropdownBox
                    value={selectedCountry}
                    setValue={setSelectedCountry}
                    placeholder="Select Country"
                    options={countries}
                />
            </KeyboardAvoidingView>
            <Spacer height={20} />

            <View style={styles.btn}>
                <GradientTextButton width='90%' label='Submit' />
            </View>
        </View>
    )
}

export default EditAddress

const styles = StyleSheet.create({
    body: {
        marginTop: verticalScale(20),
        marginHorizontal: moderateScale(20)
    },
    btn: {
        justifyContent: "center",
        alignItems: "center"
    }
})