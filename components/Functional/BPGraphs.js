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
    setSelectedReading(readings[index]);

    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedReading(null);
    setModalVisible(false);
  };

  const systolicData = readings.map((reading) => reading.systolicPressure);
  const diastolicData = readings.map((reading) => reading.diastolicPressure);
  const pulseData = readings.map((reading) => reading.pulse);

  const chartData = {
    labels: readings.map((reading) =>
      //Split the timestamp string to get only the date part and then split the date part with the delimiter '/' to get the month and day and then join them with the delimiter '-' to get the date in the format 'MM-DD'
      {
        let date = reading.timestamp.split(",")[0];
        let dateParts = date.split("/");
        return dateParts[1] + "-" + dateParts[0];
      }
    ),
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
      {
        data: pulseData,
        color: (opacity = 1) => `rgba(0, 255, 0, ${opacity})`,
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
    backgroundGradientFrom: "#08130D",
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
        // yAxisLabel="Pressure"
        // yAxisSuffix="mmHg"
        onDataPointClick={handleDataPointClick}
        style={{
          marginHorizontal: 2,
        }}
      />
      {/* <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}> */}
      <View>
        <View style={styles.legendContainer}>
          <View style={styles.legendItem}>
            <View style={styles.legendColorBox1}></View>
            <Text style={styles.legendText}>Systolic</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={styles.legendColorBox2}></View>
            <Text style={styles.legendText}>Diastolic</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={styles.legendColorBox3}></View>
            <Text style={styles.legendText}>Pulse</Text>
          </View>
        </View>
        <Title>Selected Reading:</Title>
        {selectedReading ? (
          <View style={styles.selectedReadingContainer}>
            <Text style={styles.selectedReadingItem}>
              Systolic BP: {selectedReading.systolicPressure}
            </Text>
            <Text style={styles.selectedReadingItem}>
              Diastolic BP: {selectedReading.diastolicPressure}
            </Text>
            <Text style={styles.selectedReadingItem}>
              Symptoms: {selectedReading.symptoms}
            </Text>
            {/* Add pulse here */}
            <Text style={styles.selectedReadingItem}>
              Pulse: {selectedReading.pulse}
            </Text>
            <Text style={styles.selectedReadingItem}>
              Actions Taken: {selectedReading.actionsTaken}
            </Text>
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
    // marginHorizontal: 5,
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
    fontSize: 18,
    // fontWeight: "bold",
  },
  noReadingSelected: {
    fontSize: 20,
    textAlign: "center",
  },
  legendContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginVertical: 5,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  legendColorBox1: {
    width: 20,
    height: 20,
    backgroundColor: "rgb(255, 0, 0)",
    marginRight: 5,
  },
  legendColorBox2: {
    width: 20,
    height: 20,
    backgroundColor: "rgb(0, 0, 255)", // "blue
    marginRight: 5,
  },
  legendColorBox3: {
    width: 20,
    height: 20,
    backgroundColor: "rgb(0, 255, 0)", // "green
    marginRight: 5,
  },
  legendText: {
    fontSize: 16,
  },
});

export default BPGraphs;
