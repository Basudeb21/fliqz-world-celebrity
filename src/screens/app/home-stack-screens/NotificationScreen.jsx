import { FlatList, StyleSheet } from 'react-native'
import React from 'react'
import { Colors } from '../../../constants'
import { SafeAreaView } from 'react-native-safe-area-context'
import { dummyNotifications } from '../../../data/dummyNotification'
import { NotificationCard } from '../../../components/framework/card'
import { BackpressTopBar } from '../../../components/framework/navbar'
import { Spacer } from '../../../components/framework/boots'



const NotificationScreen = () => {
    const notifications = dummyNotifications;
    return (
        <SafeAreaView style={styles.container}>
            <BackpressTopBar title={"Notifications"} />
            <FlatList
                ListHeaderComponent={<Spacer height={15} />}
                data={notifications}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <NotificationCard
                        userImage={item.userImage}
                        userName={item.userName}
                        notification={item.notification}
                        time={item.time}
                    />
                )}
                showsVerticalScrollIndicator={false}
                ItemSeparatorComponent={<Spacer height={12} />}
                ListFooterComponent={<Spacer height={10} />}
            />
        </SafeAreaView>
    )
}

export default NotificationScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.WHITE
    },
})
