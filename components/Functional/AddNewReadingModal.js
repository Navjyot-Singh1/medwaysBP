import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Modal,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import Input from "../UI/Input";
import Title from "../UI/Title";
import PrimaryButton from "../UI/PrimaryButton";
import { GlobalStyles } from "../../constants/styles";
import Dropdown from "../UI/Dropdown";
import MyDropdownPicker from "../UI/MyDropdownPicker";

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

  // const symptomsOptions = [
  //   { text: "None", value: "None" },
  //   { text: "Headache", value: "Headache" },
  //   { text: "Dizziness", value: "Dizziness" },
  //   { text: "Blurred Vision", value: "Blurred Vision" },
  //   { text: "Nausea", value: "Nausea" },
  //   { text: "Vomiting", value: "Vomiting" },
  //   { text: "Chest Pain", value: "Chest Pain" },
  //   { text: "Shortness of Breath", value: "Shortness of Breath" },
  // ];
  const symptomsOptions = [
    { label: "No Symptoms", value: "No Symptoms" },
    { label: "Headache", value: "Headache" },
    { label: "Dizziness", value: "Dizziness" },
    { label: "Blurred Vision", value: "Blurred Vision" },
    { label: "Nausea", value: "Nausea" },
    { label: "Vomiting", value: "Vomiting" },
    { label: "Chest Pain", value: "Chest Pain" },
    { label: "Shortness of Breath", value: "Shortness of Breath" },
  ];

  const actionsOptions = [
    { label: "No Action", value: "No Action" },
    { label: "Took extra dose", value: "Took extra dose" },
    { label: "Stopped BP Drug", value: "Stopped BP Drug" },
    { label: "Visited Doctor/Hospital", value: "Visited Doctor/Hospital" },
  ];

  const handleSave = () => {
    if (!systolic || !diastolic || !symptoms || !actionsTaken || !pulse) {
      alert("Please fill all the mandatory fields");
      return;
    }
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
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
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
            mandatory
          />
        </View>
        <View style={styles.inputsRow}>
          {Platform.OS === "ios" ? (
            <MyDropdownPicker
              label="Symptoms"
              onChanged={(e) => setSymptoms(e.value)}
              options={symptomsOptions}
              value={symptoms}
              style={styles.rowInput}
              placeholder="Select Symptoms"
              mandatory
            />
          ) : (
            <MyDropdownPicker
              label="Symptoms"
              onChanged={(e) => setSymptoms(e.value)}
              options={symptomsOptions}
              value={symptoms}
              style={styles.rowInput}
              placeholder="Select Symptoms"
              mandatory
            />
          )}
        </View>
        <View style={styles.inputsRow}>
          {Platform.OS === "ios" ? (
            <MyDropdownPicker
              label="Actions Taken"
              onChanged={(e) => setActionsTaken(e.value)}
              options={actionsOptions}
              value={actionsTaken}
              style={styles.rowInput}
              placeholder="Select Actions Taken"
              mandatory
            />
          ) : (
            <MyDropdownPicker
              label="Actions Taken"
              onChanged={(e) => setActionsTaken(e.value)}
              options={actionsOptions}
              value={actionsTaken}
              style={styles.rowInput}
              placeholder="Select Actions Taken"
              mandatory
            />
          )}
        </View>

        <View style={styles.buttonsContainer}>
          <PrimaryButton
            // title="Save"
            onPress={() => {
              handleSave();
              setSystolic("");
              setDiastolic("");
              setSymptoms("");
              setActionsTaken("");
              setPulse("");
            }}
            // style={styles.buttonSave}
            backgroundColor={GlobalStyles.colors.primary500}
            fontSize={20}
          >
            Save
          </PrimaryButton>

          <PrimaryButton
            onPress={() => {
              setSystolic("");
              setDiastolic("");
              setSymptoms("");
              setActionsTaken("");
              setPulse("");
              onClose();
            }}
            backgroundColor={GlobalStyles.colors.error500}
            fontSize={20}
          >
            {" "}
            Cancel{" "}
          </PrimaryButton>
        </View>
      </KeyboardAvoidingView>
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
    elevation: 10,
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
    justifyContent: "space-evenly",
    width: "100%",
    marginTop: 20,
  },
  buttonSave: {
    backgroundColor: GlobalStyles.colors.primary500,
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    fontSize: 20,
  },
  buttonCancel: {
    backgroundColor: GlobalStyles.colors.error500,
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    fontSize: 20,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
  },
});

export default AddNewReadingModal;
