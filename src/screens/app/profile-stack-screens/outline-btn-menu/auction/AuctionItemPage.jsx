import { Image, StyleSheet, Text, ToastAndroid, View } from 'react-native'
import React, { useState } from 'react'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import API from '../../../../../api/common/API';
import { Colors, NavigationStrings } from '../../../../../constants';
import { paymentDoneSendPressSounds } from '../../../../../sound/SoundManager';
import { DateFormat } from '../../../../../utils/DateFormat';
import { GradientIconButton, GradientTextButton, OutLineButton } from '../../../../../components/framework/button';
import { Spacer } from '../../../../../components/framework/boots';
import { BackpressTopBar } from '../../../../../components/framework/navbar';
import { AmmountInput } from '../../../../../components/framework/input';
import { BidOnItemApi } from '../../../../../api/app/auction';


const AuctionItemPage = ({ route }) => {
    const { product } = route.params;
    const navigation = useNavigation();
    const [ammount, setAmmount] = useState(0);
    const token = useSelector(state => state.auth.token);
    const user = useSelector(state => state.auth.user);

    const isSameUser = product.user_id == user.id;

    const openAllBids = (slug) => {
        navigation.navigate(NavigationStrings.PROFILE_ALL_BIDS, { slug });
    };

    const handleMakeBid = async () => {
        const result = await BidOnItemApi(token, product.slug, ammount);


        if (result.success === true) {
            ToastAndroid.show(result.message, ToastAndroid.SHORT);
            paymentDoneSendPressSounds();
            setAmmount("");
        } else {
            const errorMessage =
                result?.data?.message ||
                result?.message ||
                "Something went wrong";
            ToastAndroid.show(errorMessage, ToastAndroid.SHORT);
        }
    };


    return (
        <SafeAreaView style={{ backgroundColor: Colors.WHITE, flex: 1 }}>
            <BackpressTopBar title={"Product Item"} />
            <View style={styles.row}>
                <Image
                    style={styles.image}
                    source={{
                        uri: `${API.STORAGE_URL}${product.images[0]}`
                    }}
                />
                <View style={styles.container}>
                    <Text style={styles.productName}>{product.name}</Text>
                    <Text style={styles.desc}>{product.description}</Text>
                    <Text style={styles.data}>Starting Bid: {product.min_budget}</Text>
                    <Text style={styles.data}>Current Bid: {product.latest_bid || product.min_budget}</Text>
                    <Text style={styles.data}>Auction Start: {DateFormat(product.created_at)}</Text>
                    <Text style={styles.data}>Auction End: {DateFormat(product.end_date)}</Text>
                    <Spacer height={10} />
                    {
                        !isSameUser &&
                        <AmmountInput value={ammount} setValue={setAmmount} />

                    }

                    {
                        isSameUser &&
                        <View style={styles.iconBtnGrp}>
                            <GradientIconButton
                                Icon={FontAwesome5}
                                iconName={"user-edit"}
                                iconSize={20}
                                width='100%'
                                label='Edit'
                                onPress={() => navigation.navigate(NavigationStrings.PROFILE_EDIT_AUCTION_ITEM, { slug: product.slug })}
                            />

                        </View>
                    }
                </View>

            </View>
            <Spacer height={20} />
            {
                !isSameUser &&
                <View style={styles.btnGrp}>
                    <OutLineButton label_two={'View All Bids'} onPress={() => openAllBids(product.slug)} />
                    <GradientTextButton label='Place Bid' onPress={handleMakeBid} />
                </View>
            }
            {
                isSameUser &&
                <View style={styles.btnGrp}>
                    <OutLineButton label_two={'View All Bids'} onPress={() => openAllBids(product.slug)} />
                </View>
            }


        </SafeAreaView>
    )
}

export default AuctionItemPage

const styles = StyleSheet.create({
    container: {
        width: "50%"
    },
    row: {
        flexDirection: "row",
        marginHorizontal: moderateScale(20),
        marginTop: verticalScale(20),
        gap: scale(10)
    },
    image: {
        width: "50%",
        height: verticalScale(220),
        borderRadius: scale(12)
    },
    productName: {
        fontSize: scale(18),
        fontWeight: "500",
        color: Colors.PLACEHOLDER
    },
    desc: {
        fontSize: scale(12),
        fontWeight: "400",
        marginBottom: verticalScale(10)
    },
    data: {
        fontSize: scale(12),
        fontWeight: "600",
    },
    btnGrp: {
        flex: 1,
        width: "100%",
        position: "absolute",
        bottom: 60,
        gap: scale(10),
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: moderateScale(20)
    },
    iconBtnGrp: {
        flex: 1,
        width: "100%",
        position: "absolute",
        bottom: 5,
        gap: scale(10),
        alignItems: "center",
        justifyContent: "center",
    }
})