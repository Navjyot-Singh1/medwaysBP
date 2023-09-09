import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
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
import { BACKEND_URL } from "../constants/urlConstants";
import axios from "axios";
import Toast from "react-native-root-toast";
import { toastConfigSuccess, toastConfigFailure } from "../constants/styles";
import { setUser } from "../reducers/authSlice";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";

const OTPConfirmationScreen = ({ route }) => {
  const auth = getAuth(app);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  // // auth.languageCode = 'it';
  // // To apply the default browser preference instead of explicitly setting it.
  // auth.useDeviceLanguage();
  const { phoneNumber } = route.params;
  const recaptchaVerifier = React.useRef(null);
  const [otp, setOTP] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [verificationId, setVerificationId] = useState("");
  const [user, setUser] = useState(null);
  const [type, setType] = useState("");
  const [navType, setNavType] = useState("");
  const [patientRegistrationDetails, setPatientRegistrationDetails] = useState(
    {}
  );
  const [doctorRegistrationDetails, setDoctorRegistrationDetails] = useState(
    {}
  );

  // const sendOTP = async (phoneNumber) => {
  //   try {
  //     const phoneNo = "+91" + phoneNumber;
  //     // Send OTP to the provided phone number
  //     console.log("Sending OTP to " + phoneNo + "...");
  //     const confirmation = await signInWithPhoneNumber(
  //       auth,
  //       phoneNo,
  //       recaptchaVerifier.current
  //     );

  //     setVerificationId(confirmation.verificationId);
  //   } catch (error) {
  //     console.error("Error sending OTP:", error);
  //     setErrorMessage("Error sending OTP. Please try again.");
  //   }
  // };

  const sendOTP = async (phoneNumber) => {
    console.log("Sending OTP to " + phoneNumber + "...");
    console.log("OTP sent successfully");
  };
  const verifyOTP = async () => {
    try {
      // const credential = PhoneAuthProvider.credential(verificationId, otp);
      // const userCredential = await signInWithCredential(auth, credential);
      // const user = userCredential.user;
      const user = {
        uid: "123456789",
      };
      // dispatch(setUser(user));
      setUser(user);

      AsyncStorage.setItem("user", JSON.stringify(user));
      AsyncStorage.setItem("userId", user.uid);
      AsyncStorage.setItem("type", type);

      setTimeout(() => {
        if (navType === "Login") {
          navigation.navigate("Home");
        } else {
          if (type === "Patient") {
            navigation.navigate("PatientHome");
          } else {
            navigation.navigate("DoctorHome");
          }
        }
      }, 1000);
    } catch (error) {
      setErrorMessage(`Error signing in with OTP: ${error}`);
    }
  };

  const registerUser = async (type) => {
    let url = "";
    let reqBody = {};
    if (type === "Patient") {
      url = BACKEND_URL + "api/patients";
      reqBody = {
        ...patientRegistrationDetails,
      };
    } else {
      url = BACKEND_URL + "api/doctors";
      reqBody = {
        ...doctorRegistrationDetails,
        DoctorID: user.uid,
      };
    }

    try {
      const response = await axios.post(url, reqBody);

      if (response.status === 200) {
        // Registration successful
        Toast.show("Registration Successful", toastConfigSuccess);
      } else {
        // Registration failed
        Toast.show(
          "Registration Failed. Please try again.",
          toastConfigFailure
        );
      }
    } catch (error) {
      console.error("An error occurred:", error);
      Toast.show("Registration Failed. Please try again.", toastConfigFailure);
    }
  };

  useEffect(() => {
    setLoading(true); // Set loading to true when OTP sending starts
    sendOTP(phoneNumber).then(() => setLoading(false)); // Set loading to false when OTP sending is done
  }, [phoneNumber]);

  useEffect(() => {
    if (user) {
      AsyncStorage.setItem("user", JSON.stringify(user));
      AsyncStorage.setItem("userId", user.uid);
      registerUser(type);
    }
  }, [user]);

  useEffect(() => {
    const { type, navType } = route.params;
    setType(type);
    setNavType(navType);
    if (navType === "Login") {
    } else {
      if (type === "Patient") {
        const { registrationDetails, phoneNumber, medications, patientSex } =
          route.params;

        setPatientRegistrationDetails({
          age: registrationDetails.age.value,
          name: registrationDetails.name.value,
          sex: patientSex,
          email: registrationDetails.email.value,
          isBPPatient: registrationDetails.isBPPatient.value,
          howLongPatient: registrationDetails.howLongPatient.value,
          doctor: registrationDetails.doctor,
          medications: medications,
        });
      } else {
        const { registrationDetails, phoneNumber } = route.params;

        setDoctorRegistrationDetails({
          Name: registrationDetails.name.value,
          Email: registrationDetails.email.value,
          ClinicAddress: registrationDetails.clinicAddress.value,
          MobileNo: phoneNumber,
          Qualifications: registrationDetails.qualifications.value,
        });
      }
    }
  }, []);

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
      <View style={styles.buttonContainer}>
        <Button title="Confirm" onPress={verifyOTP} style={styles.buttons} />
        <Button title="Resend OTP" onPress={resendOTP} style={styles.buttons} />
      </View>
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
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  buttons: {
    width: "40%",
    margin: 10,
  },
});

export default OTPConfirmationScreen;
