import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  FirebaseRecaptchaVerifierModal,
  FirebaseRecaptchaBanner,
} from "expo-firebase-recaptcha";
import { app, firebaseConfig } from "../config/firebase";
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
import { setUserRedux, setUserType, setUserId } from "../reducers/authSlice";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { useAppContext } from "../context/AppContext";

const OTPConfirmationScreen = ({ route }) => {
  const auth = getAuth(app);
  const dispatch = useDispatch();
  const navigation = useNavigation();

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

  const { forceRerender } = useAppContext();

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
          mobileNo: phoneNumber,
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

      // dispatch(setUserRedux(user));
      dispatch(setUserId(user.uid));
      dispatch(setUserType(type));
      setUser(user);
      AsyncStorage.setItem("user", JSON.stringify(user));
      AsyncStorage.setItem("userId", user.uid);
      AsyncStorage.setItem("user_type", type);
      AsyncStorage.setItem("phoneNumber", phoneNumber);

      console.log("userId", AsyncStorage.getItem("userId"));
      console.log("user_type", AsyncStorage.getItem("user_type"));

      setTimeout(() => {
        if (navType === "Login") {
          forceRerender();
          navigation.navigate("LoggedInScreens");
        } else {
          if (type === "Patient") {
            navigation.navigate("LoggedInScreens");
          } else {
            navigation.navigate("LoggedInScreens");
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
        PatientId: phoneNumber,
      };
    } else {
      url = BACKEND_URL + "api/doctors";
      reqBody = {
        ...doctorRegistrationDetails,
        DoctorID: phoneNumber,
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
    justifyContent: "space-evenly",
  },
  buttons: {
    width: "40%",
    margin: 10,
  },
});

export default OTPConfirmationScreen;
