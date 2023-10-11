import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  Pressable,
  Alert,
  TouchableNativeFeedback,
  Platform,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import AddNewReadingModal from "../components/Functional/AddNewReadingModal";
import { useNavigation } from "@react-navigation/native";
import { GlobalStyles } from "../constants/styles";
import Title from "../components/UI/Title";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { BACKEND_URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ReadingItem from "../components/UI/ReadingItem";

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
  const [readings, setReadings] = useState([]);
  const [patientList, setPatientList] = useState([]);
  const [filteredPatientList, setFilteredPatientList] = useState(patientList);
  const [doctor, setDoctor] = useState({});
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [selectedReading, setSelectedReading] = useState();
  const [selectedPatient, setSelectedPatient] = useState();
  const [loading, setLoading] = useState(false);

  const ButtonComponent =
    Platform.OS === "android" ? Pressable : TouchableOpacity;

  const sortArrayByTimestampDescending = (array) => {
    // Custom comparison function
    function compareTimestamps(a, b) {
      // Split timestamp strings into parts
      const partsA = a.timestamp.split(/[/, : ]+/);
      const partsB = b.timestamp.split(/[/, : ]+/);

      // Extract date and time components
      const monthA = parseInt(partsA[0]);
      const dayA = parseInt(partsA[1]);
      const yearA = parseInt(partsA[2]);
      const hourA = parseInt(partsA[3]);
      const minuteA = parseInt(partsA[4]);
      const secondA = parseInt(partsA[5]);

      const monthB = parseInt(partsB[0]);
      const dayB = parseInt(partsB[1]);
      const yearB = parseInt(partsB[2]);
      const hourB = parseInt(partsB[3]);
      const minuteB = parseInt(partsB[4]);
      const secondB = parseInt(partsB[5]);

      // Create Date objects
      const dateA = new Date(yearA, monthA - 1, dayA, hourA, minuteA, secondA);
      const dateB = new Date(yearB, monthB - 1, dayB, hourB, minuteB, secondB);

      // Compare in descending order
      if (dateA > dateB) {
        return -1;
      } else if (dateA < dateB) {
        return 1;
      }
      return 0;
    }

    // Sort the array using the custom comparison function
    array.sort(compareTimestamps);

    return array;
  };

  const handleReadingClick = (reading) => {
    setSelectedReading(reading);
    setTimeout(() => {
      setIsUpdateModalVisible(true);
    }, 200);
  };

  const handleAddReading = async (newReading) => {
    const requestBody = {
      actionsTaken: newReading.actionsTaken,
      diastolicPressure: newReading.diastolic,
      doctorId: newReading.doctorId,
      patientId: newReading.patientId,
      symptoms: newReading.symptoms,
      pulse: newReading.pulse,
      systolicPressure: newReading.systolic,
      timestamp: newReading.dateTime,
      patientId: selectedPatient.id,
    };
    const url = BACKEND_URL + "api/readings";
    const response = await axios.post(url, requestBody);

    if (response.status === 200) {
      Alert.alert("Reading added successfully");
    } else {
      Alert.alert("Error in adding reading. Please try again!");
    }
    console.log("selectedPatient.id", selectedPatient.id);
    fetchReadings(selectedPatient.id);
  };

  const handleUpdateReading = async (updatedReading) => {
    const requestBody = {
      actionsTaken: updatedReading.actionsTaken,
      diastolicPressure: updatedReading.diastolic,
      patientId: selectedPatient.id,
      symptoms: updatedReading.symptoms,
      systolicPressure: updatedReading.systolic,
      pulse: updatedReading.pulse,
      timestamp: updatedReading.dateTime,
    };

    const url = BACKEND_URL + "api/readings/" + selectedReading.id;
    const response = await axios.put(url, requestBody);

    if (response.status === 200) {
      Alert.alert("Reading updated successfully");
    } else {
      Alert.alert("Error in updating reading. Please try again!");
    }

    fetchReadings(selectedPatient.id);
  };

  const fetchReadings = async (patientId) => {
    const requestBody = {
      patientId: patientId,
    };

    const url = BACKEND_URL + "api/readings/patient";
    setLoading(true);
    const response = await axios.post(url, requestBody);

    if (response.data.length === 0) {
      Alert.alert("No readings found");
      setReadings([]);
      setLoading(false);
    } else {
      setReadings(response.data);
      setLoading(false);
    }
  };

  const getAllPatients = async (doctorId) => {
    //API is in the form of req.params.doctorId
    axios
      .get(`${BACKEND_URL}api/patients/doctors/${doctorId}`)
      .then((response) => {
        setPatientList(response.data);
        setFilteredPatientList(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getDoctorDetails = async () => {
    AsyncStorage.getItem("phoneNumber").then((phoneNo) => {
      console.log("backend url", BACKEND_URL);
      //API is in the form of req.params.id
      axios
        .get(`${BACKEND_URL}api/doctors/${phoneNo}`)
        .then((response) => {
          setDoctor(response.data);
          getAllPatients(response.data.id);
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
      style={({ pressed }) => [
        styles.patientItem,
        Platform.OS === "android" &&
          pressed && { backgroundColor: "rgba(0, 0, 0, 0.1)" },
        Platform.OS === "ios" && pressed && { opacity: 0.5 },
      ]}
      android_ripple={{ color: "rgba(0, 0, 0, 0.1)" }}
      onPress={() => {
        setScreen(1);
        fetchReadings(item.id);
        setSelectedPatient(item);
      }}
    >
      <Text style={styles.patientName}>{item.name}</Text>
      <Text style={styles.patientPhone}>{item.mobileNo}</Text>
    </Pressable>
  );

  return (
    <View style={styles.outerContainer}>
      {screen === 0 && (
        <View style={styles.container}>
          <Text style={styles.searchPatientsTitle}>Search Patients</Text>
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
            <ButtonComponent
              style={({ pressed }) => [
                styles.button,
                Platform.OS === "android" &&
                  pressed && { backgroundColor: "rgba(0, 0, 0, 0.1)" },
                Platform.OS === "ios" && pressed && { opacity: 0.5 },
                Platform.OS === "ios" && { borderWidth: 1 },
              ]}
              onPress={() => setIsModalVisible(true)}
            >
              <Text style={styles.buttonText}>Add New BP Reading</Text>
            </ButtonComponent>
            <ButtonComponent
              style={({ pressed }) => [
                styles.button,
                Platform.OS === "android" &&
                  pressed && { backgroundColor: "rgba(0, 0, 0, 0.1)" },
                Platform.OS === "ios" && pressed && { opacity: 0.5 },
              ]}
              onPress={() =>
                navigation.navigate("LoggedInScreens", {
                  screen: "ViewGraphsScreen",
                  params: {
                    readings: readings,
                  },
                })
              }
            >
              <Text style={styles.buttonText}>View Graph</Text>
            </ButtonComponent>
          </View>
          <View style={styles.titleContainer}>
            <ButtonComponent
              style={({ pressed }) => [
                styles.backButton,
                Platform.OS === "android" &&
                  pressed && { backgroundColor: "rgba(0, 0, 0, 0.1)" },
                Platform.OS === "ios" && pressed && { opacity: 0.5 },
              ]}
              onPress={() => setScreen(0)}
            >
              <Text style={styles.backButton}>
                <Ionicons name="arrow-back" size={30} color="black" />
              </Text>
            </ButtonComponent>
            <Text style={styles.title}>BP Readings</Text>
          </View>
          {loading ? (
            <ActivityIndicator
              size="large"
              color={GlobalStyles.colors.primary300}
              marginVertical={60}
            />
          ) : readings.length === 0 ? (
            <View style={styles.noReadings}>
              <Text style={{ fontSize: 18 }}>No readings found</Text>
            </View>
          ) : (
            <FlatList
              data={sortArrayByTimestampDescending(readings)}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                // <View>
                //   <View style={styles.readingItem}>
                //     <Text style={styles.tableItem1}> {item.dateTime}</Text>
                //     <Text style={styles.tableItem2}>
                //       {item.systolic}/{item.diastolic}
                //     </Text>
                //     <Text style={styles.tableItem3}>{item.actionsTaken}</Text>
                //   </View>
                // </View>
                <ReadingItem
                  reading={item}
                  onReadingClick={handleReadingClick}
                />
              )}
            />
          )}

          <AddNewReadingModal
            visible={isModalVisible}
            onClose={() => {
              setIsModalVisible(false);
            }}
            onSave={handleAddReading}
          />
          <AddNewReadingModal
            visible={isUpdateModalVisible}
            onClose={() => setIsUpdateModalVisible(false)}
            onSave={handleUpdateReading}
            reading={selectedReading}
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
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 16,
    marginTop: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    alignContent: "center",
    marginLeft: 16,
  },
  backButton: {
    // backgroundColor: GlobalStyles.colors.primary300,
    alignSelf: "flex-start",
    borderRadius: 5,
    alignItems: "center",
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
    justifyContent: "space-evenly",
    // marginBottom: 5,
  },
  button: {
    // backgroundColor: GlobalStyles.colors.primary300,
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
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
  noReadings: {
    flex: 1,
    // justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
  searchPatientsTitle: {
    fontSize: 24,
    fontWeight: "bold",
    alignContent: "center",
    marginBottom: 16,
    textAlign: "center",
  },
});

export default DoctorHomeScreen;
