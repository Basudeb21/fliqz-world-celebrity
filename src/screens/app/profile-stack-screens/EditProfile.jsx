import { Image, ImageBackground, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Colors, Images, NavigationStrings } from '../../../constants'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import FontAwesome5 from 'react-native-vector-icons/dist/FontAwesome5'
import Fontisto from 'react-native-vector-icons/dist/Fontisto'
import Feather from 'react-native-vector-icons/dist/Feather'
import TextInputBox from '../../../components/framework/input/TextInputBox'
import PhoneNumberInput from '../../../components/framework/input/PhoneNumberInput'
import Spacer from '../../../components/framework/boots/Spacer'
import TextAreaBox from '../../../components/framework/input/TextAreaBox'
import DateInputBox from '../../../components/framework/input/DateInputBox'
import DropdownBox from '../../../components/framework/navbar/DropdownBox'
import { countries } from '../../../data/CountryArray'
import GradientTextButton from '../../../components/framework/button/GradientTextButton'
import BottomModal from '../../../components/framework/modal/BottomModal'
import BackpressTopBar from '../../../components/framework/navbar/BackpressTopBar'
const EditProfile = () => {
    const [countryCode, setCountryCode] = useState('IN');
    const [callingCode, setCallingCode] = useState('91');
    const [focusedInput, setFocusedInput] = useState(null);
    const [dob, setDob] = useState(null);
    const [selectedGender, setSelectedGender] = useState('');
    const [selectedCountry, setSelectedCountry] = useState('');
    const [coverModal, setCoverModal] = useState(false);
    const [imageModal, setImageModal] = useState(false);

    const coverModalData = [
        { id: 1, Icon: Fontisto, iconName: "photograph", text: "View Profile Cover" },
        { id: 2, Icon: Feather, iconName: "upload", text: "Upload Photo" },
        { id: 3, Icon: FontAwesome5, iconName: "camera-retro", text: "Open Camera" },
    ]

    const profileModalData = [
        { id: 1, Icon: Fontisto, iconName: "photograph", text: "View Profile Image" },
        { id: 2, Icon: Feather, iconName: "upload", text: "Upload Photo" },
        { id: 3, Icon: FontAwesome5, iconName: "camera-retro", text: "Open Camera" },
    ]

    const genderOptions = ['Male', 'Female', 'Other'];

    const onPressCoverModal = () => {
        setCoverModal(!coverModal);
    }

    const onPressProfileModal = () => {
        setImageModal(!imageModal);
    }


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={{ paddingBottom: 60 }}>
                <BackpressTopBar title={"Edit Profile"} bgColor={Colors.THEME} color={Colors.WHITE} />
                <View style={styles.header}>
                    <ImageBackground source={{ uri: Images.POST_ONE }} style={styles.cover} resizeMode="cover">
                        <TouchableOpacity onPress={onPressCoverModal}>
                            <FontAwesome5
                                size={26}
                                name={"camera-retro"}
                                colors={Colors.BLACK}
                                style={styles.cameraCover}
                            />
                        </TouchableOpacity>
                    </ImageBackground>
                    <View style={styles.profileImgContainer}>
                        <Image source={{ uri: Images.CELEBRITY_AVATAR_ONE }} style={styles.profileImg} />
                        <TouchableOpacity onPress={onPressProfileModal}>
                            <FontAwesome5
                                size={18}
                                name={"camera-retro"}
                                colors={Colors.BLACK}
                                style={styles.cameraProfile}
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                <KeyboardAvoidingView style={styles.body}>
                    <TextInputBox placeholder='First Name' />
                    <Spacer height={10} />
                    <TextInputBox placeholder='Last Name' />
                    <Spacer height={10} />
                    <TextInputBox placeholder='Email Name' />
                    <Spacer height={10} />
                    <PhoneNumberInput
                        placeholder='Phone Number'
                        countryCode={countryCode}
                        setCountryCode={setCountryCode}
                        callingCode={callingCode}
                        setCallingCode={setCallingCode}
                    />
                    <Spacer height={10} />
                    <TextInputBox placeholder='User Name' />
                    <Spacer height={10} />
                    <TextAreaBox placeholder='Enter Bio' height={80} />
                    <Spacer height={10} />
                    <DateInputBox
                        date={dob}
                        setDate={setDob}
                        placeholder="Enter Date Of Birth"
                        focusedInput={focusedInput}
                        setFocusedInput={setFocusedInput}
                        inputKey="dob"
                    />
                    <Spacer height={10} />
                    <DropdownBox
                        value={selectedGender}
                        setValue={setSelectedGender}
                        placeholder="Select Gender"
                        options={genderOptions}
                    />
                    <Spacer height={10} />
                    <TextAreaBox placeholder='Enter Address' height={80} />
                    <Spacer height={10} />
                    <TextInputBox placeholder='Enter City' />
                    <Spacer height={10} />
                    <TextInputBox placeholder='Enter State' />
                    <Spacer height={10} />
                    <TextInputBox placeholder='Enter Zipcode' />
                    <Spacer height={10} />
                    <DropdownBox
                        value={selectedCountry}
                        setValue={setSelectedCountry}
                        placeholder="Select Country"
                        options={countries}
                    />
                    <Spacer height={10} />
                    <TextInputBox placeholder='Enter instagram account url' />
                    <Spacer height={10} />
                    <TextInputBox placeholder='Enter x account url' />
                    <Spacer height={10} />
                    <TextInputBox placeholder='Enter titok account url' />
                    <Spacer height={10} />
                    <TextInputBox placeholder='Enter facebook account url' />
                    <Spacer height={10} />
                    <TextInputBox placeholder='Enter google account url' />
                    <Spacer height={10} />
                    <TextInputBox placeholder='Enter website url' />
                </KeyboardAvoidingView>
                <Spacer height={20} />

                <View style={styles.btn}>
                    <GradientTextButton width='90%' label='Submit' />
                </View>

            </ScrollView>

            {
                coverModal && <BottomModal
                    visible={coverModal}
                    onClose={onPressCoverModal}
                    content={coverModalData}
                />

            }

            {
                imageModal && <BottomModal
                    visible={imageModal}
                    onClose={onPressProfileModal}
                    content={profileModalData}
                />

            }

        </SafeAreaView>
    )
}

export default EditProfile

const styles = StyleSheet.create({
    header: {
        alignItems: 'center',
        marginBottom: verticalScale(50),
    },
    body: {
        marginTop: verticalScale(20),
        marginHorizontal: moderateScale(20)
    },
    cover: {
        width: '100%',
        height: verticalScale(150),
        justifyContent: "center"
    },
    profileImg: {
        width: moderateScale(80),
        height: moderateScale(80),
        borderRadius: 40,
        borderWidth: 2,
        borderColor: Colors.WHITE
    },
    cameraCover: {
        position: "absolute",
        backgroundColor: Colors.WHITE,
        alignSelf: "flex-start",
        padding: scale(8),
        borderRadius: scale(100),
        right: 20,
        borderWidth: scale(2),
        elevation: scale(10)
    },
    backIcon: {
        position: "absolute",
        top: -70,
        left: 15
    },
    profileImgContainer: {
        position: 'absolute',
        bottom: -40,
    },
    cameraProfile: {
        position: "absolute",
        backgroundColor: Colors.WHITE,
        alignSelf: "flex-start",
        padding: scale(5),
        borderRadius: scale(100),
        borderWidth: scale(2),
        bottom: -5,
        right: 0
    },
    btn: {
        justifyContent: "center",
        alignItems: "center"
    }

})