import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Checkbox, Text, Button } from "react-native-paper";

const TermsAndConditionsCheckbox = ({ isChecked, onToggle }) => {
  
   return (
    <View style={styles.container}>
      <Checkbox
        status={isChecked ? "checked" : "unchecked"}
        onPress={onToggle}
      />
      <Text>I accept the terms and conditions</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default TermsAndConditionsCheckbox;
