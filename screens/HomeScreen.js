import { View, Text, StyleSheet, Pressable } from "react-native";
import React, { useState } from "react";
import Title from "../components/UI/Title";

import { RadioButton } from "react-native-paper";
import PrimaryButton from "../components/UI/PrimaryButton";

export default function HomeScreen({ navigation }) {
  const [selection, setSelection] = useState("Patient");
  return (
    <>
      <View>
        <Title>Medways BP Monitoring App</Title>
      </View>
      <View>
        <Text style={styles.paragraphText}>
          This app is designed to help patients and the treating doctor to
          monitor the patient's blood pressure over a long period of time
          thereby achieving targets and reducing risk. This app is free to use.
        </Text>
      </View>
      <View style={styles.radioButtonContainer}>
        <RadioButton.Item
          label="Patient"
          value="Patient"
          status={selection === "Patient" ? "checked" : "unchecked"}
          onPress={() => setSelection("Patient")}
          style={styles.radioButton}
        />
        <RadioButton.Item
          label="Doctor"
          value="Doctor"
          status={selection === "Doctor" ? "checked" : "unchecked"}
          onPress={() => setSelection("Doctor")}
          style={styles.radioButton}
        />
      </View>
      <View style={styles.buttonContainer}>
        <PrimaryButton
          onPress={() => {
            if (selection === "Patient") {
              navigation.navigate("Registration", {
                type: "Patient",
              });
            } else {
              navigation.navigate("Registration", {
                type: "Doctor",
              });
            }
          }}
        >
          Register
        </PrimaryButton>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  paragraphText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
    padding: 12,
  },
  radioButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginHorizontal: 12,
    marginVertical: 6,
  },
  radioButton: {
    marginHorizontal: 12,
    marginVertical: 6,
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },
  buttonContainer: {
    borderRadius: 24,
    padding: 6,
    marginHorizontal: 8,
    marginVertical: 2,
    width: "50%",
    alignSelf: "center",
  },
});
