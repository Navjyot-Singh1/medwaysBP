import React from "react";
import {
  View,
  TextInput,
  Pressable,
  Text,
  StyleSheet,
  Platform,
} from "react-native";

import { GlobalStyles } from "../../constants/styles";
import Dropdown from "../UI/Dropdown";
import DropdownRegistration from "../UI/DropdownRegistration";
import MyDropdownPicker from "../UI/MyDropdownPicker";

const MedicationRow = ({
  medication,
  index,
  onMedicationChange,
  onRemoveMedication,
}) => {
  const tabCapOptions = [
    { text: "Tab", value: "Tab" },
    { text: "Cap", value: "Cap" },
  ];

  const frequencyOptions = [
    { text: "1-0-0", value: "1-0-0" },
    { text: "0-1-0", value: "0-1-0" },
    { text: "0-0-1", value: "0-0-1" },
    { text: "1-1-0", value: "1-1-0" },
    { text: "1-0-1", value: "1-0-1" },
    { text: "0-1-1", value: "0-1-1" },
    { text: "1-1-1", value: "1-1-1" },
  ];

  return (
    <View style={styles.medicationRow}>
      {/* {Platform.OS === "ios" ? (
        <DropdownRegistration
          style={styles.inputLeft}
          value={medication.tabCap}
          onChanged={(text) => onMedicationChange(index, "tabCap", text)}
          options={tabCapOptions}
        />
      ) : (
        <MyDropdownPicker
          style={styles.inputLeft}
          value={medication.tabCap}
          onChanged={(text) => onMedicationChange(index, "tabCap", text)}
          options={tabCapOptions}
          zIndex={2000}
          zIndexInverse={2000}
        />
      )} */}

      <DropdownRegistration
        style={styles.inputLeft}
        value={medication.tabCap}
        onChanged={(text) => onMedicationChange(index, "tabCap", text)}
        options={tabCapOptions}
      />

      <TextInput
        style={styles.inputCenter}
        placeholder="Medication Name"
        value={medication.medicationName}
        onChangeText={(text) =>
          onMedicationChange(index, "medicationName", text)
        }
      />
      <DropdownRegistration
        style={styles.inputRight}
        // label="How Often"
        value={medication.howOften}
        onChanged={(text) => onMedicationChange(index, "howOften", text)}
        options={frequencyOptions}
      />
      {/* {Platform.OS === "ios" ? (
        <DropdownRegistration
          style={styles.inputRight}
          // label="How Often"
          value={medication.howOften}
          onChanged={(text) => onMedicationChange(index, "howOften", text)}
          options={frequencyOptions}
        />
      ) : (
        <MyDropdownPicker
          style={styles.inputRight}
          // label="How Often"
          value={medication.howOften}
          onChanged={(text) => onMedicationChange(index, "howOften", text)}
          options={frequencyOptions}
          zIndex={1000}
          zIndexInverse={3000}
        />
      )} */}

      <Pressable onPress={() => onRemoveMedication(index)}>
        <Text style={styles.removeButton}> - </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  medicationRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 6,
    // marginHorizontal: 12,
  },
  inputLeft: {
    width: "20%",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    // marginRight: 5,
    backgroundColor: GlobalStyles.colors.primary200,
  },
  inputRight: {
    width: "20%",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,

    backgroundColor: GlobalStyles.colors.primary200,
  },
  inputCenter: {
    width: "50%",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    // marginRight: 5,
    backgroundColor: GlobalStyles.colors.primary200,
  },

  removeButton: {
    fontSize: 20,
    fontWeight: "bold",
    color: "red",
    borderWidth: 1,
    borderColor: "#ccc",
    // textAlign: "center",
    // borderWidth: 1,
  },
});

export default MedicationRow;
