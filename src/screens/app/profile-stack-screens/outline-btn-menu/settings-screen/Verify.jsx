import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import BackpressTopBar from '../../../../../components/framework/navbar/BackpressTopBar'
import Spacer from '../../../../../components/framework/boots/Spacer'
import HR from '../../../../../components/framework/boots/HR'
import { Colors } from '../../../../../constants'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { SafeAreaView } from 'react-native-safe-area-context'
import Feather from 'react-native-vector-icons/dist/Feather'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'


const Verify = () => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.WHITE }}>
            <BackpressTopBar title={"Verify"} />
            <View style={styles.container}>
                <Text style={styles.txt}>Get verified and start earning now</Text>
                <Spacer height={20} />
                <HR height={1} />

                <Spacer height={20} />
                <Text>In order to get verified and receive your badge, please take care of the following steps:</Text>
                <Spacer height={10} />
                <View style={styles.boxContainer}>
                    <View style={styles.row}>
                        <Feather
                            size={16}
                            color={Colors.THEME}
                            name={"check-circle"}
                        />
                        <Text>Confirm your email address.</Text>
                    </View>
                    <Spacer height={10} />
                    <View style={styles.row}>
                        <Feather
                            size={16}
                            color={Colors.THEME}
                            name={"check-circle"}
                        />
                        <Text>Set your birthday.</Text>
                    </View>
                    <Spacer height={10} />
                    <View style={styles.row}>
                        <MaterialCommunityIcons
                            size={16}
                            color={Colors.THEME}
                            name={"timer-sand"}
                        />
                        <Text>Identity check in progress.</Text>
                    </View>

                </View>
            </View>
        </SafeAreaView>
    )
}

export default Verify

const styles = StyleSheet.create({
    container: {
        marginHorizontal: moderateScale(20)
    },
    txt: {
        color: Colors.PLACEHOLDER,
        marginStart: moderateScale(20)
    },
    row: {
        flexDirection: "row",
        gap: scale(10)
    },
    boxContainer: {
        marginTop: verticalScale(20)
    }
})