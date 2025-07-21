import { FlatList, Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { Colors, Images } from '../../../constants'
import Entypo from 'react-native-vector-icons/dist/Entypo'
import HR from '../boots/HR'
import Spacer from '../boots/Spacer'
import SearchBar from '../input/SearchBar'

const SimpleTable = ({ data }) => {
    return (
        <View>
            <FlatList
                data={data}
                keyExtractor={(item) => item.id.toString()}
                ListHeaderComponent={
                    <>
                        <Spacer height={20} />
                        <SearchBar placeholder={"Search"} />
                        <View style={styles.head}>
                            <Text style={styles.headTxt}>To</Text>
                            <Spacer width={60} />
                            <Text style={styles.headTxt}>Status</Text>
                            <Text style={styles.headTxt}>Paid With</Text>
                            <Text style={styles.headTxt}>Renews</Text>
                            <Text style={styles.headTxt}>Expire At</Text>
                            <Text style={styles.headTxt}>{" "}</Text>

                        </View>
                        <Spacer height={10} />
                        <HR
                            height={1}
                            width='94%'
                            center={true}
                        />
                    </>
                }
                renderItem={({ item }) => (
                    <>
                        <View View style={styles.bodyRow} >
                            <View style={styles.userInfoContainer}>
                                <Image source={{ uri: item.image }} style={styles.image} />
                                <View style={styles.userNameContainer}>
                                    <Text style={styles.userName}>{item.userName}</Text>
                                    <Text style={styles.userID}>{item.userID}</Text>
                                </View>
                            </View>
                            <Text style={styles.status}>{item.status}</Text>
                            <Text style={styles.status}>{item.paymentType}</Text>
                            <Text style={styles.status}>{item.renew}</Text>
                            <Text style={styles.status}>{item.expireOn}</Text>
                            <Entypo
                                name="dots-three-horizontal"
                                size={12}
                                color={Colors.BLACK}
                            />
                        </View >
                        <Spacer height={10} />
                        <HR
                            height={1}
                            width='94%'
                            center={true}
                        />
                    </>
                )}
                ListFooterComponent={<Spacer height={10} />}
                contentContainerStyle={styles.scrollContent}
            />




        </View>
    )
}

export default SimpleTable

const styles = StyleSheet.create({
    head: {
        flexDirection: "row",
        marginHorizontal: moderateScale(15),
        justifyContent: "space-between",
        marginTop: verticalScale(10)
    },
    headTxt: {
        fontWeight: "500",
        fontSize: scale(10),
        color: Colors.PLACEHOLDER
    },
    bodyRow: {
        flexDirection: "row",
        marginTop: verticalScale(10),
        marginHorizontal: moderateScale(15),
        justifyContent: "space-between",
        alignItems: "center"
    },
    image: {
        height: verticalScale(30),
        width: moderateScale(30),
        borderRadius: scale(100)
    },
    userInfoContainer: {
        flexDirection: "row",
        alignItems: "center"
    },
    userNameContainer: {
        marginStart: moderateScale(10)
    },
    userName: {
        color: Colors.PLACEHOLDER,
        fontSize: scale(10),
        fontWeight: "600"
    },
    userID: {
        color: Colors.PLACEHOLDER,
        fontSize: scale(8),
        fontWeight: "600"
    },
    status: {
        color: Colors.PLACEHOLDER,
        fontSize: scale(9),
        fontWeight: "400"
    }
})




// />