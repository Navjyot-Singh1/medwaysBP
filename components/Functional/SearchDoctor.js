import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState, useEffect } from "react";

import { RadioButton } from "react-native-paper";
import PrimaryButton from "../UI/PrimaryButton";
import Toast from "react-native-root-toast";
import {
  toastConfigSuccess,
  toastConfigFailure,
  GlobalStyles,
} from "../../constants/styles";
import { Alert } from "react-native";

import { BACKEND_URL } from "@env";
import axios from "axios";

import Input from "../UI/Input";

const SearchDoctor = ({ handleSelectedDoctor }) => {
  const [selection, setSelection] = useState("Name");
  const [searchQuery, setSearchQuery] = useState("");
  const [allDoctorsList, setAllDoctorsList] = useState([]);
  const [doctorsList, setDoctorsList] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  useEffect(() => {
    getAllDoctors();
  }, []);

  const handleSearch = async () => {
    if (selection === "Name") {
      let filteredDoctors = allDoctorsList.filter((doctor) => {
        return doctor.Name.toLowerCase().includes(searchQuery.toLowerCase());
      });
      if (filteredDoctors.length === 0) {
        Alert.alert("No doctors found with the given name");
      }
      setDoctorsList(filteredDoctors);
    } else if (selection === "Mobile Number") {
      let filteredDoctors = allDoctorsList.filter((doctor) => {
        return doctor.MobileNo.toLowerCase().includes(
          searchQuery.toLowerCase()
        );
      });
      if (filteredDoctors.length === 0) {
        Alert.alert("No doctors found with the given mobile number");
      }
      setDoctorsList(filteredDoctors);
    }
  };

  const getAllDoctors = async () => {
    const url = `${process.env.BACKEND_URL}api/doctors`;

    const response = await axios.get(url);

    setAllDoctorsList(response.data);
  };

  return (
    <View>
      <View>
        <Text style={styles.label}>Search Doctor By</Text>
      </View>
      <View style={styles.radioButtonContainer}>
        <RadioButton.Item
          label="Name"
          value="Name"
          status={selection === "Name" ? "checked" : "unchecked"}
          onPress={() => setSelection("Name")}
          // style={styles.radioButton}
        />
        <RadioButton.Item
          label="Mobile Number"
          value="Mobile Number"
          status={selection === "Mobile Number" ? "checked" : "unchecked"}
          onPress={() => setSelection("Mobile Number")}
          // style={styles.radioButton}
        />
      </View>
      <View style={styles.inputsRow}>
        <Input
          label={selection + " Search" ? selection + " Search" : "Search Query"}
          textInputConfig={{
            onChangeText: (text) => setSearchQuery(text),
          }}
          value={searchQuery}
          style={styles.rowInputSearchBox}
        />
        <PrimaryButton onPress={handleSearch} style={styles.rowInputButton}>
          Search
        </PrimaryButton>
      </View>
      <View>
        {doctorsList.length > 0 && (
          <PrimaryButton
            onPress={() => {
              setDoctorsList([]);
              setSelectedDoctor(null);
            }}
            style={styles.rowInputButton}
          >
            Clear
          </PrimaryButton>
        )}
      </View>
      <View>
        <FlatList
          data={doctorsList}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => {
                setSelectedDoctor(item);
                handleSelectedDoctor(item);
              }}
              style={({ pressed }) => [
                {
                  padding: 10,
                  borderBottomWidth: 1,
                  borderColor: "#ccc",
                  backgroundColor: pressed
                    ? GlobalStyles.colors.primary200
                    : selectedDoctor === item
                    ? GlobalStyles.colors.primary300
                    : GlobalStyles.colors.primary100,
                },
              ]}
            >
              <View style={styles.doctorsRow}>
                <Text>{item.Name}</Text>
                <Text>{item.Qualifications}</Text>
              </View>
            </Pressable>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  radioButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    marginHorizontal: 12,
    marginVertical: 6,
  },
  inputsRow: {
    flexDirection: "row",
    // justifyContent: "space-between",
  },
  rowInputSearchBox: {
    width: "60%",
  },
  rowInputButton: {
    width: "30%",
    paddingLeft: 10,
    paddingTop: 28,
  },
  label: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
  },
  doctorsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 12,
    marginVertical: 12,
  },
  container: {
    flex: 1,
  },
});

export default SearchDoctor;
