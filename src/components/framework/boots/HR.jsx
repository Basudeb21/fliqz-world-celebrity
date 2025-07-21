import { View } from 'react-native'
import React from 'react'
import { Colors } from '../../../constants'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

const HR = ({ height = 2, width = "100%", color, center = false, style }) => {
    return (
        <View style={[style = style, { alignSelf: center ? "center" : "flex-start", height: height, backgroundColor: color || Colors.PLACEHOLDER, width: width }]} />
    )
}

export default HR