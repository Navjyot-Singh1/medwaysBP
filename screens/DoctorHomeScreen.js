import React, { useState } from "react";
import { View, Text, TextInput, FlatList, StyleSheet } from "react-native";
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

const DoctorHomeScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [screen, setScreen] = useState(0);
  // const dispatch = useDispatch();

  // Replace with your Redux selectors
  // const patientList = useSelector(state => state.patients.patientList);

  // useEffect(() => {
  //   // Dispatch an action to search for patients when the component mounts or searchQuery changes
  //   dispatch(searchPatientsAction(searchQuery));
  // }, [searchQuery]);

  const renderItem = ({ item }) => (
    <View style={styles.patientItem}>
      <Text style={styles.patientName}>{item.name}</Text>
      <Text style={styles.patientPhone}>{item.phone}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Doctor Home</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Search Patients by Name"
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
      />
      <FlatList
        data={patientList}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
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
    fontSize: 14,
  },
});

export default DoctorHomeScreen;
