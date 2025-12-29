import { StyleSheet, View, Alert, ToastAndroid } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import moment from 'moment';

import { BackpressTopBar } from '../../../../../components/framework/navbar';
import {
    AmmountInput,
    DateInputBox,
    GalleryPickerBox,
    TextAreaBox,
    TextInputBox,
} from '../../../../../components/framework/input';

import {
    moderateScale,
    scale,
    verticalScale,
} from 'react-native-size-matters';

import { GradientTextButton } from '../../../../../components/framework/button';
import { CreateCrowdfundingApi } from '../../../../../api/app/crowdfunding';
import { Colors } from '../../../../../constants';

const CreateNewCrowdfunding = () => {
    const token = useSelector(state => state.auth.token);

    const [title, setTitle] = useState('');
    const [goalAmount, setGoalAmount] = useState('');
    const [deadline, setDeadline] = useState(null);
    const [attachment, setAttachment] = useState([]);
    const [description, setDescription] = useState('');
    const [content, setContent] = useState('');
    const [focusedInput, setFocusedInput] = useState(null);

    const [loading, setLoading] = useState(false);
    const handleSubmit = async () => {
        if (!title || !goalAmount || !deadline || !description || !content) {
            ToastAndroid.show("Please fill all required fields", ToastAndroid.SHORT);
            return;
        }

        setLoading(true);

        try {
            const res = await CreateCrowdfundingApi({
                token,
                title,
                description,
                goal_amount: goalAmount,
                deadline,
                content,
                attachment
            });

            ToastAndroid.show(res.message, ToastAndroid.SHORT);

            setTitle('');
            setGoalAmount('');
            setDeadline(null);
            setAttachment([]);
            setDescription('');
            setContent('');

        } catch (error) {
            Alert.alert('Error', 'Failed to create crowdfunding');
        } finally {
            setLoading(false);
        }
    };
    return (
        <SafeAreaView style={styles.areaView}>
            <BackpressTopBar title="Create Crowdfunding" />

            <View style={styles.container}>
                <View style={styles.form}>
                    <TextInputBox
                        placeholder="Title"
                        value={title}
                        setValue={setTitle}
                    />

                    <AmmountInput
                        placeholder="Funding Goal"
                        value={goalAmount}
                        setValue={setGoalAmount}
                    />

                    <DateInputBox
                        placeholder="Deadline"
                        date={deadline}
                        setDate={setDeadline}
                        focusedInput={focusedInput}
                        setFocusedInput={setFocusedInput}
                        inputKey="deadline"
                    />

                    <GalleryPickerBox
                        placeholder="Cover Image"
                        images={attachment}
                        setImages={setAttachment}
                    />

                    <TextAreaBox
                        placeholder="Short description"
                        height={90}
                        value={description}
                        setValue={setDescription}
                    />

                    <TextAreaBox
                        placeholder="Content"
                        height={120}
                        value={content}
                        setValue={setContent}
                    />

                    <GradientTextButton
                        label={'Create'}
                        onPress={handleSubmit}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
};

export default CreateNewCrowdfunding;

const styles = StyleSheet.create({
    areaView: {
        flex: 1,
        backgroundColor: Colors.THEME
    },
    container: {
        backgroundColor: Colors.WHITE,
        flex: 1
    },
    form: {
        marginTop: verticalScale(20),
        marginHorizontal: moderateScale(15),
        gap: scale(10),
    },
});
