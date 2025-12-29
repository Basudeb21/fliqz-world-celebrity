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
import API from '../../../../../api/common/API';

const UpdateProductScreen = ({ route }) => {
    const { product } = route.params;
    const token = useSelector(state => state.auth.token);

    const baseURL = API.STORAGE_URL;

    const [name, setName] = useState(product.name);
    const [price, setPrice] = useState(product.price);
    const [quantity, setQuantity] = useState(product.quantity);
    const [type, setType] = useState(product.type);
    const [sizes, setSizes] = useState(Array.isArray(product.sizes) ? product.sizes : []);
    const [colors, setColors] = useState(Array.isArray(product.colors) ? product.colors : []);
    const [description, setDescription] = useState(product.description);

    const formatImage = (img) => {
        if (typeof img === 'string') {
            const uri = img.startsWith('http') ? img : `${baseURL}${img}`;
            return { uri, isRemote: true };
        }

        const finalUri = img.uri || img.url || (img.path ? `file://${img.path}` : '');

        return {
            ...img,
            uri: finalUri,
            isRemote: img.isRemote !== undefined ? img.isRemote : true
        };
    };

    const [images, setImages] = useState(() => {
        let imageArray = [];

        if (product.images) {
            if (Array.isArray(product.images)) {
                imageArray = product.images;
            } else if (typeof product.images === 'object') {
                imageArray = Object.values(product.images);
            }
        } else if (product.thumbnail_url && Array.isArray(product.thumbnail_url)) {
            imageArray = product.thumbnail_url;
        } else if (product.file_url) {
            imageArray = [product.file_url];
        }

        if (!imageArray.length) {
            return [];
        }

        const formatted = imageArray.map(formatImage);
        return formatted;
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
            console.log("📝 UpdateProductApi Response:", res);

            if (res.status) {
                ToastAndroid.show(res.message, ToastAndroid.SHORT);
            } else {
                ToastAndroid.show(res.message || 'Update failed', ToastAndroid.SHORT);
            }
        } catch (err) {
            ToastAndroid.show('Update failed', ToastAndroid.SHORT);
        }
    };

    return (
        <SafeAreaView style={styles.areaView}>
            <BackpressTopBar title={"Update Product"} />
            <View style={styles.container}>
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
                        setImages={(newImages) => {
                            console.log("📸 New images selected:", newImages);
                            setImages(newImages.map(formatImage));
                        }}
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
            </View>
        </SafeAreaView>
    );
};

export default UpdateProductScreen;

const styles = StyleSheet.create({
    areaView: {
        flex: 1,
        backgroundColor: Colors.THEME
    },
    container: {
        backgroundColor: Colors.WHITE,
        flex: 1
    },
    container: {
        backgroundColor: Colors.WHITE,
        flex: 1
    },
    form: {
        marginTop: verticalScale(20),
        paddingHorizontal: moderateScale(20),
    }
});
