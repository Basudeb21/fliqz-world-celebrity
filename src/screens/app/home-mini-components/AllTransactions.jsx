import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors } from '../../../constants'
import { dummyTransaction } from '../../../data/dummyTransaction'
import { TransactionCard } from '../../../components/framework/card'
import { Spacer } from '../../../components/framework/boots'

const AllTransactions = () => {

    const transactions = dummyTransaction

    return (
        <View style={styles.container}>
            <FlatList
                data={transactions}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <TransactionCard
                        content={item.msg}
                        date={item.date}
                        time={item.time}
                        ammount={item.amount}
                        type={item.isCredit}
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