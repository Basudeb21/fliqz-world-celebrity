import {
    Image,
    ImageBackground,
    KeyboardAvoidingView,
    ScrollView,
    StyleSheet,
    Text,
    ToastAndroid,
    TouchableOpacity,
    View,
} from 'react-native';
import React, {
    useEffect,
    useState
} from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../../../../constants';
import {
    moderateScale,
    scale,
    verticalScale
} from 'react-native-size-matters';
import FontAwesome5 from 'react-native-vector-icons/dist/FontAwesome5';
import Fontisto from 'react-native-vector-icons/dist/Fontisto';
import Feather from 'react-native-vector-icons/dist/Feather';
import { Spacer } from '../../../../../components/framework/boots';
import { GradientTextButton } from '../../../../../components/framework/button';
import {
    DateInputBox,
    PhoneNumberInput,
    TextAreaBox,
    TextInputBox,
} from '../../../../../components/framework/input';
import {
    BackpressTopBar,
    DropdownBox,
} from '../../../../../components/framework/navbar';
import { BottomModal } from '../../../../../components/framework/modal';
import { useDispatch, useSelector } from 'react-redux';
import {
    GetAllCountryApi,
    GetAllGenderApi,
    UpdateMyProfileApi,
    UpdateMyProfileCover,
    UpdateMyProfilePic,
} from '../../../../../api/app/user';
import { updateUser } from '../../../../../redux-store/slices/authSlice';
import { launchImageLibrary } from 'react-native-image-picker';

