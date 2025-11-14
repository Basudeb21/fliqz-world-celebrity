import React from 'react';
import { StyleSheet, View, Text, ScrollView, FlatList } from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { Colors, NavigationStrings } from '../../../../../constants';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/dist/Feather'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { GradientIconButton } from '../../../../../components/framework/button';
import { Spacer } from '../../../../../components/framework/boots';
import { SizeNumberLabel } from '../../../../../components/framework/card';
import { AvailableProductGroup, ProductScrollingWithIndegator } from '../../../../../components/framework/scroller';
import { OutlineQuantityInputBox } from '../../../../../components/framework/input';
import { BackpressTopBar } from '../../../../../components/framework/navbar';
import { useNavigation } from '@react-navigation/native';

const ShopItemInfoPage = ({ route }) => {
    const user = useSelector(state => state.auth.user);
    const { product } = route.params;
    const imageList = product.thumbnail_url;
    const sizes = product.sizes;
    const navigation = useNavigation();

    const isSameID = user.id == product.user_id;

    const onPressUpdateProduct = () => {
        navigation.navigate(NavigationStrings.PROFILE_UPDATE_SHOP_ITEM, { product });
    }


    return (
        <SafeAreaView>
            <ScrollView style={styles.container}>
                <BackpressTopBar title={"Product Details"} />
                <ProductScrollingWithIndegator imageList={imageList} />
                <View style={styles.dataRow}>
                    <Text style={styles.information}>Color: <Text style={styles.data}>Black</Text></Text>
                    <Text style={styles.information}>Available Color: <Text style={styles.data}>{product.colors.length}</Text></Text>
                </View>
                <AvailableProductGroup images={imageList} />

                <View style={styles.productDetailsContrainer}>
                    <Text style={styles.productName}>{product.name || "Product"}</Text>
                    <Text style={styles.productDetails}>{product.description || "Null"}</Text>
                    <View style={styles.quantityRow}>
                        <Text style={styles.price}>${product.price || "0.00"}</Text>
                        {
                            !isSameID &&
                            <OutlineQuantityInputBox width={"36%"} placeholder='Qty' />
                        }
                    </View>
                </View>
                <View style={styles.sizeContainer}>
                    <Text style={styles.txt}>Size: UK/India</Text>
                    <FlatList
                        data={sizes}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <SizeNumberLabel lebel={item} />
                        )}
                        horizontal
                        ItemSeparatorComponent={<Spacer width={10} />}
                    />

                </View>
                {
                    !isSameID &&
                    <View style={styles.btnRow}>
                        <GradientIconButton
                            label='Add To Cart'
                            Icon={MaterialIcons}
                            iconName={"add-shopping-cart"}
                            iconSize={20}
                            width='40%'
                            fontSize={15}
                        />
                        <GradientIconButton
                            label='Buy Now'
                            Icon={Feather}
                            iconName={"shopping-bag"}
                            iconSize={20}
                            width='40%'
                            fontSize={15}
                        />
                    </View>
                }
                {
                    isSameID &&
                    <View style={styles.btnRowSelf}>
                        <GradientIconButton
                            label='Update'
                            Icon={MaterialCommunityIcons}
                            iconName={"update"}
                            iconSize={20}
                            width='40%'
                            fontSize={15}
                            onPress={onPressUpdateProduct}
                        />

                    </View>
                }
                <Spacer height={40} />
            </ScrollView>
        </SafeAreaView>
    );
};

export default ShopItemInfoPage;

const styles = StyleSheet.create({
    container: {
    },
    dataRow: {
        flexDirection: "row",
        marginHorizontal: moderateScale(30),
        justifyContent: "space-between",
        marginTop: verticalScale(15)
    },
    information: {

    },
    data: {
        fontWeight: "500"
    },
    btnRow: {
        marginTop: verticalScale(20),
        flexDirection: "row",
        justifyContent: "space-evenly"
    },
    btnRowSelf: {
        marginTop: verticalScale(20),
        marginStart: moderateScale(18)
    },
    productDetailsContrainer: {
        maxWidth: "96%",
        marginHorizontal: "4%",
        marginTop: verticalScale(10),
    },
    productName: {
        fontSize: scale(18),
        fontWeight: "500",
        color: Colors.FADE_TEXT
    },
    productDetails: {
        fontSize: scale(12),
        fontWeight: "400",
        color: Colors.SILVER
    },
    quantityRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: verticalScale(18)
    },
    price: {
        fontSize: scale(26),
        fontWeight: "400"
    },
    sizeContainer: {
        marginTop: verticalScale(20),
        marginStart: moderateScale(20),
    },
    txt: {
        fontWeight: "500"
    }


});
