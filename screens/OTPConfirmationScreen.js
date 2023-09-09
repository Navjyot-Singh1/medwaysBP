import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  AsyncStorage,
} from "react-native";
import {
  FirebaseRecaptchaVerifierModal,
  FirebaseRecaptchaBanner,
} from "expo-firebase-recaptcha";
import { app, firebaseConfig } from "../App";
import {
  getAuth,
  signInWithPhoneNumber,
  RecaptchaVerifier,
  PhoneAuthProvider,
  signInWithCredential,
} from "firebase/auth";

import axios from "axios";

const OTPConfirmationScreen = ({ route }) => {
  const auth = getAuth(app);

  // // auth.languageCode = 'it';
  // // To apply the default browser preference instead of explicitly setting it.
  // auth.useDeviceLanguage();

  const { phoneNumber } = route.params; // Get phone number from previous screen
  const recaptchaVerifier = React.useRef(null);
  const [otp, setOTP] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [verificationId, setVerificationId] = useState("");
  const [user, setUser] = useState(null);

  const sendOTP = async (phoneNumber) => {
    try {
      const phoneNo = "+91" + phoneNumber;
      // Send OTP to the provided phone number
      console.log("Sending OTP to " + phoneNo + "...");
      const confirmation = await signInWithPhoneNumber(
        auth,
        phoneNo,
        recaptchaVerifier.current
      );

      setVerificationId(confirmation.verificationId);
    } catch (error) {
      console.error("Error sending OTP:", error);
      setErrorMessage("Error sending OTP. Please try again.");
    }
  };

  const verifyOTP = async () => {
    try {
      const credential = PhoneAuthProvider.credential(verificationId, otp);
      const userCredential = await signInWithCredential(auth, credential);
      const user = userCredential.user;

      setUser(user);

      AsyncStorage.setItem("user", JSON.stringify(user));
      AsyncStorage.setItem("userId", user.uid);

      console.log(
        "Successfully logged in with phone number " + user.phoneNumber
      );
    } catch (error) {
      console.error("Error signing in with OTP:", error);
      setErrorMessage("Error signing in with OTP. Please try again.");
    }
  };

  useEffect(() => {
    setLoading(true); // Set loading to true when OTP sending starts
    sendOTP(phoneNumber).then(() => setLoading(false)); // Set loading to false when OTP sending is done
  }, [phoneNumber]);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 1500);
  // }, []);

  // useEffect(() => {
  //   if (!loading) sendOTP(phoneNumber);
  // }, [loading]);

  const resendOTP = async () => {
    try {
      const phoneNo = "+91" + phoneNumber;
      // Send OTP to the provided phone number
      console.log("Sending OTP to " + phoneNo + "...");
      const confirmation = await signInWithPhoneNumber(
        auth,
        phoneNo,
        recaptchaVerifier.current
      );

      setVerificationId(confirmation.verificationId);
    } catch (error) {
      console.error("Error sending OTP:", error);
      setErrorMessage("Error sending OTP. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebaseConfig}
        // attemptInvisibleVerification
      />
      <Text style={styles.title}>Enter the OTP sent to {phoneNumber}</Text>
      <TextInput
        placeholder="Enter OTP"
        value={otp}
        onChangeText={(text) => setOTP(text)}
        keyboardType="number-pad"
        style={styles.input}
      />
      {errorMessage ? (
        <Text style={{ color: "red" }}>{errorMessage}</Text>
      ) : null}
      <Button title="Confirm" onPress={verifyOTP} />
      <Button title="Resend OTP" onPress={resendOTP} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "space-around",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default OTPConfirmationScreen;
