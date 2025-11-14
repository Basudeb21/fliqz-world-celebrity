import { FlatList, Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { BackpressTopBar } from '../../../components/framework/navbar'
import { liveData } from '../../../data/liveData'
import { LiveStreamIntroCard } from '../../../components/framework/card'
import { Colors, NavigationStrings } from '../../../constants'
import { scale } from 'react-native-size-matters'
import { Spacer } from '../../../components/framework/boots'
import { useNavigation } from '@react-navigation/native'

const Streams = () => {
    const navigation = useNavigation();
    const handleShowLive = () => {
        navigation.navigate(NavigationStrings.POST_STACK, {
            screen: NavigationStrings.LIVE_SHOWS
        })
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.WHITE }}>
            <BackpressTopBar title="Streams" />
            <View style={styles.container}>
                <FlatList
                    ListHeaderComponent={<Spacer height={20} />}
                    data={liveData}
                    renderItem={({ item }) => (
                        <LiveStreamIntroCard item={item} onPress={handleShowLive} />
                    )}
                    keyExtractor={item => item.id}
                    numColumns={2}
                    columnWrapperStyle={styles.row}
                    ListFooterComponent={
                        <Spacer height={50} />
                    }
                />
            </View>
        </SafeAreaView>
    )
}

export default Streams

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.WHITE,
        marginHorizontal: scale(5),
    },
    row: {
        justifyContent: 'space-between',
        marginBottom: scale(10)
    },

})
