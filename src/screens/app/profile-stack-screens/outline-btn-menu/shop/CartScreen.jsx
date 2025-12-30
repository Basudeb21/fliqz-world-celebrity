import { StyleSheet, View, FlatList, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors, NavigationStrings } from '../../../../../constants'
import { SafeAreaView } from 'react-native-safe-area-context'
import Fontisto from 'react-native-vector-icons/Fontisto'
import { useNavigation } from '@react-navigation/native'
import { scale, verticalScale } from 'react-native-size-matters'
import { ProductSummary } from '../../../../../components/framework/cart'
import { GradientIconButton } from '../../../../../components/framework/button'
import { CartItem } from '../../../../../components/project-components'
import { BackpressTopBar } from '../../../../../components/framework/navbar'
import { GetAllCartItem } from '../../../../../api/app/cart'
import { useSelector } from 'react-redux'

const CartScreen = () => {
    const navigation = useNavigation()
    const [cartItems, setCartItems] = useState([])
    const [loading, setLoading] = useState(true)
    const token = useSelector(state => state.auth.token)

    useEffect(() => {
        fetchCart()
    }, [])

    const fetchCart = async () => {
        setLoading(true)
        const res = await GetAllCartItem(token)
        if (res?.success) {
            setCartItems(res.data)
        }
        setLoading(false)
    }

    const onPressCheckout = () => {
        navigation.navigate(NavigationStrings.HOME_CART_CHECKOUT_SCREEN)
    }

    return (
        <SafeAreaView style={styles.areaView}>
            <View style={styles.container}>
                <BackpressTopBar title="Cart" />

                <FlatList
                    data={cartItems}
                    keyExtractor={(item) =>
                        item.creator_product_id.toString()
                    }
                    renderItem={({ item }) => <CartItem item={item} />}

                    ListEmptyComponent={
                        <View style={styles.emptyContainer}>
                            <Fontisto
                                name="shopping-bag"
                                size={56}
                                color={Colors.PLACEHOLDER}
                                style={styles.emptyIcon}
                            />
                            <Text style={styles.emptyTitle}>
                                Your cart is empty
                            </Text>
                            <Text style={styles.emptyText}>
                                Looks like you haven’t added anything yet
                            </Text>
                        </View>
                    }

                    ListFooterComponent={
                        cartItems.length > 0 ? (
                            <View style={styles.footerContainer}>
                                <View style={styles.summaryWrapper}>
                                    <ProductSummary items={cartItems} />
                                </View>

                                <View style={styles.checkoutWrapper}>
                                    <GradientIconButton
                                        Icon={Fontisto}
                                        label="Checkout"
                                        iconName="mastercard"
                                        iconSize={14}
                                        width="100%"
                                        fontSize={14}
                                        onPress={onPressCheckout}
                                    />
                                </View>
                            </View>
                        ) : null
                    }

                    contentContainerStyle={{
                        flexGrow: cartItems.length === 0 ? 1 : 0,
                    }}
                />
            </View>
        </SafeAreaView>
    )
}

export default CartScreen

const styles = StyleSheet.create({
    areaView: {
        flex: 1,
        backgroundColor: Colors.THEME,
    },
    container: {
        flex: 1,
        backgroundColor: Colors.WHITE,
    },

    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: scale(40),
    },
    emptyIcon: {
        marginBottom: verticalScale(18),
        opacity: 0.6,
    },
    emptyTitle: {
        fontSize: scale(20),
        fontWeight: '600',
        color: Colors.BLACK,
        marginBottom: verticalScale(6),
    },
    emptyText: {
        fontSize: scale(15),
        color: Colors.PLACEHOLDER,
        textAlign: 'center',
        lineHeight: scale(22),
        opacity: 0.8,
    },

    footerContainer: {
        paddingHorizontal: scale(16),
        paddingTop: verticalScale(20),
        paddingBottom: verticalScale(30),
        backgroundColor: Colors.WHITE,
    },

    summaryWrapper: {
        width: '100%',
    },

    checkoutWrapper: {
        marginTop: verticalScale(15),
    },
})
