import { Image, ImageBackground, StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { BackpressTopBar } from '../../../../../components/framework/navbar'
import { Colors, Images } from '../../../../../constants'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { LoadingbarStaticWithLabel, Spacer } from '../../../../../components/framework/boots'
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useRoute } from '@react-navigation/native';
import { DateFormat } from '../../../../../utils/DateFormat'
import TimeDifference from '../../../../../utils/TimeDifference'


const ViewCrowdfunding = () => {

    const route = useRoute();
    const { crowdfunding } = route.params;
    console.log("CF Data :: ", crowdfunding);

    const goalAmount = Number(crowdfunding.goal_amount);
    const raisedAmount = Number(crowdfunding.raised_amount || 0);
    const progressPercent = Math.min(
        Math.round((raisedAmount / goalAmount) * 100),
        100
    );

    return (
        <SafeAreaView style={styles.areaView}>
            <BackpressTopBar title={"View Crowdfunding"} />
            <ScrollView
                style={styles.container}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <ImageBackground
                    src={crowdfunding.image_url}
                    style={styles.image}
                >
                    <View style={styles.imageBottomArea}>
                        <Text style={styles.fundingName}>
                            {crowdfunding.title}
                        </Text>
                        <Text style={styles.fundingDesc}>
                            {crowdfunding.description}
                        </Text>
                    </View>
                </ImageBackground>

                <View style={[styles.row, styles.detailsArea]}>
                    <View style={styles.userContainer}>
                        <Image src={Images.CELEBRITY_AVATAR_ONE} style={styles.user} />
                        <Text style={styles.name}>Creator 21</Text>
                        <Text style={styles.id}>@9876543210</Text>
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.descriptionText}>
                            {crowdfunding.content}
                        </Text>
                        <Text style={styles.date}>
                            Project created on {DateFormat(crowdfunding.created_at)}
                        </Text>
                        <View>
                            <LoadingbarStaticWithLabel width={`${progressPercent}%`} />
                            <View style={[styles.row, styles.fundArea]}>
                                <Text style={styles.amountLabels}>Amount Goal <Text style={styles.amount}>${crowdfunding.goal_amount}</Text></Text>
                                <Spacer width={5} />
                                <Text style={styles.amountLabels}>Amount Raised <Text style={styles.amount}>${crowdfunding.raised_amount}</Text></Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.card}>
                    <View style={[styles.row, styles.cardRow]}>
                        <View style={styles.logoBack}>
                            <Ionicons
                                name="rocket"
                                color={Colors.THEME}
                                size={18}
                            />
                        </View>
                        <Text style={styles.status}>Status:</Text>
                        <Text style={[styles.result, styles.live]}>{crowdfunding.status}</Text>
                    </View>
                    <Spacer height={10} />
                    <View style={[styles.row, styles.cardRow]}>
                        <View style={styles.logoBack}>
                            <FontAwesome
                                name="calendar"
                                color={Colors.THEME}
                                size={18}
                            />
                        </View>
                        <Text style={styles.status}>Time left:</Text>
                        <Text style={styles.result}>{TimeDifference(crowdfunding.created_at, crowdfunding.deadline)}</Text>
                    </View>
                    <Spacer height={10} />
                    <View style={[styles.row, styles.cardRow]}>
                        <View style={styles.logoBack}>
                            <FontAwesome
                                name="users"
                                color={Colors.THEME}
                                size={18}
                            />
                        </View>
                        <Text style={styles.status}>Backers:</Text>
                        <Text style={styles.result}>0</Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default ViewCrowdfunding

const styles = StyleSheet.create({
    areaView: {
        flex: 1,
        backgroundColor: Colors.THEME
    },
    container: {
        backgroundColor: Colors.WHITE,
        flex: 1
    },
    scrollContent: {
        paddingBottom: verticalScale(20),
    },
    row: {
        flexDirection: "row",
    },
    detailsArea: {
        marginTop: verticalScale(15),
        marginHorizontal: moderateScale(10),
        paddingVertical: verticalScale(10)
    },
    image: {
        width: "100%",
        height: verticalScale(180)
    },
    userContainer: {
        marginRight: moderateScale(15),
    },
    textContainer: {
        flex: 1,
        paddingRight: moderateScale(15),
        marginRight: moderateScale(5),

    },
    descriptionText: {
        fontSize: scale(10),
        color: Colors.BLACK,
        fontSize: scale(12),
        textAlign: 'center',
        lineHeight: scale(16),
        textAlign: "justify",
        fontWeight: "600"
    },
    date: {
        marginTop: verticalScale(10),
        color: Colors.PLACEHOLDER
    },
    imageBottomArea: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        paddingVertical: verticalScale(10),
        paddingHorizontal: moderateScale(15),
        backgroundColor: 'rgba(0,0,0,0.7)',
    },
    fundingName: {
        color: Colors.THEME,
        fontWeight: '600',
        fontSize: scale(12),
        marginBottom: verticalScale(5),
        textAlign: 'center',
    },
    fundingDesc: {
        color: Colors.WHITE,
        fontWeight: '400',
        fontSize: scale(10),
        textAlign: 'center',
        lineHeight: scale(16),
        textAlign: "justify"
    },
    user: {
        height: verticalScale(160),
        width: moderateScale(120),
        borderRadius: scale(12),
    },
    name: {
        fontSize: scale(16),
        alignSelf: "center",
        fontWeight: "600",
        color: Colors.THEME
    },
    id: {
        fontSize: scale(10),
        alignSelf: "center",
        fontWeight: "800",
        color: Colors.USER_ID_NAME
    },
    fundArea: {
        marginStart: moderateScale(5)
    },
    amountLabels: {
        fontSize: scale(8)
    },
    amount: {
        fontSize: scale(10),
        fontWeight: "600",
        color: Colors.THEME
    },
    card: {
        marginTop: verticalScale(5),
        padding: scale(10),
        backgroundColor: Colors.WHITE,
        borderRadius: 6,
        elevation: scale(1),
        margin: scale(10)
    },
    cardRow: {
        alignItems: "center",
    },
    logoBack: {
        backgroundColor: Colors.THEME_TRANSPARENT,
        padding: scale(8),
        borderRadius: scale(25)
    },
    status: {
        fontWeight: "600",
        marginStart: moderateScale(20),
        fontSize: scale(14),
        color: Colors.THEME
    },
    result: {
        marginStart: moderateScale(20),
        fontWeight: "600",
        fontSize: scale(14),
    },
    live: {
        color: Colors.LIVE_GREEN,
        backgroundColor: Colors.LIVE_GREEN_BACKGROUND,
        paddingHorizontal: moderateScale(15),
        paddingVertical: verticalScale(5),
        borderRadius: scale(12)
    }

})