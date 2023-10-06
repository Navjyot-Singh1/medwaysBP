import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { GlobalStyles } from "../constants/styles";
import axios from "axios";
import { BACKEND_URL } from "../constants/urlConstants";

const LoginScreen = ({ route }) => {
  const [mobileNumber, setMobileNumber] = useState("");
  const navigation = useNavigation();
  const { type } = route.params;

  const handleProceed = () => {
    if (mobileNumber.length !== 10 || isNaN(mobileNumber)) {
      alert("Please enter a valid mobile number.");
      return;
    }

    checkIfUserExists();
  };

  const checkIfUserExists = () => {
    const url = `${BACKEND_URL}api/${type.toLowerCase()}s/${mobileNumber}`;

    axios
      .get(url)
      .then((res) => {
        if (res.status === 404) {
          Alert.alert("User does not exist. Please register first.");
        } else {
          navigation.navigate("OTPConfirmationScreen", {
            phoneNumber: mobileNumber,
            type: type,
            navType: "Login",
          });
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <View style={styles.container}>
      {/* Big Title */}
      <Text style={styles.title}>Login</Text>

      {/* Input for Mobile Number */}
      <TextInput
        style={styles.input}
        placeholder="Enter Mobile Number"
        value={mobileNumber}
        onChangeText={(text) => setMobileNumber(text)}
        keyboardType="phone-pad"
      />

      {/* Proceed Button */}
      <TouchableOpacity style={styles.button} onPress={handleProceed}>
        <Text style={styles.buttonText}>Proceed</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    fontSize: 16,
  },
  button: {
    width: "100%",
    height: 60,
    backgroundColor: GlobalStyles.colors.primary500,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default LoginScreen;
