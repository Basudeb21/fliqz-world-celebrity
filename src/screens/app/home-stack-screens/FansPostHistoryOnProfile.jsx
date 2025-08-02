import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Fontisto from 'react-native-vector-icons/Fontisto'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { moderateScale } from 'react-native-size-matters'
import { Colors, NavigationStrings } from '../../../constants'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import { PostImage } from '../../../components/framework/iamge'

const FansPostHistoryOnProfile = ({ data = [] }) => {
    console.log('Received data:', data);
    const navigation = useNavigation();

    const handelOnPressPost = (item) => {
        navigation.navigate(NavigationStrings.HOME_VIEW_PROFILE_POST, { post: item });
    };


    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={data}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                columnWrapperStyle={styles.row}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => handelOnPressPost(item)}>
                        <PostImage
                            image={item.image}
                            Icon={item.type === "image" ? Fontisto : MaterialIcons}
                            iconName={item.type === "image" ? "photograph" : "video-collection"}
                        />
                    </TouchableOpacity>
                )}
                contentContainerStyle={styles.scrollContent}
            />
        </SafeAreaView>
    )
}

export default FansPostHistoryOnProfile

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.WHITE
    },
    row: {
        marginHorizontal: moderateScale(10),
        justifyContent: 'flex-start',
        gap: moderateScale(10),
    }
})
