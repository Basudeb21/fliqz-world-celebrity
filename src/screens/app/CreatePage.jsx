import {
    ActivityIndicator,
    PermissionsAndroid,
    StyleSheet,
    ToastAndroid,
    View,
    Text,
    Image,
    KeyboardAvoidingView,
    TouchableOpacity,
    FlatList,
    Platform,
} from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { Colors } from '../../constants';
import { useSelector } from 'react-redux';
import { postDonePressSounds } from '../../sound/SoundManager';
import ImagePicker from 'react-native-image-crop-picker';
import {
    GradientTextButton,
    IconTxtHRInputButton,
    OutLineButton,
} from '../../components/framework/button';
import { Loader, Spacer } from '../../components/framework/boots';
import { BackpressTopBar, DropdownBox } from '../../components/framework/navbar';
import { TextArea } from '../../components/framework/input';
import { AddNewPostApi } from '../../api/app/post';
import { PollModal, QuizModal } from '../../components/framework/modal';
import PostPriceModal from '../../components/framework/modal/PostPriceModal';

const CreatePage = () => {
    const [text, setText] = useState('');
    const [loading, setLoading] = useState(false);
    const [attachments, setAttachments] = useState([]);
    const [quizAnswers, setQuizAnswers] = useState([]);
    const [pollData, setPollData] = useState(null);
    const [price, setPrice] = useState(0);

    const token = useSelector((state) => state.auth.token);

    const [pollVisible, setPollVisible] = useState(false);
    const [quizVisible, setQuizVisible] = useState(false);
    const [selectPriceVisible, setSelectPriceVisible] = useState(false);
    const privacyOptions = [
        "public",
        ""
    ]

    const requestStoragePermission = async () => {
        if (Platform.OS !== 'android') return true;
        try {
            const granted = await PermissionsAndroid.requestMultiple([
                PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
                PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
            ]);
            return Object.values(granted).every(
                status => status === PermissionsAndroid.RESULTS.GRANTED
            );
        } catch {
            return false;
        }
    };

    const handleMediaPick = async () => {
        const permissionGranted = await requestStoragePermission();
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
            if (error?.message !== 'User cancelled image selection') {
                ToastAndroid.show(error.message, ToastAndroid.SHORT);
            }
        }
        setLoading(false);
    };

    const handelSetPost = async () => {
        if (
            !text.trim() &&
            attachments.length === 0 &&
            !pollData &&
            quizAnswers.length === 0
        ) {
            ToastAndroid.show('Post cannot be empty', ToastAndroid.SHORT);
            return;
        }

        setLoading(true);
        try {
            const result = await AddNewPostApi(
                token,
                text,
                price,
                attachments,
                pollData,
                quizAnswers,
                false
            );

            if (result?.success) {
                ToastAndroid.show(result.message, ToastAndroid.SHORT);
                setText('');
                setAttachments([]);
                setPollData(null);
                setQuizAnswers([]);
            }
        } catch (error) {
            console.log('Post API Error:', error);
        } finally {
            setLoading(false);
        }
    };

    const buttonItems = [
        {
            Icon: Fontisto,
            icnonName: 'photograph',
            label: 'Photos/Videos',
            onPress: handleMediaPick,
        },
        {
            Icon: Ionicons,
            icnonName: 'notifications',
            label: 'Notification',
        },
        { Icon: AntDesign, icnonName: 'calendar', label: 'Schedule' },
        {
            Icon: FontAwesome5,
            icnonName: 'dollar-sign',
            label: 'Price',
            onPress: () => setSelectPriceVisible(true),
        },
        {
            Icon: FontAwesome5,
            icnonName: 'poll',
            label: 'Poll',
            onPress: () => {
                setQuizAnswers([]);
                setPollData(null);
                setPollVisible(true);
            },
        },
        {
            Icon: MaterialIcons,
            icnonName: 'quiz',
            label: 'Quiz',
            onPress: () => {
                setPollData(null);
                setQuizVisible(true);
            },
        },
    ];

    return (
        <SafeAreaView style={styles.areaView}>
            <KeyboardAvoidingView style={styles.container}>
                <BackpressTopBar title={'New Post'} />

                <View style={{ flex: 1, paddingHorizontal: 20 }}>
                    <FlatList
                        data={[]}
                        ListHeaderComponent={
                            <>
                                <Spacer height={20} />
                                <TextArea
                                    placeholder="Write a new post, drag and drop files to add attachments."
                                    height={150}
                                    value={text}
                                    setValue={setText}
                                />
                                <Spacer height={10} />
                                <DropdownBox
                                />
                                <Spacer height={20} />

                                <FlatList
                                    data={buttonItems}
                                    keyExtractor={(_, i) => i.toString()}
                                    scrollEnabled={false}
                                    renderItem={({ item }) => (
                                        <View style={{ marginBottom: 15 }}>
                                            <IconTxtHRInputButton {...item} />
                                        </View>
                                    )}
                                />



                                <FlatList
                                    data={attachments}
                                    horizontal
                                    keyExtractor={(_, i) => i.toString()}
                                    renderItem={({ item, index }) => (
                                        <View style={styles.mediaWrapper}>
                                            <Image source={{ uri: item.uri }} style={styles.thumbnail} />
                                            <TouchableOpacity
                                                style={styles.removeBtn}
                                                onPress={() =>
                                                    setAttachments(prev =>
                                                        prev.filter((_, i) => i !== index)
                                                    )
                                                }
                                            >
                                                <Text style={styles.removeBtnText}>×</Text>
                                            </TouchableOpacity>
                                        </View>
                                    )}
                                />

                                <View style={styles.btnArea}>
                                    <OutLineButton label_two="Clear" onPress={() => setText('')} />
                                    <Spacer height={15} />
                                    <GradientTextButton
                                        label="Post"
                                        width="100%"
                                        onPress={handelSetPost}
                                        loading={loading}
                                    />
                                    <Spacer height={40} />
                                </View>
                            </>
                        }
                    />
                </View>

                {loading && <Loader color={Colors.THEME} />}

                {selectPriceVisible && (
                    <PostPriceModal
                        visible={selectPriceVisible}
                        price={price}
                        setPrice={setPrice}
                        onClose={() => setSelectPriceVisible(false)}
                    />
                )}

                {quizVisible && (
                    <QuizModal
                        visible={quizVisible}
                        onClose={() => setQuizVisible(false)}
                        onSubmit={(data) => setQuizAnswers(data)}
                    />
                )}

                {pollVisible && (
                    <PollModal
                        visible={pollVisible}
                        onClose={() => setPollVisible(false)}
                        onSubmit={(data) => setPollData(data)}
                    />
                )}

            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default CreatePage;


const styles = StyleSheet.create({
    areaView: {
        flex: 1,
        backgroundColor: Colors.THEME
    },
    container: {
        backgroundColor: Colors.WHITE,
        flex: 1,
    },
    scrollContainer: {
        paddingHorizontal: moderateScale(20),
        paddingTop: verticalScale(10),
        paddingBottom: verticalScale(40),
    },
    btnArea: {
        marginTop: 30,
        backgroundColor: Colors.WHITE,
        paddingHorizontal: moderateScale(20),
        paddingBottom: verticalScale(40),
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