const EditProfile = () => {
    const user = useSelector(state => state.auth.user);
    const token = useSelector(state => state.auth.token);
    const dispatch = useDispatch();

    const [countryCode, setCountryCode] = useState('IN');
    const [callingCode, setCallingCode] = useState('91');
    const [focusedInput, setFocusedInput] = useState(null);
    const [dob, setDob] = useState(user.birthdate);
    const [coverModal, setCoverModal] = useState(false);
    const [imageModal, setImageModal] = useState(false);

    const [firstName, setFirstName] = useState(user.first_name);
    const [lastName, setLastName] = useState(user.last_name);
    const [email, setEmail] = useState(user.email);
    const [phoneNumber, setPhoneNumber] = useState(user.phone);
    const [userName, setUserName] = useState(user.username);
    const [bio, setBio] = useState(user.bio);
    const [address, setAddress] = useState(user.address);
    const [location, setLocation] = useState(user.location);
    const [city, setCity] = useState(user.city);
    const [state, setState] = useState(user.state);
    const [zipCode, setZipCode] = useState(user.zipcode);

    const [genderOptions, setGenderOptions] = useState([]);
    const [selectedGender, setSelectedGender] = useState(user.gender_id || '');
    const [countryOptions, setCountryOptions] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState(null);

    const [instagram, setInstagram] = useState(user.instagram_account);
    const [x, setX] = useState(user.x_account);
    const [tiktok, setTiktok] = useState(user.tiktok_account);
    const [facebook, setFacebook] = useState(user.facebook_account);
    const [google, setGoogle] = useState(user.google_account);
    const [youtube, setYoutube] = useState(user.youtube_account);
    const [webSite, setwebSite] = useState(user.website);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchGenders = async () => {
            const res = await GetAllGenderApi(token);
            if (res && res.success) {
                setGenderOptions(res.data);
                if (user.gender_id) {
                    const selected = res.data.find(g => g.id === user.gender_id);
                    if (selected) setSelectedGender(selected);
                }
            }
        };
        fetchGenders();
    }, [token, user.gender_id]);

    useEffect(() => {
        const fetchCountries = async () => {
            const res = await GetAllCountryApi(token);
            if (res && res.success) {
                setCountryOptions(res.data);
                if (user.country_id) {
                    const selected = res.data.find(c => c.id === user.country_id);
                    if (selected) {
                        setSelectedCountry(selected);
                        if (selected.phone_code) setCallingCode(selected.phone_code);
                        if (selected.country_code) setCountryCode(selected.country_code);
                    }
                }
            }
        };
        fetchCountries();
    }, [token, user.country_id]);

    const handleUploadPhoto = async () => {
        launchImageLibrary({
            mediaType: 'photo',
            includeBase64: false,
            maxWidth: 800,
            maxHeight: 800,
            quality: 0.8
        }, async response => {
            if (response.didCancel) return;
            if (response.errorCode) {
                console.log('ImagePicker Error: ', response.errorMessage);
                ToastAndroid.show('Image selection failed', ToastAndroid.SHORT);
                return;
            }

            const asset = response.assets?.[0];
            if (!asset) return;


            const formData = new FormData();
            formData.append('avatar', {
                uri: asset.uri,
                type: asset.type || 'image/jpeg',
                name: asset.fileName || `avatar_${Date.now()}.jpg`,
            });

            setLoading(true);
            const result = await UpdateMyProfilePic({ token, data: formData });
            setLoading(false);
            setImageModal(false);

            if (result && result.success) {
                dispatch(updateUser(result.data));
                ToastAndroid.show('Profile image updated!', ToastAndroid.SHORT);
            } else {
                ToastAndroid.show('Upload failed', ToastAndroid.SHORT);
            }
        });
    };



    const handleUploadCover = async () => {
        launchImageLibrary({
            mediaType: 'photo',
            includeBase64: false,
            maxWidth: 800,
            maxHeight: 800,
            quality: 0.8
        }, async response => {
            if (response.didCancel) return;
            if (response.errorCode) {
                console.log('ImagePicker Error: ', response.errorMessage);
                ToastAndroid.show('Image selection failed', ToastAndroid.SHORT);
                return;
            }

            const asset = response.assets?.[0];
            if (!asset) return;


            const formData = new FormData();
            formData.append('cover', {
                uri: asset.uri,
                type: asset.type || 'image/jpeg',
                name: asset.fileName || `cover_${Date.now()}.jpg`,
            });

            setLoading(true);
            const result = await UpdateMyProfileCover({ token, data: formData });
            setLoading(false);
            setImageModal(false);

            if (result && result.success) {
                dispatch(updateUser(result.data));
                ToastAndroid.show('Profile image updated!', ToastAndroid.SHORT);
            } else {
                ToastAndroid.show('Upload failed', ToastAndroid.SHORT);
            }
        });
    };



    const onPressEditData = async () => {
        const fullPhone = `+${callingCode}${phoneNumber}`;

        const result = await UpdateMyProfileApi({
            token,
            first_name: firstName,
            last_name: lastName,
            email,
            username: userName,
            phone: fullPhone,
            bio,
            birthdate: dob,
            gender_id: selectedGender?.id || user.gender_id,
            country_id: selectedCountry?.id || user.country_id,
            location,
            state,
            city,
            zipcode: zipCode,
            address,
            website: webSite,
            x_account: x,
            google_account: google,
            facebook_account: facebook,
            instagram_account: instagram,
            tiktok_account: tiktok,
        });

        ToastAndroid.show(result.message, ToastAndroid.SHORT);

        if (result.success) {
            dispatch(updateUser(result.data));
        }
    };

    const coverModalData = [
        { id: 1, Icon: Fontisto, iconName: 'photograph', text: 'View Profile Cover' },
        { id: 2, Icon: Feather, iconName: 'upload', text: 'Upload Photo', onPress: handleUploadCover },
        { id: 3, Icon: FontAwesome5, iconName: 'camera-retro', text: 'Open Camera' },
    ];

    const profileModalData = [
        { id: 1, Icon: Fontisto, iconName: 'photograph', text: 'View Profile Image' },
        { id: 2, Icon: Feather, iconName: 'upload', text: 'Upload Photo', onPress: handleUploadPhoto },
        { id: 3, Icon: FontAwesome5, iconName: 'camera-retro', text: 'Open Camera' },
    ];

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.WHITE }}>
            <ScrollView contentContainerStyle={{ paddingBottom: 60 }}>
                <BackpressTopBar title={'Edit Profile'} bgColor={Colors.THEME} color={Colors.WHITE} />

                <View style={styles.header}>
                    <ImageBackground source={{ uri: user.cover }} style={styles.cover} resizeMode="cover">
                        <TouchableOpacity onPress={() => setCoverModal(true)}>
                            <FontAwesome5
                                size={26}
                                name={'camera-retro'}
                                color={Colors.BLACK}
                                style={styles.cameraCover}
                            />
                        </TouchableOpacity>
                    </ImageBackground>
                    <View style={styles.profileImgContainer}>
                        <Image source={{ uri: user.avatar }} style={styles.profileImg} />
                        <TouchableOpacity onPress={() => setImageModal(true)}>
                            <FontAwesome5
                                size={18}
                                name={'camera-retro'}
                                color={Colors.BLACK}
                                style={styles.cameraProfile}
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                <KeyboardAvoidingView style={styles.body}>
                    <TextInputBox
                        placeholder="First Name"
                        value={firstName}
                        setValue={setFirstName}
                    />
                    <Spacer height={10} />
                    <TextInputBox
                        placeholder="Last Name"
                        value={lastName}
                        setValue={setLastName}
                    />
                    <Spacer height={10} />
                    <TextInputBox
                        placeholder="Email"
                        value={email}
                        setValue={setEmail}
                    />
                    <Spacer height={10} />
                    <PhoneNumberInput
                        placeholder="Phone Number"
                        countryCode={countryCode}
                        setCountryCode={setCountryCode}
                        callingCode={callingCode}
                        setCallingCode={setCallingCode}
                        phoneNumber={phoneNumber}
                        setphoneNumber={setPhoneNumber}
                    />
                    <Spacer height={10} />
                    <TextInputBox
                        placeholder="User Name"
                        value={userName}
                        setValue={setUserName}
                    />
                    <Spacer height={10} />
                    <TextAreaBox
                        placeholder="Enter Bio"
                        height={80}
                        value={bio}
                        setValue={setBio}
                    />
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
                        value={selectedGender?.gender_name || ''}
                        setValue={name => {
                            const genderObj = genderOptions.find(g => g.gender_name === name);
                            setSelectedGender(genderObj);
                        }}
                        placeholder="Select Gender"
                        options={genderOptions.map(g => g.gender_name)}
                    />
                    <Spacer height={10} />
                    <TextAreaBox
                        placeholder="Enter Address"
                        height={80}
                        value={address}
                        setValue={setAddress} />
                    <Spacer height={10} />
                    <TextInputBox
                        value={location}
                        setValue={setLocation}
                        placeholder="Location"
                    />
                    <Spacer height={10} />
                    <TextInputBox
                        placeholder="Enter City"
                        value={city}
                        setValue={setCity}
                    />
                    <Spacer height={10} />
                    <TextInputBox
                        placeholder="Enter State"
                        value={state}
                        setValue={setState}
                    />
                    <Spacer height={10} />
                    <TextInputBox
                        placeholder="Enter Zipcode"
                        value={zipCode}
                        setValue={setZipCode}
                    />
                    <Spacer height={10} />
                    <DropdownBox
                        value={selectedCountry?.name || ''}
                        setValue={name => {
                            const countryObj = countryOptions.find(c => c.name === name);
                            setSelectedCountry(countryObj);
                        }}
                        placeholder="Select Country"
                        options={countryOptions.map(c => c.name)}
                    />
                    <Spacer height={10} />
                    <TextInputBox
                        placeholder="Enter instagram account url"
                        value={instagram}
                        setValue={setInstagram}
                    />
                    <Spacer height={10} />
                    <TextInputBox
                        placeholder="Enter x account url"
                        value={x}
                        setValue={setX}
                    />
                    <Spacer height={10} />
                    <TextInputBox
                        placeholder="Enter tiktok account url"
                        value={tiktok}
                        setValue={setTiktok}
                    />
                    <Spacer height={10} />
                    <TextInputBox
                        placeholder="Enter facebook account url"
                        value={facebook}
                        setValue={setFacebook}
                    />
                    <Spacer height={10} />
                    <TextInputBox
                        placeholder="Enter google account url"
                        value={google}
                        setValue={setGoogle}
                    />
                    <Spacer height={10} />
                    <TextInputBox
                        placeholder="Enter youtube account url"
                        value={youtube}
                        setValue={setYoutube}
                    />
                    <Spacer height={10} />
                    <TextInputBox
                        placeholder="Enter website url"
                        value={webSite}
                        setValue={setwebSite}
                    />
                </KeyboardAvoidingView>

                <Spacer height={20} />
                <View style={styles.btn}>
                    <GradientTextButton width="90%" label="Submit" onPress={onPressEditData} />
                </View>
            </ScrollView>

            {coverModal && (
                <BottomModal visible={coverModal} onClose={() => setCoverModal(false)} content={coverModalData} />
            )}

            {imageModal && (
                <BottomModal visible={imageModal} onClose={() => setImageModal(false)} content={profileModalData} />
            )}
        </SafeAreaView>
    );
};

export default EditProfile;

const styles = StyleSheet.create({
    header: { alignItems: 'center', marginBottom: verticalScale(50) },
    body: { marginTop: verticalScale(20), marginHorizontal: moderateScale(20) },
    cover: { width: '100%', height: verticalScale(150), justifyContent: 'center' },
    profileImg: {
        width: moderateScale(80),
        height: moderateScale(80),
        borderRadius: 40,
        borderWidth: 2,
        borderColor: Colors.WHITE,
    },
    cameraCover: {
        position: 'absolute',
        backgroundColor: Colors.WHITE,
        alignSelf: 'flex-start',
        padding: scale(8),
        borderRadius: scale(100),
        right: 20,
        borderWidth: scale(2),
        elevation: scale(10),
    },
    profileImgContainer: { position: 'absolute', bottom: -40 },
    cameraProfile: {
        position: 'absolute',
        backgroundColor: Colors.WHITE,
        alignSelf: 'flex-start',
        padding: scale(5),
        borderRadius: scale(100),
        borderWidth: scale(2),
        bottom: -5,
        right: 0,
    },
    btn: { justifyContent: 'center', alignItems: 'center' },
});
