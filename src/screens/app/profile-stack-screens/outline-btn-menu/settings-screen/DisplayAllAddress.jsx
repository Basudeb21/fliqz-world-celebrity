import { StyleSheet, View, FlatList, ToastAndroid } from 'react-native';
import React, { useCallback, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AddressCard } from '../../../../../components/framework/card';
import { moderateScale, scale } from 'react-native-size-matters';
import { Colors, NavigationStrings } from '../../../../../constants';
import { BackpressTopBar } from '../../../../../components/framework/navbar';
import { Spacer } from '../../../../../components/framework/boots';
import { useSelector } from 'react-redux';
import { AllAddressApi, DeleteAddressApi } from '../../../../../api/app/address';
import { FloatingActionButton } from '../../../../../components/framework/button';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

const DisplayAllAddress = () => {
    const [addresses, setAddresses] = useState([]);
    const token = useSelector(state => state.auth.token);
    const navigation = useNavigation();

    const fetchAddresses = useCallback(async () => {
        const res = await AllAddressApi({ token });
        if (res && res.success) {
            setAddresses(res.data);
        }
    }, [token]);

    useFocusEffect(
        useCallback(() => {
            fetchAddresses();
        }, [fetchAddresses])
    );

    const onPressEdit = (item) => {
        navigation.navigate(NavigationStrings.SETTINGS_UPDATE_ADDRESS, {
            data: item
        });
    };

    const onPressDelete = async (id) => {
        const oldAddresses = [...addresses];
        setAddresses(prev => prev.filter(addr => addr.id !== id));

        const res = await DeleteAddressApi({ token, id });
        console.log("Delete API Response:", res);

        if (res && res.success) {
            ToastAndroid.show(res.message, ToastAndroid.SHORT);
            fetchAddresses();
        } else {
            ToastAndroid.show(res.message || "Delete failed", ToastAndroid.LONG);
            setAddresses(oldAddresses);
        }
    };

    const renderItem = ({ item }) => (
        <AddressCard
            data={item}
            onPressEdit={() => onPressEdit(item)}
            onPressDelete={() => onPressDelete(item.id)}
        />
    );

    const onPressOpenNewAddress = () => {
        navigation.navigate(NavigationStrings.SETTINGS_EDIT_ADDRESS_SCREEN);
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <BackpressTopBar title="All Addresses" />
            <View style={styles.container}>
                <Spacer height={scale(12)} />
                <FlatList
                    data={addresses}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                    numColumns={2}
                    columnWrapperStyle={{
                        justifyContent: 'space-between',
                        marginBottom: scale(12),
                    }}
                    showsVerticalScrollIndicator={false}
                />
            </View>
            <FloatingActionButton style={{ bottom: 90 }} onPress={onPressOpenNewAddress} />
        </SafeAreaView>
    );
};

export default DisplayAllAddress;

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: moderateScale(5),
        backgroundColor: Colors.WHITE,
        flex: 1,
        gap: scale(10),
    },
});
