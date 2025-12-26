import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Colors, Images } from '../../../../../constants'
import { BackpressTopBar } from '../../../../../components/framework/navbar'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { HR, Spacer } from '../../../../../components/framework/boots'
import { GradientIconButton, GradientTextButton } from '../../../../../components/framework/button'

const TaxInformation = () => {
    return (
        <SafeAreaView style={styles.areaView}>
            <BackpressTopBar title={"Tax Information"} />
            <ScrollView style={styles.container}>
                <Text style={styles.info}>This information is required to confirm if you are a U.S. or non-U.S. taxpayer and whether Fliqz World is required to withhold taxes from your earnings. Add your tax information now to avoid delays in getting paid.</Text>
                <View style={styles.form}>
                    <Text style={styles.formHead}>Form W-9</Text>
                    <Text style={styles.formHead}>Request for Taxpayer Identification Number and Certification</Text>
                    <Text style={styles.formTopText}>(Substitute for official IRS Form W-9 for data collection purposes only)</Text>
                    <Text style={styles.infoTitles}>Name (as shown on your income tax return)</Text>
                    <Text>Niladittya Paul</Text>
                    <Text style={styles.infoTitles}>Business name/disregarded entity name (if different from above)</Text>
                    <Text>Testing</Text>
                    <Text style={styles.infoTitles}>Federal tax classification (Select only one)</Text>
                    <Text>Partnership</Text>
                    <Text style={styles.infoTitles}>Exemptions (codes apply only to certain entities)</Text>
                    <Text>1234</Text>
                    <Text>1234</Text>
                    <Text style={styles.infoTitles}>Address (number, street, and apt. or suite no.)</Text>
                    <Text>Janai Road, West Bengal, Hooghly</Text>
                    <Text style={styles.infoTitles}>State or province</Text>
                    <Text>California</Text>
                    <Text style={styles.infoTitles}>City</Text>
                    <Text>Janai</Text>
                    <Text style={styles.infoTitles}>Zip code</Text>
                    <Text>90006</Text>
                    <Text style={styles.infoTitles}>List account number(s) here (optional)</Text>
                    <Text>223252544</Text>
                    <View style={styles.hrContainer}>
                        <HR height={1} color={Colors.LIGHT_PLACEHOLDER} />
                    </View>
                    <Text style={styles.partText}>Part I – Taxpayer Identification Number (TIN)</Text>
                    <Text>Social security number (SSN)</Text>
                    <Text>Enter your TIN in the appropriate box. The TIN provided must match the name given on above name to avoid backup withholding.</Text>
                    <Text style={styles.infoTitles}>Social security number (SSN)</Text>
                    <Text>696969696</Text>
                    <Text style={styles.infoTitles}>Employer identification number (EIN)</Text>
                    <Text>696969696</Text>
                    <View style={styles.hrContainer}>
                        <HR height={1} color={Colors.LIGHT_PLACEHOLDER} />
                    </View>
                    <Text style={styles.partText}>Part II – Certification</Text>
                    <Text>Under penalties of perjury, I certify that:</Text>
                    <Text>The number shown on this form is my correct taxpayer identification number (or I am waiting for a number to be issued to me);</Text>
                    <Text>I am not subject to backup withholding;</Text>
                    <Text>I am a U.S. citizen or other U.S. person;</Text>
                    <Text>The FATCA code(s) entered on this form (if any) indicating exemption from FATCA reporting is correct.</Text>
                    <Text>Signature of U.S. person</Text>
                    <Image
                        style={styles.image}
                        source={{ uri: Images.CELEBRITY_AVATAR_ONE }}
                    />
                    <Text style={styles.infoTitles}>Date</Text>
                    <Text>2025-12-16</Text>
                    <View style={styles.btn}>
                        <GradientTextButton label='Edit Information' />
                    </View>
                    <Spacer height={20} />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default TaxInformation

const styles = StyleSheet.create({
    areaView: {
        flex: 1,
        backgroundColor: Colors.THEME
    },
    container: {
        backgroundColor: Colors.WHITE,
        flex: 1
    },
    info: {
        marginHorizontal: moderateScale(10),
        textAlign: "justify",
        color: Colors.LIGHT_PLACEHOLDER,
        marginTop: verticalScale(10)
    },
    form: {
        marginTop: verticalScale(15),
        paddingHorizontal: moderateScale(15)
    },
    formHead: {
        fontSize: scale(18),
        fontWeight: "800",
        color: Colors.BLACK,
        textAlign: "center"
    },
    infoTitles: {
        fontWeight: "800",
        marginTop: verticalScale(10)
    },
    formTopText: {
        marginTop: verticalScale(10)
    },
    hrContainer: {
        marginVertical: verticalScale(20)
    },
    partText: {
        fontWeight: "900",
        fontSize: scale(18),

    },
    image: {
        height: scale(150),
        width: scale(100),
        marginTop: scale(20),
        borderRadius: scale(12)
    },
    btn: {
        marginTop: verticalScale(20)
    }
})