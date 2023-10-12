import {
  View,
  Text,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Pressable,
  FlatList,
  ScrollView,
  Platform,
} from "react-native";
import React, { useState } from "react";
import Title from "../components/UI/Title";

import Input from "../components/UI/Input";
import Dropdown from "../components/UI/Dropdown";
import SearchDoctor from "../components/Functional/SearchDoctor";
import PrimaryButton from "../components/UI/PrimaryButton";
import TermsAndConditionsCheckbox from "../components/Functional/TermsAndConditions";
import { BACKEND_URL } from "@env";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { GlobalStyles } from "../constants/styles";
import MedicationRow from "../components/Functional/MedicationRow";

export default function RegistrationScreen({ route }) {
  const { type } = route.params;
  const navigation = useNavigation();

  const [registrationDetails, setRegistrationDetails] = useState({
    name: {
      value: "",
      isValid: true,
    },
    age: {
      value: "",
      isValid: true,
    },
    mobileNo: {
      value: "",
      isValid: true,
    },
    address: {
      value: "",
      isValid: true,
    },
    email: {
      value: "",
      isValid: true,
    },
    isBPPatient: {
      value: "",
      isValid: true,
    },
    howLongPatient: {
      value: "",
      isValid: true,
    },
    doctor: "",
  });
  const [doctorRegistrationDetails, setDoctorRegistrationDetails] = useState({
    name: {
      value: "",
      isValid: true,
    },
    mobileNo: {
      value: "",
      isValid: true,
    },
    email: {
      value: "",
      isValid: true,
    },
    clinicAddress: {
      value: "",
      isValid: true,
    },
    qualifications: {
      value: "",
      isValid: true,
    },
  });
  const [patientSex, setPatientSex] = useState("");
  const [termsAndConditions, setTermsAndConditions] = useState(false);
  const [medications, setMedications] = useState([
    { medicationName: "", howOften: "" },
  ]);
  const [userExists, setUserExists] = useState(false);

  const genderOptions = [
    { text: "Male", value: "Male" },
    { text: "Female", value: "Female" },
  ];

  const addMedicationRow = () => {
    setMedications([
      ...medications,
      { medicationName: "", howOften: "", tabCap: "" },
    ]);
  };

  const removeMedicationRow = (index) => {
    const updatedMedications = [...medications];
    updatedMedications.splice(index, 1);
    setMedications(updatedMedications);
  };

  const handleMedicationChange = (index, field, value) => {
    const updatedMedications = [...medications];
    updatedMedications[index][field] = value;
    setMedications(updatedMedications);
  };

  const handleCheckboxToggle = () => {
    setTermsAndConditions(!termsAndConditions);
  };

  const handleSelectedDoctor = (doctor) => {
    setRegistrationDetails({
      ...registrationDetails,
      doctor: doctor.id,
    });
  };

  const handleRegistration = () => {
    //Check if the mobile number is already registered and do not allow registration if it is already registered

    const url = BACKEND_URL + "api/users/check";
    const requestBody = {
      uid:
        type === "Patient"
          ? registrationDetails.mobileNo.value
          : doctorRegistrationDetails.mobileNo.value,
    };

    axios
      .post(url, requestBody)
      .then((response) => {
        if (response.data.exists) {
          Alert.alert(
            "This mobile number is already registered. Please login instead."
          );
          return;
        } else if (type === "Patient") {
          if (
            registrationDetails.name.isValid &&
            registrationDetails.age.isValid &&
            registrationDetails.mobileNo.isValid &&
            registrationDetails.address.isValid &&
            registrationDetails.email.isValid &&
            patientSex !== "" &&
            termsAndConditions
          ) {
            navigation.navigate("OTPConfirmationScreen", {
              registrationDetails: registrationDetails,
              type: type,
              phoneNumber: registrationDetails.mobileNo.value,
              medications: medications,
              patientSex: patientSex,
              navType: "Register",
            });
          } else if (!termsAndConditions) {
            Alert.alert("Please accept the terms and conditions");
          } else {
            Alert.alert("Please fill all the details");
          }
        } else {
          if (
            doctorRegistrationDetails.name.isValid &&
            doctorRegistrationDetails.mobileNo.isValid &&
            doctorRegistrationDetails.email.isValid &&
            doctorRegistrationDetails.clinicAddress.isValid &&
            doctorRegistrationDetails.qualifications.isValid &&
            termsAndConditions
          ) {
            navigation.navigate("OTPConfirmationScreen", {
              registrationDetails: doctorRegistrationDetails,
              type: type,
              phoneNumber: doctorRegistrationDetails.mobileNo.value,
              navType: "Register",
            });
          } else if (!termsAndConditions) {
            Alert.alert("Please accept the terms and conditions");
          } else {
            Alert.alert("Please fill all the details");
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView style={styles.outerContainer}>
        <View>
          <Title>
            {type === "Patient"
              ? "Patient Registration"
              : "Doctor Registration"}
          </Title>
        </View>
        {type === "Patient" && (
          <>
            <View style={styles.inputsRow}>
              <Input
                label="Name"
                textInputConfig={{
                  onChangeText: (text) =>
                    setRegistrationDetails({
                      ...registrationDetails,
                      name: { value: text.toString(), isValid: true },
                    }),
                }}
                value={registrationDetails.name.value}
                style={styles.rowInput}
                invalid={!registrationDetails.name.isValid}
                mandatory
              />
              <Input
                label="Age"
                textInputConfig={{
                  onChangeText: (text) =>
                    setRegistrationDetails({
                      ...registrationDetails,
                      age: { value: text.toString(), isValid: true },
                    }),
                  keyboardType: "numeric",
                }}
                value={registrationDetails.age.value}
                style={styles.rowInput}
                invalid={!registrationDetails.age.isValid}
                mandatory
              />
            </View>
            <View style={styles.inputsRow}>
              <Dropdown
                label="Sex"
                onChanged={setPatientSex}
                options={genderOptions}
                style={styles.rowInput}
                value={patientSex}
                placeholder="Select Gender"
                mandatory
              />
              <Input
                label="Mobile Number"
                textInputConfig={{
                  onChangeText: (text) =>
                    setRegistrationDetails({
                      ...registrationDetails,
                      mobileNo: { value: text.toString(), isValid: true },
                    }),
                  keyboardType: "numeric",
                }}
                value={registrationDetails.mobileNo.value}
                style={styles.rowInput}
                invalid={!registrationDetails.mobileNo.isValid}
                mandatory
              />
            </View>
            <Input
              label="Address"
              textInputConfig={{
                onChangeText: (text) =>
                  setRegistrationDetails({
                    ...registrationDetails,
                    address: { value: text.toString(), isValid: true },
                  }),
                // placeholder: "Enter your address",
                multiline: true,
              }}
              value={registrationDetails.address.value}
              invalid={!registrationDetails.address.isValid}
            />
            <Input
              label="E-mail"
              textInputConfig={{
                onChangeText: (text) =>
                  setRegistrationDetails({
                    ...registrationDetails,
                    email: { value: text.toString(), isValid: true },
                  }),
                keyboardType: "email-address",
              }}
              value={registrationDetails.email.value}
              style={styles.rowInput}
              invalid={!registrationDetails.email.isValid}
            />
            <View style={styles.inputsRowExtra}>
              <Input
                label="Are you a BP Patient?"
                textInputConfig={{
                  onChangeText: (text) =>
                    setRegistrationDetails({
                      ...registrationDetails,
                      isBPPatient: { value: text.toString(), isValid: true },
                    }),
                }}
                value={registrationDetails.isBPPatient.value}
                style={styles.rowInput}
                invalid={!registrationDetails.isBPPatient.isValid}
              />
              <Input
                label="Patient since how long?"
                textInputConfig={{
                  onChangeText: (text) =>
                    setRegistrationDetails({
                      ...registrationDetails,
                      howLongPatient: { value: text.toString(), isValid: true },
                    }),
                }}
                value={registrationDetails.howLongPatient.value}
                style={styles.rowInput}
                invalid={!registrationDetails.howLongPatient.isValid}
              />
            </View>
            <View>
              {/* <Text style={styles.inputLabel}>Current Medications</Text> */}
              <View style={styles.tableHeader}>
                <Text style={styles.tableHeaderCell}>Tab/Cap</Text>
                <Text style={styles.tableHeaderCell}>Medicine</Text>
                <Text style={styles.tableHeaderCell}>Frequency</Text>
              </View>
              <FlatList
                data={medications}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                  <MedicationRow
                    medication={item}
                    index={index}
                    onMedicationChange={handleMedicationChange}
                    onRemoveMedication={removeMedicationRow}
                  />
                )}
              />
              <Pressable
                onPress={addMedicationRow}
                android_ripple={{ color: "rgba(0, 0, 0, 0.1)" }}
                style={({ pressed }) => [
                  styles.addButtonContainer,
                  Platform.OS === "android" &&
                    pressed && { backgroundColor: "rgba(0, 0, 0, 0.1)" },
                ]}
              >
                <Text style={styles.addButton}>Add Medication +</Text>
              </Pressable>
            </View>
            <SearchDoctor handleSelectedDoctor={handleSelectedDoctor} />
            <TermsAndConditionsCheckbox
              isChecked={termsAndConditions}
              onToggle={handleCheckboxToggle}
            />
            <PrimaryButton
              onPress={handleRegistration}
              style={styles.buttonDoctorReg}
            >
              Register
            </PrimaryButton>
          </>
        )}

        {type === "Doctor" && (
          <>
            <View style={styles.inputsRow}>
              <Input
                label="Name"
                textInputConfig={{
                  onChangeText: (text) =>
                    setDoctorRegistrationDetails({
                      ...doctorRegistrationDetails,
                      name: { value: text.toString(), isValid: true },
                    }),
                }}
                value={doctorRegistrationDetails.name.value}
                style={styles.rowInput}
                invalid={!doctorRegistrationDetails.name.isValid}
                mandatory
              />
              <Input
                label="Qualifications"
                textInputConfig={{
                  onChangeText: (text) =>
                    setDoctorRegistrationDetails({
                      ...doctorRegistrationDetails,
                      qualifications: { value: text.toString(), isValid: true },
                    }),
                }}
                value={doctorRegistrationDetails.qualifications.value}
                style={styles.rowInput}
                invalid={!doctorRegistrationDetails.qualifications.isValid}
                mandatory
              />
            </View>
            <Input
              label="Clinic Address"
              textInputConfig={{
                onChangeText: (text) =>
                  setDoctorRegistrationDetails({
                    ...doctorRegistrationDetails,
                    clinicAddress: { value: text.toString(), isValid: true },
                  }),
                // placeholder: "Enter your clinicAddress",
                multiline: true,
              }}
              value={doctorRegistrationDetails.clinicAddress.value}
              invalid={!doctorRegistrationDetails.clinicAddress.isValid}
            />
            <View style={styles.inputsRow}>
              <Input
                label="Mobile Number"
                textInputConfig={{
                  onChangeText: (text) =>
                    setDoctorRegistrationDetails({
                      ...doctorRegistrationDetails,
                      mobileNo: { value: text.toString(), isValid: true },
                    }),
                  keyboardType: "numeric",
                }}
                value={doctorRegistrationDetails.mobileNo.value}
                style={styles.rowInput}
                invalid={!doctorRegistrationDetails.mobileNo.isValid}
                mandatory
              />
              <Input
                label="E-mail"
                textInputConfig={{
                  onChangeText: (text) =>
                    setDoctorRegistrationDetails({
                      ...doctorRegistrationDetails,
                      email: { value: text.toString(), isValid: true },
                    }),
                  keyboardType: "email-address",
                }}
                value={doctorRegistrationDetails.email.value}
                style={styles.rowInput}
                invalid={!doctorRegistrationDetails.email.isValid}
              />
            </View>
            <TermsAndConditionsCheckbox
              isChecked={termsAndConditions}
              onToggle={handleCheckboxToggle}
            />
            <PrimaryButton
              onPress={handleRegistration}
              style={styles.buttonDoctorReg}
            >
              Register
            </PrimaryButton>
          </>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,

    marginHorizontal: 10,
    marginVertical: 10,
  },
  inputsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  inputsRowExtra: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowInput: {
    flex: 1,
  },
  form: {
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    marginHorizontal: 8,
    minWidth: 100,
  },
  buttonDoctorReg: {
    width: "50%",
    alignSelf: "center",
    marginVertical: 20,
  },
  addButtonContainer: {
    marginHorizontal: 30,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "black",
    width: "50%",
    alignSelf: "center",
  },
  addButton: {
    fontSize: 15,
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
    margin: 10,
  },
  inputLabel: {
    fontSize: 16,
    marginBottom: 4,
    color: GlobalStyles.colors.primary800,
  },
  tableHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
    marginHorizontal: 30,
  },
  tableHeaderCell: {
    fontSize: 16,
    fontWeight: "bold",
    color: GlobalStyles.colors.primary800,
  },
  container: {
    flex: 1,
  },
});
