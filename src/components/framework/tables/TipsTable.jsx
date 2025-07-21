import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { Colors } from '../../../constants';
import Spacer from '../boots/Spacer';
import HR from '../boots/HR';


const COLUMN_WIDTHS = {
    image: moderateScale(50),
    userName: moderateScale(70),
    userID: moderateScale(80),
    date: moderateScale(80),
    ammount: moderateScale(50),
};
const TipsTable = ({ data }) => {
    return (
        <View>
            <View style={[styles.row, styles.head]}>
                <Text style={[styles.headTxt, { width: COLUMN_WIDTHS.image }]}>Image</Text>
                <Text style={[styles.headTxt, { width: COLUMN_WIDTHS.userName }]}>User Name</Text>
                <Text style={[styles.headTxt, { width: COLUMN_WIDTHS.userID }]}>User ID</Text>
                <Text style={[styles.headTxt, { width: COLUMN_WIDTHS.date }]}>Date</Text>
                <Text style={[styles.headTxt, { width: COLUMN_WIDTHS.ammount }]}>Amount</Text>
            </View>

            <Spacer height={10} />
            <HR height={1} width="94%" center={true} />

            <FlatList
                data={data}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <>
                        <View style={[styles.row, styles.dataRow]}>
                            <View style={{ width: COLUMN_WIDTHS.image }}>
                                <Image source={{ uri: item.image }} style={styles.image} />
                            </View>
                            <Text style={[styles.cellText, { width: COLUMN_WIDTHS.userName }]}>{item.userName}</Text>
                            <Text style={[styles.cellText, { width: COLUMN_WIDTHS.userID }]}>{item.userID}</Text>
                            <Text style={[styles.cellText, { width: COLUMN_WIDTHS.date }]}>{item.date}</Text>
                            <Text style={[styles.cellText, { width: COLUMN_WIDTHS.ammount }]}>{item.ammount}</Text>
                        </View>
                        <Spacer height={10} />
                        <HR height={1} width="94%" center={true} />
                    </>
                )}
                ListFooterComponent={<Spacer height={90} />}
                contentContainerStyle={styles.scrollContent}
            />
        </View>
    );
};


export default TipsTable

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    head: {
        marginHorizontal: moderateScale(15),
        marginTop: verticalScale(10),
    },
    headTxt: {
        fontWeight: '500',
        fontSize: scale(10),
        color: Colors.PLACEHOLDER,
    },
    bodyRow: {
        marginTop: verticalScale(10),
        marginHorizontal: moderateScale(15),
        justifyContent: 'space-between',
    },
    image: {
        height: verticalScale(35),
        width: moderateScale(30),
        borderRadius: scale(6),
    },
    userInfoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    userNameContainer: {
        marginStart: moderateScale(10),
    },
    userName: {
        color: Colors.PLACEHOLDER,
        fontSize: scale(10),
        fontWeight: '600',
    },
    status: {
        color: Colors.PLACEHOLDER,
        fontSize: scale(9),
        fontWeight: '400',
    },
    dataRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: moderateScale(15),
        marginTop: verticalScale(10),
        // Removed justifyContent to avoid spacing misalignment
    },
    cellText: {
        fontSize: scale(9),
        fontWeight: '400',
        color: Colors.PLACEHOLDER,
    },

});
