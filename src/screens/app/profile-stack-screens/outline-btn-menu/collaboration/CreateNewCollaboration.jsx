import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { BackpressTopBar } from '../../../../../components/framework/navbar'
import { Colors } from '../../../../../constants'
import { GalleryPickerBox, TextInputBox } from '../../../../../components/framework/input'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { Spacer } from '../../../../../components/framework/boots'
import { SuggestionSearchedUser } from '../../../../../components/framework/card'
import { GradientTextButton } from '../../../../../components/framework/button'

const CreateNewCollaboration = () => {
    const fans = [
        { id: 1, name: "Jhon Doe" },
        { id: 2, name: "Creator Inc" },
        { id: 3, name: "Fans Test" }
    ];

    return (
        <SafeAreaView style={styles.container}>
            <BackpressTopBar title="Create New Collaboration" />
            <View style={styles.form}>
                <TextInputBox />
                <GalleryPickerBox />
                <TextInputBox />
                <SuggestionSearchedUser users={fans} />

                <View style={styles.btn}>
                    <GradientTextButton label='Create Collaboration' />
                </View>
            </View>
        </SafeAreaView>
    )
}

export default CreateNewCollaboration

const styles = StyleSheet.create({
    areaView: {
        flex: 1,
        backgroundColor: Colors.THEME
    },
    container: {
        backgroundColor: Colors.WHITE,
        flex: 1
    },
    form: {
        paddingHorizontal: moderateScale(10),
        gap: scale(10),
        paddingTop: verticalScale(10),
        flex: 1
    },
    btn: {
        position: "absolute",
        bottom: 10,
        width: "100%",
        alignSelf: "center",
    }
}) 