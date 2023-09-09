import { View, Pressable, StyleSheet } from "react-native";
import React from "react";

import { Ionicons } from "@expo/vector-icons";

export default function IconButton({ icon, size, color, onPress }) {
  return (
    <View style={styles.buttonContainer}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [pressed && styles.pressed]}
      >
        <Ionicons name={icon} size={size} color={color} onPress={onPress} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 24,
    padding: 6,
    marginHorizontal: 8,
    marginVertical: 2,
  },
  pressed: {
    opacity: 0.5,
  },
});
