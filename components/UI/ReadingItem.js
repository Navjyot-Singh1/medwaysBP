import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

const ReadingItem = ({ reading, onReadingClick }) => {
  const {
    timestamp,
    pulse,
    systolicPressure,
    diastolicPressure,
    actionsTaken,
  } = reading;

  // Function to handle reading click
  const handleReadingClick = () => {
    // Open the AddReadingModal with the reading data in update mode
    onReadingClick(reading);
  };

  return (
    <TouchableOpacity onPress={handleReadingClick}>
      <View style={styles.container}>
        <View style={styles.left}>
          <Text>Symptoms: {reading.symptoms}</Text>
          <Text>{timestamp}</Text>
        </View>
        <View style={styles.right}>
          <Text>Pulse: {pulse}</Text>
          <Text>
            Blood Pressure: {systolicPressure}/{diastolicPressure}
          </Text>
          <Text>{actionsTaken}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = {
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginVertical: 4,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  left: {
    flex: 1,
  },
  right: {
    flex: 1,
  },
  heading: {
    fontWeight: "bold",
  },
};

export default ReadingItem;
