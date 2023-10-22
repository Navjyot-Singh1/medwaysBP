import { View, Text, Pressable, FlatList, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { GlobalStyles } from "../constants/styles";
import Input from "../components/UI/Input";
import Dropdown from "../components/UI/Dropdown";
import PrimaryButton from "../components/UI/PrimaryButton";
import SearchDoctor from "../components/Functional/SearchDoctor";
import { useAppContext } from "../context/AppContext";

export default function UpdateProfileScreen({ route }) {
  // const { type } = route.params;
  const navigation = useNavigation();
  const user = AsyncStorage.getItem("user");
  const { type, loggedInUserDetails } = useAppContext();

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
  const [medications, setMedications] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState("");

  useEffect(() => {
    if (type === "Patient") {
      setRegistrationDetails({
        name: {
          value: loggedInUserDetails.name,
          isValid: true,
        },
        age: {
          value: loggedInUserDetails.age,
          isValid: true,
        },
        mobileNo: {
          value: loggedInUserDetails.mobileNo,
          isValid: true,
        },
        address: {
          value: loggedInUserDetails.address,
          isValid: true,
        },
        email: {
          value: loggedInUserDetails.email,
          isValid: true,
        },
        isBPPatient: {
          value: loggedInUserDetails.isBPPatient,
          isValid: true,
        },
        howLongPatient: {
          value: loggedInUserDetails.howLongPatient,
          isValid: true,
        },
        doctor: loggedInUserDetails.doctor,
      });
    } else {
      setDoctorRegistrationDetails({
        name: {
          value: loggedInUserDetails.Name,
          isValid: true,
        },
        mobileNo: {
          value: loggedInUserDetails.MobileNo,
          isValid: true,
        },
        email: {
          value: loggedInUserDetails.Email,
          isValid: true,
        },
        clinicAddress: {
          value: loggedInUserDetails.ClinicAddress,
          isValid: true,
        },
        qualifications: {
          value: loggedInUserDetails.Qualifications,
          isValid: true,
        },
      });
    }
  }, []);

  const genderOptions = [
    { text: "Male", value: "Male" },
    { text: "Female", value: "Female" },
  ];

  const addMedicationRow = () => {
    setMedications([...medications, { medicationName: "", howOften: "" }]);
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
  const handleSelectedDoctor = (doctor) => {
    setRegistrationDetails({
      ...registrationDetails,
      doctor: doctor.id,
    });
  };

  const handleUpdate = () => {};

  return (
    <>
      {type === "Patient" ? (
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
          <View style={styles.inputsRow}>
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
          </View>
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
          {/* <View> */}
          {/* <Text style={styles.inputLabel}>Current Medications</Text> */}
          {/* <View style={styles.tableHeader}>
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
              style={styles.addButtonContainer}
            >
              <Text style={styles.addButton}>Add Medication +</Text>
            </Pressable>
          </View> */}
          {/* <SearchDoctor handleSelectedDoctor={handleSelectedDoctor} /> */}

          <PrimaryButton onPress={handleUpdate} style={styles.buttonDoctorReg}>
            Update
          </PrimaryButton>
        </>
      ) : (
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

          <PrimaryButton onPress={handleUpdate} style={styles.buttonDoctorReg}>
            Update
          </PrimaryButton>
        </>
      )}
    </>
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
  },
  addButton: {
    fontSize: 14,
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
    marginBottom: 20,
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
});
