import { StyleSheet, ToastAndroid, View } from 'react-native'
import React, { useState } from 'react'
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { useSelector } from 'react-redux';
import { GradientTextButton } from '../../../../../components/framework/button';
import { BackpressTopBar } from '../../../../../components/framework/navbar';
import { AmmountInput, DateTimeInputBox, OutlineQuantityInputBox, TextAreaBox, TextInputBox } from '../../../../../components/framework/input';
import { UpdateEventApi } from '../../../../../api/app/event-api';
import { SafeAreaView } from 'react-native-safe-area-context';

const UpdateEventScreen = ({ route }) => {
    const { event } = route.params;
    const [title, setTitle] = useState(event.title);
    const [description, setDescription] = useState(event.description);
    const [location, setLocation] = useState(event.location);
    const [ammount, setAmmount] = useState(event.price);
    const [startDate, setStartDate] = useState(event.start_time);
    const [endDate, setEndDate] = useState(event.end_time);
    const [quantity, setQuantity] = useState(event.quantity_total);
    const token = useSelector((state) => state.auth?.token);


    const onPressHandleUpdateEvent = async () => {
        const result = await UpdateEventApi(
            token,
            event.id,
            title,
            description,
            location,
            ammount,
            startDate,
            endDate,
            quantity
        )

        if (result.success == true) {
            ToastAndroid.show(result.message, ToastAndroid.SHORT);
        }
    }



    return (
        <SafeAreaView style={{ flex: 1 }}>
            <BackpressTopBar title={"Update Event"} />
            <View style={styles.form}>
                <TextInputBox placeholder='Title' value={title} setValue={setTitle} />
                <TextAreaBox placeholder='Description' value={description} setValue={setDescription} />
                <TextInputBox placeholder='Location' value={location} setValue={setLocation} />
                <AmmountInput placeholder='Price' value={ammount} setValue={setAmmount} />
                <DateTimeInputBox placeholder='Start time' datetime={startDate} setDatetime={setStartDate} />
                <DateTimeInputBox placeholder='End time' datetime={endDate} setDatetime={setEndDate} />
                <OutlineQuantityInputBox placeholder='Quantity' value={quantity} setValue={setQuantity} />
                <View style={styles.btn}>
                    <GradientTextButton width='90%' label='Update' onPress={onPressHandleUpdateEvent} />
                </View>

            </View>
        </SafeAreaView>
    )
}

export default UpdateEventScreen

const styles = StyleSheet.create({
    form: {
        paddingHorizontal: moderateScale(15),
        marginTop: verticalScale(20),
        gap: verticalScale(10),
        flex: 1
    },
    btn: {
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center",
        marginTop: verticalScale(30),
        position: "absolute",
        width: "100%",
        bottom: verticalScale(20)
    }
})