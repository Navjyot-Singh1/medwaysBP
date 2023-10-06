import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, Modal, StyleSheet } from "react-native";

import Input from "../UI/Input";
import Title from "../UI/Title";
import PrimaryButton from "../UI/PrimaryButton";
import { GlobalStyles } from "../../constants/styles";
import Dropdown from "../UI/Dropdown";

const AddNewReadingModal = ({ visible, onClose, onSave, reading }) => {
  const [systolic, setSystolic] = useState(
    reading ? reading.systolicPressure : ""
  );
  const [diastolic, setDiastolic] = useState(
    reading ? reading.diastolicPressure : ""
  );
  const [symptoms, setSymptoms] = useState(reading ? reading.symptoms : "");
  const [actionsTaken, setActionsTaken] = useState(
    reading ? reading.actionsTaken : ""
  );
  const [pulse, setPulse] = useState(reading ? reading.pulse : "");

  const symptomsOptions = [
    { text: "None", value: "None" },
    { text: "Headache", value: "Headache" },
    { text: "Dizziness", value: "Dizziness" },
    { text: "Blurred Vision", value: "Blurred Vision" },
    { text: "Nausea", value: "Nausea" },
    { text: "Vomiting", value: "Vomiting" },
    { text: "Chest Pain", value: "Chest Pain" },
    { text: "Shortness of Breath", value: "Shortness of Breath" },
  ];

  const actionsOptions = [
    { text: "None", value: "None" },
    { text: "Took extra dose", value: "Took extra dose" },
    { text: "Stopped BP Drug", value: "Stopped BP Drug" },
    { text: "Visited Doctor/Hospital", value: "Visited Doctor/Hospital" },
  ];

  const handleSave = () => {
    const newReading = {
      id: Math.random().toString(),
      systolic,
      diastolic,
      symptoms,
      pulse,
      actionsTaken,
      dateTime: new Date().toLocaleString(),
    };
    onSave(newReading);
    onClose();
  };

  useEffect(() => {
    if (reading) {
      setSystolic(reading.systolicPressure);
      setDiastolic(reading.diastolicPressure);
      setSymptoms(reading.symptoms);
      setActionsTaken(reading.actionsTaken);
      setPulse(reading.pulse);
    }
  }, [reading]);

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.container}>
        <Title>{reading ? "Update BP Reading" : "Add New BP Reading"}</Title>
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
            label="Diastolic BP"
            textInputConfig={{
              onChangeText: (text) => setDiastolic(text),

              keyboardType: "numeric",
            }}
            value={diastolic}
            style={styles.rowInput}
            mandatory
          />
          <Input
            label="Pulse"
            textInputConfig={{
              onChangeText: (text) => setPulse(text),
              keyboardType: "numeric",
            }}
            value={pulse}
            style={styles.rowInput}
          />
        </View>
        <View style={styles.inputsRow}>
          <Dropdown
            label="Symptoms"
            onChanged={setSymptoms}
            options={symptomsOptions}
            value={symptoms}
            style={styles.rowInput}
          />
          <Dropdown
            label="Actions Taken"
            onChanged={setActionsTaken}
            options={actionsOptions}
            value={actionsTaken}
            style={styles.rowInput}
          />
        </View>
        {/* <Input
          label="Symptoms"
          textInputConfig={{
            onChangeText: (text) => setSymptoms(text),
            placeholder: "Enter your symptoms (if any) at the time of reading",
            multiline: true,
          }}
          value={symptoms}
        /> */}
        {/* <Input
          label="Actions Taken"
          textInputConfig={{
            onChangeText: (text) => setActionsTaken(text),
            placeholder:
              "Enter any actions taken (if any) at the time of reading",
            multiline: true,
          }}
          value={actionsTaken}
        /> */}
        <View style={styles.inputRowPulse}>
          {/* <Input
            label="Pulse"
            textInputConfig={{
              onChangeText: (text) => setPulse(text),
              keyboardType: "numeric",
            }}
            value={pulse}
          /> */}
        </View>

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
  inputRowPulse: {
    flexDirection: "row",
    justifyContent: "flex-start",
    width: "100%",
  },
  rowInput: {
    flex: 1,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 20,
  },
  buttonSave: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    fontSize: 16,
  },
  buttonCancel: {
    backgroundColor: GlobalStyles.colors.error500,
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    fontSize: 16,
  },
});

export default AddNewReadingModal;
