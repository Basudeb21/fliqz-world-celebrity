import { Image, StyleSheet, View } from 'react-native'
import React from 'react'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

const CommonSuggestionImageGroup = ({ images = [] }) => {
    const overlapOffset = 13;
    return (
        <View style={[styles.imageStack, { width: moderateScale(30) + (images.length - 1) * overlapOffset }]}>
            {images.map((img, index) => (
                <Image
                    key={index}
                    source={{ uri: img }}
                    style={[
                        styles.img,
                        {
                            marginLeft: index === 0 ? 0 : -overlapOffset,
                            zIndex: images.length - index,
                        }
                    ]}
                />
            ))}
        </View>
    )
}

export default CommonSuggestionImageGroup

const styles = StyleSheet.create({
    imageStack: {
        flexDirection: "row",
        alignItems: "center",
    },
    img: {
        height: verticalScale(30),
        width: moderateScale(30),
        borderRadius: scale(100),
        borderWidth: 2,
        borderColor: 'white',
    },
});
