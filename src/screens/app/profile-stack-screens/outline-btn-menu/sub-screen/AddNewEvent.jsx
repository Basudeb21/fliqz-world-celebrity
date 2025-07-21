import { KeyboardAvoidingView, ScrollView, StyleSheet, Text, ToastAndroid, View } from 'react-native'
import React, { useState } from 'react'
import BackpressTopBar from '../../../../../components/framework/navbar/BackpressTopBar'
import TextInputBox from '../../../../../components/framework/input/TextInputBox'
import { moderateScale, verticalScale } from 'react-native-size-matters'
import Spacer from '../../../../../components/framework/boots/Spacer'
import TextAreaBox from '../../../../../components/framework/input/TextAreaBox'
import GradientTextButton from '../../../../../components/framework/button/GradientTextButton'
import AddEventApi from '../../../../../api/app/event-api/AddEventApi'
import { useSelector } from 'react-redux'
import DateTimeInputBox from '../../../../../components/framework/input/DateTimeInputBox'

const AddNewEvent = () => {
    const token = useSelector((state) => state.auth.token);
    const [eventName, setEventName] = useState("");
    const [eventDescription, setEventDescription] = useState("");
    const [eventLocation, setEventLocation] = useState("");
    const [eventPrice, setEventPrice] = useState("");
    const [eventStartTime, setEventStartTime] = useState(null);
    const [eventEndTime, setEventEndTime] = useState(null);
    const [eventQuantity, setEventQuantity] = useState("");
    const [focusedInput, setFocusedInput] = useState(null);


    const handleOnPressAddEvent = async () => {
        const respone = await AddEventApi(token, eventName, eventDescription, eventLocation, Number(eventPrice), eventStartTime.toString(), eventEndTime.toString(), eventQuantity);

        console.log(respone);
        if (respone.success == true) {
            ToastAndroid.show(respone.message, ToastAndroid.SHORT);
            setEventName(""),
                setEventDescription(""),
                setEventLocation(""),
                setEventPrice(""),
                setEventStartTime(null),
                setEventEndTime(null),
                setEventQuantity("")

        }
        else {
            ToastAndroid.show(respone.message, ToastAndroid.SHORT);
        }

    }

    return (
        <View>
            <BackpressTopBar title={"Add New Event"} />
            <View style={styles.form}>
                <KeyboardAvoidingView >
                    <ScrollView>
                        <TextInputBox placeholder='Event name' value={eventName} setValue={setEventName} />
                        <Spacer height={10} />
                        <TextAreaBox placeholder='Description' height={60} value={eventDescription} setValue={setEventDescription} />
                        <Spacer height={10} />
                        <TextInputBox placeholder='Location' value={eventLocation} setValue={setEventLocation} />
                        <Spacer height={10} />
                        <TextInputBox placeholder='Price' value={eventPrice} setValue={setEventPrice} />
                        <Spacer height={10} />
                        <DateTimeInputBox
                            placeholder='Start Time'
                            datetime={eventStartTime}
                            setDatetime={setEventStartTime}
                            focusedInput={focusedInput}
                            setFocusedInput={setFocusedInput}
                            inputKey="startTime"
                        />
                        <Spacer height={10} />

                        <DateTimeInputBox
                            placeholder='End Time'
                            datetime={eventEndTime}
                            setDatetime={setEventEndTime}
                            focusedInput={focusedInput}
                            setFocusedInput={setFocusedInput}
                            inputKey="endTime"
                        />
                        <Spacer height={10} />
                        <TextInputBox placeholder='Quantity Total' value={eventQuantity} setValue={setEventQuantity} />
                        <Spacer height={40} />
                        <GradientTextButton label='Create Event' onPress={handleOnPressAddEvent} />
                    </ScrollView>
                </KeyboardAvoidingView>
            </View>

        </View>
    )
}

export default AddNewEvent

const styles = StyleSheet.create({
    form: {
        marginTop: verticalScale(20),
        paddingHorizontal: moderateScale(10),
    }
})