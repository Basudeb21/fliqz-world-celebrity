import {
    Modal,
    StyleSheet,
    Text,
    ToastAndroid,
    TouchableOpacity,
    View,
    ScrollView,
    ActivityIndicator,
    TextInput
} from 'react-native';
import React, { useState } from 'react';
import { Colors } from '../../../constants';
import Entypo from 'react-native-vector-icons/dist/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { GradientTextButton, OutLineButton } from '../button';
import { HR, Spacer } from '../boots';
import { scale, verticalScale } from 'react-native-size-matters';
import { AddNewPostApi } from '../../../api/app/post';
import { useSelector } from 'react-redux';

const PollModal = ({ visible, onClose }) => {
    const token = useSelector((state) => state.auth.token);

    const [question, setQuestion] = useState('');
    const [answers, setAnswers] = useState(['', '']);
    const [loading, setLoading] = useState(false);

    const addAnswerField = () => setAnswers([...answers, '']);

    const updateAnswer = (text, index) => {
        const updated = [...answers];
        updated[index] = text;
        setAnswers(updated);
    };

    const removeAnswer = (index) => {
        if (answers.length <= 2) {
            ToastAndroid.show('Poll must have at least 2 answers', ToastAndroid.SHORT);
            return;
        }
        const updated = [...answers];
        updated.splice(index, 1);
        setAnswers(updated);
    };

    const clearAll = () => {
        setQuestion('');
        setAnswers(['', '']);
    };

    const onPressCreatePoll = async () => {
        if (!question.trim()) {
            ToastAndroid.show('Poll question is required', ToastAndroid.SHORT);
            return;
        }

        const validAnswers = answers.filter((a) => a.trim() !== '');
        if (validAnswers.length < 2) {
            ToastAndroid.show('At least two answers required', ToastAndroid.SHORT);
            return;
        }

        setLoading(true);
        try {
            const result = await AddNewPostApi(
                token,
                question,
                0,
                [],
                {
                    question,
                    answers: validAnswers
                },
                [],
                false
            );

            if (result?.success) {
                ToastAndroid.show('Poll created successfully', ToastAndroid.SHORT);
                clearAll();
                onClose();
            } else {
                ToastAndroid.show(result?.message || 'Failed to create poll', ToastAndroid.SHORT);
            }
        } catch (error) {
            console.error('Poll API Error:', error);
            ToastAndroid.show('Error while creating poll', ToastAndroid.SHORT);
        } finally {
            setLoading(false);
        }
    };


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
                        <Text style={styles.topText}>Add new poll</Text>
                        <TouchableOpacity onPress={onClose}>
                            <Entypo
                                name={"cross"}
                                color={Colors.THEME}
                                size={scale(20)}
                                style={styles.icon}
                            />
                        </TouchableOpacity>
                    </View>

                    <ScrollView style={{ maxHeight: verticalScale(400) }} showsVerticalScrollIndicator={false}>
                        <View style={styles.body}>
                            {/* Question */}
                            <TextInput
                                style={styles.textInput}
                                placeholder='Enter a poll question'
                                placeholderTextColor={Colors.PLACEHOLDER}
                                value={question}
                                onChangeText={setQuestion}
                                editable={!loading}
                            />

                            <Spacer height={verticalScale(10)} />
                            <HR height={1} color={Colors.PLACEHOLDER} />
                            <Spacer height={verticalScale(10)} />

                            {/* Answers */}
                            {answers.map((answer, index) => (
                                <View key={index} style={styles.answerRow}>
                                    <View style={{ width: '80%' }}>
                                        <TextInput
                                            style={styles.textInput}
                                            placeholder={`Enter an answer ${index + 1}`}
                                            placeholderTextColor={Colors.PLACEHOLDER}
                                            value={answer}
                                            onChangeText={(text) => updateAnswer(text, index)}
                                            editable={!loading}
                                        />
                                    </View>
                                    {answers.length > 2 && (
                                        <TouchableOpacity
                                            style={styles.removeButton}
                                            onPress={() => removeAnswer(index)}
                                            disabled={loading}
                                        >
                                            <Entypo name="cross" size={16} color={Colors.THEME} />
                                        </TouchableOpacity>
                                    )}
                                </View>
                            ))}

                            {/* Add New Answer */}
                            {!loading && (
                                <TouchableOpacity style={styles.addNewAnswer} onPress={addAnswerField}>
                                    <MaterialIcons name="add-circle-outline" size={22} color={Colors.THEME} />
                                    <Text style={styles.addText}>Add new poll answer</Text>
                                </TouchableOpacity>
                            )}

                            <View style={styles.btnGroup}>
                                <OutLineButton label_one='Clear' width='48%' onPress={clearAll} disabled={loading} />
                                <GradientTextButton
                                    label={loading ? 'Saving...' : 'Save Poll'}
                                    width='48%'
                                    onPress={onPressCreatePoll}
                                    height={verticalScale(30)}
                                    disabled={loading}
                                />
                            </View>

                            {loading && (
                                <ActivityIndicator size="small" color={Colors.THEME} style={{ marginTop: 10 }} />
                            )}
                        </View>
                    </ScrollView>
                </View>
            </View>
        </Modal>
    );
};

export default PollModal;

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: '90%',
        borderRadius: 10,
        backgroundColor: Colors.WHITE,
        overflow: 'hidden',
    },
    modalTop: {
        backgroundColor: Colors.THEME,
        padding: scale(10),
        borderTopRightRadius: scale(10),
        borderTopLeftRadius: scale(10),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    topText: {
        color: Colors.WHITE,
        fontSize: scale(20),
        fontWeight: '600',
    },
    body: {
        padding: scale(15),
    },
    icon: {
        backgroundColor: Colors.WHITE,
        borderRadius: scale(100),
        padding: scale(2),
    },
    textInput: {
        borderWidth: 1,
        borderColor: Colors.PLACEHOLDER,
        borderRadius: 5,
        padding: scale(10),
        fontSize: scale(14),
        color: Colors.TEXT_PRIMARY,
        marginBottom: verticalScale(10),
    },
    answerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: verticalScale(5),
    },
    removeButton: {
        padding: scale(5),
        marginLeft: scale(10),
    },
    addNewAnswer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: verticalScale(8),
        marginBottom: verticalScale(15),
    },
    addText: {
        marginLeft: scale(6),
        fontSize: scale(14),
        fontWeight: '500',
        color: Colors.THEME,
    },
    btnGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: verticalScale(10),
    },
});