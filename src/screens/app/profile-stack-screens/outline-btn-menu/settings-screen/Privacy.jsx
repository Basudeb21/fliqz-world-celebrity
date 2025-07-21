import { StyleSheet, Switch, Text, View } from 'react-native'
import React, { useState } from 'react'
import BackpressTopBar from '../../../../../components/framework/navbar/BackpressTopBar'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Colors } from '../../../../../constants'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import Spacer from '../../../../../components/framework/boots/Spacer'

const Privacy = () => {
    const [isPublicEnabled, setIsPublicEnabled] = useState(false);
    const [is2FAEnabled, setIs2FAEnabled] = useState(false);


    const togglePublicSwitch = () => setIsPublicEnabled(prev => !prev);
    const toggle2FASwitch = () => setIs2FAEnabled(prev => !prev);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.WHITE }}>
            <BackpressTopBar title={"Privacy"} />
            <View style={styles.box}>
                <View style={styles.row}>
                    <Switch
                        value={isPublicEnabled}
                        onValueChange={togglePublicSwitch}
                        trackColor={{ false: Colors.PLACEHOLDER, true: Colors.PLACEHOLDER }}
                        thumbColor={isPublicEnabled ? Colors.THEME : Colors.WHITE}
                        style={styles.toggle}
                    />
                    <Text style={styles.head}>Is public account?</Text>
                </View>
                <Spacer height={20} />
                <Text>Having your profile set to private means:</Text>
                <Spacer height={20} />
                <Text>i) It will be hidden for search engines and unregistered users entirely.</Text>
                <Spacer height={5} />
                <Text>ii) It will also be generally hidden from suggestions and user searches on our platform.</Text>
            </View>
            <Spacer height={20} />
            <View style={styles.box}>
                <View style={styles.row}>
                    <Switch
                        value={is2FAEnabled}
                        onValueChange={toggle2FASwitch}
                        trackColor={{ false: Colors.PLACEHOLDER, true: Colors.PLACEHOLDER }}
                        thumbColor={is2FAEnabled ? Colors.THEME : Colors.WHITE}
                        style={styles.toggle}
                    />
                    <Text style={styles.head}>Enable email 2FA</Text>
                </View>
                <Spacer height={20} />
                <Text>If enabled, access from new devices will be restricted until verified.</Text>
            </View>
        </SafeAreaView>
    )
}

export default Privacy

const styles = StyleSheet.create({
    toggle: {
        alignSelf: "flex-start",
        marginStart: moderateScale(10)
    },
    row: {
        flexDirection: "row",
        alignItems: "center"
    },
    head: {
        fontSize: scale(20),
        fontWeight: "500"
    },
    box: {
        borderWidth: scale(1),
        borderColor: Colors.INPUTBOX_DEACTIVE_BORDER_COLOR,
        marginHorizontal: moderateScale(20),
        marginVertical: verticalScale(10),
        padding: scale(20),
        borderRadius: scale(6)
    }
})