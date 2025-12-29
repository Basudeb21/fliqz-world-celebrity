import React, { useEffect, useState } from 'react'
import { StyleSheet, View, ActivityIndicator } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Fontisto from 'react-native-vector-icons/Fontisto'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Octicons from 'react-native-vector-icons/Octicons'
import { Colors } from '../../../constants'
import { SafeAreaView } from 'react-native-safe-area-context'
import { verticalScale } from 'react-native-size-matters'
import { BackpressTopBar } from '../../../components/framework/navbar'
import { SearchBar } from '../../../components/framework/input'
import { BookmarkTabDetails, NoContantPage } from './sub-screen'
import { GradientIcon } from '../../../components/framework/icon'
import { useSelector } from 'react-redux'
import { BookMarkDataApi } from '../../../api/app/user'

const Tab = createMaterialTopTabNavigator()

const AllScreen = ({ route }) => <BookmarkTabDetails data={route.params?.bookMarkdata} />
const ImageScreen = ({ route }) => <BookmarkTabDetails data={route.params?.bookMarkdata} />
const VideoScreen = ({ route }) => <BookmarkTabDetails data={route.params?.bookMarkdata} />
const AudioScreen = () => <NoContantPage />

const BookmarksTabs = ({ bookMarkdata }) => {
    const filterImages = bookMarkdata.filter(item =>
        item.attachment.some(att => att.type === "image")
    );
    const filterReels = bookMarkdata.filter(item =>
        item.attachment.some(att => att.type === "video")
    );

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarShowIcon: true,
                tabBarShowLabel: false,
                tabBarIndicatorStyle: {
                    backgroundColor: Colors.THEME,
                    height: 2,
                },
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
    const [loading, setLoading] = useState(true);
    const [bookMarkdata, setBookMarkdata] = useState([]);
    const token = useSelector(state => state.auth.token);

    useEffect(() => {
        const fetchData = async () => {

            const response = await BookMarkDataApi(token);
            if (response?.data?.data) {
                setBookMarkdata(response.data.data);
            }
            setLoading(false);
        };
        fetchData();
    }, []);

    return (
        <SafeAreaView style={styles.areaView}>
            <BackpressTopBar title="Bookmarks" />
            <View style={styles.container}>
                <View style={styles.tabContainer}>
                    <SearchBar placeholder="Search" />
                    {loading ? (
                        <ActivityIndicator size="large" color={Colors.THEME} style={{ marginTop: 20 }} />
                    ) : (
                        <BookmarksTabs bookMarkdata={bookMarkdata} />
                    )}
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Bookmarks

const styles = StyleSheet.create({
    areaView: {
        flex: 1,
        backgroundColor: Colors.THEME
    },
    container: {
        backgroundColor: Colors.WHITE,
        flex: 1
    },
    container: {
        flex: 1,
        backgroundColor: Colors.WHITE,
    },
    tabContainer: {
        flex: 1,
        marginTop: verticalScale(10)
    }
})
