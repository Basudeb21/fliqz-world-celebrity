import { StyleSheet, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { moderateScale, verticalScale } from 'react-native-size-matters'
import { Colors } from '../../../constants'
import { Spacer } from '../../../components/framework/boots'
import { TextArea, TextInputBox } from '../../../components/framework/input'
import { GradientTextButton } from '../../../components/framework/button'

const WalletForm = () => {
    return (
        <SafeAreaView>
            <View style={styles.inputArea}>
                <TextInputBox placeholder='Funding Ammount' />
                <Spacer height={10} />
                <TextInputBox placeholder='Payment Method' />
                <Spacer height={10} />
                <TextInputBox placeholder='Enter bank account number' />
                <Spacer height={10} />
                <TextArea placeholder='Message' height={100} borderColor={Colors.INPUTBOX_DEACTIVE_BORDER_COLOR} />
                <Spacer height={15} />
                <GradientTextButton label='Add Ammount' />
            </View>
        </SafeAreaView>
    )
}

export default WalletForm

const styles = StyleSheet.create({
    inputArea: {
        marginTop: verticalScale(25),
        marginHorizontal: moderateScale(20)
    }
})