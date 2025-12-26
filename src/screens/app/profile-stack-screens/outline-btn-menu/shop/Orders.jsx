import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { Colors, Images } from '../../../../../constants'
import { SafeAreaView } from 'react-native-safe-area-context'
import { GradientTextButton, OutLineButton } from '../../../../../components/framework/button'
import { OrderTable, Spacer } from '../../../../../components/framework/boots'
import { TicketTable } from '../../../../../components/framework/tables'
import { BackpressTopBar } from '../../../../../components/framework/navbar'
import { useSelector } from 'react-redux';
import { GetMyOrder, GetMyTicket } from '../../../../../api/app/order'
const Orders = () => {
    const [productButton, setProductButton] = useState(true);
    const [ticketButton, setTicketButton] = useState(false);
    const [orders, setOrders] = useState([]);
    const [tickets, setTickets] = useState([]);
    const token = useSelector(state => state.auth.token);

    const onPressProducts = () => {
        setProductButton(true);
        setTicketButton(false);
    }

    const onPressTickets = () => {
        setProductButton(false);
        setTicketButton(true);
    }

    useEffect(() => {
        const fetchData = async () => {
            if (!token) return;

            const orderRes = await GetMyOrder(token);
            if (orderRes?.data?.data) {
                const formattedOrders = orderRes.data.data.flatMap(order =>
                    order.items.map(item => ({
                        id: item.id,
                        image: item.product?.thumbnail_url
                            || 'https://via.placeholder.com/100',
                        orderType: item.product_name,
                        quantity: item.quantity,
                        orderDate: new Date(order.created_at).toDateString(),
                        orderPrice: `$${item.total}`,
                        status: order.order_status,
                    }))
                );
                setOrders(formattedOrders);
            }

            const ticketRes = await GetMyTicket(token);
            if (ticketRes?.data?.data) {
                const formattedTickets = ticketRes.data.data.map(ticket => ({
                    id: ticket.id,
                    image: ticket.event?.cover_image
                        || 'https://via.placeholder.com/100',
                    ticketType: ticket.event?.title,
                    quantity: ticket.quantity,
                    eventDate: new Date(ticket.event?.start_time).toDateString(),
                    orderPrice: `$${ticket.total_amount}`,
                    status: ticket.payment_status === 'paid'
                        ? 'Purchased'
                        : ticket.payment_status,
                }));

                setTickets(formattedTickets);
            }
        };

        fetchData();
    }, [token]);





    return (
        <SafeAreaView style={styles.container}>
            <BackpressTopBar title={"Orders"} />
            <ScrollView>
                <Text style={styles.headText}>Your active tickets</Text>
                <View style={styles.btnRow}>
                    {productButton ? <GradientTextButton label='Product' width='45%' /> : <OutLineButton label_two={"Product"} width={"45%"} onPress={onPressProducts} />}
                    {ticketButton ? <GradientTextButton label='Tickets' width='45%' /> : <OutLineButton label_two={"Tickets"} width={"45%"} onPress={onPressTickets} />}
                </View>
                <Spacer height={20} />
                {
                    productButton ? <OrderTable data={orders} /> : <TicketTable data={tickets} />

                }
            </ScrollView>

        </SafeAreaView>
    )
}

export default Orders

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.WHITE
    },
    headText: {
        marginStart: moderateScale(40),
        marginTop: verticalScale(10),
        fontSize: scale(20),
        fontWeight: "400"
    },
    btnRow: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: verticalScale(30)
    }
})