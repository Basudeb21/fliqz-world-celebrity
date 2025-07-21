import React from 'react'
import { StyleSheet, View } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Fontisto from 'react-native-vector-icons/Fontisto'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Octicons from 'react-native-vector-icons/Octicons'
import BackpressTopBar from '../../../components/framework/navbar/BackpressTopBar'
import SearchBar from '../../../components/framework/input/SearchBar'
import { Colors, Images } from '../../../constants'
import BookmarkTabDetails from './sub-screen/BookmarkTabDetails'
import NoContantPage from './sub-screen/NoContantPage'
import { SafeAreaView } from 'react-native-safe-area-context'
import { verticalScale } from 'react-native-size-matters'
import GradientIcon from '../../../components/framework/icon/GradientIcon'

const Tab = createMaterialTopTabNavigator()

const AllScreen = () => <BookmarkTabDetails />
const ImageScreen = () => <BookmarkTabDetails />
const VideoScreen = () => <BookmarkTabDetails />
const AudioScreen = () => <NoContantPage />

const BookmarksTabs = () => {
    const iconSize = 24;
    const bookMarkdata = [
        { id: 1, image: Images.POST_ONE, type: "image" },
        { id: 2, image: Images.POST_TWO, type: "image" },
        { id: 3, image: Images.POST_THREE, type: "reels" },
        { id: 4, image: Images.POST_FOUR, type: "image" },
        { id: 5, image: Images.POST_FIVE, type: "reels" },
    ]

    const filterImages = bookMarkdata.filter(image => image.type == "image");
    const filterReels = bookMarkdata.filter(reels => reels.type == "reels");



    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarShowIcon: true,
                tabBarShowLabel: false,
                tabBarIndicatorStyle: {
                    backgroundColor: Colors.THEME,
                    height: 2,
                },
                tabBarLabelStyle: { fontSize: 10 },
                tabBarIcon: () => {
                    switch (route.name) {
                        case 'All':
                            return <GradientIcon name={"apps-sharp"} size={24} IconPack={Ionicons} colors={[Colors.BUTTON_GRADIENT_ONE, Colors.BUTTON_GRADIENT_TWO]} />
                        case 'Images':
                            return <GradientIcon name={"photograph"} size={24} IconPack={Fontisto} colors={[Colors.BUTTON_GRADIENT_ONE, Colors.BUTTON_GRADIENT_TWO]} />
                        case 'Videos':
                            return <GradientIcon name={"video-collection"} size={24} IconPack={MaterialIcons} colors={[Colors.BUTTON_GRADIENT_ONE, Colors.BUTTON_GRADIENT_TWO]} />
                        case 'Audios':
                            return <GradientIcon name={"unmute"} size={24} IconPack={Octicons} colors={[Colors.BUTTON_GRADIENT_ONE, Colors.BUTTON_GRADIENT_TWO]} />
                        default:
                            return null;
                    }
                },
            })}
        >
            <Tab.Screen name="All" component={AllScreen} initialParams={{ bookMarkdata }} />
            <Tab.Screen name="Images" component={ImageScreen} initialParams={{ bookMarkdata: filterImages }} />
            <Tab.Screen name="Videos" component={VideoScreen} initialParams={{ bookMarkdata: filterReels }} />
            <Tab.Screen name="Audios" component={AudioScreen} />
        </Tab.Navigator>
    )
}

const Bookmarks = () => {
    return (
        <SafeAreaView style={styles.container}>
            <BackpressTopBar title="Bookmarks" />
            <View style={styles.tabContainer}>
                <SearchBar placeholder="Search" />
                <BookmarksTabs />
            </View>
        </SafeAreaView>
    )
}

export default Bookmarks

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.WHITE,
    },
    tabContainer: {
        flex: 1,
        marginTop: verticalScale(10)
    }
})
