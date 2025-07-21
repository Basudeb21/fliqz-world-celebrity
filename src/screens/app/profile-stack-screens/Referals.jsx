import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import RefaralCard from '../../../components/framework/card/RefaralCard'
import { Colors, Images } from '../../../constants'
import BackpressTopBar from '../../../components/framework/navbar/BackpressTopBar'
import { moderateScale, scale } from 'react-native-size-matters'
import Spacer from '../../../components/framework/boots/Spacer'
import InviteLinkCard from '../../../components/framework/card/InviteLinkCard'
import { SafeAreaView } from 'react-native-safe-area-context'

const Referals = () => {
    const referalUser = [
        { id: 1, image: Images.CELEBRITY_AVATAR_ONE, fanName: "Fans_7", fanActiveTime: "Since 2024-04-06", ammount: "12" },
        { id: 2, image: Images.CELEBRITY_AVATAR_TWO, fanName: "Fans_8", fanActiveTime: "Since 2024-04-07", ammount: "15" },
        { id: 3, image: Images.CELEBRITY_AVATAR_THREE, fanName: "Fans_9", fanActiveTime: "Since 2024-04-08", ammount: "10" },
        { id: 4, image: Images.CELEBRITY_AVATAR_FOUR, fanName: "Fans_10", fanActiveTime: "Since 2024-04-09", ammount: "18" },
        { id: 5, image: Images.CELEBRITY_AVATAR_FIVE, fanName: "Fans_11", fanActiveTime: "Since 2024-04-10", ammount: "20" },
        { id: 6, image: Images.CELEBRITY_AVATAR_ONE, fanName: "Fans_12", fanActiveTime: "Since 2024-04-11", ammount: "8" },
        { id: 7, image: Images.CELEBRITY_AVATAR_TWO, fanName: "Fans_13", fanActiveTime: "Since 2024-04-12", ammount: "14" },

    ];

    return (
        <SafeAreaView style={{ backgroundColor: Colors.WHITE, flex: 1 }}>
            <BackpressTopBar title={"Referals"} bgColor={Colors.THEME} color={Colors.WHITE} />

            <FlatList
                ListHeaderComponent={
                    <View>
                        <InviteLinkCard />
                        <Spacer height={25} />
                        <Text style={styles.referal}>Your Referal List</Text>

                    </View>
                }
                data={referalUser}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <RefaralCard
                        image={item.image}
                        fanName={item.fanName}
                        fanActiveTime={item.fanActiveTime}
                        ammount={item.ammount}
                    />

                )}
                // ListFooterComponent={

                // }
                contentContainerStyle={styles.scrollContent}
            />




        </SafeAreaView>
    )
}

export default Referals

const styles = StyleSheet.create({
    referal: {
        color: Colors.THEME,
        fontSize: scale(22),
        fontWeight: "400",
        marginStart: moderateScale(20)
    }
})