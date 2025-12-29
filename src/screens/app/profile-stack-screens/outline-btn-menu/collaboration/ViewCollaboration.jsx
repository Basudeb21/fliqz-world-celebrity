import {
    Image,
    ImageBackground,
    StyleSheet,
    Text,
    View,
    FlatList
} from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute } from '@react-navigation/native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import { BackpressTopBar } from '../../../../../components/framework/navbar';
import { Colors } from '../../../../../constants';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { InvitedUserCard } from '../../../../../components/framework/card';
import { DateFormat } from '../../../../../utils/DateFormat';

const ViewCollaboration = () => {
    const route = useRoute();
    const { collaboration } = route.params || {};

    if (!collaboration) {
        return null;
    }

    const {
        title,
        image_url,
        created_at,
        invited_user = [],
    } = collaboration;

    return (
        <SafeAreaView style={styles.areaView}>
            <BackpressTopBar title="View Collaboration" />

            <View style={styles.container}>
                {/* HEADER IMAGE */}
                <ImageBackground
                    source={{ uri: image_url }}
                    style={styles.image}
                    resizeMode="cover"
                >
                    <View style={styles.creatorContainer}>
                        <View>
                            <Text style={styles.collaborationName}>
                                {title}
                            </Text>

                            <Text style={styles.collaborationCreatorName}>
                                Collaboration
                            </Text>

                            <Text style={styles.collaborationDate}>
                                Created at : {DateFormat(created_at)}
                            </Text>
                        </View>

                        {invited_user?.[0]?.avatar && (
                            <Image
                                source={{ uri: invited_user[0].avatar }}
                                style={styles.collaborationCreatorImage}
                            />
                        )}
                    </View>
                </ImageBackground>

                {/* INVITED HEADER */}
                <View style={styles.invitedHeader}>
                    <Text style={styles.invitedTitle}>Invited Users</Text>

                    <View style={styles.userCountBadge}>
                        <FontAwesome5
                            name="users"
                            size={scale(12)}
                            color={Colors.THEME}
                            style={{ marginRight: scale(6) }}
                        />
                        <Text style={styles.userCountText}>
                            {invited_user.length}
                        </Text>
                    </View>
                </View>

                {/* INVITED LIST */}
                <FlatList
                    data={invited_user}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <InvitedUserCard
                            image={item.avatar}
                            fanName={`${item.first_name} ${item.last_name}`}
                            fanActiveTime={item.last_active_at || 'Offline'}
                            onPress={() => console.log(item.name)}
                        />
                    )}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: verticalScale(20) }}
                />
            </View>
        </SafeAreaView>
    );
};


export default ViewCollaboration;


const styles = StyleSheet.create({
    areaView: {
        flex: 1,
        backgroundColor: Colors.THEME
    },
    container: {
        backgroundColor: Colors.WHITE,
        flex: 1
    },
    image: {
        height: verticalScale(200),
        width: "100%"

    },
    creatorContainer: {
        backgroundColor: Colors.TRANSPARENT_BLACK,
        position: "absolute",
        bottom: 0,
        width: "100%",
        height: verticalScale(120),
        padding: scale(10),
        flexDirection: "row",
        justifyContent: "space-between"
    },
    invitedHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: scale(15),
        paddingVertical: verticalScale(12),
    },

    invitedTitle: {
        fontSize: scale(14),
        fontWeight: '800',
        color: Colors.BLACK,
    },

    userCountBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.THEME_TRANSPARENT,
        paddingHorizontal: scale(10),
        paddingVertical: verticalScale(6),
        borderRadius: scale(20),
    },

    userCountText: {
        fontSize: scale(12),
        fontWeight: '700',
        color: Colors.THEME,
    },

    collaborationName: {
        color: Colors.WHITE,
        fontWeight: "600",
        fontSize: scale(12),
        // backgroundColor: Colors.THEME_TRANSPARENT,
        // alignSelf: "center",
        // padding: scale(10),
        borderRadius: scale(12)
    },
    collaborationDate: {
        fontSize: scale(12),
        fontWeight: "600",
        color: Colors.WHITE
    },
    collaborationCreatorImage: {
        height: "100%",
        width: moderateScale(90),
        borderRadius: scale(12)
    },
    collaborationCreatorName: {
        // marginTop: verticalScale(10),
        fontSize: scale(12),
        fontWeight: "800",
        color: Colors.WHITE
    }

})