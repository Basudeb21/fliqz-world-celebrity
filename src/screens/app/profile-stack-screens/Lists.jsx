import { FlatList, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Colors, Images, NavigationStrings } from '../../../constants'
import { useNavigation } from '@react-navigation/native'
import { FloatingActionButton } from '../../../components/framework/button'
import { Spacer } from '../../../components/framework/boots'
import { ListCardItem } from '../../../components/framework/card'
import { BackpressTopBar } from '../../../components/framework/navbar'
import { verticalScale } from 'react-native-size-matters'
import { useSelector } from 'react-redux'
import { GetAllListApi } from '../../../api/app/lists'
import { AddListModal } from '../../../components/framework/modal'

const Lists = () => {
    const token = useSelector(state => state.auth.token);
    const [modalVisible, setModalVisible] = useState(false);
    const [lists, setLists] = useState([]);
    useEffect(() => {
        const fetchLists = async () => {
            const res = await GetAllListApi(token)
            if (res && res.success) {
                setLists(res.data);
                console.log(lists);
            } else {
                ToastAndroid.show("Failed to load lists", ToastAndroid.SHORT)
            }
        }
        fetchLists()
    }, [token])


    const imgs = [Images.CELEBRITY_AVATAR_ONE, Images.CELEBRITY_AVATAR_TWO, Images.CELEBRITY_AVATAR_THREE];

    const navigation = useNavigation()
    const onPressViewCard = (item) => {
        navigation.navigate(NavigationStrings.HOME_VIEW_LIST_CONTENT, { item });
    };
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.WHITE }}>
            <BackpressTopBar title={"Lists"} />
            <FlatList
                ListHeaderComponent={<Spacer height={15} />}
                data={lists}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <ListCardItem
                        type={item.name}
                        ammount={item.member_count}
                        imgs={imgs}
                        onPress={() => onPressViewCard(item)}
                    />
                )}
                ItemSeparatorComponent={<Spacer height={10} />}
            />
            <FloatingActionButton
                style={styles.fab}
                onPress={() => setModalVisible(true)}
            />

            <AddListModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                data={{}} // you can pass extra data if needed
            />
        </SafeAreaView>
    )
}

export default Lists

const styles = StyleSheet.create({
    fab: {
        position: "absolute",
        bottom: verticalScale(60)

    }
})