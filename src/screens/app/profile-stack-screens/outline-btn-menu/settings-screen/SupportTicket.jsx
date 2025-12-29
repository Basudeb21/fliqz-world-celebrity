import { StyleSheet, FlatList, View } from 'react-native';
import React from 'react';
import { Colors, NavigationStrings } from '../../../../../constants';
import { dummyTickets } from '../../../../../data/dummyTickets';
import { useNavigation } from '@react-navigation/native';
import { FloatingActionButton } from '../../../../../components/framework/button';
import { SupportCard } from '../../../../../components/framework/card';
import { BackpressTopBar } from '../../../../../components/framework/navbar';
import { SafeAreaView } from 'react-native-safe-area-context';


const SupportTicket = () => {
    const navigation = useNavigation();
    const onPressAddTicket = () => {
        navigation.navigate(NavigationStrings.SETTINGS_ADD_SUPPORT_TICKET_SCREEN);
    }
    return (
        <SafeAreaView style={styles.areaView}>
            <BackpressTopBar title={'Support Ticket'} />
            <FlatList
                style={styles.container}
                data={dummyTickets}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <SupportCard
                        ticketHead={item.ticketHead}
                        category={item.category}
                        dateTime={item.dateTime}
                        status={item.status}
                        priority={item.priority}
                    />
                )}
                contentContainerStyle={{ paddingVertical: 10, gap: 10 }}
            />
            <FloatingActionButton onPress={onPressAddTicket} style={{ bottom: 90 }} />
        </SafeAreaView>
    );
};

export default SupportTicket;

const styles = StyleSheet.create({
    areaView: {
        flex: 1,
        backgroundColor: Colors.THEME
    },
    container: {
        backgroundColor: Colors.WHITE,
        flex: 1
    },
});
