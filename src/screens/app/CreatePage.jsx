import { StyleSheet, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import BackpressTopBar from '../../components/framework/navbar/BackpressTopBar';
import TextArea from '../../components/framework/input/TextArea';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import IconTxtHRInputButton from '../../components/framework/button/IconTxtHRInputButton';
import Fontisto from 'react-native-vector-icons/dist/Fontisto'
import Ionicons from 'react-native-vector-icons/dist/Ionicons'
import AntDesign from 'react-native-vector-icons/dist/AntDesign'
import Spacer from '../../components/framework/boots/Spacer';
import GradientTextButton from '../../components/framework/button/GradientTextButton';
import OutLineButton from '../../components/framework/button/OutLineButton';

const CreatePage = () => {
    return (
        <SafeAreaView>
            <BackpressTopBar title={"New Post"} />
            <View style={styles.container}>
                <TextArea placeholder='Write a new post, drag and drop files to add attachments.' height={150} />

                <View style={styles.iconBtnContainer}>

                    <IconTxtHRInputButton
                        Icon={Fontisto}
                        icnonName={"photograph"}
                        label={"Photos/Videos"}
                    />
                    <Spacer height={15} />
                    <IconTxtHRInputButton
                        Icon={Ionicons}
                        icnonName={"notifications"}
                        label={"Notification"}
                    />
                    <Spacer height={15} />
                    <IconTxtHRInputButton
                        Icon={AntDesign}
                        icnonName={"calendar"}
                        label={"Schedule"}
                    />
                </View>
                <View>
                    <Spacer height={40} />
                    <GradientTextButton label='Post' />
                    <Spacer height={15} />
                    <OutLineButton label_two={"Clear"} />
                </View>
            </View>

        </SafeAreaView>
    )
}

export default CreatePage

const styles = StyleSheet.create({
    container: {
        marginHorizontal: moderateScale(20),
        marginTop: verticalScale(10)
    },
    iconBtnContainer: {
        marginTop: verticalScale(20)
    }
})