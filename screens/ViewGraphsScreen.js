import React from "react";
import { View } from "react-native";
import BPGraphs from "../components/Functional/BPGraphs";

const ViewGraphsScreen = ({ route }) => {
  const { readings } = route.params;
  console.log("readings:", readings);
  return (
    <View style={{ flex: 1 }}>
      <BPGraphs readings={readings} />
    </View>
  );
};

export default ViewGraphsScreen;
