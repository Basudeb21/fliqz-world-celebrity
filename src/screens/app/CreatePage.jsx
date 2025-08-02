import {
    ActivityIndicator,
    PermissionsAndroid,
    StyleSheet,
    ToastAndroid,
    View,
    Text,
    ScrollView,
    Image,
    KeyboardAvoidingView,
    TouchableOpacity
} from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Colors } from '../../constants';
import { useSelector } from 'react-redux';
import { postDonePressSounds } from '../../sound/SoundManager';
import ImagePicker from 'react-native-image-crop-picker';
import { GradientTextButton, IconTxtHRInputButton, OutLineButton } from '../../components/framework/button';
import { Spacer } from '../../components/framework/boots';
import { BackpressTopBar } from '../../components/framework/navbar';
import { TextArea } from '../../components/framework/input';
import { AddNewPostApi } from '../../api/app/post';

const CreatePage = () => {
    const [text, setText] = useState('');
    const [loading, setLoading] = useState(false);
    const [attachments, setAttachments] = useState([]);
    const token = useSelector((state) => state.auth.token);

    const requestStoragePermission = async () => {
        if (Platform.OS !== 'android') return true;

        try {
            const granted = await PermissionsAndroid.requestMultiple([
                PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
                PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
            ]);
            return Object.values(granted).every(status => status === PermissionsAndroid.RESULTS.GRANTED);
        } catch (err) {
            console.warn('Permission error:', err);
            return false;
        }
    };

    const handleMediaPick = async () => {
        console.log('handleMediaPick called');
        const permissionGranted = await requestStoragePermission();
        console.log('Permissions granted?', permissionGranted);

        if (!permissionGranted) {
            ToastAndroid.show('Permission denied', ToastAndroid.SHORT);
            return;
        }

        setLoading(true);
        try {
            const media = await ImagePicker.openPicker({
                mediaType: 'any',
                multiple: true,
                maxFiles: 10,
                compressImageQuality: 0.8,
            });

            const selected = media.map(file => ({
                uri: file.path,
                type: file.mime,
                name: file.filename || file.path.split('/').pop(),
            }));

            setAttachments(prev => [...prev, ...selected]);
        } catch (error) {
            console.log('Image Picker Error:', error);
            if (error?.message !== 'User cancelled image selection') {
                ToastAndroid.show(`Error: ${error.message}`, ToastAndroid.LONG);
            }
        }
        setLoading(false);
    };


    const handelSetPost = async () => {
        if (!text.trim()) return;
        setLoading(true);
        try {
            const result = await AddNewPostApi(token, text, 1, attachments);
            console.log('result : ', result);

            if (result?.success == true) {
                ToastAndroid.show(result.message, ToastAndroid.SHORT);
                setText('');
                setAttachments([]);
                postDonePressSounds();
            } else {
                console.warn('Post API failed:', result?.message || 'Unknown error');
            }
        } catch (error) {
            console.error('Post API Error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.WHITE }}>
            <KeyboardAvoidingView style={{ flex: 1 }}>
                <BackpressTopBar title={'New Post'} />
                <View style={styles.container}>
                    <TextArea
                        placeholder="Write a new post, drag and drop files to add attachments."
                        height={150}
                        value={text}
                        setValue={setText}
                    />

                    <View style={styles.iconBtnContainer}>
                        <IconTxtHRInputButton
                            Icon={Fontisto}
                            icnonName={'photograph'}
                            label={'Photos/Videos'}
                            onPress={handleMediaPick}
                        />
                        <Spacer height={15} />
                        <IconTxtHRInputButton
                            Icon={Ionicons}
                            icnonName={'notifications'}
                            label={'Notification'}
                        />
                        <Spacer height={15} />
                        <IconTxtHRInputButton
                            Icon={AntDesign}
                            icnonName={'calendar'}
                            label={'Schedule'}
                        />
                    </View>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 10 }}>
                        {attachments.map((item, index) => (
                            <View key={index} style={styles.mediaWrapper}>
                                <Image
                                    source={{ uri: item.uri }}
                                    style={styles.thumbnail}
                                    resizeMode="cover"
                                />
                                <TouchableOpacity
                                    style={styles.removeBtn}
                                    onPress={() =>
                                        setAttachments((prev) =>
                                            prev.filter((_, i) => i !== index)
                                        )
                                    }
                                >
                                    <Text style={styles.removeBtnText}>×</Text>
                                </TouchableOpacity>
                            </View>
                        ))}
                    </ScrollView>

                    <View style={styles.btnArea}>
                        <Spacer height={40} />
                        <OutLineButton label_two={'Clear'} onPress={() => setText('')} />
                        <Spacer height={15} />
                        <GradientTextButton label="Post" width="100%" onPress={handelSetPost} loading={false} />
                    </View>
                </View>

                {loading && (
                    <View style={styles.loadingOverlay}>
                        <ActivityIndicator size="large" color={Colors.THEME} />
                    </View>
                )}

            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default CreatePage;

const styles = StyleSheet.create({
    container: {
        marginHorizontal: moderateScale(20),
        marginTop: verticalScale(10),
        flex: 1,
    },
    iconBtnContainer: {
        marginTop: verticalScale(20),
    },
    btnArea: {
        backgroundColor: Colors.WHITE,
        position: 'absolute',
        bottom: verticalScale(30),
        width: "100%"
    },
    loadingOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    thumbnail: {
        width: 100,
        height: 100,
        marginRight: 10,
        borderRadius: 8,
    },
    mediaWrapper: {
        position: 'relative',
        marginRight: 10,
    },
    removeBtn: {
        position: 'absolute',
        top: 2,
        right: 2,
        backgroundColor: 'rgba(0,0,0,0.6)',
        borderRadius: 12,
        width: 24,
        height: 24,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1,
    },
    removeBtnText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        lineHeight: 20,
    },

});
