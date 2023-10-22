import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Pressable,
  FlatList,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AddNewReadingModal from "../components/Functional/AddNewReadingModal";
import { GlobalStyles } from "../constants/styles";
import Title from "../components/UI/Title";
import AsyncStorage from "@react-native-async-storage/async-storage";

import axios from "axios";
import { BACKEND_URL } from "@env";
import ReadingItem from "../components/UI/ReadingItem";

export default PatientHomeScreen = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [readings, setReadings] = useState([]);
  const [selectedReading, setSelectedReading] = useState();
  const [patientId, setPatientId] = useState();
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

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

  const ButtonComponent =
    Platform.OS === "android" ? Pressable : TouchableOpacity;

  useEffect(() => {
    const fetchPatientId = async () => {
      AsyncStorage.getItem("phoneNumber")
        .then((phoneNumber) => {
          setPatientId(phoneNumber);
          fetchReadingsInitial(phoneNumber);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchPatientId();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      fetchReadings();
    }, 3000);
  }, []);

  const fetchReadings = async () => {
    const requestBody = {
      patientId: patientId,
    };

    const url = process.env.BACKEND_URL + "api/readings/patient";
    const response = await axios.post(url, requestBody);

    if (response.data.length === 0) {
      Alert.alert("No readings found");
    }

    setReadings(response.data);
  };

  const fetchReadingsInitial = async (patientId) => {
    const requestBody = {
      patientId: patientId,
    };

    const url = process.env.BACKEND_URL + "api/readings/patient";

    const response = await axios.post(url, requestBody);

    if (response.data.length === 0) {
      Alert.alert("No readings found");
    } else {
      setReadings(response.data);
    }
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
      patientId: patientId,
    };
    const url = process.env.BACKEND_URL + "api/readings";
    const response = await axios.post(url, requestBody);

    if (response.status === 200) {
      Alert.alert("Reading added successfully");
    } else {
      Alert.alert("Error in adding reading. Please try again!");
    }

    fetchReadings();
  };

  const handleUpdateReading = async (updatedReading) => {
    const requestBody = {
      actionsTaken: updatedReading.actionsTaken,
      diastolicPressure: updatedReading.diastolic,
      patientId: patientId,
      symptoms: updatedReading.symptoms,
      systolicPressure: updatedReading.systolic,
      pulse: updatedReading.pulse,
      timestamp: updatedReading.dateTime,
    };

    const url = process.env.BACKEND_URL + "api/readings/" + selectedReading.id;
    const response = await axios.put(url, requestBody);

    if (response.status === 200) {
      Alert.alert("Reading updated successfully");
    } else {
      Alert.alert("Error in updating reading. Please try again!");
    }

    fetchReadings();
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <ButtonComponent
          android_ripple={{ color: "rgba(0, 0, 0, 0.1)" }}
          style={({ pressed }) => [
            styles.button,
            Platform.OS === "android" &&
              pressed && { backgroundColor: "rgba(0, 0, 0, 0.1)" },
            Platform.OS === "ios" && pressed && { opacity: 0.5 },
          ]}
          onPress={() => setIsModalVisible(true)}
        >
          <Text style={styles.buttonText}>Add New BP Reading</Text>
        </ButtonComponent>
        <ButtonComponent
          android_ripple={{ color: "rgba(0, 0, 0, 0.1)" }}
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
          <Text style={styles.buttonText}>View Graphical Trends</Text>
        </ButtonComponent>
      </View>
      <Title>BP Readings</Title>

      {/* <View style={styles.tableHeading}>
        <Text style={styles.tableHeadingItem}>Date & Time</Text>
        <Text style={styles.tableHeadingItem}>BP Reading</Text>
        <Text style={styles.tableHeadingItem}>Actions Taken</Text>
      </View> */}
      {readings.length === 0 ? (
        <View style={styles.noReadings}>
          <Text>No readings found</Text>
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
            <ReadingItem reading={item} onReadingClick={handleReadingClick} />
          )}
        />
      )}

      <AddNewReadingModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onSave={handleAddReading}
      />
      <AddNewReadingModal
        visible={isUpdateModalVisible}
        onClose={() => setIsUpdateModalVisible(false)}
        onSave={handleUpdateReading}
        reading={selectedReading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
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
  noReadings: {
    flex: 1,
    // justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
});
