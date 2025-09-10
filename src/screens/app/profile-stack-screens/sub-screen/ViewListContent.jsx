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
    const user = [
        { id: 1, image: Images.CELEBRITY_AVATAR_ONE, fanName: "Maddy_56", fanID: "@maddy_8923" },
        { id: 2, image: Images.CELEBRITY_AVATAR_TWO, fanName: "Zoya_123", fanID: "@zoya.12" },
        { id: 3, image: Images.CELEBRITY_AVATAR_THREE, fanName: "Rohan_44", fanID: "@rohan.k" },
        { id: 4, image: Images.CELEBRITY_AVATAR_FOUR, fanName: "Aisha_", fanID: "@aisha_942" },
        { id: 5, image: Images.CELEBRITY_AVATAR_FIVE, fanName: "Sam_09", fanID: "@sam_sky" },
        { id: 6, image: Images.CELEBRITY_AVATAR_ONE, fanName: "Nikki_007", fanID: "@nikki.love" },
        { id: 7, image: Images.CELEBRITY_AVATAR_TWO, fanName: "AryanX", fanID: "@aryan.xv" },
        { id: 8, image: Images.CELEBRITY_AVATAR_THREE, fanName: "Kriti_", fanID: "@kriti.official" },
        { id: 9, image: Images.CELEBRITY_AVATAR_FOUR, fanName: "Dev@88", fanID: "@dev.real" },
        { id: 10, image: Images.CELEBRITY_AVATAR_FIVE, fanName: "Simran_L", fanID: "@simran.luthra" },
        { id: 11, image: Images.CELEBRITY_AVATAR_ONE, fanName: "Riya_Star", fanID: "@riya.s01" },
        { id: 12, image: Images.CELEBRITY_AVATAR_TWO, fanName: "Aditya_", fanID: "@adi_344" },
        { id: 13, image: Images.CELEBRITY_AVATAR_THREE, fanName: "Tina__", fanID: "@tina98" },
        { id: 14, image: Images.CELEBRITY_AVATAR_FOUR, fanName: "Krish_Y", fanID: "@krish.yash" },
        { id: 15, image: Images.CELEBRITY_AVATAR_FIVE, fanName: "Neha__", fanID: "@neha_d" },
        { id: 16, image: Images.CELEBRITY_AVATAR_ONE, fanName: "Raj_55", fanID: "@raj.king" },
        { id: 17, image: Images.CELEBRITY_AVATAR_TWO, fanName: "MeghaS", fanID: "@megha_singh" },
        { id: 18, image: Images.CELEBRITY_AVATAR_THREE, fanName: "Vikrant_", fanID: "@vik_678" },
        { id: 19, image: Images.CELEBRITY_AVATAR_FOUR, fanName: "Anu_96", fanID: "@anu.96" },
        { id: 20, image: Images.CELEBRITY_AVATAR_FIVE, fanName: "Yash__", fanID: "@yash_waves" }
    ];

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
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.WHITE }}>
            <BackpressTopBar title={item.name + " lists"} />
            <FlatList
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
    empty: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    scrollContent: {
        paddingBottom: 10,
    },
})