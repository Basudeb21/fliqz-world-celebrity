import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { moderateScale } from 'react-native-size-matters';
import CommonSuggestionImageGroup from './CommonSuggestionImageGroup';
import { Images } from '../../../constants';

const FollowedByImageAndName = ({ followers = [], totalCount = 0 }) => {
    const names = followers.map(f => f.name).filter(Boolean);
    const avatars = followers.map(f => f.avatar || Images.DEFAULT_AVATAR);

    return (
        <View style={styles.container}>
            <CommonSuggestionImageGroup images={avatars} />

            <Text style={styles.normalTxt}>
                Followed by{" "}
                {names.map((name, index) => (
                    <Text key={index} style={styles.commonNames}>
                        {name}
                        {index < names.length - 1 ? ", " : ""}
                    </Text>
                ))}
                {totalCount > 3 && (
                    <> and <Text style={styles.commonNames}>{totalCount - 3} others</Text></>
                )}
            </Text>
        </View>
    );
};


export default FollowedByImageAndName;

const styles = StyleSheet.create({
    container: {
        marginStart: moderateScale(20),
        marginRight: moderateScale(10),
        flexDirection: "row",
        alignItems: "center",
    },
    normalTxt: {
        flexShrink: 1,
        marginLeft: moderateScale(15),
    },
    commonNames: {
        fontWeight: "600",
    },
});
