import { Modal, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Colors } from '../../../constants'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import Entypo from 'react-native-vector-icons/Entypo'
import Spacer from '../boots/Spacer'
import GradientTextButton from '../button/GradientTextButton'

const PrivacyModal = ({ visible, onClose, head, contentType, updateDate, data }) => {

    const renderItem = ({ item }) => (
        <View style={{ marginBottom: verticalScale(10) }}>
            <Text style={styles.sectionHead}>{item.head}</Text>
            <Text style={styles.sectionData}>{item.data}</Text>
        </View>
    )


    return (
        <Modal
            visible={visible}
            animationType="fade"
            transparent={true}
            onRequestClose={onClose}
        >
            <View style={styles.modalBackground}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalTop}>
                        <Text style={styles.topText}>{head}</Text>
                        <TouchableOpacity onPress={onClose} style={styles.icon}>
                            <Entypo name="cross" size={scale(15)} color={Colors.THEME} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.body}>
                        <FlatList
                            ListHeaderComponent={
                                <>
                                    <Spacer height={10} />
                                    <View style={styles.topArea}>
                                        <Text style={styles.bodyHead}>{contentType}</Text>
                                        <Text style={styles.updateDate}>{updateDate}</Text>
                                    </View>
                                </>
                            }
                            data={data}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={renderItem}
                            showsVerticalScrollIndicator={false}
                            ListFooterComponent={
                                <GradientTextButton label='I Agree' />
                            }
                        />

                    </View>

                </View>
            </View>
        </Modal>
    )
}

export default PrivacyModal

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        backgroundColor: Colors.TRANSPARENT_BLACK_DARK,
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalContainer: {
        width: '85%',
        borderRadius: scale(10),
        overflow: 'hidden',
    },
    modalTop: {
        backgroundColor: Colors.THEME,
        padding: scale(10),
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    topText: {
        color: Colors.WHITE,
        fontSize: scale(18),
        fontWeight: "600"
    },
    icon: {
        backgroundColor: Colors.WHITE,
        borderRadius: scale(100),
        padding: scale(2),
    },
    topArea: {
        alignItems: "center",
        marginBottom: verticalScale(10)
    },
    bodyHead: {
        fontSize: scale(20),
        fontWeight: "500",
        color: Colors.PLACEHOLDER
    },
    updateDate: {
        fontSize: scale(12),
        fontWeight: "500",
        color: Colors.PLACEHOLDER
    },
    body: {
        backgroundColor: Colors.WHITE,
        paddingHorizontal: moderateScale(15),
        maxHeight: verticalScale(400),
        paddingBottom: verticalScale(10)

    },
    closeButton: {
        marginTop: verticalScale(20),
        alignSelf: 'flex-end',
        backgroundColor: Colors.THEME,
        paddingVertical: verticalScale(8),
        paddingHorizontal: moderateScale(15),
        borderRadius: scale(5),
    },
    closeButtonText: {
        color: Colors.WHITE,
        fontSize: scale(14),
        fontWeight: '500'
    },
    sectionHead: {
        fontSize: scale(16),
        fontWeight: 'bold',
        color: Colors.BLACK,
        marginBottom: verticalScale(4),
    },
    sectionData: {
        fontSize: scale(13),
        color: Colors.BLACK,
        lineHeight: scale(18),
    },
})
