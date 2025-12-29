import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRoute, useNavigation } from '@react-navigation/native'
import { BackpressTopBar } from '../../../../components/framework/navbar'
import { Colors, NavigationStrings } from '../../../../constants'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import Ionicons from 'react-native-vector-icons/Ionicons'
import LinearGradient from 'react-native-linear-gradient'
import { helpAndSupportCards } from '../../../../data/helpAndSupportCards'
import { GradientIconTextCard, GradientIconTextCardBig } from '../../../../components/framework/card'
import { Spacer } from '../../../../components/framework/boots'

const FAQ = () => {
    const route = useRoute()
    const navigation = useNavigation()
    const { faqData } = route.params || {}
    const [openId, setOpenId] = useState(null)

    const toggleItem = (id) => {
        setOpenId(openId === id ? null : id)
    }

    const renderItem = ({ item }) => {
        const isOpen = openId === item.id
        return (
            <View style={styles.card}>
                <TouchableOpacity activeOpacity={0.8} onPress={() => toggleItem(item.id)}>
                    {isOpen ? (
                        <LinearGradient
                            colors={[Colors.BUTTON_GRADIENT_ONE, Colors.BUTTON_GRADIENT_TWO]}
                            style={styles.head}>
                            <Text style={[styles.question, { color: Colors.WHITE }]}>{item.label}</Text>
                            <Ionicons
                                name={isOpen ? "chevron-up" : "chevron-down"}
                                size={20}
                                color={Colors.WHITE}
                            />
                        </LinearGradient>
                    ) : (
                        <View style={[styles.head, { backgroundColor: Colors.WHITE }]}>
                            <Text style={[styles.question, { color: Colors.BLACK }]}>{item.label}</Text>
                            <Ionicons
                                name={isOpen ? "chevron-up" : "chevron-down"}
                                size={20}
                                color={Colors.BLACK}
                            />
                        </View>
                    )}
                </TouchableOpacity>

                {isOpen && (
                    <View style={styles.body}>
                        <Text style={styles.answer}>{item.answer}</Text>
                    </View>
                )}
            </View>
        )
    }

    // Get related topics using IDs
    const relatedTopics = helpAndSupportCards.filter((card) =>
        faqData?.relatedTopics?.includes(card.id)
    )

    const onPressFAQHandler = (item) => {
        navigation.push(NavigationStrings.PROFILE_FAQ_SCREEN, {
            faqData: item,
        })
    }

    return (
        <SafeAreaView style={styles.areaView}>
            <BackpressTopBar title={faqData?.label || "FAQ"} />

            <FlatList
                style={styles.container}
                data={faqData?.data || []}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={{ padding: 16 }}
                renderItem={renderItem}
                ListFooterComponent={
                    relatedTopics.length > 0 && (
                        <View style={{ marginTop: 20 }}>
                            <Text style={styles.relatedTitle}>Related Topics</Text>
                            <Spacer height={15} />
                            <FlatList
                                data={relatedTopics}
                                keyExtractor={(item) => item.id.toString()}
                                showsHorizontalScrollIndicator={false}
                                ItemSeparatorComponent={() => <Spacer width={12} />}
                                renderItem={({ item }) => (
                                    <GradientIconTextCardBig
                                        Icon={item.Icon}
                                        iconName={item.iconName}
                                        label={item.label}
                                        content={item.content}
                                        onPress={() => onPressFAQHandler(item)}
                                    />
                                )}
                            />
                        </View>
                    )
                }
            />
        </SafeAreaView>
    )
}

export default FAQ

const styles = StyleSheet.create({
    areaView: {
        flex: 1,
        backgroundColor: Colors.THEME
    },
    container: {
        backgroundColor: Colors.WHITE,
        flex: 1
    },
    card: {
        borderRadius: scale(8),
        marginBottom: verticalScale(12),
        borderWidth: scale(1),
        borderColor: Colors.THEME,
        overflow: 'hidden',
    },
    head: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: moderateScale(12),
        paddingVertical: verticalScale(12),
        borderTopLeftRadius: scale(8),
        borderTopRightRadius: scale(8),
    },
    body: {
        paddingHorizontal: moderateScale(12),
        paddingVertical: verticalScale(10),
        backgroundColor: Colors.DULL_WHITE,
    },
    question: {
        fontSize: scale(16),
        fontWeight: '600',
        maxWidth: "90%",
    },
    answer: {
        fontSize: scale(14),
        color: Colors.BLACK,
    },
    relatedTitle: {
        fontSize: scale(18),
        fontWeight: "700",
        marginBottom: verticalScale(8),
        color: Colors.BLACK,
    },
})
