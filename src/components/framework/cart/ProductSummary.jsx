import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useMemo, useState } from 'react'
import { Colors } from '../../../constants'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { HR, Spacer } from '../boots';

const ProductSummary = ({ items = [] }) => {
    const [hideBill, setHideBill] = useState(true);

    const onPressHideBill = () => {
        setHideBill(!hideBill);
    };

    const summary = useMemo(() => {
        let totalItems = 0;
        let subTotal = 0;

        items.forEach(item => {
            const price = Number(item.product.price);
            const qty = Number(item.quantity);

            totalItems += qty;
            subTotal += price * qty;
        });

        const fees = subTotal > 0 ? 0.25 : 0;
        const discount = 0;
        const total = subTotal + fees - discount;

        return {
            totalItems,
            subTotal,
            fees,
            discount,
            total,
        };
    }, [items]);

    if (!items.length) return null;

    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <Text style={styles.summary}>Payment Summary</Text>
                <TouchableOpacity onPress={onPressHideBill}>
                    <FontAwesome6
                        color={Colors.BLACK}
                        name={hideBill ? "chevron-up" : "chevron-down"}
                        size={18}
                    />
                </TouchableOpacity>
            </View>

            {hideBill && (
                <View>
                    <Spacer height={15} />
                    <HR height='1' color={Colors.PLACEHOLDER} />
                    <Spacer height={15} />

                    <View style={styles.row}>
                        <Text style={styles.dataItem}>
                            Price ({summary.totalItems} item{summary.totalItems > 1 ? 's' : ''})
                        </Text>
                        <Text style={styles.dataAmmount}>
                            ${summary.subTotal.toFixed(2)}
                        </Text>
                    </View>

                    <View style={styles.row}>
                        <Text style={styles.dataItem}>Fees</Text>
                        <Text style={styles.dataAmmount}>
                            ${summary.fees.toFixed(2)}
                        </Text>
                    </View>

                    <View style={styles.row}>
                        <Text style={styles.dataItem}>Discount</Text>
                        <Text style={styles.dataAmmount}>
                            -${summary.discount.toFixed(2)}
                        </Text>
                    </View>

                    <Spacer height={15} />
                    <HR height='1' color={Colors.PLACEHOLDER} />
                    <Spacer height={15} />

                    <View style={styles.row}>
                        <Text style={[styles.dataItem, { color: Colors.BLACK }]}>
                            Total
                        </Text>
                        <Text style={styles.dataAmmount}>
                            ${summary.total.toFixed(2)}
                        </Text>
                    </View>
                </View>
            )}

            {!hideBill && <Spacer height={20} />}
        </View>
    );
};

export default ProductSummary;

const styles = StyleSheet.create({
    container: {
        borderWidth: scale(1),
        padding: scale(15),
        borderRadius: scale(8),
        borderColor: Colors.HR_COLOR
    },
    summary: {
        fontSize: scale(15),
        marginTop: scale(10),
        fontWeight: "500"
    },
    tickitCut: {
        color: Colors.HR_COLOR,
        fontSize: scale(40),
        fontWeight: "100",
        alignSelf: "center"
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: moderateScale(10),
        marginTop: verticalScale(5),
        alignItems: "center"
    },
    dataItem: {
        fontWeight: "500",
        color: Colors.SILVER,
        fontSize: scale(14)
    },
    dataAmmount: {
        fontWeight: "500",
        color: Colors.BLACK,
        fontSize: scale(14)
    },
})