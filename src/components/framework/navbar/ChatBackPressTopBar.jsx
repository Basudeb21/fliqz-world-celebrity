import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/dist/Ionicons'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { Colors } from '../../../constants';
import { GradientIcon } from '../icon';

const ChatBackPressTopBar = ({ info }) => {
    const navigation = useNavigation();
    const handleBackPress = () => {
        navigation.goBack();
    };

    const renderBadge = ({ item }) => (
        <Image
            source={{ uri: item.icon }}
            style={styles.badgeIcon}
        />
    );


    return (
        <View style={styles.container}>
            <View style={styles.sideContainer}>
                <TouchableOpacity onPress={handleBackPress}>
                    <GradientIcon
                        name={"arrow-back-outline"}
                        size={24}
                        IconPack={Ionicons}
                        colors={[Colors.BUTTON_GRADIENT_ONE, Colors.BUTTON_GRADIENT_TWO]}
                    />

                </TouchableOpacity>
            </View>

            <View style={styles.centerContainer}>
                <Image
                    style={styles.image}
                    source={{ uri: info.avatar }}
                />
                <View>
                    <View style={styles.nameBadgeRow}>
                        <Text style={styles.title}>
                            {info.name?.length > 10 ? info.name.slice(0, 12) + "..." : info.name}
                        </Text>
                        {info.badge.length > 0 && (
                            <FlatList
                                data={info.badge}
                                renderItem={renderBadge}
                                keyExtractor={(item) => item.id.toString()}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                style={styles.badgeList}
                            />
                        )}
                    </View>
                    <Text style={styles.time}>{"20m ago"}</Text>
                </View>
            </View>

            <View style={styles.sideContainer} />
        </View>
    )
}

export default ChatBackPressTopBar

const styles = StyleSheet.create({
    container: {
        height: verticalScale(70),
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: moderateScale(16),
    },
    sideContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    centerContainer: {
        flex: 2,
        justifyContent: "flex-start",
        flexDirection: "row",
        alignItems: "center",
        right: scale(50)
    },
    title: {
        color: Colors.BLACK,
        fontSize: scale(16),
        fontWeight: "500",
    },
    image: {
        height: verticalScale(40),
        width: moderateScale(45),
        borderRadius: scale(100),
        marginEnd: moderateScale(15)
    },
    time: {
        color: Colors.PLACEHOLDER,
        fontSize: scale(10),
        fontWeight: "500",
    },
    nameBadgeRow: {
        flexDirection: "row",
    },
    badgeContainer: {
        flexDirection: "row",
        marginStart: moderateScale(10),
    },
    badgeIcon: {
        width: scale(22),
        height: scale(22),
        borderRadius: scale(4),
        marginRight: scale(4),
    },
    badgeList: {
        marginTop: scale(4),
        marginStart: moderateScale(15),
    },
})