import React from "react";
import { View, TextInput, Pressable, Text, StyleSheet } from "react-native";

import { GlobalStyles } from "../../constants/styles";

const MedicationRow = ({
  medication,
  index,
  onMedicationChange,
  onRemoveMedication,
}) => {
  return (
    <View style={styles.medicationRow}>
      <TextInput
        style={styles.inputLeft}
        placeholder="Tab/Cap"
        value={medication.tabCap}
        onChangeText={(text) => onMedicationChange(index, "tabCap", text)}
      />
      {/* <TextInput
        style={styles.inputCenter}
        placeholder="Medication Name"
        value={medication.medicationName}
        onChangeText={(text) =>
          onMedicationChange(index, "medicationName", text)
        }
      /> */}
      <TextInput
        style={styles.inputRight}
        placeholder="How Often"
        value={medication.howOften}
        onChangeText={(text) => onMedicationChange(index, "howOften", text)}
      />
      <Pressable onPress={() => onRemoveMedication(index)}>
        <Text style={styles.removeButton}>-</Text>
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
    marginHorizontal: 12,
  },
  inputLeft: {
    width: "55%",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    backgroundColor: GlobalStyles.colors.primary200,
  },
  inputRight: {
    width: "40%",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    backgroundColor: GlobalStyles.colors.primary200,
  },
  inputCenter: {
    width: "55%",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    backgroundColor: GlobalStyles.colors.primary200,
  },

  removeButton: {
    fontSize: 20,
    fontWeight: "bold",
    color: "red",
  },
});

export default MedicationRow;
