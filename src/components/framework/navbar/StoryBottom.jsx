import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SearchBar from '../input/SearchBar'
import ReplyInput from '../input/ReplyInput'

const StoryBottom = () => {
    return (
        <View>
            <ReplyInput placeholder={"Reply"} />
        </View>
    )
}

export default StoryBottom

const styles = StyleSheet.create({})