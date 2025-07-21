import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ProfileViewInfoCard from '../../../components/framework/card/ProfileViewInfoCard';
import GradientTextButton from '../../../components/framework/button/GradientTextButton';
import { moderateScale } from 'react-native-size-matters';
import GradientIconButtonNoText from '../../../components/framework/button/GradientIconButtonNoText';
import Entypo from 'react-native-vector-icons/dist/Entypo'
import Spacer from '../../../components/framework/boots/Spacer';
import { Colors, Images, NavigationStrings } from '../../../constants';
import ProfileHighlightPostArea from '../home-mini-components/ProfileHighlightPostArea';
import NoContantPage from '../profile-stack-screens/sub-screen/NoContantPage';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Fontisto from 'react-native-vector-icons/Fontisto'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Octicons from 'react-native-vector-icons/Octicons'
import FansPostHistoryOnProfile from './FansPostHistoryOnProfile';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FollowedByImageAndName from '../../../components/framework/iamge/FollowedByImageAndName';
import GradientIcon from '../../../components/framework/icon/GradientIcon';
import BackpressTopBar from '../../../components/framework/navbar/BackpressTopBar';
import { subscibePressSound } from '../../../sound/SoundManager';
const Tab = createMaterialTopTabNavigator()

const AllScreen = () => <FansPostHistoryOnProfile />
const ImageScreen = () => <FansPostHistoryOnProfile />
const VideoScreen = () => <FansPostHistoryOnProfile />
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
            <Tab.Screen name="All">
                {() => <FansPostHistoryOnProfile data={bookMarkdata} />}
            </Tab.Screen>

            <Tab.Screen name="Images">
                {() => <FansPostHistoryOnProfile data={filterImages} />}
            </Tab.Screen>

            <Tab.Screen name="Videos">
                {() => <FansPostHistoryOnProfile data={filterReels} />}
            </Tab.Screen>

            <Tab.Screen name="Audios">
                {() => <NoContantPage />}
            </Tab.Screen>
        </Tab.Navigator>

    )
}


const FansProfilePage = ({ route }) => {
    const { userName } = route.params;
    const navigation = useNavigation();
    const openShopClick = () => {
        navigation.navigate(NavigationStrings.HOME_SHOP_SCREEN)
    }



    const imgs = [
        Images.CELEBRITY_AVATAR_ONE,
        Images.CELEBRITY_AVATAR_TWO,
        Images.CELEBRITY_AVATAR_THREE,

    ]

    const user = { image: Images.CELEBRITY_AVATAR_ONE, fanName: "Fans_123", fanActiveTime: "10 min ago" }

    const onPressSubscribe = () => {
        subscibePressSound()
    }

    const onPressMessage = () => {
        navigation.goBack();
        navigation.navigate(NavigationStrings.CHAT_STACK, {
            screen: NavigationStrings.FRIEND_CHAT_SCREEN,
            params: { user }
        })
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.WHITE }}>
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                showsVerticalScrollIndicator={false}
            >
                <BackpressTopBar title={userName} color={Colors.WHITE} />
                <ProfileViewInfoCard />
                <Spacer height={25} />
                <FollowedByImageAndName images={imgs} />
                <Spacer height={25} />
                <View style={styles.btnContainer}>
                    <GradientTextButton width='25%' label='Subscribe' fontSize={14} onPress={onPressSubscribe} />
                    <GradientTextButton width='25%' label='Message' fontSize={14} onPress={onPressMessage} />
                    <GradientTextButton width='25%' label='Shop' fontSize={14} onPress={openShopClick} />
                    <GradientIconButtonNoText
                        Icon={Entypo}
                        iconName={"chevron-down"}
                        iconSize={20}
                        width='15%'
                    />
                </View>
                <Spacer height={20} />
                <ProfileHighlightPostArea />
                <Spacer height={20} />

                <View style={{ flex: 1, height: 380 }}>
                    <BookmarksTabs />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

export default FansProfilePage


const styles = StyleSheet.create({
    btnContainer: {
        flexDirection: "row",
        paddingHorizontal: moderateScale(10),
        justifyContent: "space-between"

    },
    tabContainer: {
        flex: 1,
    }
})