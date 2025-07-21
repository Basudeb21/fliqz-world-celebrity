import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors, Images } from '../../../constants'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'

const ProfileViewInfoCard = () => {
    return (
        <View>
            <View style={styles.container}>

                <View style={styles.infoContainer}>
                    <ImageBackground source={{ uri: Images.POST_ONE }} style={styles.cover}>
                        <Image
                            style={styles.image}
                            source={{ uri: Images.CELEBRITY_AVATAR_ONE }}
                        />
                    </ImageBackground>
                    <Text style={styles.fanName}>Fans_10</Text>
                    <View style={styles.counterContainer}>
                        <View style={styles.singleArea}>
                            <Text style={styles.counter}>1,200</Text>
                            <Text style={styles.itemName}>Posts</Text>
                        </View>
                        <View style={styles.singleArea}>
                            <Text style={styles.counter}>1.2M</Text>
                            <Text style={styles.itemName}>Followers</Text>
                        </View>
                        <View style={styles.singleArea}>
                            <Text style={styles.counter}>21</Text>
                            <Text style={styles.itemName}>Following</Text>
                        </View>
                    </View>
                </View>
            </View>
            <View style={styles.stsContainer}>
                <Text style={styles.celebrityStatus}>Celebrity</Text>
                <Text style={styles.myVault}>My Vault Artist</Text>
            </View>
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
    infoArea: {
        marginStart: moderateScale(100)
    },
    image: {
        height: verticalScale(70),
        width: moderateScale(70),
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
    counterContainer: {
        flexDirection: "row",
        flex: 1,
        marginTop: verticalScale(5),
        gap: moderateScale(30),
        marginStart: moderateScale(20)
    },
    singleArea: {

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
    celebrityStatus: {
        fontWeight: "500",
        color: Colors.PLACEHOLDER
    },
    myVault: {
        fontWeight: "400",
    }
})