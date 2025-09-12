import { StyleSheet, View, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { moderateScale } from 'react-native-size-matters'
import { Colors } from '../../../constants'
import { Spacer } from '../../../components/framework/boots'
import { AmmountInput, TextArea, TextInputBox } from '../../../components/framework/input'
import { GradientTextButton } from '../../../components/framework/button'
import { useSelector } from 'react-redux'
import { DropdownBox } from '../../../components/framework/navbar'
import { AllAddressApi } from '../../../api/app/address'
import AddFundsApi from '../../../api/app/wallet/AddFundsApi'

const WalletForm = () => {
    const token = useSelector(state => state.auth.token);
    const user = useSelector(state => state.auth.user);

    const [addresses, setAddresses] = useState([]);
    const [addressData, setAddressData] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [amount, setAmount] = useState('');
    const [bankAccount, setBankAccount] = useState('');
    const [remarks, setRemarks] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchAddresses = async () => {
            const res = await AllAddressApi({ token });
            if (res?.success && Array.isArray(res.data)) {
                setAddressData(res.data);

                const mapped = res.data.map(addr => {
                    let fullAddress = `${addr.address_title} - ${addr.address}, ${addr.city}, ${addr.zipcode}`;
                    if (fullAddress.length > 35) {
                        fullAddress = fullAddress.substring(0, 35) + "...";
                    }
                    return fullAddress;
                });
                setAddresses(mapped);
            }
        };

        fetchAddresses();
    }, [token]);

    const handleAddFunds = async () => {
        if (!amount || !selectedAddress) {
            ToastAndroid.show('Please enter amount and select an address', ToastAndroid.SHORT);
            return;
        }

        if (parseFloat(amount) <= 0) {
            ToastAndroid.show('Please enter a valid amount', ToastAndroid.SHORT);
            return;
        }

        setIsLoading(true);

        try {
            const selectedAddressObj = addressData.find((addr, index) =>
                addresses[index] === selectedAddress
            );

            if (!selectedAddressObj) {
                ToastAndroid.show('Invalid address selected', ToastAndroid.SHORT);
                return;
            }

            let cleanPhone = user.phone || '';
            cleanPhone = cleanPhone.replace(/[^+\d]/g, '');
            if (cleanPhone.startsWith('++')) {
                cleanPhone = cleanPhone.replace('++', '+');
            }

            const payload = {
                token,
                amount: parseFloat(amount),
                name: user?.name || selectedAddressObj.name,
                email: user?.email || selectedAddressObj.email,
                phone: cleanPhone || selectedAddressObj.phone,
                address: selectedAddressObj.address,
                address2: selectedAddressObj.address2 || "",
                state: selectedAddressObj.state,
                city: selectedAddressObj.city,
                zipcode: selectedAddressObj.zipcode,
                country_id: selectedAddressObj.country_id || 1,
                remarks: remarks || "Wallet funding",
            };

            console.log("Sending payload:", payload);

            const res = await AddFundsApi(payload);

            if (res.success) {
                ToastAndroid.show(res.message || 'Funds added successfully!', ToastAndroid.SHORT);
                setAmount('');
                setRemarks('');
                setSelectedAddress(null);
                setBankAccount('');
            } else {
                ToastAndroid.show(res.message || 'Failed to add funds', ToastAndroid.SHORT);
            }
        } catch (error) {
            console.error("Add funds error:", error);
            ToastAndroid.show('Failed to add funds. Please try again.', ToastAndroid.SHORT);
        } finally {
            setIsLoading(false);
        }
    };

    const handleAddressSelect = (addressDisplay) => {
        setSelectedAddress(addressDisplay);
    };

    return (
        <SafeAreaView>
            <View style={styles.inputArea}>
                <AmmountInput
                    placeholder='Funding Amount*'
                    value={amount}
                    setValue={setAmount}
                />
                <Spacer height={10} />

                <DropdownBox
                    value={selectedAddress}
                    setValue={handleAddressSelect}
                    placeholder='Choose Address*'
                    options={addresses}
                />

                <Spacer height={10} />

                <TextInputBox
                    placeholder='Enter bank account number (Optional)'
                    value={bankAccount}
                    setValue={setBankAccount}
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
                    label={isLoading ? 'Processing...' : 'Add Funds'}
                    onPress={handleAddFunds}
                    disabled={isLoading}
                />
            </View>
        </SafeAreaView>
    )
}

export default WalletForm

const styles = StyleSheet.create({
    inputArea: {
        marginHorizontal: moderateScale(10),
        padding: moderateScale(15),
    },
})