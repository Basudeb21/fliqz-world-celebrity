import React, { useState } from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    ScrollView,
} from 'react-native'
import { Colors } from '../../../constants'
import { scale, verticalScale } from 'react-native-size-matters'
import Ionicons from 'react-native-vector-icons/Ionicons'
import ImagePicker from 'react-native-image-crop-picker'

const GalleryPickerBox = ({ images = [], setImages, placeholder = 'Select photos' }) => {
    const [isFocused, setIsFocused] = useState(false)

    const pickImages = async () => {
        try {
            const results = await ImagePicker.openPicker({
                multiple: true,
                mediaType: 'photo',
            })

            const formatted = results.map(item => ({
                uri: item.path,
                type: item.mime,
                name: item.filename || `image_${Date.now()}.jpg`,
                isRemote: false // Mark as local image
            }))

            // Merge old + new
            setImages(prev => [...prev, ...formatted])
        } catch (error) {
            console.log('Gallery Picker Error:', error)
        }
    }

    const removeImage = (index) => {
        const updatedImages = images.filter((_, i) => i !== index)
        setImages(updatedImages)
    }

    // Get valid image URI for display - more robust version
    const getImageUri = (img) => {
        if (!img) return '';

        console.log("Processing image:", img);

        // Handle string URLs
        if (typeof img === 'string') {
            return img.startsWith('http') ? img : `https://${img}`;
        }

        // Handle object with uri property
        if (img.uri) {
            return img.uri;
        }

        // Handle object with url property
        if (img.url) {
            return img.url;
        }

        // Handle object with path property (from image picker)
        if (img.path) {
            return img.path;
        }

        return '';
    }

    // Check if image is valid for display
    const isValidImage = (img) => {
        const uri = getImageUri(img);
        return uri && (uri.startsWith('http') || uri.startsWith('file'));
    }

    return (
        <View>
            <TouchableOpacity
                style={[styles.txtInputBox, isFocused ? styles.active : styles.deactive]}
                onPress={() => {
                    setIsFocused(true)
                    pickImages()
                }}
                activeOpacity={0.8}
            >
                <View style={styles.inputRow}>
                    <Text
                        style={[
                            styles.inputText,
                            { color: images.length ? Colors.BLACK : Colors.PLACEHOLDER },
                        ]}
                    >
                        {images.length ? `${images.length} image(s) selected` : placeholder}
                    </Text>
                    <Ionicons
                        name="image-outline"
                        size={18}
                        color={isFocused ? Colors.THEME : Colors.PLACEHOLDER}
                    />
                </View>
            </TouchableOpacity>

            {images.length > 0 && (
                <ScrollView
                    horizontal
                    style={styles.previewContainer}
                    showsHorizontalScrollIndicator={false}
                >
                    {images.map((img, idx) => {
                        const uri = getImageUri(img);

                        if (!isValidImage(img)) {
                            console.log("Invalid image skipped:", img);
                            return null;
                        }

                        return (
                            <View key={`${idx}-${uri}`} style={styles.imageWrapper}>
                                <Image
                                    source={{ uri }}
                                    style={styles.previewImage}
                                    onError={(e) => {
                                        console.log('Image load error:', e.nativeEvent.error);
                                        console.log('Failed URI:', uri);
                                    }}
                                    resizeMode="cover"
                                />
                                <TouchableOpacity
                                    style={styles.closeIcon}
                                    onPress={() => removeImage(idx)}
                                >
                                    <Ionicons
                                        name="close-circle"
                                        size={18}
                                        color={Colors.ERROR_RED || 'red'}
                                    />
                                </TouchableOpacity>
                            </View>
                        )
                    })}
                </ScrollView>
            )}
        </View>
    )
}
export default GalleryPickerBox

const styles = StyleSheet.create({
    txtInputBox: {
        borderWidth: scale(1),
        borderRadius: scale(5),
        padding: scale(10),
    },
    active: {
        borderColor: Colors.THEME,
    },
    deactive: {
        borderColor: Colors.INPUTBOX_DEACTIVE_BORDER_COLOR,
    },
    inputRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    inputText: {
        fontSize: scale(13),
    },
    previewContainer: {
        marginTop: verticalScale(10),
        flexDirection: 'row',
        paddingBottom: verticalScale(10),
        paddingTop: verticalScale(6),
        minHeight: scale(70),
    },
    imageWrapper: {
        position: 'relative',
        marginRight: scale(10),
        paddingTop: verticalScale(6),
    },
    previewImage: {
        width: scale(60),
        height: scale(60),
        borderRadius: scale(5),
    },
    closeIcon: {
        position: 'absolute',
        top: -6,
        right: -6,
        backgroundColor: Colors.WHITE,
        borderRadius: scale(10),
        zIndex: 1,
    },
})
