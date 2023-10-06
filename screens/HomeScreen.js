import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import React, { useState } from "react";
import Title from "../components/UI/Title";

import { RadioButton } from "react-native-paper";
import PrimaryButton from "../components/UI/PrimaryButton";

export default function HomeScreen({ navigation }) {
  const [selection, setSelection] = useState("Patient");
  return (
    <>
      {/* <View style={styles.titleContainer}>
        <Title>Medways BP Monitoring App</Title>
      </View> */}
      <View style={styles.imageContainer}>
        <Image source={require("../assets/Logo.png")} style={styles.image} />
      </View>
      <View>
        <Text style={styles.paragraphText}>
          This app is designed to help patients and the treating doctor to
          monitor the patient's blood pressure over a long period of time
          thereby achieving targets and reducing risk. This app is free to use.
        </Text>
      </View>
      {/* <View style={styles.imageContainer}>
        <Image source={require("../assets/Logo.png")} style={styles.image} />
      </View> */}
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
          style={styles.button}
          onPress={() => {
            if (selection === "Patient") {
              navigation.navigate("Login", {
                type: "Patient",
              });
            } else {
              navigation.navigate("Login", {
                type: "Doctor",
              });
            }
          }}
        >
          Login
        </PrimaryButton>
        <PrimaryButton
          style={styles.button}
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
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    borderRadius: 24,
    padding: 6,
    marginHorizontal: 8,
    marginVertical: 2,
  },
  button: {
    marginHorizontal: 12,
    marginVertical: 6,
    fontSize: 20,
    fontWeight: "bold",
    width: "40%",
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 12,
  },
  image: {
    width: 60,
    height: 60,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginHorizontal: 12,
    marginVertical: 6,
  },
});
