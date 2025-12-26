import { Image, StyleSheet, View } from 'react-native'
import React from 'react'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

const CommonSuggestionImageGroup = ({ images = [] }) => {
    const overlapOffset = 13;
    const validImages = images.filter(img => img);
    return (
        <View style={[styles.imageStack, { width: moderateScale(30) + (validImages.length - 1) * overlapOffset }]}>
            {validImages.map((user, index) => (
                <Image
                    key={user.id || index}
                    source={{ uri: user.avatar }}
                    style={[
                        styles.img,
                        {
                            marginLeft: index === 0 ? 0 : -overlapOffset,
                            zIndex: validImages.length - index,
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
        height: verticalScale(25),
        width: moderateScale(30),
        borderRadius: scale(100),
        borderWidth: 2,
        borderColor: 'white',
    },
});
