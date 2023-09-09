import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { GlobalStyles } from "../../constants/styles";

import Picker from "@ouroboros/react-native-picker";
import { Ionicons } from "@expo/vector-icons";

function PickerDisplay({ placeholder }) {
  return (
    <View>
      <Text>{placeholder}</Text>
      <Ionicons name="hourglass" size={24} color="black" />
    </View>
  );
}

export default function Dropdown({
  label,
  options,
  style,
  value,
  onChanged,
  mandatory,
}) {
  return (
    <View style={[styles.inputContainer, style]}>
      <Text style={[styles.inputLabel]}>
        {label}
        {mandatory ? (
          <Text style={{ color: "red", fontWeight: "bold" }}> *</Text>
        ) : null}
      </Text>
      <Picker
        // component={PickerDisplay}
        style={styles.pickerStyles}
        onChanged={onChanged}
        options={options}
        value={value}
      />
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
  pickerStyles: {
    backgroundColor: GlobalStyles.colors.primary200,
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
    color: GlobalStyles.colors.primary700,
  },
});
