import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { BackpressTopBar, DropdownBox } from '../../../../../components/framework/navbar'
import { Colors } from '../../../../../constants'
import { moderateScale, verticalScale } from 'react-native-size-matters'
import { Spacer } from '../../../../../components/framework/boots'
import { RewardsCard, SuggestionSearchedUser } from '../../../../../components/framework/card'
import { SearchBar, TextInputBox } from '../../../../../components/framework/input'
import { GradientIconButton, IconButton } from '../../../../../components/framework/button'
import Feather from 'react-native-vector-icons/dist/Feather'
import { RewardFollowers, RewardGift } from '../../../../../api/app/rewards'
import { useSelector } from 'react-redux'

const Rewards = () => {
    const data = ["Spin The Wheel", "Scratch Card", "Mystery Box"]
    const [rewardsTypes, setRewardsTypes] = useState(data[0]);
    const [gifts, setGifts] = useState();
    const [fans, setFans] = useState([]);
    const token = useSelector(state => state.auth.token);

    const fetchFans = async () => {
        const res = await RewardFollowers(token);

        if (res?.success) {
            setFans(res.data);
        }
    };

    const fetchRewards = async () => {
        const res = await RewardGift(token);
        if (res?.success) {
            setGifts(res.data);
        }
    }

    useEffect(() => {
        fetchFans();
        fetchRewards();
    }, []);


    return (
        <SafeAreaView style={styles.areaView}>
            <BackpressTopBar title={"Rewards"} />
            <ScrollView style={styles.container}>
                <View style={styles.form}>
                    <DropdownBox
                        placeholder='Select Reward Type'
                        options={data}
                        setValue={setRewardsTypes}
                        value={rewardsTypes}
                    />
                    <Spacer height={20} />
                    <Text style={styles.rewardsTypes}>Rewards Types</Text>
                    <Spacer height={10} />
                    <FlatList
                        data={gifts}
                        numColumns={3}
                        keyExtractor={(item) => item.id.toString()}
                        columnWrapperStyle={{
                            justifyContent: "space-between",
                            marginBottom: 12
                        }}
                        renderItem={({ item }) => (
                            <RewardsCard
                                logo={item.icon}
                                text={item.name}
                            />
                        )}
                        showsVerticalScrollIndicator={false}
                    />

                    <Spacer height={20} />
                    <Text style={styles.rewardsTypes}>Select Fans</Text>
                    <Spacer height={10} />
                    <TextInputBox />
                    <Spacer height={10} />
                    <SuggestionSearchedUser users={fans} />
                    <Spacer height={20} />
                    <GradientIconButton
                        Icon={Feather}
                        iconName={"send"}
                        iconSize={22}
                        label='Send Rewards'
                        onPress={fetchFans}
                    />
                </View>
                <Spacer height={120} />
            </ScrollView>
        </SafeAreaView>
    )
}

export default Rewards

const styles = StyleSheet.create({
    areaView: {
        flex: 1,
        backgroundColor: Colors.THEME
    },
    container: {
        backgroundColor: Colors.WHITE,
        flex: 1
    },
    form: {
        marginHorizontal: moderateScale(15),
        marginTop: verticalScale(10),
        flex: 1
    },
    rewardsTypes: {
        fontWeight: "600"
    },
    btn: {
        position: "absolute",
        width: "100%",
        bottom: 20
    }
})