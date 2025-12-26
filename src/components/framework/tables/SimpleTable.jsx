import { FlatList, Image, StyleSheet, Text, View, ActivityIndicator, RefreshControl } from 'react-native';
import React, { useState } from 'react';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { Colors } from '../../../constants';
import Entypo from 'react-native-vector-icons/dist/Entypo';
import { HR, Spacer } from '../boots';
import { SearchBar } from '../input';

const SimpleTable = ({ data = [], loading = false, type = "subscriptions", onRefresh, refreshing = false }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const formatTableData = () => {
        if (!data || !Array.isArray(data)) return [];

        return data.map(item => {
            if (type === "subscriptions") {
                return {
                    id: item.id?.toString(),
                    image: item.user?.avatar || 'https://via.placeholder.com/30',
                    userName: item.user?.name || 'N/A',
                    userID: `@${item.user?.username || 'user'}`,
                    status: item.status || 'Unknown',
                    paymentType: `$${item.amount || '0'}`,
                    renew: item.subscription?.label || 'General',
                    expireOn: item.expires?.split(' ')[0] || 'N/A',
                    rawData: item
                };
            } else {
                return {
                    id: item.id?.toString(),
                    image: item.avatar || 'https://via.placeholder.com/30',
                    userName: item.name || 'N/A',
                    userID: `@${item.username || 'user'}`,
                    status: 'Active',
                    paymentType: 'Credit Card',
                    renew: 'Monthly',
                    expireOn: item.expires_at?.split('T')[0] || 'N/A',
                    rawData: item
                };
            }
        });
    };

    const filteredData = formatTableData().filter(item =>
        item.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.userID.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const renderHeader = () => (
        <>
            <Spacer height={20} />
            <SearchBar
                placeholder="Search"
                value={searchQuery}
                onChangeText={setSearchQuery}
            />
            <View style={styles.head}>
                <Text style={styles.headTxt}>To</Text>
                <Spacer width={60} />
                <Text style={styles.headTxt}>Status</Text>
                <Text style={styles.headTxt}>Amount</Text>
                <Text style={styles.headTxt}>Plan</Text>
                <Text style={styles.headTxt}>Expires</Text>
                <Text style={styles.headTxt}> </Text>
            </View>
            <Spacer height={10} />
            <HR height={1} width='94%' center={true} />
        </>
    );

    const renderItem = ({ item }) => (
        <>
            <View style={styles.bodyRow}>
                <View style={styles.userInfoContainer}>
                    <Image
                        source={{ uri: item.image }}
                        style={styles.image}
                        onError={() => console.log("Failed to load image:", item.image)}
                    />
                    <View style={styles.userNameContainer}>
                        <Text style={styles.userName} numberOfLines={1}>{item.userName}</Text>
                        <Text style={styles.userID} numberOfLines={1}>{item.userID}</Text>
                    </View>
                </View>
                <View style={styles.statusContainer}>
                    <Text style={[
                        styles.status,
                        item.status === 'Active' && styles.activeStatus,
                        item.status === 'Cancelled' && styles.cancelledStatus
                    ]}>
                        {item.status}
                    </Text>
                </View>
                <Text style={styles.amount}>{item.paymentType}</Text>
                <Text style={styles.plan}>{item.renew}</Text>
                <Text style={styles.expireDate}>{item.expireOn}</Text>
                <Entypo
                    name="dots-three-horizontal"
                    size={14}
                    color={Colors.BLACK}
                    onPress={() => console.log("Options for:", item.userName)}
                />
            </View>
            <Spacer height={10} />
            <HR height={1} width='94%' center={true} />
        </>
    );

    const renderEmptyComponent = () => (
        <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
                {loading ? 'Loading...' : 'No data found'}
            </Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={filteredData}
                keyExtractor={(item) => item.id}
                ListHeaderComponent={renderHeader}
                renderItem={renderItem}
                ListFooterComponent={<Spacer height={20} />}
                ListEmptyComponent={renderEmptyComponent}
                contentContainerStyle={styles.scrollContent}
                refreshControl={
                    onRefresh ? (
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                            colors={[Colors.THEME]}
                            tintColor={Colors.THEME}
                        />
                    ) : null
                }
            />
            {loading && (
                <View style={styles.loadingOverlay}>
                    <ActivityIndicator size="large" color={Colors.THEME} />
                </View>
            )}
        </View>
    );
};

export default SimpleTable;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
    },
    head: {
        flexDirection: "row",
        marginHorizontal: moderateScale(15),
        justifyContent: "space-between",
        marginTop: verticalScale(10)
    },
    headTxt: {
        fontWeight: "500",
        fontSize: scale(10),
        color: Colors.PLACEHOLDER,
        flex: 1,
        textAlign: 'center'
    },
    bodyRow: {
        flexDirection: "row",
        marginTop: verticalScale(10),
        marginHorizontal: moderateScale(15),
        justifyContent: "space-between",
        alignItems: "center"
    },
    image: {
        height: verticalScale(30),
        width: moderateScale(35),
        borderRadius: scale(100),
        backgroundColor: Colors.LIGHT_GRAY
    },
    userInfoContainer: {
        flexDirection: "row",
        alignItems: "center",
        flex: 2
    },
    userNameContainer: {
        marginStart: moderateScale(10),
        flex: 1
    },
    userName: {
        color: Colors.BLACK,
        fontSize: scale(10),
        fontWeight: "600",
        maxWidth: moderateScale(80)
    },
    userID: {
        color: Colors.PLACEHOLDER,
        fontSize: scale(8),
        fontWeight: "400",
        maxWidth: moderateScale(80)
    },
    statusContainer: {
        flex: 1,
        alignItems: 'center'
    },
    status: {
        fontSize: scale(9),
        fontWeight: "500",
        paddingHorizontal: scale(5),
        paddingVertical: scale(2),
        borderRadius: scale(4)
    },
    activeStatus: {
        color: Colors.GREEN,
        backgroundColor: Colors.LIGHT_GREEN
    },
    cancelledStatus: {
        color: Colors.RED,
        backgroundColor: Colors.LIGHT_RED
    },
    amount: {
        color: Colors.BLACK,
        fontSize: scale(9),
        fontWeight: "600",
        flex: 1,
        textAlign: 'center'
    },
    plan: {
        color: Colors.PLACEHOLDER,
        fontSize: scale(9),
        fontWeight: "400",
        flex: 1,
        textAlign: 'center'
    },
    expireDate: {
        color: Colors.PLACEHOLDER,
        fontSize: scale(9),
        fontWeight: "400",
        flex: 1,
        textAlign: 'center'
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: verticalScale(50)
    },
    emptyText: {
        color: Colors.GRAY,
        fontSize: scale(14),
        textAlign: 'center'
    },
    loadingOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        justifyContent: 'center',
        alignItems: 'center'
    }
});