import {
    KeyboardAvoidingView,
    ScrollView,
    StyleSheet,
    ToastAndroid,
    View,
} from 'react-native';
import React, { useState } from 'react';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { useSelector } from 'react-redux';
import { Colors } from '../../../../../constants';
import { GradientTextButton } from '../../../../../components/framework/button';
import { AddNewAuctionApi } from '../../../../../api/app/auction';
import { BackpressTopBar } from '../../../../../components/framework/navbar';
import { DateInputBox, GalleryPickerBox, OutlineQuantityInputBox, TextAreaBox, TextInputBox } from '../../../../../components/framework/input';
import { SafeAreaView } from 'react-native-safe-area-context';

const AddNewAuction = () => {
    const [images, setImages] = useState([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [quantity, setQuantity] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [focusedInput, setFocusedInput] = useState(null);
    const token = useSelector(state => state.auth.token);
    const onPressAddNewAuction = async () => {
        try {

            const response = await AddNewAuctionApi({
                token,
                name,
                description,
                min_budget: quantity,
                start_date: startDate.toString(),
                end_date: endDate.toString(),
                images,
            });

            if (response.success == true) {
                ToastAndroid.show(response.message, ToastAndroid.SHORT);
                setName("");
                setDescription("");
                setQuantity("");
                setStartDate(null);
                setEndDate(null);
                setImages([]);
            }
            else {
                ToastAndroid.show(response.message, ToastAndroid.SHORT);
            }
        } catch (error) {
            console.log(error);

        }
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.WHITE }}>
            <BackpressTopBar title={'Add new auction'} />
            <KeyboardAvoidingView
                style={{ flex: 1 }}
            >
                <ScrollView contentContainerStyle={styles.form}>
                    <TextInputBox placeholder='Name' value={name} setValue={setName} />
                    <TextAreaBox placeholder='Description' height={90} value={description} setValue={setDescription} />
                    <OutlineQuantityInputBox placeholder='Min Budget' value={quantity} setValue={setQuantity} />
                    <DateInputBox
                        placeholder='Start Date'
                        date={startDate}
                        setDate={setStartDate}
                        focusedInput={focusedInput}
                        setFocusedInput={setFocusedInput}
                        inputKey='startDate'
                    />
                    <DateInputBox
                        placeholder='End Date'
                        date={endDate}
                        setDate={setEndDate}
                        focusedInput={focusedInput}
                        setFocusedInput={setFocusedInput}
                        inputKey='endDate'
                    />
                    <GalleryPickerBox images={images} setImages={setImages} />
                    <View style={{ height: 100 }} />
                </ScrollView>

                <View style={styles.btn}>
                    <GradientTextButton label='Save' onPress={onPressAddNewAuction} />
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default AddNewAuction;

const styles = StyleSheet.create({
    areaView: {
        flex: 1,
        backgroundColor: Colors.THEME
    },
    container: {
        backgroundColor: Colors.WHITE,
        flex: 1
    },
    form: {
        paddingHorizontal: moderateScale(20),
        paddingTop: verticalScale(20),
        gap: verticalScale(15),
        paddingBottom: verticalScale(120),
    },
    btn: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
    },
});
