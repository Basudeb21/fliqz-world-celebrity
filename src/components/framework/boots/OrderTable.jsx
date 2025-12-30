import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { Colors, Images, NavigationStrings } from '../../../constants';
import HR from './HR';
import Spacer from './Spacer';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import API from '../../../api/common/API';

const COLUMN_WIDTHS = {
    product: moderateScale(90),
    quantity: moderateScale(50),
    date: moderateScale(45),
    price: moderateScale(45),
    status: moderateScale(70),
    actions: moderateScale(30),
};

const OrderTable = ({ data }) => {
    const navigation = useNavigation();

    const onPressViewOrderDetails = (item) => {
        navigation.navigate(NavigationStrings.VIEW_ORDER, { order: item });
    };

    // ✅ Helper function to get image URI
    const getImageUri = (imageData) => {
        if (!imageData) return Images.BANNER_IMG;

        // If it's already a full URL
        if (typeof imageData === 'string' && imageData.startsWith('http')) {
            return imageData;
        }

        // If it's a path
        if (typeof imageData === 'string') {
            return `${API.STORAGE_URL}${imageData}`;
        }

        // If it's an array, get first item
        if (Array.isArray(imageData) && imageData.length > 0) {
            const firstImage = imageData[0];
            if (firstImage.startsWith('http')) {
                return firstImage;
            }
            return `${API.STORAGE_URL}${firstImage}`;
        }

        return Images.BANNER_IMG;
    };

    return (
        <View style={{ flex: 1 }}>
            <View style={[styles.row, styles.head]}>
                <Text style={[styles.headTxt, { width: COLUMN_WIDTHS.product }]}>
                    Products
                </Text>
                <Text style={[styles.headTxt, { width: COLUMN_WIDTHS.quantity }]}>
                    Quantity
                </Text>
                <Text style={[styles.headTxt, { width: COLUMN_WIDTHS.date }]}>
                    Date
                </Text>
                <Text style={[styles.headTxt, { width: COLUMN_WIDTHS.price }]}>
                    Price
                </Text>
                <Text style={[styles.headTxt, { width: COLUMN_WIDTHS.status }]}>
                    Status
                </Text>
                <Text style={[styles.headTxt, { width: COLUMN_WIDTHS.actions }]}>
                    {' '}
                </Text>
            </View>

            <Spacer height={10} />
            <HR height={1} width="94%" center={true} />

            <FlatList
                data={data}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => {
                    const imageUri = getImageUri(item.image);

                    return (
                        <>
                            <View style={[styles.row, styles.bodyRow]}>
                                <View
                                    style={[
                                        styles.userInfoContainer,
                                        { width: COLUMN_WIDTHS.product },
                                    ]}
                                >
                                    <Image
                                        source={
                                            typeof imageUri === 'string'
                                                ? { uri: imageUri }
                                                : imageUri
                                        }
                                        style={styles.image}
                                        defaultSource={Images.BANNER_IMG}
                                        onError={(e) => {
                                            console.log('Image error:', item.orderType);
                                        }}
                                    />
                                    <View style={styles.userNameContainer}>
                                        <Text style={styles.userName} numberOfLines={2}>
                                            {item.orderType}
                                        </Text>
                                    </View>
                                </View>

                                <Text
                                    style={[
                                        styles.status,
                                        { width: COLUMN_WIDTHS.quantity },
                                    ]}
                                >
                                    {item.quantity}
                                </Text>
                                <Text
                                    style={[styles.status, { width: COLUMN_WIDTHS.date }]}
                                >
                                    {item.orderDate}
                                </Text>
                                <Text
                                    style={[styles.status, { width: COLUMN_WIDTHS.price }]}
                                >
                                    {item.orderPrice}
                                </Text>
                                <Text
                                    style={[styles.status, { width: COLUMN_WIDTHS.status }]}
                                >
                                    {item.status}
                                </Text>

                                <TouchableOpacity
                                    style={{ width: COLUMN_WIDTHS.actions }}
                                    onPress={() => onPressViewOrderDetails(item)}
                                >
                                    <FontAwesome
                                        name="eye"
                                        size={16}
                                        color={Colors.THEME}
                                    />
                                </TouchableOpacity>
                            </View>

                            <Spacer height={10} />
                            <HR height={1} width="94%" center={true} />
                        </>
                    );
                }}
                ListFooterComponent={<Spacer height={10} />}
                contentContainerStyle={styles.scrollContent}
            />
        </View>
    );
};

export default OrderTable;

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
        backgroundColor: '#f0f0f0',
    },
    userInfoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    userNameContainer: {
        marginStart: moderateScale(10),
        flex: 1,
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
});