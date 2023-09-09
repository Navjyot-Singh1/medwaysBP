import { View, Text, Pressable, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/styles";

export default function PrimaryButton({ children, onPress, style }) {
  return (
    <View style={[styles.buttonOuterContainer, style]}>
      <Pressable
        style={({ pressed }) =>
          pressed
            ? [styles.buttonInnerContainer, styles.pressed]
            : styles.buttonInnerContainer
        }
        onPress={onPress}
        android_ripple={{
          color: GlobalStyles.colors.primary600,
          borderless: false,
        }}
      >
        <Text style={styles.buttonText}>{children}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonInnerContainer: {
    backgroundColor: GlobalStyles.colors.primary500,
    paddingVertical: 8,
    paddingHorizontal: 16,
    elevation: 2,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
  buttonOuterContainer: {
    borderRadius: 8,
    margin: 4,
    overflow: "hidden",
  },
  pressed: {
    opacity: 0.75,
  },
});
