import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Colors } from '../../../constants'
import { scale, verticalScale } from 'react-native-size-matters'
import { HR } from '../boots'

const SuggestionSearchedUser = ({ users = [] }) => {

  const userPlate = (user) => (
    <TouchableOpacity style={{ flex: 1, width: "100%" }}>
      <Text style={styles.nameText}>{user.name}</Text>
      <HR width='100%' />
    </TouchableOpacity>
  );

  return (
    <View style={styles.card}>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => userPlate(item)}
        contentContainerStyle={styles.scrollContent}
        style={{ width: "100%" }}
        showsVerticalScrollIndicator={true}
      />
    </View>
  );
};


export default SuggestionSearchedUser;

const styles = StyleSheet.create({
  card: {
    borderColor: Colors.SILVER,
    borderWidth: scale(2),
    padding: scale(12),
    width: "100%",
    borderRadius: scale(12),
    maxHeight: verticalScale(120),
  },
  nameText: {
    fontSize: scale(14),
    color: Colors.BLACK,
    paddingVertical: scale(6),
  },
  scrollContent: {
    paddingBottom: scale(4),
  },
});
