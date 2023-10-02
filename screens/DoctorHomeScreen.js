import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  Pressable,
} from "react-native";
import AddNewReadingModal from "../components/Functional/AddNewReadingModal";
import { useNavigation } from "@react-navigation/native";
import { GlobalStyles } from "../constants/styles";
import Title from "../components/UI/Title";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { BACKEND_URL } from "../constants/urlConstants";
import AsyncStorage from "@react-native-async-storage/async-storage";

// import { useSelector, useDispatch } from 'react-redux';
// import { searchPatientsAction } from '../redux/actions/patientActions';

const patientList = [
  {
    id: 1,
    name: "John Doe",
    phone: "1234567890",
  },
  {
    id: 2,
    name: "Jane Doe",
    phone: "1234567890",
  },
  {
    id: 3,
    name: "John Smith",
    phone: "1234567890",
  },
  {
    id: 4,
    name: "Jane Smith",
    phone: "1234567890",
  },
];

const readings = [
  {
    id: "1",
    dateTime: "2021-05-01 10:00",
    systolic: 120,
    diastolic: 80,
    actionsTaken: "Took medication",
  },
  {
    id: "2",
    dateTime: "2021-05-02 10:00",
    systolic: 130,
    diastolic: 90,
    actionsTaken: "Took medication and exercised along with diet control",
  },
  {
    id: "3",
    dateTime: "2021-05-03 10:00",
    systolic: 140,
    diastolic: 100,
    actionsTaken: "Took medication",
  },
  {
    id: "4",
    dateTime: "2021-05-04 10:00",
    systolic: 150,
    diastolic: 110,
    actionsTaken: "Took medication",
  },
];

const DoctorHomeScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [screen, setScreen] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [readings, setReadings] = useState([
    {
      id: "1",
      dateTime: "2021-05-01",
      systolic: 120,
      diastolic: 80,
      actionsTaken: "Took medication",
    },
    {
      id: "2",
      dateTime: "2021-05-02",
      systolic: 130,
      diastolic: 90,
      actionsTaken: "Took medication and exercised along with diet control",
    },
    {
      id: "3",
      dateTime: "2021-05-03",
      systolic: 140,
      diastolic: 100,
      actionsTaken: "Took medication",
    },
    {
      id: "4",
      dateTime: "2021-05-04",
      systolic: 150,
      diastolic: 110,
      actionsTaken: "Took medication",
    },
  ]);
  const [patientList, setPatientList] = useState([
    {
      id: 1,
      name: "John Doe",
      phone: "1234567890",
    },
    {
      id: 2,
      name: "Jane Doe",
      phone: "1234567890",
    },
    {
      id: 3,
      name: "John Smith",
      phone: "1234567890",
    },
    {
      id: 4,
      name: "Jane Smith",
      phone: "1234567890",
    },
  ]);
  const [filteredPatientList, setFilteredPatientList] = useState(patientList);
  const [doctor, setDoctor] = useState({});

  const handleAddReading = async (newReading) => {
    const requestBody = {
      actionsTaken: newReading.actionsTaken,
      diastolicPressure: newReading.diastolic,
      doctorId: 1,
      patientId: 1,
      symptoms: newReading.symptoms,
      pulse: newReading.pulse,
      systolicPressure: newReading.systolic,
      timestamp: newReading.dateTime,
    };

    try {
      const response = await axios.post(
        `${BACKEND_URL}api/readings`,
        requestBody
      );
      const newReadingData = response.data;
      setReadings((prevReadings) => [...prevReadings, newReadingData]);
    } catch (error) {
      console.error(error);
    }
  };

  const getAllPatients = async (doctorId) => {
    //API is in the form of req.params.doctorId
    axios
      .get(`${BACKEND_URL}api/patients/doctors/${doctorId}`)
      .then((response) => {
        setPatientList(response.data);
      })

      .catch((error) => {
        console.error(error);
      });
  };

  const getDoctorDetails = async () => {
    AsyncStorage.getItem("phoneNumber").then((phoneNo) => {
      //API is in the form of req.params.id
      axios
        .get(`${BACKEND_URL}api/doctors/${phoneNo}`)
        .then((response) => {
          setDoctor(response.data);
        })

        .catch((error) => {
          console.error(error);
        });
    });
  };

  // const dispatch = useDispatch();
  const navigation = useNavigation();
  // Replace with your Redux selectors
  // const patientList = useSelector(state => state.patients.patientList);

  useEffect(() => {
    getDoctorDetails();
  }, []);

  useEffect(() => {
    if (doctor.length > 0) {
      getAllPatients(doctor.DoctorID);
    }
  }, [doctor]);

  useEffect(() => {
    // Dispatch an action to search for patients when the component mounts or searchQuery changes
    // dispatch(searchPatientsAction(searchQuery));
    if (searchQuery === "") {
      setFilteredPatientList(patientList);
    } else {
      setFilteredPatientList(
        patientList.filter((patient) =>
          patient.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
  }, [searchQuery]);

  const renderItem = ({ item }) => (
    <Pressable
      style={[
        styles.patientItem,
        ({ pressed }) => ({ backgroundColor: pressed ? "#e0e0e0" : "#f0f0f0" }),
      ]}
      onPress={() => setScreen(1)}
    >
      <Text style={styles.patientName}>{item.name}</Text>
      <Text style={styles.patientPhone}>{item.phone}</Text>
    </Pressable>
  );

  return (
    <View style={styles.outerContainer}>
      {screen === 0 && (
        <View style={styles.container}>
          <Text style={styles.title}>Search Patients</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search Patients by Name"
            value={searchQuery}
            onChangeText={(text) => setSearchQuery(text)}
          />
          <FlatList
            data={filteredPatientList}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
      )}
      {screen === 1 && (
        <View style={styles.container}>
          <View style={styles.buttonContainer}>
            <Pressable
              style={styles.button}
              onPress={() => setIsModalVisible(true)}
            >
              <Text style={styles.buttonText}>Add New BP Reading</Text>
            </Pressable>
            <Pressable
              style={styles.button}
              onPress={() =>
                navigation.navigate("LoggedInScreens", {
                  screen: "ViewGraphsScreen",
                  params: {
                    readings: readings,
                  },
                })
              }
            >
              <Text style={styles.buttonText}>View Graphical Trends</Text>
            </Pressable>
          </View>
          <View style={styles.titleContainer}>
            <Pressable style={styles.button} onPress={() => setScreen(0)}>
              <Text style={styles.backButton}>
                <Ionicons name="arrow-back" size={16} color="black" />
              </Text>
            </Pressable>
            <Text style={styles.title}>BP Readings</Text>
          </View>
          <View style={styles.tableHeading}>
            <Text style={styles.tableHeadingItem}>Date & Time</Text>
            <Text style={styles.tableHeadingItem}>BP Reading</Text>
            <Text style={styles.tableHeadingItem}>Actions Taken</Text>
          </View>
          <FlatList
            data={readings}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View>
                <View style={styles.readingItem}>
                  <Text style={styles.tableItem1}> {item.dateTime}</Text>
                  <Text style={styles.tableItem2}>
                    {item.systolic}/{item.diastolic}
                  </Text>
                  <Text style={styles.tableItem3}>{item.actionsTaken}</Text>
                </View>
              </View>
            )}
          />
          <AddNewReadingModal
            visible={isModalVisible}
            onClose={() => setIsModalVisible(false)}
            onSave={handleAddReading}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    marginTop: 20,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    alignSelf: "center",
  },
  backButton: {
    backgroundColor: GlobalStyles.colors.primary300,
    fontWeight: "bold",
    fontSize: 16,
    alignSelf: "flex-start",
  },
  searchInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  patientItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#f0f0f0",
    padding: 12,
    marginBottom: 8,
    borderRadius: 8,
  },
  patientName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  patientPhone: {
    fontSize: 18,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  button: {
    backgroundColor: GlobalStyles.colors.primary300,
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  readingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderColor: "lightgray",
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  tableHeading: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderColor: "lightgray",
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: GlobalStyles.colors.primary300,
  },
  tableHeadingItem: {
    fontSize: 14,
    fontWeight: "bold",
  },
  tableItem1: {
    flex: 8,
  },
  tableItem2: {
    flex: 5,
  },
  tableItem3: {
    flex: 8,
  },
});

export default DoctorHomeScreen;
