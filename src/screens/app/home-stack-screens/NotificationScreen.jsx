import { FlatList, StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors } from '../../../constants'
import { SafeAreaView } from 'react-native-safe-area-context'
import { NotificationCard } from '../../../components/framework/card'
import { BackpressTopBar } from '../../../components/framework/navbar'
import { Spacer } from '../../../components/framework/boots'
import { GetAllNotification } from '../../../api/app/notification'
import { useSelector } from 'react-redux'



const NotificationScreen = () => {
    const token = useSelector(state => state.auth.token);
    const [notifications, setNotifications] = useState([]);
    const fetchAllNotification = async () => {
        const res = await GetAllNotification(token);
        if (res?.data) {
            setNotifications(res.data);
        }
    };


    useEffect(() => {
        fetchAllNotification();
    }, [])
    return (
        <SafeAreaView style={styles.areaView}>
            <View style={styles.container}>
                <BackpressTopBar title={"Notifications"} />
                <FlatList
                    ListHeaderComponent={<Spacer height={15} />}
                    data={notifications}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <NotificationCard
                            userImage={item.avatars[0]}
                            userName={item.title}
                            notification={item.description}
                            time={item.time}
                        />
                    )}
                    showsVerticalScrollIndicator={false}
                    ItemSeparatorComponent={<Spacer height={12} />}
                    ListFooterComponent={<Spacer height={10} />}
                />
            </View>
        </SafeAreaView>
    )
}

export default NotificationScreen

const styles = StyleSheet.create({
    areaView: {
        flex: 1,
        backgroundColor: Colors.THEME
    },
    container: {
        backgroundColor: Colors.WHITE,
        flex: 1,
    }
})
