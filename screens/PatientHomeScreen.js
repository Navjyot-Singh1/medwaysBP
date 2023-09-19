import React, { useState, useEffect } from "react";
import { View, Text, Pressable, FlatList, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AddNewReadingModal from "../components/Functional/AddNewReadingModal";
import { GlobalStyles } from "../constants/styles";
import Title from "../components/UI/Title";

import axios from "axios";
import { BACKEND_URL } from "../constants/urlConstants";

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

export default PatientHomeScreen = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [readings, setReadings] = useState([]);
  const [patientId, setPatientId] = useState("1"); // TODO: get patientId from auth context

  const navigation = useNavigation();

  useEffect(() => {
    fetchReadings();
  }, []);

  const fetchReadings = async () => {
    const requestBody = {
      patientId: patientId,
    };

    const url = BACKEND_URL + "/api/readings/patient";
    const response = await axios.get(url, requestBody);

    console.log(response.data);
    setReadings(response.data);
  };

  const handleAddReading = async (newReading) => {
    // setReadings([...readings, newReading]);

    const requestBody = {
      actionsTaken: newReading.actionsTaken,
      diastolicPressure: newReading.diastolic,
      doctorId: newReading.doctorId,
      patientId: newReading.patientId,
      symptoms: newReading.symptoms,
      systolicPressure: newReading.systolic,
      timestamp: newReading.dateTime,
    };
    const url = BACKEND_URL + "/api/readings";
    const response = await axios.post(url, requestBody);

    console.log(response.data);
  };

  return (
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
      <Title>BP Readings</Title>
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
});
