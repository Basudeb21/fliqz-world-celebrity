import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import BackpressTopBar from '../../../components/framework/navbar/BackpressTopBar';
import { SafeAreaView } from 'react-native-safe-area-context';
import HR from '../../../components/framework/boots/HR';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import Spacer from '../../../components/framework/boots/Spacer';
import ProfileFundCard from '../../../components/framework/card/ProfileFundCard';
import GradientTextButton from '../../../components/framework/button/GradientTextButton';
import OutLineButton from '../../../components/framework/button/OutLineButton';
import { Colors } from '../../../constants';
import WalletForm from '../home-mini-components/WalletForm';
import AllTransactions from '../home-mini-components/AllTransactions';

const WalletScreen = () => {
    const [addFundForm, setAddFundForm] = useState(true);
    const [viewTransactions, setViewTransactions] = useState(false);
    const [openWithdraw, setOpenWithdraw] = useState(false);

    const handleAddFundFormPress = () => {
        setAddFundForm(true);
        setViewTransactions(false);
        setOpenWithdraw(false)
    };

    const handleViewTransactionsPress = () => {
        setAddFundForm(false);
        setViewTransactions(true);
        setOpenWithdraw(false)
    };

    const handleOpenWithdrawPress = () => {
        setAddFundForm(false);
        setViewTransactions(false);
        setOpenWithdraw(true)
    }


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.WHITE }}>
            <BackpressTopBar title={"Wallet"} />
            <Spacer height={15} />
            <View style={styles.topContainer}>
                <Text>Your payments and Wallet</Text>
                <Spacer height={10} />
                <HR height={1} />
            </View>
            <ProfileFundCard />
            <View style={styles.btnRow}>
                {addFundForm ?
                    <GradientTextButton label='Add Funds' width='30%' fontSize={14} onPress={handleAddFundFormPress} height={40} /> :
                    <OutLineButton label_two='Add Funds' width='30%' fontSize={14} onPress={handleAddFundFormPress} height={40} />
                }
                {viewTransactions ?
                    <GradientTextButton label='Transactions' width='30%' fontSize={14} onPress={handleViewTransactionsPress} height={40} /> :
                    <OutLineButton label_two='Transactions' width='30%' fontSize={14} onPress={handleViewTransactionsPress} height={40} />
                }
                {openWithdraw ?
                    <GradientTextButton label='Withdraw' width='30%' fontSize={14} onPress={handleOpenWithdrawPress} height={40} /> :
                    <OutLineButton label_two='Withdraw' width='30%' fontSize={14} onPress={handleOpenWithdrawPress} height={40} />
                }
            </View>
            <View style={styles.dynamicContainer}>
                {addFundForm && <WalletForm />}
                {viewTransactions && <AllTransactions />}
            </View>
        </SafeAreaView>
    )
}

export default WalletScreen

const styles = StyleSheet.create({
    topContainer: {
        marginHorizontal: moderateScale(10)
    },
    btnRow: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        marginTop: verticalScale(15)
    },
    dynamicContainer: {
        flex: 1,
        marginTop: verticalScale(10)
    },

})