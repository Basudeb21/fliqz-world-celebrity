import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors, NavigationStrings } from '../../../../constants'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { helpAndSupportCards } from '../../../../data/helpAndSupportCards'
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons'
import { GradientIconTextCard } from '../../../../components/framework/card'
import { FloatingActionButton, GradientIconButton, SupportFloatingActionButton } from '../../../../components/framework/button'
import { Spacer } from '../../../../components/framework/boots'
import { BackpressTopBar } from '../../../../components/framework/navbar'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'


const HelpAndSettingsScreen = () => {
    const cardContents = helpAndSupportCards;
    const navigation = useNavigation();
    const onPressFAQHandler = (item) => {
        navigation.navigate(NavigationStrings.PROFILE_FAQ_SCREEN, {
            faqData: item,
        });
    };


    const onPressOpenChatBot = () => {
        navigation.navigate(NavigationStrings.SETTINGS_CHAT_BOT);
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.WHITE }}>
            <BackpressTopBar title={"Help and Support"} />
            <Spacer height={10} />
            <Text style={styles.updateTxt}>Last updated: 2025-05-06</Text>
            <Spacer height={10} />
            <FlatList
                data={cardContents}
                keyExtractor={(item) => item.id.toString()}
                numColumns={2}
                columnWrapperStyle={styles.row}
                renderItem={({ item }) => (
                    <GradientIconTextCard
                        Icon={item.Icon}
                        iconName={item.iconName}
                        label={item.label}
                        content={item.content}
                        onPress={() => onPressFAQHandler(item)}
                    />

                )}
                contentContainerStyle={styles.contentContainer}
                showsVerticalScrollIndicator={false}
                ListFooterComponent={
                    <>
                        <Text style={styles.bigTxt}>Looking for something else?</Text>
                        <Spacer height={20} />
                        <GradientIconButton Icon={MaterialIcons} iconName={"add-circle"} iconSize={20} label='Add Support Ticket' />
                        <Spacer height={40} />
                    </>
                }
            />
            <View>
                <SupportFloatingActionButton onPress={onPressOpenChatBot} />
            </View>
        </SafeAreaView>
    )
}

export default HelpAndSettingsScreen

const styles = StyleSheet.create({
    updateTxt: {
        color: Colors.PLACEHOLDER,
        fontWeight: "500",
        fontSize: scale(16),
        marginStart: moderateScale(20)
    },
    contentContainer: {
        marginHorizontal: moderateScale(10),
        marginTop: verticalScale(20),
    },
    row: {
        justifyContent: 'space-between',
    },
    bigTxt: {
        fontSize: scale(20),
        alignSelf: "center",
        fontWeight: "800"
    }
})