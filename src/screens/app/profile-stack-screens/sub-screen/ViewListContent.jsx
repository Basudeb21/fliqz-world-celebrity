import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors, Images } from '../../../../constants'
import { EmptyContentCard, ListItemViewCard } from '../../../../components/framework/card'
import { Spacer } from '../../../../components/framework/boots'
import { BackpressTopBar } from '../../../../components/framework/navbar'
import { SafeAreaView } from 'react-native-safe-area-context'
import { GetListDetailsApi } from '../../../../api/app/lists'
import { useSelector } from 'react-redux'

const ViewListContent = ({ route }) => {
    const token = useSelector(state => state.auth.token);
    const { item } = route.params;


    const [lists, setLists] = useState([]);
    useEffect(() => {
        const fetchLists = async () => {
            const res = await GetListDetailsApi(token, item.id);
            if (res && res.success) {
                setLists(res.data.members);
                console.log(res.data.members);
            } else {
                ToastAndroid.show("Failed to load lists", ToastAndroid.SHORT)
            }
        }
        fetchLists()
    }, [token])


    return (
        <SafeAreaView style={styles.areaView}>
            <BackpressTopBar title={item.name + " lists"} />
            <FlatList
                style={styles.container}
                data={lists}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <ListItemViewCard
                        image={item.user.avatar}
                        fanName={item.user.name}
                        fanID={item.user.username}
                    />
                )}
                ListFooterComponent={<Spacer height={5} />}
                contentContainerStyle={[
                    styles.scrollContent,
                    lists.length === 0 && { flex: 1, justifyContent: 'center' }
                ]}
                ListEmptyComponent={
                    <EmptyContentCard text={"This list is empty."} />
                }
            />


        </SafeAreaView>
    )
}

export default ViewListContent

const styles = StyleSheet.create({
    areaView: {
        flex: 1,
        backgroundColor: Colors.THEME
    },
    container: {
        backgroundColor: Colors.WHITE,
        flex: 1
    },
    empty: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    scrollContent: {
        paddingBottom: 10,
    },
})