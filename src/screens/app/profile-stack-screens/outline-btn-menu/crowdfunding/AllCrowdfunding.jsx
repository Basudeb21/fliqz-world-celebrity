import { FlatList, StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FloatingActionButton } from '../../../../../components/framework/button'
import { Colors, NavigationStrings } from '../../../../../constants'
import { verticalScale } from 'react-native-size-matters'
import { useNavigation } from '@react-navigation/native'
import { BackpressTopBar } from '../../../../../components/framework/navbar'
import { CrowdfundingCard } from '../../../../../components/framework/card'
import { GetCrowdFundingApi } from '../../../../../api/app/crowdfunding'
import { useSelector } from 'react-redux'

const AllCrowdfunding = () => {
    const navigation = useNavigation();
    const [crowdfundings, setCrowdfundings] = useState([]);
    const [loading, setLoading] = useState(false);
    const token = useSelector(state => state.auth.token);
    const user = useSelector(state => state.auth.user);

    useEffect(() => {
        fetchCrowdfunding();
    }, []);

    const fetchCrowdfunding = async () => {
        setLoading(true);
        try {
            const res = await GetCrowdFundingApi({
                token: token,
                userId: user.id
            });
            setCrowdfundings(res.data.data);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };


    const onPressOpenCrowdFunding = (item) => {
        navigation.navigate(
            NavigationStrings.PROFILE_VIEW_CROWDFUNDING,
            { crowdfunding: item }
        );
    };


    return (
        <SafeAreaView style={styles.areaView}>
            <BackpressTopBar title="Crowdfunding" />

            <View style={styles.container}>
                <FlatList
                    data={crowdfundings}
                    keyExtractor={(item) => item.id.toString()}
                    numColumns={2}
                    renderItem={({ item }) => (
                        <CrowdfundingCard
                            item={item}
                            onPress={() => onPressOpenCrowdFunding(item)}
                        />
                    )}
                    contentContainerStyle={{ paddingBottom: 100 }}
                    showsVerticalScrollIndicator={false}
                />


                <FloatingActionButton
                    style={styles.fab}
                    onPress={() =>
                        navigation.navigate(NavigationStrings.PROFILE_CREATE_CROWDFUNDING)
                    }
                />
            </View>
        </SafeAreaView>
    );
};

export default AllCrowdfunding;


const styles = StyleSheet.create({
    areaView: {
        flex: 1,
        backgroundColor: Colors.THEME
    },
    container: {
        backgroundColor: Colors.WHITE,
        flex: 1
    },
    fab: {
        bottom: verticalScale(60)

    }
})