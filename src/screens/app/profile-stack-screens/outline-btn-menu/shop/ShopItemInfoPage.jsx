import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    ScrollView,
    FlatList
} from 'react-native';

import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { Colors, NavigationStrings } from '../../../../../constants';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';

import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import { GradientIconButton } from '../../../../../components/framework/button';
import { Spacer } from '../../../../../components/framework/boots';
import { SizeNumberLabel } from '../../../../../components/framework/card';
import {
    AvailableProductGroup,
    ProductScrollingWithIndegator
} from '../../../../../components/framework/scroller';
import { OutlineQuantityInputBox } from '../../../../../components/framework/input';
import { BackpressTopBar } from '../../../../../components/framework/navbar';

const ShopItemInfoPage = ({ route }) => {
    const user = useSelector(state => state.auth.user);
    const { product } = route.params;
    const navigation = useNavigation();

    const imageList = product?.thumbnail_url;
    const sizes = product?.sizes || [];
    const colors = product?.colors || [];

    const isSameID = user.id === product.user_id;

    const onPressUpdateProduct = () => {
        navigation.navigate(
            NavigationStrings.PROFILE_UPDATE_SHOP_ITEM,
            { product }
        );
    };

    return (
        <SafeAreaView style={styles.areaView}>
            <View style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <BackpressTopBar title="Product Details" />

                    <ProductScrollingWithIndegator imageList={imageList} />

                    {/* COLOR SECTION */}
                    <View style={styles.colorSection}>
                        <Text style={styles.sectionTitle}>
                            Available Colors ({colors.length})
                        </Text>

                        <View style={styles.colorRow}>
                            {colors.map((color, index) => (
                                <View key={index} style={styles.colorItem}>
                                    <View
                                        style={[
                                            styles.colorBox,
                                            {
                                                backgroundColor: color.toLowerCase(),
                                            },
                                        ]}
                                    />
                                    <Text style={styles.colorLabel}>
                                        {color}
                                    </Text>
                                </View>
                            ))}
                        </View>
                    </View>

                    <AvailableProductGroup images={imageList} />

                    {/* PRODUCT DETAILS */}
                    <View style={styles.productDetailsContrainer}>
                        <Text style={styles.productName}>
                            {product.name || 'Product'}
                        </Text>

                        <Text style={styles.productDetails}>
                            {product.description || 'No description'}
                        </Text>

                        <View style={styles.quantityRow}>
                            <Text style={styles.price}>
                                ${product.price || '0.00'}
                            </Text>

                            {!isSameID && (
                                <OutlineQuantityInputBox
                                    width="36%"
                                    placeholder="Qty"
                                />
                            )}
                        </View>
                    </View>

                    {/* SIZE SECTION */}
                    <View style={styles.sizeContainer}>
                        <Text style={styles.txt}>Size: UK / India</Text>

                        <FlatList
                            data={sizes}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => (
                                <SizeNumberLabel lebel={item} />
                            )}
                            horizontal
                            ItemSeparatorComponent={<Spacer width={10} />}
                            showsHorizontalScrollIndicator={false}
                        />
                    </View>

                    {/* ACTION BUTTONS */}
                    {!isSameID && (
                        <View style={styles.btnRow}>
                            <GradientIconButton
                                label="Add To Cart"
                                Icon={MaterialIcons}
                                iconName="add-shopping-cart"
                                iconSize={20}
                                width="40%"
                                fontSize={15}
                            />

                            <GradientIconButton
                                label="Buy Now"
                                Icon={Feather}
                                iconName="shopping-bag"
                                iconSize={20}
                                width="40%"
                                fontSize={15}
                            />
                        </View>
                    )}

                    {isSameID && (
                        <View style={styles.btnRowSelf}>
                            <GradientIconButton
                                label="Update"
                                Icon={MaterialCommunityIcons}
                                iconName="update"
                                iconSize={20}
                                width="40%"
                                fontSize={15}
                                onPress={onPressUpdateProduct}
                            />
                        </View>
                    )}

                    <Spacer height={40} />
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

export default ShopItemInfoPage;

const styles = StyleSheet.create({
    areaView: {
        flex: 1,
        backgroundColor: Colors.THEME,
    },
    container: {
        flex: 1,
        backgroundColor: Colors.WHITE,
    },

    /* COLOR */
    colorSection: {
        marginTop: verticalScale(16),
        marginHorizontal: moderateScale(20),
    },
    sectionTitle: {
        fontSize: scale(14),
        fontWeight: '500',
        color: Colors.BLACK,
        marginBottom: verticalScale(10),
    },
    colorRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    colorItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: scale(16),
        marginBottom: verticalScale(10),
    },
    colorBox: {
        width: scale(18),
        height: scale(18),
        borderRadius: scale(5),
        marginRight: scale(6),
        borderWidth: 1,
        borderColor: Colors.PLACEHOLDER,
    },
    colorLabel: {
        fontSize: scale(12),
        color: Colors.FADE_TEXT,
    },

    /* PRODUCT DETAILS */
    productDetailsContrainer: {
        maxWidth: '96%',
        marginHorizontal: '4%',
        marginTop: verticalScale(10),
    },
    productName: {
        fontSize: scale(18),
        fontWeight: '500',
        color: Colors.FADE_TEXT,
    },
    productDetails: {
        fontSize: scale(12),
        color: Colors.SILVER,
        marginTop: verticalScale(4),
    },
    quantityRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: verticalScale(18),
    },
    price: {
        fontSize: scale(26),
        fontWeight: '400',
    },

    sizeContainer: {
        marginTop: verticalScale(20),
        marginStart: moderateScale(20),
    },
    txt: {
        fontWeight: '500',
        marginBottom: verticalScale(8),
    },

    btnRow: {
        marginTop: verticalScale(20),
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    btnRowSelf: {
        marginTop: verticalScale(20),
        marginStart: moderateScale(18),
    },
});
