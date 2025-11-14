import { StyleSheet, View, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { moderateScale } from 'react-native-size-matters'
import { Colors } from '../../../constants'
import { Spacer } from '../../../components/framework/boots'
import { AmmountInput, TextArea, TextInputBox } from '../../../components/framework/input'
import { GradientTextButton } from '../../../components/framework/button'
import { useSelector } from 'react-redux'
import { WithdrawMoneyApi } from '../../../api/app/wallet'

const WithdrawForm = () => {
    const token = useSelector(state => state.auth.token);

    const [amount, setAmount] = useState('');
    const [bankAccount, setBankAccount] = useState('');
    const [bankRoutingNumber, setBankRoutingNumber] = useState('');
    const [remarks, setRemarks] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleWithdraw = async () => {
        const numericAmount = parseFloat(amount);

        if (!amount || !bankAccount || !bankRoutingNumber) {
            ToastAndroid.show('Please fill all required fields', ToastAndroid.SHORT);
            return;
        }

        if (isNaN(numericAmount) || numericAmount <= 0) {
            ToastAndroid.show('Please enter a valid amount', ToastAndroid.SHORT);
            return;
        }

        if (bankAccount.length < 8) {
            ToastAndroid.show('Please enter a valid bank account number', ToastAndroid.SHORT);
            return;
        }

        if (bankRoutingNumber.length !== 9) {
            ToastAndroid.show('Please enter a valid 9-digit routing number', ToastAndroid.SHORT);
            return;
        }

        setIsLoading(true);

        try {
            const res = await WithdrawMoneyApi(
                token,
                parseInt(amount),
                bankAccount,
                bankRoutingNumber,
                remarks || "Withdrawal request"
            );

            console.log("API Response:", res);

            if (res?.success) {
                ToastAndroid.show(res.message || 'Withdrawal request submitted successfully!', ToastAndroid.SHORT);
                setAmount('');
                setBankAccount('');
                setBankRoutingNumber('');
                setRemarks('');
            } else {
                ToastAndroid.show(res?.message || 'Failed to process withdrawal', ToastAndroid.SHORT);
            }
        } catch (error) {
            console.error("Withdrawal error:", error);
            ToastAndroid.show('Failed to process withdrawal. Please try again.', ToastAndroid.SHORT);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <SafeAreaView>
            <View style={styles.inputArea}>
                <AmmountInput
                    placeholder='Withdrawal Amount*'
                    value={amount}
                    setValue={setAmount}
                />
                <Spacer height={10} />

                <TextInputBox
                    placeholder='Enter bank account number*'
                    value={bankAccount}
                    setValue={setBankAccount}
                />

                <Spacer height={10} />

                <TextInputBox
                    placeholder='Enter bank routing number* (9 digits)'
                    value={bankRoutingNumber}
                    setValue={setBankRoutingNumber}
                />

                <Spacer height={10} />

                <TextArea
                    placeholder='Remarks (Optional)'
                    height={100}
                    value={remarks}
                    setValue={setRemarks}
                    borderColor={Colors.INPUTBOX_DEACTIVE_BORDER_COLOR}
                />

                <Spacer height={15} />

                <GradientTextButton
                    label={isLoading ? 'Processing...' : 'Withdraw Funds'}
                    onPress={handleWithdraw}
                    disabled={isLoading}
                />
            </View>
        </SafeAreaView>
    )
}

export default WithdrawForm;

const styles = StyleSheet.create({
    inputArea: {
        padding: moderateScale(10),
    },
})