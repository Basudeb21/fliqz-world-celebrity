import {
    ImageBackground,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import React from 'react';
import { Colors, Images } from '../../../constants';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { LoadingbarStatic, Spacer } from '../boots';
import TimeCountCard from './TimeCountCard';
import { GradientIconButtonNoText } from '../button';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import useCountdown from '../../../utils/useCountdown';

const CrowdfundingCard = ({ item, onPress }) => {
    const progress =
        item?.raised_amount && item?.goal_amount
            ? Math.round(
                (Number(item.raised_amount) / Number(item.goal_amount)) * 100
            )
            : 0;

    const isLive = item?.status === 'live';

    const { days, hours, minutes, seconds } = useCountdown(
        isLive ? item?.deadline : null
    );

    const isExpired =
        days === '00' &&
        hours === '00' &&
        minutes === '00' &&
        seconds === '00';

    return (
        <View style={styles.card}>
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={onPress}
            >
                <ImageBackground
                    source={
                        item?.image_url
                            ? { uri: item.image_url }
                            : Images.BANNER_IMG
                    }
                    style={styles.image}
                >
                    <View style={styles.imageBottomArea}>
                        <Text style={styles.fundingName}>
                            {item?.title || 'Loading...'}
                        </Text>
                        <Text
                            style={styles.fundingDesc}
                            numberOfLines={1}
                        >
                            {item?.description || 'Loading...'}
                        </Text>
                    </View>
                </ImageBackground>

                <Text
                    style={[
                        styles.status,
                        {
                            backgroundColor: isExpired
                                ? Colors.RED
                                : Colors.THEME,
                        },
                    ]}
                >
                    {isExpired
                        ? 'EXPIRED'
                        : item?.status?.toUpperCase() || 'LOADING'}
                </Text>
            </TouchableOpacity>

            <LoadingbarStatic width={`${progress}%`} />

            <View style={styles.row}>
                <View>
                    <Text style={styles.params}>Raised</Text>
                    <Text style={styles.values}>
                        ${item?.raised_amount || '0'}
                    </Text>
                </View>
                <View>
                    <Text style={styles.params}>Progress</Text>
                    <Text style={styles.values}>{progress}%</Text>
                </View>
                <View>
                    <Text style={styles.params}>Goal</Text>
                    <Text style={styles.values}>
                        ${item?.goal_amount || '0'}
                    </Text>
                </View>
            </View>

            <View style={styles.row}>
                <TimeCountCard color={Colors.THEME} count={days} label="DD" />
                <TimeCountCard color={Colors.YELLOW} count={hours} label="HH" />
                <TimeCountCard color={Colors.GREEN} count={minutes} label="MM" />
                <TimeCountCard color={Colors.BLUE} count={seconds} label="SS" />
            </View>

            <Spacer height={10} />

            <View style={[styles.row, { marginHorizontal: moderateScale(5) }]}>
                <GradientIconButtonNoText
                    Icon={MaterialIcons}
                    iconName="delete"
                    height={25}
                    iconSize={20}
                    width="45%"
                />
                <GradientIconButtonNoText
                    Icon={MaterialIcons}
                    iconName="update"
                    height={25}
                    iconSize={20}
                    width="45%"
                />
            </View>

            <Spacer height={20} />
        </View>
    );
};

export default CrowdfundingCard;

const styles = StyleSheet.create({
    card: {
        borderColor: Colors.THEME,
        borderWidth: scale(2),
        width: '48%',
        marginTop: verticalScale(10),
        marginStart: moderateScale(10),
        borderRadius: scale(10),
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: verticalScale(120),
        borderTopLeftRadius: scale(10),
        borderTopRightRadius: scale(10),
        overflow: 'hidden',
    },
    status: {
        color: Colors.WHITE,
        alignSelf: 'flex-start',
        paddingVertical: verticalScale(6),
        paddingHorizontal: moderateScale(12),
        borderRadius: scale(20),
        fontWeight: '600',
        position: 'absolute',
        top: 10,
        right: 10,
        fontSize: scale(10),
    },
    imageBottomArea: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        paddingVertical: verticalScale(6),
        paddingHorizontal: moderateScale(8),
        backgroundColor: 'rgba(0,0,0,0.25)',
    },
    fundingName: {
        color: Colors.THEME,
        fontWeight: '600',
        fontSize: scale(10),
        alignSelf: 'center',
    },
    fundingDesc: {
        color: Colors.WHITE,
        fontWeight: '400',
        fontSize: scale(10),
        alignSelf: 'center',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    params: {
        fontWeight: '600',
        color: Colors.PLACEHOLDER,
        marginTop: verticalScale(5),
    },
    values: {
        margin: verticalScale(5),
        fontSize: scale(11),
        fontWeight: '600',
    },
});
