import { Image, StyleSheet, Text, ToastAndroid, View } from 'react-native'
import React from 'react'
import { Colors, Images } from '../../../constants'
import { GradientTextButton } from '../button'
import { scale, verticalScale } from 'react-native-size-matters'
import { CommonSuggestionImageGroup } from '../iamge'
import { useSelector } from 'react-redux'
import { CollabDeleteApi } from '../../../api/app/collaboration'

const CollaborationOverviewCard = ({ id, image, title, date, }) => {
    const images = [Images.CELEBRITY_AVATAR_ONE, Images.CELEBRITY_AVATAR_TWO, Images.CELEBRITY_AVATAR_THREE]
    const token = useSelector(state => state.auth.token);

    const onPressDelete = async () => {
        const resp = await CollabDeleteApi({ token, id });
        console.log(resp);
        ToastAndroid.show(resp.message, ToastAndroid.SHORT);

    }
    return (
        <View style={styles.card}>
            <Image source={{ uri: image }} style={styles.cardImage} />
            <View style={styles.cardBody}>
                <Text style={styles.cardTitle}>{title}</Text>
                <Text style={styles.collaborationDate}>{`Date: ${date}`}</Text>
                <View style={styles.invitedImageArea}>
                    <Text style={styles.inviteText}>Invited: </Text>
                    <CommonSuggestionImageGroup images={images} />
                </View>
                <View style={styles.btnRow}>
                    <GradientTextButton label="Edit" onPress={() => console.log('Edit Collaboration')} width='45%' height={25} fontSize={11} />
                    <GradientTextButton label="Delete" onPress={onPressDelete} width='45%' height={25} fontSize={11} />
                </View>
            </View>
        </View>
    )
}

export default CollaborationOverviewCard

const styles = StyleSheet.create({
    card: {
        width: "48%",
        borderWidth: 1,
        borderColor: Colors.THEME,
        borderRadius: scale(8),
        overflow: 'hidden',
        backgroundColor: Colors.WHITE,
        shadowColor: Colors.BLACK,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    cardImage: {
        width: '100%',
        height: verticalScale(100),
        resizeMode: 'cover',
    },
    cardBody: {
        padding: scale(10),
    },
    cardTitle: {
        fontSize: 13,
        fontWeight: 'bold',
        marginBottom: scale(5),
    },
    collaborationDate: {
        fontSize: 10,
        color: '#666',
        marginBottom: scale(10),
    },
    inviteText: {
        fontSize: scale(13),
        color: Colors.BLACK
    },
    invitedImageArea: {
        marginBottom: verticalScale(10),
        flexDirection: "row",
        alignItems: "center"
    },
    btnRow: {
        flexDirection: 'row',
        justifyContent: "space-between"
    }
})