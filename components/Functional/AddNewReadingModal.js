import React, { useState } from "react";
import { View, Text, TextInput, Button, Modal, StyleSheet } from "react-native";

import Input from "../UI/Input";
import Title from "../UI/Title";
import PrimaryButton from "../UI/PrimaryButton";
import { GlobalStyles } from "../../constants/styles";

const AddNewReadingModal = ({ visible, onClose, onSave }) => {
  const [systolic, setSystolic] = useState("");
  const [diastolic, setDiastolic] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [actionsTaken, setActionsTaken] = useState("");


  const handleSave = () => {
    const newReading = {
      id: Math.random().toString(),
      systolic,
      diastolic,
      symptoms,
      actionsTaken,
      dateTime: new Date().toLocaleString(),
    };
    onSave(newReading);
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.container}>
        <Title>Add New BP Reading</Title>
        <View style={styles.inputsRow}>
          <Input
            label="Systolic BP"
            textInputConfig={{
              onChangeText: (text) => setSystolic(text),
            }}
            value={systolic}
            style={styles.rowInput}
            keyboardType="numeric"
            mandatory
          />
          <Input
            label="Diastolic"
            textInputConfig={{
              onChangeText: (text) => setDiastolic(text),

              keyboardType: "numeric",
            }}
            value={diastolic}
            style={styles.rowInput}
            mandatory
          />
        </View>
        <Input
          label="Symptoms"
          textInputConfig={{
            onChangeText: (text) => setSymptoms(text),
            placeholder: "Enter your symptoms (if any) at the time of reading",
            multiline: true,
          }}
          value={symptoms}
        />
        <Input
          label="Actions Taken"
          textInputConfig={{
            onChangeText: (text) => setActionsTaken(text),
            placeholder:
              "Enter any actions taken (if any) at the time of reading",
            multiline: true,
          }}
          value={actionsTaken}
        />

        <View style={styles.buttonsContainer}>
          <Button title="Save" onPress={handleSave} style={styles.buttonSave} />
          <Button
            title="Cancel"
            onPress={onClose}
            style={styles.buttonCancel}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
  },
  inputsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowInput: {
    flex: 1,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    marginTop: 20,
  },
  buttonSave: {
    backgroundColor: GlobalStyles.colors.primary700,
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonCancel: {
    backgroundColor: GlobalStyles.colors.error500,
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
});

export default AddNewReadingModal;
