import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import HR from '../boots/HR'
import CommonSuggestionImageGroup from '../iamge/CommonSuggestionImageGroup'
import Spacer from '../boots/Spacer'
import { Colors } from '../../../constants'

const ListCardItem = ({ type, ammount, imgs, onPress }) => {
    return (
        <TouchableOpacity style={styles.wrapper} onPress={onPress}>
            <View style={styles.row}>
                <View style={styles.textContainer}>
                    <Text style={styles.type}>{type}</Text>
                    <Text style={styles.ammount}>{ammount}</Text>
                </View>
                <CommonSuggestionImageGroup images={imgs} />
            </View>
            <Spacer height={10} />
            <HR height={1} width='90%' center={true} />
        </TouchableOpacity>
    )
}

export default ListCardItem

const styles = StyleSheet.create({
    wrapper: {
        marginBottom: 10,
    },
    row: {
        marginHorizontal: "8%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    textContainer: {
        flex: 1,
        marginRight: 10,
    },
    type: {
        fontSize: 20,
        fontWeight: "400",
    },
    ammount: {
        fontSize: 12,
        color: Colors.PLACEHOLDER,
    },
})