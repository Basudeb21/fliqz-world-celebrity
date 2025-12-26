import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import { NavigationStrings, Strings } from '../../constants'
import { GradientTextButton } from '../../components/framework/button'
import { BackpressTopBar } from '../../components/framework/navbar'
import { GetAllCountryApi } from '../../api/app/user'

const LivePage = () => {
    const navigation = useNavigation();

    const handleShowLive = () => {
        navigation.navigate(NavigationStrings.POST_STACK, {
            screen: NavigationStrings.LIVE_SHOWS
        })
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <BackpressTopBar title={Strings.LIVE_PAGE} />
            <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
                <GradientTextButton label={Strings.GO_LIVE} width='50%' onPress={handleShowLive} />
            </View>
        </SafeAreaView>
    )
}

export default LivePage
