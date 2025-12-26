import React, { useRef, useState } from 'react';
import { FlatList, ImageBackground, StyleSheet, View, Dimensions, TouchableOpacity } from 'react-native';
import { scale, verticalScale } from 'react-native-size-matters';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons'
import { Colors, Images } from '../../../constants';
import API from '../../../api/common/API';
import { likePressSound } from '../../../sound/SoundManager';
import { Spacer, ThreeDots } from '../boots';
import { GradientIcon } from '../icon';

const { width } = Dimensions.get('window');

const ProductScrollingWithIndegator = ({ imageList }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const flatListRef = useRef();
    const [isFavorite, setIsFavorite] = useState(false);
    const safeImageList =
        Array.isArray(imageList) && imageList.length > 0
            ? imageList
            : [null];



    const handleScroll = (event) => {
        const slide = Math.round(event.nativeEvent.contentOffset.x / width);
        setActiveIndex(slide);
    };

    const onPressIsFavorite = () => {
        setIsFavorite(!isFavorite)
        likePressSound()
    }
    return (
        <View style={styles.container}>
            <FlatList
                ref={flatListRef}
                data={safeImageList}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
                onScroll={handleScroll}
                scrollEventThrottle={16}
                renderItem={({ item }) => (
                    <View style={styles.imageWrapper}>
                        <ImageBackground source={{ uri: imageList == null ? Images.BANNER_IMG : API.STORAGE_URL + item }} style={styles.image}>
                            <TouchableOpacity style={styles.iconWrapper} onPress={onPressIsFavorite}>
                                <GradientIcon
                                    IconPack={MaterialIcons}
                                    name={isFavorite ? "favorite" : "favorite-border"}
                                    size={24}
                                    colors={[Colors.BUTTON_GRADIENT_ONE, Colors.BUTTON_GRADIENT_TWO]}
                                />
                            </TouchableOpacity>
                        </ImageBackground>
                    </View>
                )}
            />
            <Spacer height={10} />
            <ThreeDots
                active={activeIndex + 1}
                total={safeImageList.length}
            />

        </View>
    )
}

export default ProductScrollingWithIndegator

const styles = StyleSheet.create({
    container: {
        marginTop: verticalScale(20)
    },
    imageWrapper: {
        width: width * 0.9,
        height: verticalScale(350),
        marginHorizontal: width * 0.05,
        borderRadius: scale(18),
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconWrapper: {
        backgroundColor: Colors.WHITE,
        padding: scale(6),
        borderRadius: scale(100),
        position: "absolute",
        top: 20,
        right: 20
    }
})