import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import BackpressTopBar from '../../../components/framework/navbar/BackpressTopBar'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { Colors, Images } from '../../../constants'
import GradientTextButton from '../../../components/framework/button/GradientTextButton'
import OutLineButton from '../../../components/framework/button/OutLineButton'
import OrderTable from '../../../components/framework/boots/OrderTable'
import Spacer from '../../../components/framework/boots/Spacer'
import { SafeAreaView } from 'react-native-safe-area-context'
import TicketTable from '../../../components/framework/tables/TicketTable'

const Orders = () => {
    const [productButton, setProductButton] = useState(true);
    const [ticketButton, setTicketButton] = useState(false);

    const onPressProducts = () => {
        setProductButton(true);
        setTicketButton(false);
    }

    const onPressTickets = () => {
        setProductButton(false);
        setTicketButton(true);
    }



    const productData = [
        { id: 1, image: Images.PRODUCT_ONE, orderType: "Laptop", quantity: "2", orderDate: "May 20\n2025,", orderPrice: "$80.25", status: "Delivered" },
        { id: 2, image: Images.PRODUCT_TWO, orderType: "Shoe", quantity: "1", orderDate: "May 21\n2025,", orderPrice: "$650.00", status: "Shipped" },
        { id: 3, image: Images.PRODUCT_THREE, orderType: "Watch", quantity: "3", orderDate: "May 22\n2025,", orderPrice: "$120.75", status: "Processing" },
        { id: 4, image: Images.PRODUCT_FOUR, orderType: "Mobile", quantity: "2", orderDate: "May 23\n2025,", orderPrice: "$89.99", status: "Cancelled" },
        { id: 5, image: Images.PRODUCT_FIVE, orderType: "Sunglass", quantity: "1", orderDate: "May 24\n2025,", orderPrice: "$199.00", status: "Delivered" },
        { id: 6, image: Images.PRODUCT_ONE, orderType: "Laptop", quantity: "1", orderDate: "May 25\n2025,", orderPrice: "$780.00", status: "Shipped" },
        { id: 7, image: Images.PRODUCT_TWO, orderType: "Shoe", quantity: "2", orderDate: "May 26\n2025,", orderPrice: "$1300.00", status: "Delivered" },
        { id: 8, image: Images.PRODUCT_THREE, orderType: "Watch", quantity: "4", orderDate: "May 27\n2025,", orderPrice: "$240.50", status: "Processing" },
        { id: 9, image: Images.PRODUCT_FOUR, orderType: "Mobile", quantity: "1", orderDate: "May 28\n2025,", orderPrice: "$45.99", status: "Delivered" },
        { id: 10, image: Images.PRODUCT_FIVE, orderType: "Sunglass", quantity: "2", orderDate: "May 29\n2025,", orderPrice: "$390.00", status: "Shipped" }
    ]

    const ticketData = [
        { id: 1, image: Images.TICKET_ONE, ticketType: "Event 1", quantity: "2", eventDate: "May 20\n2025,", orderPrice: "$80.25", status: "Purchased" },
        { id: 2, image: Images.TICKET_TWO, ticketType: "Event 2", quantity: "1", eventDate: "May 21\n2025,", orderPrice: "$650.00", status: "Purchased" },
        { id: 3, image: Images.TICKET_THREE, ticketType: "Event 3", quantity: "3", eventDate: "May 22\n2025,", orderPrice: "$120.75", status: "Purchased" },
        { id: 4, image: Images.TICKET_FOUR, ticketType: "Event 4", quantity: "2", eventDate: "May 23\n2025,", orderPrice: "$89.99", status: "Purchased" },
        { id: 5, image: Images.TICKET_FIVE, ticketType: "Event 5", quantity: "1", eventDate: "May 24\n2025,", orderPrice: "$199.00", status: "Purchased" },
        { id: 6, image: Images.TICKET_ONE, ticketType: "Event 6", quantity: "1", eventDate: "May 25\n2025,", orderPrice: "$780.00", status: "Purchased" },
        { id: 7, image: Images.TICKET_TWO, ticketType: "Event 7", quantity: "2", eventDate: "May 26\n2025,", orderPrice: "$1300.00", status: "Purchased" },
        { id: 8, image: Images.TICKET_THREE, ticketType: "Event 8", quantity: "4", eventDate: "May 27\n2025,", orderPrice: "$240.50", status: "Purchased" },
        { id: 9, image: Images.TICKET_FOUR, ticketType: "Event 9", quantity: "1", eventDate: "May 28\n2025,", orderPrice: "$45.99", status: "Purchased" },
        { id: 10, image: Images.TICKET_FIVE, ticketType: "Event 10", quantity: "2", eventDate: "May 29\n2025,", orderPrice: "$390.00", status: "Purchased" }
    ]


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
                    productButton ? <OrderTable data={productData} /> : <TicketTable data={ticketData} />
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