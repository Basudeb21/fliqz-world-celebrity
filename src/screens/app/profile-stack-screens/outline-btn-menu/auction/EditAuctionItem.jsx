import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    ToastAndroid,
    View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { moderateScale, verticalScale } from 'react-native-size-matters';

import { Colors } from '../../../../../constants';
import { useSelector } from 'react-redux';
import API from '../../../../../api/common/API';
import { GradientTextButton } from '../../../../../components/framework/button';
import { BackpressTopBar } from '../../../../../components/framework/navbar';
import { AmmountInput, DateInputBox, GalleryPickerBox, TextAreaBox, TextInputBox } from '../../../../../components/framework/input';
import { GetAuctionItemApi, UpdateAuctionItemApi } from '../../../../../api/app/auction';
import { Loader } from '../../../../../components/framework/boots';
import { SafeAreaView } from 'react-native-safe-area-context';

const EditAuctionItem = ({ route }) => {
    const { slug } = route.params;
    const token = useSelector(state => state.auth.token);

    const [images, setImages] = useState([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [quantity, setQuantity] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [focusedInput, setFocusedInput] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAuctionDetails = async () => {
            const res = await GetAuctionItemApi({ token, slug });

            if (res.success) {
                const data = res.data;
                setName(data.name);
                setDescription(data.description);
                setQuantity(data.min_budget.toString());
                setStartDate(new Date(data.start_date));
                setEndDate(new Date(data.end_date));
                setImages(
                    data.images.map(path => ({
                        uri: `${API.STORAGE_URL}${path}`,
                        name: path.split('/').pop(),
                        type: 'image/jpeg',
                    }))
                );
            } else {
                ToastAndroid.show(res.message, ToastAndroid.SHORT);
            }
            setLoading(false);
        };

        fetchAuctionDetails();
    }, [slug]);

    const onPressUpdateAuction = async () => {
        try {
            const response = await UpdateAuctionItemApi({
                token,
                slug: route.params.slug,
                name: name,
                description: description,
                min_budget: quantity,
                start_date: startDate,
                end_date: endDate,
                images: images,
            });

            console.log("RRR -> ", response);

            if (response?.success == true) {
                ToastAndroid.show(response.message, ToastAndroid.SHORT);
            } else {
                ToastAndroid.show("Update Successfully.", ToastAndroid.SHORT);
            }
        } catch (err) {
            console.log(err);
        }
    };


    if (loading) {
        return (
            <View style={styles.loaderContainer}>
                <Loader />
            </View>
        );
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.WHITE }}>
            <BackpressTopBar title={'Edit auction'} />
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            >
                <ScrollView contentContainerStyle={styles.form}>
                    <TextInputBox placeholder="Name" value={name} setValue={setName} />
                    <TextAreaBox
                        placeholder="Description"
                        height={90}
                        value={description}
                        setValue={setDescription}
                    />
                    <AmmountInput
                        placeholder="Min Budget"
                        value={quantity}
                        setValue={setQuantity}
                    />
                    <DateInputBox
                        placeholder="Start Date"
                        date={startDate}
                        setDate={setStartDate}
                        focusedInput={focusedInput}
                        setFocusedInput={setFocusedInput}
                        inputKey="startDate"
                    />
                    <DateInputBox
                        placeholder="End Date"
                        date={endDate}
                        setDate={setEndDate}
                        focusedInput={focusedInput}
                        setFocusedInput={setFocusedInput}
                        inputKey="endDate"
                    />
                    <GalleryPickerBox images={images} setImages={setImages} />
                    <View style={{ height: 100 }} />
                </ScrollView>

                <View style={styles.btn}>
                    <GradientTextButton label="Update" onPress={onPressUpdateAuction} />
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default EditAuctionItem;

const styles = StyleSheet.create({
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
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.WHITE,
    },
});
