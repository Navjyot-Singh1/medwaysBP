import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  Pressable,
} from "react-native";

const ReadingItem = ({ reading, onReadingClick }) => {
  const {
    timestamp,
    pulse,
    systolicPressure,
    diastolicPressure,
    actionsTaken,
  } = reading;

  // const ButtonComponent = Platform.OS === "android" ? Pressable : TouchableOpacity;

  // Function to handle reading click
  const handleReadingClick = () => {
    // Open the AddReadingModal with the reading data in update mode
    onReadingClick(reading);
  };

  const formatDate = (date) => {
    //Convert date from 10/6/2023, 8:44:19 PM to DD/MM/YYYY
    const dateParts = date.split(",");
    const datePart = dateParts[0];
    const timePart = dateParts[1];

    const dateComponents = datePart.split("/");
    const timeComponents = timePart.split(":");
    const ampm = timeComponents[2].split(" ")[1];

    const day = dateComponents[0];
    const month = dateComponents[1];
    const year = dateComponents[2];

    const hour = timeComponents[0];
    const minute = timeComponents[1];

    return `${day}/${month}/${year}`;
  };

  return (
    <TouchableOpacity
      onPress={handleReadingClick}
      style={({ pressed }) => [
        styles.container,
        Platform.OS === "android" &&
          pressed && { backgroundColor: "rgba(0, 0, 0, 0.1)" },
        Platform.OS === "ios" && pressed && { opacity: 0.5 },
      ]}
    >
      <View style={styles.container}>
        <View style={styles.left}>
          <Text style={styles.text}>{reading.symptoms}</Text>
          <Text style={styles.text}>{formatDate(timestamp)}</Text>
        </View>
        <View style={styles.right}>
          <Text style={styles.text}>Pulse : {pulse}</Text>
          <Text style={styles.text}>
            BP : {systolicPressure}/{diastolicPressure}
          </Text>
          <Text style={styles.text}>{actionsTaken}</Text>
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
  text: {
    fontSize: 17,
  },
};

export default ReadingItem;
