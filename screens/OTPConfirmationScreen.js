import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button } from "react-native";

import * as firebase from "firebase/app";

import axios from "axios";

const OTPConfirmationScreen = ({ route }) => {
  // const auth = auth();
  // // auth.languageCode = 'it';
  // // To apply the default browser preference instead of explicitly setting it.
  // auth.useDeviceLanguage();

  // window.recaptchaVerifier = new RecaptchaVerifier(auth, "sign-in-button", {
  //   size: "invisible",
  //   callback: (response) => {
  //     // reCAPTCHA solved, allow signInWithPhoneNumber.
  //     // onSignInSubmit();
  //   },
  // });
  const app = firebase.app();
  console.log(app.name);

  const { phoneNumber } = route.params; // Get phone number from previous screen
  // const appVerifier = window.recaptchaVerifier;

  const [otp, setOTP] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const sendOTP = async (phoneNumber) => {
    try {
      // Send OTP to the provided phone number
      const confirmation = await firebase
        .auth()
        .signInWithPhoneNumber("+91" + phoneNumber);
      console.log("OTP sent successfully");
      return confirmation;
    } catch (error) {
      console.error("Error sending OTP:", error);
      setErrorMessage("Error sending OTP. Please try again.");
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

  const resendOTP = async () => {};

  return (
    <View>
      <Text>Enter the OTP sent to {phoneNumber}</Text>
      <TextInput
        placeholder="Enter OTP"
        value={otp}
        onChangeText={(text) => setOTP(text)}
      />
      {errorMessage ? (
        <Text style={{ color: "red" }}>{errorMessage}</Text>
      ) : null}
      {/* <Button title="Confirm" onPress={verifyOTP} /> */}
      <Button title="Resend OTP" onPress={sendOTP} />
    </View>
  );
};

export default OTPConfirmationScreen;
