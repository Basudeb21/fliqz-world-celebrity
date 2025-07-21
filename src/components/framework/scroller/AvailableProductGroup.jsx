import { FlatList, Image, StyleSheet } from 'react-native'
import React from 'react'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import Spacer from '../boots/Spacer'

const AvailableProductGroup = ({ images = [] }) => {
    return (
        <FlatList
            data={images}
            keyExtractor={(item, index) => index.toString()}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
                <Image source={{ uri: item }} style={styles.img} />

            )}
            horizontal
            ItemSeparatorComponent={<Spacer width={15} />}
            contentContainerStyle={styles.imgContainer}
        />

    )
}

export default AvailableProductGroup

const styles = StyleSheet.create({
    imgContainer: {
        marginStart: moderateScale(25),
        marginTop: verticalScale(25),
        paddingEnd: moderateScale(50)
    },
    img: {
        width: moderateScale(70),
        height: verticalScale(95),
        borderRadius: scale(10)
    },

})