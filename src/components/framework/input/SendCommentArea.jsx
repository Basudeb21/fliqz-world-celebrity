import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../../constants';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { GradientIcon } from '../icon';


const SendCommentArea = ({
    placeholder = "",
    bgColor,
    fontColor,
    value,
    setValue,
    onPress
}) => {


    return (
        <View style={[styles.container, { backgroundColor: bgColor || Colors.LIGHT_GRAY }]}>
            <TextInput
                style={[styles.inputBox, { color: fontColor || Colors.BLACK }]}
                placeholder={placeholder}
                placeholderTextColor={Colors.PLACEHOLDER}
                cursorColor={fontColor || Colors.BLACK}
                value={value}
                onChangeText={setValue}
                multiline={true}
                scrollEnabled={true}
                onSubmitEditing={onPress}
                blurOnSubmit={false}
            />
            <View style={styles.btnContainer}>
                <TouchableOpacity
                    style={styles.icon}
                    onPress={onPress}
                >
                    <GradientIcon
                        name={"send-circle"}
                        size={32}
                        IconPack={MaterialCommunityIcons}
                        colors={[Colors.BUTTON_GRADIENT_ONE, Colors.BUTTON_GRADIENT_TWO]}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default SendCommentArea;

const styles = StyleSheet.create({
    container: {
        marginHorizontal: moderateScale(14),
        borderRadius: 100,
        paddingHorizontal: moderateScale(15),
        paddingVertical: verticalScale(6),
        flexDirection: "row",
        alignItems: "flex-end",
        marginBottom: verticalScale(10),
        marginTop: verticalScale(10),
        position: "absolute",
        bottom: 0,
        alignSelf: "center"
    },
    inputBox: {
        flex: 1,
        maxHeight: verticalScale(120),
        paddingRight: moderateScale(10),
    },
    btnContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    icon: {
        marginLeft: moderateScale(8),
        paddingBottom: verticalScale(4),
    }
});
