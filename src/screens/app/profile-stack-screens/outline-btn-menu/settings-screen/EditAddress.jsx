import { KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import BackpressTopBar from '../../../../../components/framework/navbar/BackpressTopBar'
import TextInputBox from '../../../../../components/framework/input/TextInputBox'
import Spacer from '../../../../../components/framework/boots/Spacer'
import TextAreaBox from '../../../../../components/framework/input/TextAreaBox'
import { moderateScale, verticalScale } from 'react-native-size-matters'
import DropdownBox from '../../../../../components/framework/navbar/DropdownBox'
import { countries } from '../../../../../data/CountryArray'
import GradientTextButton from '../../../../../components/framework/button/GradientTextButton'
import { Colors } from '../../../../../constants'

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