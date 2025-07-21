import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { Colors, Images } from '../../../constants'
import SuggestionUserCard from '../../../components/framework/card/SuggestionUserCard'
import { SafeAreaView } from 'react-native-safe-area-context'

const SuggestionArea = () => {
    const suggestionUsers = [
        { id: '1', image: Images.CELEBRITY_AVATAR_ONE },
        { id: '2', image: Images.CELEBRITY_AVATAR_TWO },
        { id: '3', image: Images.CELEBRITY_AVATAR_THREE },
        { id: '4', image: Images.CELEBRITY_AVATAR_FOUR },
        { id: '5', image: Images.CELEBRITY_AVATAR_FIVE },
    ];
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={styles.suggestionTxt}>Suggestions for you</Text>
                <TouchableOpacity>
                    <Text style={styles.seeAllTxt}>See all</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={suggestionUsers}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <SuggestionUserCard userImage={item.image} />
                )}
                horizontal
                showsHorizontalScrollIndicator={false}
                ItemSeparatorComponent={() => <View style={{ width: 5 }} />}
                contentContainerStyle={{ paddingHorizontal: 5 }}
            />
        </SafeAreaView>
    )
}

export default SuggestionArea

const styles = StyleSheet.create({
    textContainer: {
        marginStart: moderateScale(10),
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: verticalScale(10),
        marginEnd: moderateScale(10)
    },
    suggestionTxt: {
        fontSize: scale(14),
        fontWeight: "500"
    },
    seeAllTxt: {
        fontSize: scale(12),
        fontWeight: "500",
        color: Colors.THEME,
        borderWidth: scale(1),
        paddingHorizontal: moderateScale(5),
        paddingVertical: verticalScale(2),
        borderRadius: scale(6),
        borderColor: Colors.THEME
    }
})