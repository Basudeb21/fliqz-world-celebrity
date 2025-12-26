import { FlatList, StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { BackpressTopBar } from '../../../components/framework/navbar'
import { LiveStreamIntroCard } from '../../../components/framework/card'
import { Colors, NavigationStrings } from '../../../constants'
import { scale, verticalScale } from 'react-native-size-matters'
import { Spacer } from '../../../components/framework/boots'
import { useNavigation } from '@react-navigation/native'
import { GetAllStreamsAPI } from '../../../api/app/streams'

const Streams = () => {
    const [liveData, setLiveData] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();

    useEffect(() => {
        const fetchStreams = async () => {
            setLoading(true);
            try {
                const response = await GetAllStreamsAPI();

                if (Array.isArray(response)) {
                    setLiveData(response);
                } else {
                    setLiveData([]);
                }
            } catch (error) {
                console.error("Error fetching streams:", error);
                setLiveData([]);
            } finally {
                setLoading(false);
            }
        };

        fetchStreams();
    }, []);

    const handleShowLive = (item) => {
        navigation.navigate(NavigationStrings.POST_STACK, {
            screen: NavigationStrings.LIVE_SHOWS,
            params: { stream: item }
        });
    };

    return (
        <SafeAreaView style={styles.areaView}>
            <BackpressTopBar title="Streams" />
            <View style={styles.container}>
                <View style={styles.container}>
                    {loading ? (
                        <View style={styles.loaderContainer}>
                            <ActivityIndicator size="large" color={Colors.PRIMARY} />
                        </View>
                    ) : (
                        <FlatList
                            ListHeaderComponent={<Spacer height={20} />}
                            data={liveData}
                            renderItem={({ item }) => (
                                <LiveStreamIntroCard
                                    item={item}
                                    onPress={() => handleShowLive(item)}
                                />
                            )}
                            keyExtractor={item => item.id}
                            numColumns={1}
                            ListEmptyComponent={
                                <View style={styles.emptyContainer}>
                                    <Text style={styles.emptyText}>No live streams available</Text>
                                </View>
                            }
                            ListFooterComponent={<Spacer height={50} />}
                        />
                    )}
                </View>
            </View>
        </SafeAreaView>
    );
};

export default Streams;

const styles = StyleSheet.create({
    areaView: {
        flex: 1,
        backgroundColor: Colors.THEME
    },
    container: {
        flex: 1,
        backgroundColor: Colors.WHITE,
        paddingHorizontal: scale(5),
    },
    row: {
        justifyContent: 'space-between',
        marginBottom: scale(10)
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: verticalScale(100)
    },
    emptyText: {
        fontSize: scale(16),
        color: Colors.SILVER || '#999'
    }
});