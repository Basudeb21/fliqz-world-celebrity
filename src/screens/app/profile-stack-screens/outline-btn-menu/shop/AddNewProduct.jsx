import {
    StyleSheet,
    View,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    ToastAndroid
} from 'react-native';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { Colors } from '../../../../../constants';
import { GradientTextButton } from '../../../../../components/framework/button';
import { BackpressTopBar } from '../../../../../components/framework/navbar';
import { AmmountInput, GalleryPickerBox, MultiInputBox, OutlineQuantityInputBox, TextAreaBox, TextInputBox } from '../../../../../components/framework/input';
import { AddNewProductApi } from '../../../../../api/app/shop';

const AddNewProduct = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [type, setType] = useState('');
    const [images, setImages] = useState([]);
    const [sizes, setSizes] = useState([]);
    const [colors, setColors] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const token = useSelector((state) => state.auth.token);

    const handleAddProduct = async () => {
        if (!token) {
            ToastAndroid.show('Token not found', ToastAndroid.SHORT);
            return;
        }

        setIsSubmitting(true);
        const result = await AddNewProductApi(
            token,
            name,
            description,
            price,
            quantity,
            sizes,
            colors,
            type,
            images
        );
        setIsSubmitting(false);

        if (result?.status) {
            setName("");
            setDescription("");
            setPrice("");
            setQuantity("");
            setSizes([]);
            setColors([]);
            setType("");
            setImages([])
            ToastAndroid.show(result.message, ToastAndroid.LONG);
        } else {
            ToastAndroid.show('Failed to add product', ToastAndroid.SHORT);
        }
    };

    return (
        <SafeAreaView style={styles.areaView}>
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            >
                <BackpressTopBar title={'Add new product'} />
                <ScrollView
                    contentContainerStyle={styles.form}
                    keyboardShouldPersistTaps="handled"
                >
                    <TextInputBox
                        placeholder="Name"
                        value={name}
                        setValue={setName}
                    />

                    <TextAreaBox
                        height={70}
                        placeholder="Description"
                        value={description}
                        setValue={setDescription}
                    />

                    <AmmountInput
                        placeholder="Price"
                        value={price}
                        setValue={setPrice}
                    />
                    <OutlineQuantityInputBox
                        placeholder="Quantity"
                        value={quantity}
                        setValue={setQuantity}
                    />
                    <TextInputBox
                        placeholder="Product type"
                        value={type}
                        setValue={setType}
                    />
                    <GalleryPickerBox
                        placeholder="Images"
                        images={images}
                        setImages={setImages}
                    />
                    <MultiInputBox
                        placeholder="Enter sizes"
                        items={sizes}
                        setItems={setSizes}
                    />
                    <MultiInputBox
                        placeholder="Enter Colors"
                        items={colors}
                        setItems={setColors}
                    />

                    <View style={styles.btn}>
                        <GradientTextButton
                            label={isSubmitting ? 'Adding...' : 'Add Product'}
                            onPress={handleAddProduct}
                            disabled={isSubmitting}
                        />
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default AddNewProduct;

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
        marginTop: verticalScale(10),
        paddingHorizontal: moderateScale(20),
        paddingBottom: verticalScale(10),
        gap: verticalScale(10),
    },
    btn: {
        marginTop: verticalScale(20),
        marginBottom: verticalScale(40),
    },
});
