import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import RoundHighLight from '../../../components/framework/iamge/RoundHighLight'
import { Colors, Images } from '../../../constants'
import { moderateScale, verticalScale } from 'react-native-size-matters'
import Spacer from '../../../components/framework/boots/Spacer'
import { SafeAreaView } from 'react-native-safe-area-context'

const ProfileHighlightPostArea = () => {
    const highlight = [
        { id: 1, image: Images.STORY_ONE, name: "Highlight1" },
        { id: 2, image: Images.STORY_TWO, name: "Highlight2" },
        { id: 3, image: Images.STORY_THREE, name: "Highlight3" },
        { id: 4, image: Images.STORY_FOUR, name: "Highlight4" },
        { id: 5, image: Images.STORY_FIVE, name: "Highlight5" },
        { id: 6, image: Images.STORY_ONE, name: "Highlight6" },
        { id: 7, image: Images.STORY_TWO, name: "Highlight7" },
        { id: 8, image: Images.STORY_THREE, name: "Highlight8" },
        { id: 9, image: Images.STORY_FOUR, name: "Highlight9" },
        { id: 10, image: Images.STORY_FIVE, name: "Highlight10" }

    ]
    return (
        <SafeAreaView>
            <ScrollView horizontal style={styles.container} showsHorizontalScrollIndicator={false}>
                {highlight.map(item => (
                    <RoundHighLight key={item.id} image={item.image} name={item.name} />
                ))}
                <Spacer width={10} />
            </ScrollView>
        </SafeAreaView>
    )
}

export default ProfileHighlightPostArea

const styles = StyleSheet.create({
    container: {
    },
})