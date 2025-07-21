import { ImageBackground, StyleSheet } from 'react-native'
import React from 'react'
import { Colors } from '../../../constants'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'


const PostImage = ({ image, Icon, iconName }) => {
    return (
        <ImageBackground
            source={{ uri: image }}
            style={styles.image}
        >
            <Icon name={iconName} size={20} color={Colors.THEME} style={styles.icon} />
        </ImageBackground>
    )
}

export default PostImage

const styles = StyleSheet.create({
    image: {
        height: verticalScale(140),
        width: moderateScale(105),
        marginTop: verticalScale(10),
        borderRadius: scale(6),
        overflow: "hidden"
    },
    icon: {
        marginStart: moderateScale(10),
        marginTop: verticalScale(6),
    }
})