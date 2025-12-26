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

const QuizModal = ({ visible, onClose, onSubmit }) => {
    const [question, setQuestion] = useState('');
    const [answers, setAnswers] = useState(['', '']);
    const [loading] = useState(false);

    const addAnswerField = () => {
        setAnswers(prev => [...prev, '']);
    };

    const updateAnswer = (text, index) => {
        const updated = [...answers];
        updated[index] = text;
        setAnswers(updated);
    };

    const removeAnswer = (index) => {
        if (answers.length <= 2) {
            ToastAndroid.show(
                'Quiz must have at least 2 answers',
                ToastAndroid.SHORT
            );
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

    const onPressCreateQuiz = () => {
        if (!question.trim()) {
            ToastAndroid.show('Quiz question is required', ToastAndroid.SHORT);
            return;
        }

        const validAnswers = answers.filter(a => a.trim() !== '');
        if (validAnswers.length < 2) {
            ToastAndroid.show('At least two answers required', ToastAndroid.SHORT);
            return;
        }

        const quizPayload = {
            question,
            answers: validAnswers,
        };

        onSubmit(quizPayload); // ✅ send to CreatePage
        clearAll();
        onClose();
    };

    return (
        <Modal
            visible={visible}
            animationType="fade"
            transparent
            onRequestClose={onClose}
        >
            <View style={styles.modalBackground}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalTop}>
                        <Text style={styles.topText}>Add new quiz</Text>
                        <TouchableOpacity onPress={onClose}>
                            <Entypo
                                name="cross"
                                color={Colors.THEME}
                                size={scale(20)}
                                style={styles.icon}
                            />
                        </TouchableOpacity>
                    </View>

                    <ScrollView
                        style={{ maxHeight: verticalScale(400) }}
                        showsVerticalScrollIndicator={false}
                    >
                        <View style={styles.body}>
                            <TextInput
                                style={styles.textInput}
                                placeholder="Enter a quiz question"
                                placeholderTextColor={Colors.PLACEHOLDER}
                                value={question}
                                onChangeText={setQuestion}
                            />

                            <Spacer height={10} />
                            <HR height={1} color={Colors.PLACEHOLDER} />
                            <Spacer height={10} />

                            {answers.map((answer, index) => (
                                <View key={index} style={styles.answerRow}>
                                    <View style={{ width: '80%' }}>
                                        <TextInput
                                            style={styles.textInput}
                                            placeholder={`Enter an answer ${index + 1}`}
                                            placeholderTextColor={Colors.PLACEHOLDER}
                                            value={answer}
                                            onChangeText={(text) =>
                                                updateAnswer(text, index)
                                            }
                                        />
                                    </View>

                                    {answers.length > 2 && (
                                        <TouchableOpacity
                                            style={styles.removeButton}
                                            onPress={() => removeAnswer(index)}
                                        >
                                            <Entypo
                                                name="cross"
                                                size={16}
                                                color={Colors.THEME}
                                            />
                                        </TouchableOpacity>
                                    )}
                                </View>
                            ))}

                            <TouchableOpacity
                                style={styles.addNewAnswer}
                                onPress={addAnswerField}
                            >
                                <MaterialIcons
                                    name="add-circle-outline"
                                    size={22}
                                    color={Colors.THEME}
                                />
                                <Text style={styles.addText}>
                                    Add new quiz answer
                                </Text>
                            </TouchableOpacity>

                            <View style={styles.btnGroup}>
                                <OutLineButton
                                    label_one="Clear"
                                    width="48%"
                                    onPress={clearAll}
                                />
                                <GradientTextButton
                                    label="Save Quiz"
                                    width="48%"
                                    onPress={onPressCreateQuiz}
                                    height={verticalScale(30)}
                                />
                            </View>

                            {loading && (
                                <ActivityIndicator
                                    size="small"
                                    color={Colors.THEME}
                                    style={{ marginTop: 10 }}
                                />
                            )}
                        </View>
                    </ScrollView>
                </View>
            </View>
        </Modal>
    );
};

export default QuizModal;

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
        borderRadius: 100,
        padding: 2,
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
    },
    removeButton: {
        padding: scale(5),
        marginLeft: scale(10),
    },
    addNewAnswer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: verticalScale(10),
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
