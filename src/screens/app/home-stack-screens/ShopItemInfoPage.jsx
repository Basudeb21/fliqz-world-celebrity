import React from 'react';
import { StyleSheet, View, Text, ScrollView, FlatList } from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { Colors, Images } from '../../../constants';
import ProductScrollingWithIndegator from '../../../components/framework/scroller/ProductScrollingWithIndegator';
import AvailableProductGroup from '../../../components/framework/scroller/AvailableProductGroup';
import GradientIconButton from '../../../components/framework/button/GradientIconButton';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons'
import Feather from 'react-native-vector-icons/dist/Feather'
import OutlineQuantityInputBox from '../../../components/framework/input/OutlineQuantityInputBox';
import Spacer from '../../../components/framework/boots/Spacer';
import SizeNumberLabel from '../../../components/framework/card/SizeNumberLabel';
import { SafeAreaView } from 'react-native-safe-area-context';


const ShopItemInfoPage = () => {
    const imageList = [
        Images.PRODUCT_ONE,
        Images.PRODUCT_TWO,
        Images.PRODUCT_THREE,
        Images.PRODUCT_FOUR,
        Images.PRODUCT_FIVE,
    ];

    const sizes = [
        6, 7, 8, 9, 10
    ]



    return (
        <SafeAreaView>
            <ScrollView style={styles.container}>
                <ProductScrollingWithIndegator imageList={imageList} />
                <View style={styles.dataRow}>
                    <Text style={styles.information}>Color: <Text style={styles.data}>Black</Text></Text>
                    <Text style={styles.information}>Available Color: <Text style={styles.data}>4</Text></Text>
                </View>
                <AvailableProductGroup images={imageList} />

                <View style={styles.productDetailsContrainer}>
                    <Text style={styles.productName}>Product</Text>
                    <Text style={styles.productDetails}>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quo, quos.</Text>
                    <View style={styles.quantityRow}>
                        <Text style={styles.price}>$80</Text>
                        <OutlineQuantityInputBox width={"36%"} />
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
