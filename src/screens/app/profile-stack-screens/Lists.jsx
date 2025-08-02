import { FlatList, StyleSheet } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Colors, Images, NavigationStrings } from '../../../constants'
import { useNavigation } from '@react-navigation/native'
import { FloatingActionButton } from '../../../components/framework/button'
import { Spacer } from '../../../components/framework/boots'
import { ListCardItem } from '../../../components/framework/card'
import { BackpressTopBar } from '../../../components/framework/navbar'

const Lists = () => {
    const users = [
        { id: 1, type: "Followers", ammount: "1.5M peoples", imgs: [Images.CELEBRITY_AVATAR_ONE, Images.CELEBRITY_AVATAR_TWO, Images.CELEBRITY_AVATAR_THREE] },
        { id: 2, type: "Following", ammount: "200 peoples", imgs: [Images.CELEBRITY_AVATAR_ONE, Images.CELEBRITY_AVATAR_TWO, Images.CELEBRITY_AVATAR_THREE] },
        { id: 3, type: "Blocked", ammount: "0 peoples", imgs: [Images.CELEBRITY_AVATAR_ONE, Images.CELEBRITY_AVATAR_TWO, Images.CELEBRITY_AVATAR_THREE] }
    ]

    const navigation = useNavigation()
    const onPressViewCard = (type) => {
        navigation.navigate(NavigationStrings.HOME_VIEW_LIST_CONTENT, { type });
    };
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.WHITE }}>
            <BackpressTopBar title={"Lists"} />
            <FlatList
                ListHeaderComponent={<Spacer height={15} />}
                data={users}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <ListCardItem
                        type={item.type}
                        ammount={item.ammount}
                        imgs={item.imgs}
                        onPress={() => onPressViewCard(item.type)}
                    />
                )}
                ItemSeparatorComponent={<Spacer height={10} />}
            />
            <FloatingActionButton />
        </SafeAreaView>
    )
}

export default Lists

const styles = StyleSheet.create({
    fab: {
        position: "absolute",

    }
})