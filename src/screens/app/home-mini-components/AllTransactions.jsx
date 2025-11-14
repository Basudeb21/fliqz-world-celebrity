import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors } from '../../../constants'
import { dummyTransaction } from '../../../data/dummyTransaction'
import { TransactionCard } from '../../../components/framework/card'
import { Spacer } from '../../../components/framework/boots'
import { useSelector } from 'react-redux'
import { AllTransactionListApi } from '../../../api/app/wallet'

const AllTransactions = () => {
    const token = useSelector(state => state.auth.token);
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const fetchTransactions = async () => {
            const res = await AllTransactionListApi(token);
            if (res?.success) {
                setTransactions(res.data);
            }
            console.log("DATA: ", res.data);
        };

        fetchTransactions();
    }, [token]);

    return (
        <View style={styles.container}>
            <FlatList
                data={transactions}
                keyExtractor={(item) => item.time.toString()}
                renderItem={({ item }) => (
                    <TransactionCard
                        content={item.remarks}
                        date={item.date}
                        time={item.time}
                        ammount={item.amount}
                        type={item.transaction_type}
                    />
                )}
                showsVerticalScrollIndicator={false}
                ListFooterComponent={<Spacer height={20} />}
            />
        </View>
    )
}

export default AllTransactions

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.WHITE,
    }
})