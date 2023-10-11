import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const CustomHeader = ({ title }) => {
  return (
    <View style={styles.header}>
      <Image
        source={require("../../assets/Logo.png")} // Replace with your logo image path
        style={styles.logo}
      />
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row", // Align items horizontally
    alignItems: "center", // Center items vertically
  },
  logo: {
    width: 30, // Adjust the width as needed
    height: 30, // Adjust the height as needed
    marginRight: 8, // Adjust the margin as needed
  },
  title: {
    fontSize: 18, // Adjust the font size as needed
    fontWeight: "bold",
    color: "white",
  },
});

export default CustomHeader;
