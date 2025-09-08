import { ScrollView, StyleSheet, Text, ToastAndroid, View } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BackpressTopBar } from '../../../../../components/framework/navbar';
import {
    GalleryPickerBox,
    MultiInputBox,
    OutlineQuantityInputBox,
    TextAreaBox,
    TextInputBox
} from '../../../../../components/framework/input';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { Spacer } from '../../../../../components/framework/boots';
import { Colors } from '../../../../../constants';
import { GradientIconButton } from '../../../../../components/framework/button';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { UpdateProductApi } from '../../../../../api/app/shop';
import { useSelector } from 'react-redux';

const UpdateProductScreen = ({ route }) => {
    const { product } = route.params;
    const token = useSelector(state => state.auth.token);

    const baseURL = 'https://your-backend-domain.com'; // <-- Replace with your backend domain

    const [name, setName] = useState(product.name);
    const [price, setPrice] = useState(product.price);
    const [quantity, setQuantity] = useState(product.quantity);
    const [type, setType] = useState(product.type);
    const [sizes, setSizes] = useState(Array.isArray(product.sizes) ? product.sizes : []);
    const [colors, setColors] = useState(Array.isArray(product.colors) ? product.colors : []);
    const [description, setDescription] = useState(product.description);

    const formatImage = (img) => {
        if (typeof img === 'string') {
            // Convert relative URLs to full URLs
            const uri = img.startsWith('http') ? img : `${baseURL}${img}`;
            return { uri, isRemote: true };
        }
        // Already an object (local or remote)
        return {
            ...img,
            uri: img.uri || img.url || (img.path ? `file://${img.path}` : ''),
            isRemote: img.isRemote !== undefined ? img.isRemote : true
        };
    };

    const [images, setImages] = useState(() => {
        if (!product.images) return [];

        let imageArray = [];

        if (Array.isArray(product.images)) {
            imageArray = product.images;
        } else if (typeof product.images === 'object') {
            // Handle object format {0: "url1", 1: "url2"}
            imageArray = Object.values(product.images);
        }

        return imageArray.map(formatImage);
    });

    const onPressUpdateProduct = async () => {
        try {
            const res = await UpdateProductApi(
                token,
                product.slug,
                name,
                description,
                price,
                quantity,
                sizes,
                colors,
                type,
                images
            );
            console.log(res);
            if (res.status) {
                ToastAndroid.show(res.message, ToastAndroid.SHORT);
            } else {
                ToastAndroid.show(res.message || 'Update failed', ToastAndroid.SHORT);
            }
        } catch (err) {
            console.log('Update Error:', err);
            ToastAndroid.show('Update failed', ToastAndroid.SHORT);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <BackpressTopBar title={"Update Product"} />
            <ScrollView style={styles.form}>
                <TextInputBox
                    placeholder='Product Name'
                    value={name}
                    setValue={setName}
                />
                <Spacer height={scale(10)} />
                <TextInputBox
                    placeholder='Price'
                    value={price}
                    setValue={setPrice}
                />
                <Spacer height={scale(10)} />
                <OutlineQuantityInputBox
                    placeholder='Quantity'
                    value={quantity}
                    setValue={setQuantity}
                />
                <Spacer height={scale(10)} />
                <TextInputBox
                    placeholder='Type'
                    value={type}
                    setValue={setType}
                />
                <Spacer height={scale(10)} />
                <MultiInputBox
                    placeholder='Sizes'
                    items={sizes}
                    setItems={setSizes}
                />
                <Spacer height={scale(10)} />
                <MultiInputBox
                    placeholder='Colors'
                    items={colors}
                    setItems={setColors}
                />
                <Spacer height={scale(10)} />
                <GalleryPickerBox
                    images={images}
                    setImages={setImages}
                />
                <Spacer height={scale(10)} />
                <TextAreaBox
                    height={120}
                    placeholder='Description'
                    value={description}
                    setValue={setDescription}
                />
                <Spacer height={scale(10)} />
                <GradientIconButton
                    label='Update'
                    Icon={MaterialCommunityIcons}
                    iconName={"update"}
                    iconSize={20}
                    width='100%'
                    fontSize={15}
                    onPress={onPressUpdateProduct}
                />
                <Spacer height={scale(10)} />
            </ScrollView>
        </SafeAreaView>
    );
};

export default UpdateProductScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.WHITE,
        flex: 1
    },
    form: {
        marginTop: verticalScale(20),
        paddingHorizontal: moderateScale(20),
    }
});
