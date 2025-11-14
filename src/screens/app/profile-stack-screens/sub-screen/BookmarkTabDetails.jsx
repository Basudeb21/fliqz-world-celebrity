import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../../../constants';
import { SharedPost } from '../../../../components/framework/card';
import { Spacer } from '../../../../components/framework/boots';

const BookmarkTabDetails = ({ data = [] }) => {
    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={data}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <SharedPost
                        userAvatar={item.user?.avatar}
                        userName={item.user?.name}
                        postText={item.text}
                        createdAt={item.created}
                        crowdfunding={item.crowedfunding}
                        data={item}
                        badges={item.user?.badge}
                    />
                )}
                ItemSeparatorComponent={() => <Spacer height={10} />}
                contentContainerStyle={styles.scrollContent}
            />
        </SafeAreaView>
    );
};

export default BookmarkTabDetails;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.WHITE,
    },
    scrollContent: {
        paddingBottom: moderateScale(20),
    },
});
