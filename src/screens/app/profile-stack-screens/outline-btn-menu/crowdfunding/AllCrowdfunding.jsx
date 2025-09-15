import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FloatingActionButton } from '../../../../../components/framework/button'
import { Colors, NavigationStrings } from '../../../../../constants'
import { verticalScale } from 'react-native-size-matters'
import { useNavigation } from '@react-navigation/native'
import { BackpressTopBar } from '../../../../../components/framework/navbar'

const AllCrowdfunding = () => {

    const navigation = useNavigation();

    const onPressCreateNewCrowdFunding = () => {
        navigation.navigate(NavigationStrings.PROFILE_CREATE_CROWDFUNDING);
    }
    return (
        <SafeAreaView style={styles.container}>
            <BackpressTopBar title={"Crowdfunding"} />
            <Text>AllCrowdfunding</Text>
            <FloatingActionButton style={styles.fab} onPress={onPressCreateNewCrowdFunding} />
        </SafeAreaView>
    )
}

export default AllCrowdfunding

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.WHITE,
    },
    fab: {
        bottom: verticalScale(60)

    }
})