import React, { useState, useEffect } from "react";
import { View, Text, Modal, Pressable, StyleSheet } from "react-native";
import { LineChart } from "react-native-chart-kit";

import { Dimensions } from "react-native";
import Title from "../UI/Title";
const screenWidth = Dimensions.get("window").width;

const BPGraphs = ({ readings }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedReading, setSelectedReading] = useState(null);

  const handleDataPointClick = ({ index }) => {
    console.log("Clicked index:", index);
    console.log("Readings:", readings);

    setSelectedReading(readings[index]);
    console.log("Selected Reading:", selectedReading);

    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedReading(null);
    setModalVisible(false);
  };

  const systolicData = readings.map((reading) => reading.systolic);
  const diastolicData = readings.map((reading) => reading.diastolic);

  const chartData = {
    labels: readings.map((reading) => reading.dateTime), // Assuming timestamp is a string
    datasets: [
      {
        data: systolicData,
        color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
        strokeWidth: 2,
      },
      {
        data: diastolicData,
        color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  };

  const data = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
        strokeWidth: 2, // optional
      },

      {
        data: [30, 15, 28, 40, 12, 43],
        color: (opacity = 1) => `rgba(200, 65, 132, ${opacity})`, // optional
        strokeWidth: 2, // optional
      },
    ],
    legend: ["Rainy Days"], // optional
  };

  const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
  };

  return (
    <View>
      {/* <LineChart
        data={chartData}
        onDataPointClick={handleDataPointClick}
        width={400}
        height={220}
        yAxisLabel="Pressure"
        yAxisSuffix="mmHg"
      /> */}
      <LineChart
        data={chartData}
        width={screenWidth}
        height={400}
        chartConfig={chartConfig}
        bezier
        yAxisLabel="Pressure"
        yAxisSuffix="mmHg"
        onDataPointClick={handleDataPointClick}
      />
      {/* <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}> */}
      <View>
        <Title>Details of Selected Reading:</Title>
        {selectedReading ? (
          <View style={styles.selectedReadingContainer}>
            <Text style={styles.selectedReadingItem}>
              Systolic: {selectedReading.systolic}
            </Text>
            <Text style={styles.selectedReadingItem}>
              Diastolic: {selectedReading.diastolic}
            </Text>
            <Text style={styles.selectedReadingItem}>
              Symptoms: {selectedReading.symptoms}
            </Text>
            {/* Add pulse here */}
            <Text style={styles.selectedReadingItem}>
              Actions Taken: {selectedReading.actionsTaken}
            </Text>
            {/* Add other details here */}
          </View>
        ) : (
          <Text style={styles.noReadingSelected}>No reading selected</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  selectedReadingContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  selectedReadingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    fontSize: 17,
  },
  noReadingSelected: {
    fontSize: 20,

    textAlign: "center",
  },
});

export default BPGraphs;
