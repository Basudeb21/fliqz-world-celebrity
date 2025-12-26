import { FlatList, Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Colors } from '../../../constants'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import Entypo from 'react-native-vector-icons/dist/Entypo';
import { GradientIcon } from '../icon';
import { Spacer } from '../boots';
import StatusModal from '../modal/StatusModal';
import { useSelector } from 'react-redux';

const ProfileViewInfoCard = ({ data }) => {
    const user = useSelector(state => state.auth.user);

    const renderBadge = ({ item }) => (
        <Image
            source={{ uri: item.icon }}
            style={styles.badgeIcon}
        />
    );

    const [statusModalVisible, setStatusModalVisible] = useState(false);

    return (
        <View>
            <View style={styles.container}>
                <View style={styles.infoContainer}>
                    <ImageBackground source={{ uri: data.cover }} style={styles.cover}>
                        <Image
                            style={styles.image}
                            source={{ uri: data.avatar }}
                        />
                    </ImageBackground>

                    <View style={styles.nameBadgeRow}>
                        <Text style={styles.fanName}>{data.name}</Text>
                        <View style={styles.badgeContainer}>
                            {data.badge.length > 0 && (
                                <FlatList
                                    data={data.badge}
                                    renderItem={renderBadge}
                                    keyExtractor={(item) => item.id.toString()}
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                    style={styles.badgeList}
                                />
                            )}
                        </View>
                    </View>

                    <View style={[styles.row, styles.bioContainer]}>
                        <View>
                            <Text style={styles.userName}>@{data.username}</Text>
                            <Text style={styles.bio}>{data.bio}</Text>
                        </View>

                        {data.id == user.id && <View style={styles.row}>
                            <Text>{data.status}</Text>
                            <Spacer width={10} />
                            <TouchableOpacity onPress={() => setStatusModalVisible(true)}>
                                <GradientIcon
                                    IconPack={Entypo}
                                    name={statusModalVisible ? "chevron-up" : "chevron-down"}
                                    size={20}
                                    colors={[Colors.BUTTON_GRADIENT_ONE, Colors.BUTTON_GRADIENT_TWO]}
                                />
                            </TouchableOpacity>
                        </View>}
                    </View>

                    <View style={styles.counterContainer}>
                        <View style={styles.singleArea}>
                            <Text style={styles.counter}>{data.post_count}</Text>
                            <Text style={styles.itemName}>Posts</Text>
                        </View>
                        <View style={styles.singleArea}>
                            <Text style={styles.counter}>{data.follower_count}</Text>
                            <Text style={styles.itemName}>Followers</Text>
                        </View>
                        <View style={styles.singleArea}>
                            <Text style={styles.counter}>{data.following_count}</Text>
                            <Text style={styles.itemName}>Following</Text>
                        </View>
                    </View>
                </View>
            </View>

            <StatusModal
                visible={statusModalVisible}
                onClose={() => setStatusModalVisible(false)}
            />
        </View>
    )
}

export default ProfileViewInfoCard

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
    },
    cover: {
        width: "100%",
        height: scale(120)
    },
    row: {
        flexDirection: "row"
    },
    image: {
        height: verticalScale(65),
        width: moderateScale(75),
        borderRadius: scale(100),
        position: "absolute",
        bottom: -35,
        marginStart: moderateScale(20)
    },
    infoContainer: {
        flex: 1,
    },
    fanName: {
        fontSize: scale(16),
        fontWeight: "600",
        color: Colors.SILVER,
        marginTop: verticalScale(40),
        marginStart: moderateScale(20)
    },
    userName: {
        fontSize: scale(8),
        fontWeight: "900",
        color: Colors.SILVER,
    },
    bio: {
        fontSize: scale(12),
        fontWeight: "500",
        color: Colors.BLACK,
    },
    counterContainer: {
        flexDirection: "row",
        flex: 1,
        marginTop: verticalScale(5),
        gap: moderateScale(30),
        marginStart: moderateScale(20)
    },
    counter: {
        fontSize: scale(15),
        fontWeight: "600",
        color: Colors.BLACK
    },
    itemName: {
        fontSize: scale(12),
        fontWeight: "600",
        color: Colors.SILVER
    },
    stsContainer: {
        marginStart: moderateScale(20),
        marginTop: verticalScale(10)
    },
    bioContainer: {
        justifyContent: "space-between",
        marginHorizontal: scale(20)
    },
    celebrityStatus: {
        fontWeight: "500",
        color: Colors.PLACEHOLDER
    },
    myVault: {
        fontWeight: "400",
    },
    nameBadgeRow: {
        flexDirection: "row",
        alignItems: "center",
    },
    badgeList: {
        marginTop: verticalScale(40),
    },
    badgeIcon: {
        width: scale(22),
        height: scale(22),
        borderRadius: scale(4),
        marginRight: scale(4),
    },
    badgeContainer: {
        flexDirection: "row",
        marginStart: moderateScale(10),
    },
})

