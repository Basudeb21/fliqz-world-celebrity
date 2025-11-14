import { StyleSheet, Text, View, FlatList } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { Colors } from '../../../constants'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'

const QuizDisplayModal = ({ text, pollAnswers }) => {
    const renderAnswer = ({ item }) => (
        <View style={styles.pollAnswersCard}>
            <Text style={styles.pollAnswers}>{item.answer}</Text>
            <Text style={styles.pollAnswersPercentage}>{item.percentage}%</Text>
        </View>
    )

    return (
        <View style={styles.card}>
            <LinearGradient
                colors={[Colors.BUTTON_GRADIENT_ONE, Colors.BUTTON_GRADIENT_TWO]}
                start={{ x: 0, y: 3 }}
                end={{ x: 1, y: 0 }}
                style={styles.cardHead}
            >
                <Text style={styles.pollQuestion}>{text}</Text>
            </LinearGradient>

            <View style={styles.cardBody}>
                <FlatList
                    data={pollAnswers}
                    keyExtractor={(_, index) => index.toString()}
                    renderItem={renderAnswer}
                    style={{ maxHeight: verticalScale(130) }}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </View>
    )
}

export default QuizDisplayModal

const styles = StyleSheet.create({
    card: {
        overflow: 'hidden',
        elevation: 3,
        shadowColor: Colors.BLACK,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        minWidth: moderateScale(150),
        maxWidth: moderateScale(350),
        minHeight: verticalScale(50),
        maxHeight: verticalScale(180),
        alignSelf: 'center',
        borderRadius: moderateScale(6),
    },
    cardHead: {
        paddingVertical: verticalScale(8),
        paddingHorizontal: moderateScale(18),
        justifyContent: 'center',
        borderTopRightRadius: moderateScale(6),
        borderTopLeftRadius: moderateScale(6),
    },
    pollQuestion: {
        color: Colors.WHITE,
        fontSize: scale(12),
        fontWeight: '600',
        textAlign: 'center',
    },
    cardBody: {
        padding: moderateScale(12),
        backgroundColor: Colors.WHITE,
        borderBottomRightRadius: moderateScale(6),
        borderBottomLeftRadius: moderateScale(6),
    },
    pollAnswersCard: {
        padding: moderateScale(10),
        borderRadius: moderateScale(6),
        backgroundColor: Colors.DULL_WHITE,
        marginVertical: 6,
        height: verticalScale(35),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    pollAnswers: {
        fontSize: scale(14),
        color: Colors.BLACK,
    },
    pollAnswersPercentage: {
        fontSize: scale(12),
        color: Colors.DARK_GREY,
    },
})
