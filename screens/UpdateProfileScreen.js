import { View, Text, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { useNavigation } from "@react-navigation/native";

export default function UpdateProfileScreen({ route }) {
  const { type } = route.params;
  const navigation = useNavigation();
  const user = AsyncStorage.getItem("user");
  return (
    <View>
      <Text>Type : {type}</Text>
      <Text>User : {JSON.stringify(user)}</Text>
      <Button
        title="Logout"
        onPress={() => {
          AsyncStorage.removeItem("user");
          navigation.navigate("HomeMain");
        }}
      />
    </View>
  );
}
