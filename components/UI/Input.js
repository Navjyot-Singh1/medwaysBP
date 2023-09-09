import { View, Text, TextInput, StyleSheet } from "react-native";
import React from "react";
import { GlobalStyles } from "../../constants/styles";

export default function Input({
  label,
  textInputConfig,
  style,
  value,
  invalid,
  mandatory,
}) {
  const inputStyles = [
    styles.textInput,
    textInputConfig.multiline && styles.inputMultiline,
  ];

  if (invalid) inputStyles.push(styles.invalidInput);

  return (
    <View style={[styles.inputContainer, style]}>
      <Text style={[styles.inputLabel, invalid && styles.invalidLabel]}>
        {label} <Text style={styles.mandatory}>{mandatory && "*"}</Text>
      </Text>
      <TextInput {...textInputConfig} style={[inputStyles]} value={value} />
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 8,
    marginHorizontal: 4,
  },
  inputLabel: {
    fontSize: 16,
    marginBottom: 4,
    color: GlobalStyles.colors.primary800,
  },
  textInput: {
    backgroundColor: GlobalStyles.colors.primary200,
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
    color: "black",
  },
  inputMultiline: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  invalidLabel: {
    color: GlobalStyles.colors.error500,
  },
  invalidInput: {
    borderColor: GlobalStyles.colors.error50,
  },
  mandatory: {
    color: "red",
    fontWeight: "bold",
  },
});
