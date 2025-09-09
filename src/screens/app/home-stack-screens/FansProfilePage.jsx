import { FlatList, StyleSheet, View } from 'react-native'
import React, { useEffect } from 'react'
import { moderateScale } from 'react-native-size-matters';
import Entypo from 'react-native-vector-icons/dist/Entypo'
import { Colors, Images, NavigationStrings } from '../../../constants';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Fontisto from 'react-native-vector-icons/Fontisto'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons'
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { subscibePressSound } from '../../../sound/SoundManager';
import { ProfileViewInfoCard } from '../../../components/framework/card';
import { NoContantPage } from '../profile-stack-screens/sub-screen';
import FansPostHistoryOnProfile from './FansPostHistoryOnProfile';
import { BackpressTopBar } from '../../../components/framework/navbar';
import { FollowedByImageAndName } from '../../../components/framework/iamge';
import { GradientIconButtonNoText } from '../../../components/framework/button';
import { Spacer } from '../../../components/framework/boots';
import { GradientIcon } from '../../../components/framework/icon';
import { ViewProfileApi } from '../../../api/app/user';
import { useSelector } from 'react-redux';

const Tab = createMaterialTopTabNavigator();

const BookmarksTabs = () => {
    const bookMarkdata = [
        { id: 1, image: Images.POST_ONE, type: "image" },
        { id: 2, image: Images.POST_TWO, type: "image" },
        { id: 3, image: Images.POST_THREE, type: "reels" },
        { id: 4, image: Images.POST_FOUR, type: "image" },
        { id: 5, image: Images.POST_FIVE, type: "reels" },
    ]

    const filterImages = bookMarkdata.filter(item => item.type === "image");
    const filterReels = bookMarkdata.filter(item => item.type === "reels");

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


const FansProfilePage = () => {
    const route = useRoute();
    const { user } = route.params;
    const navigation = useNavigation();
    const token = useSelector(state => state.auth.token);
    const [followers, setFollowers] = React.useState([]);
    const imgs = [
        Images.CELEBRITY_AVATAR_FIVE,
        Images.CELEBRITY_AVATAR_FOUR,
        Images.CELEBRITY_AVATAR_ONE
    ]

    const openShopClick = () => {
        navigation.navigate(NavigationStrings.HOME_SHOP_SCREEN);
    };

    const fetchedFollowers = async () => {
        try {
            const res = await ViewProfileApi(token);
            const followUserDetails = res?.data?.followed_by || [];

            const topThree = followUserDetails.slice(0, 3).map(f => ({
                name: f?.user?.name || "Anonymous",
                avatar: f?.user?.avatar || null,
            }));

            setFollowers(topThree);
        } catch (err) {
            console.log("Error fetching followers:", err);
        }
    };

    useEffect(() => {
        fetchedFollowers();
    }, []);


    const onPressSubscribe = () => subscibePressSound();

    const onPressMessage = () => {
        navigation.goBack();
        navigation.navigate(NavigationStrings.CHAT_STACK, {
            screen: NavigationStrings.FRIEND_CHAT_SCREEN,
            params: { user },
        });
    };



    const renderHeader = () => (
        <>
            <BackpressTopBar title={user.name} color={Colors.WHITE} />
            <ProfileViewInfoCard data={user} />
            <Spacer height={25} />
            <FollowedByImageAndName followers={followers} totalCount={user?.follower_count} />
            <Spacer height={25} />
            <View style={styles.btnContainer}>
                <GradientIconButtonNoText
                    Icon={MaterialCommunityIcons}
                    iconName={"youtube-subscription"}
                    iconSize={20}
                    width="15%"
                    onPress={onPressSubscribe}
                />
                <GradientIconButtonNoText
                    Icon={Ionicons}
                    iconName={"chatbubble-ellipses-sharp"}
                    iconSize={20}
                    width="15%"
                    onPress={onPressMessage}
                />
                <GradientIconButtonNoText
                    Icon={Entypo}
                    iconName={"shop"}
                    iconSize={20}
                    width="15%"
                    onPress={openShopClick}
                />
                <GradientIconButtonNoText
                    Icon={FontAwesome5}
                    iconName={"hammer"}
                    iconSize={20}
                    width="15%"
                />
                <GradientIconButtonNoText
                    Icon={FontAwesome5}
                    iconName={"user-plus"}
                    iconSize={20}
                    width="15%"
                />
                <GradientIconButtonNoText
                    Icon={Entypo}
                    iconName={"chevron-down"}
                    iconSize={20}
                    width="15%"
                />
            </View>
            <Spacer height={20} />
        </>
    );


    console.log(user.username);


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.WHITE }}>
            <FlatList
                data={[{ key: 'tabs' }]}
                keyExtractor={(item) => item.key}
                ListHeaderComponent={renderHeader}
                renderItem={() => (
                    <View style={{ flex: 1, }}>
                        <FansPostHistoryOnProfile username={user.username} />
                    </View>
                )}
                showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
    );
};

export default FansProfilePage;

const styles = StyleSheet.create({
    btnContainer: {
        flexDirection: "row",
        paddingHorizontal: moderateScale(10),
        justifyContent: "space-between",
    },
    tabContainer: {
        flex: 1,
    },
});
