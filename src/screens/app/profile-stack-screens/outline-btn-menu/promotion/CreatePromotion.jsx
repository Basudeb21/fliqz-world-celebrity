import { StyleSheet, Text, View, ToastAndroid } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BackpressTopBar, DropdownBox } from '../../../../../components/framework/navbar';
import { TextInputBox } from '../../../../../components/framework/input';
import { scale } from 'react-native-size-matters';
import { GradientTextButton } from '../../../../../components/framework/button';
import { Colors } from '../../../../../constants';
import { Spacer } from '../../../../../components/framework/boots';
import { useSelector } from 'react-redux';
import { GetPromotionSettingsApi, CreatePromotionApi } from '../../../../../api/app/promotion';

const durationOptions = [
    { label: '1 Week', days: 7 },
    { label: '2 Weeks', days: 14 },
    { label: '3 Weeks', days: 21 },
    { label: '1 Month', days: 30 },
    { label: '2 Months', days: 60 },
    { label: '3 Months', days: 90 },
];

const CreatePromotion = () => {
    const token = useSelector((state) => state.auth.token);
    const [promotionOptions, setPromotionOptions] = useState([]);
    const [selectedPromotion, setSelectedPromotion] = useState(null);
    const [selectedDuration, setSelectedDuration] = useState(null);
    const [content, setContent] = useState('');

    const [summary, setSummary] = useState(null);

    useEffect(() => {
        const fetchSettings = async () => {
            const res = await GetPromotionSettingsApi({ token });
            if (res?.success && res.data) {
                setPromotionOptions(res.data);
            } else {
                ToastAndroid.show(res?.message || 'Failed to load promotion settings', ToastAndroid.SHORT);
            }
        };

        fetchSettings();
    }, [token]);

    // 🟢 Update summary live when promotion or duration changes
    useEffect(() => {
        if (selectedPromotion && selectedDuration) {
            const startDate = new Date();
            const endDate = new Date();
            endDate.setDate(startDate.getDate() + selectedDuration.days);

            const costPerDay = parseFloat(selectedPromotion.value);
            const totalAmount = costPerDay * selectedDuration.days;

            setSummary({
                startDate: startDate.toISOString().split('T')[0],
                endDate: endDate.toISOString().split('T')[0],
                price: totalAmount.toFixed(2),
            });
        } else {
            setSummary(null);
        }
    }, [selectedPromotion, selectedDuration]);

    const onPromote = async () => {
        if (!selectedPromotion || !selectedDuration || !content) {
            ToastAndroid.show('Please fill all fields', ToastAndroid.SHORT);
            return;
        }

        const payload = {
            token,
            content,
            position: [selectedPromotion.key],
            total_amount: summary.price,
            start_date: summary.startDate,
            end_date: summary.endDate,
        };

        const res = await CreatePromotionApi(payload);
        console.log(res);


        if (res?.success) {
            ToastAndroid.show(res.message, ToastAndroid.SHORT);
        } else {
            ToastAndroid.show(res?.message || 'Failed to create promotion', ToastAndroid.SHORT);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <BackpressTopBar title={'Promotion'} />
            <View style={styles.form}>
                <DropdownBox
                    placeholder="How do you want to promote yourself?"
                    value={selectedPromotion?.display_name}
                    setValue={(val) =>
                        setSelectedPromotion(promotionOptions.find((item) => item.display_name === val))
                    }
                    options={promotionOptions.map((item) => item.display_name)}
                />
                <TextInputBox placeholder="Promotion Content" value={content} setValue={setContent} />
                <DropdownBox
                    placeholder="Promotion Duration"
                    value={selectedDuration?.label}
                    setValue={(val) => setSelectedDuration(durationOptions.find((d) => d.label === val))}
                    options={durationOptions.map((d) => d.label)}
                />
                <GradientTextButton label="Promote" onPress={onPromote} />
            </View>
            <Spacer height={50} />

            {summary && (
                <View style={styles.card}>
                    <Text style={styles.cardHeader}>Promotion Summary</Text>

                    <View style={styles.row}>
                        <Text style={styles.label}>Start Date:</Text>
                        <Text style={styles.value}>{summary.startDate}</Text>
                    </View>

                    <View style={styles.row}>
                        <Text style={styles.label}>Expiry Date:</Text>
                        <Text style={styles.value}>{summary.endDate}</Text>
                    </View>

                    <View style={[styles.row, styles.priceRow]}>
                        <Text style={styles.label}>Total Price:</Text>
                        <Text style={styles.price}>${summary.price}</Text>
                    </View>
                </View>
            )}

        </SafeAreaView>
    );
};

export default CreatePromotion;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.WHITE,
    },
    form: {
        padding: scale(20),
        gap: scale(10),
    },
    card: {
        backgroundColor: Colors.WHITE,
        borderRadius: scale(16),
        padding: scale(20),
        marginHorizontal: scale(20),
        marginTop: scale(20),
        elevation: 6, // Android shadow
        shadowColor: '#000', // iOS shadow
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
    },

    cardHeader: {
        fontSize: scale(18),
        fontWeight: '700',
        color: Colors.THEME,
        marginBottom: scale(12),
        textAlign: 'center',
    },

    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: scale(6),
        borderBottomWidth: 0.5,
        borderBottomColor: '#eee',
    },

    label: {
        fontSize: scale(15),
        fontWeight: '500',
        color: '#555',
    },

    value: {
        fontSize: scale(15),
        fontWeight: '400',
        color: '#222',
    },

    priceRow: {
        marginTop: scale(10),
        borderBottomWidth: 0,
    },

    price: {
        fontSize: scale(18),
        fontWeight: '700',
        color: Colors.THEME,
    },

});
