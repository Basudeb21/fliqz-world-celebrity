import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { BackpressTopBar } from '../../../../../components/framework/navbar'
import { Colors } from '../../../../../constants'
import { GradientIconButtonNoText, ThemeOutlineIconButton } from '../../../../../components/framework/button'
import { scale } from 'react-native-size-matters'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { HR, Spacer } from '../../../../../components/framework/boots'
import { ChatbotHome, ChatbotMessage } from './chat-bot-mini'

const ChatBotPage = () => {

    const [homeActive, setHomeActive] = useState(false);
    const [messageActive, setMessageActive] = useState(true);

    const onPressHome = () => {
        setHomeActive(!homeActive)
        setMessageActive(!messageActive)
    }

    const onPressMessage = () => {
        setHomeActive(!homeActive)
        setMessageActive(!messageActive)
    }

    return (
        <SafeAreaView style={styles.areaView}>
            <BackpressTopBar title={"Chat Support"} />
            <View style={styles.container}>
                <View style={styles.screen}>
                    {homeActive ? <ChatbotHome /> : <ChatbotMessage />}

                </View>
                <HR height={1} width='95%' center={true} />
                <Spacer height={10} />
                <View style={styles.footer}>
                    {homeActive ?
                        <GradientIconButtonNoText
                            Icon={Ionicons}
                            iconName={"home"}
                            width='48%'
                            iconSize={25}
                            onPress={onPressHome}
                        /> :
                        <ThemeOutlineIconButton
                            Icon={Ionicons}
                            iconName={"home-outline"}
                            width='48%'
                            iconSize={25}
                            onPress={onPressHome}
                        />
                    }
                    {messageActive ?
                        <GradientIconButtonNoText
                            Icon={Ionicons}
                            iconName={"chatbox-ellipses"}
                            width='48%'
                            iconSize={25}
                            onPress={onPressMessage}

                        /> :
                        <ThemeOutlineIconButton
                            Icon={Ionicons}
                            iconName={"chatbox-ellipses-outline"}
                            width='48%'
                            iconSize={25}
                            onPress={onPressMessage}

                        />
                    }
                </View>
            </View>
        </SafeAreaView>
    )
}

export default ChatBotPage

const styles = StyleSheet.create({
    areaView: {
        flex: 1,
        backgroundColor: Colors.THEME
    },
    container: {
        backgroundColor: Colors.WHITE,
        flex: 1
    },
    screen: {
        backgroundColor: Colors.WHITE,
        flex: 1,
    },
    footer: {
        flexDirection: "row",
        justifyContent: "space-around",
        backgroundColor: Colors.WHITE,
        margin: scale(5)
    }
})