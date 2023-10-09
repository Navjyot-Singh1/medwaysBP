import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { GlobalStyles } from "../../constants/styles";

const MyDropdownPicker = ({
  options,
  onChanged,
  value,
  style,
  mandatory,
  label,
  placeholder,
  zIndex,
  zIndexInverse,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <View style={[styles.inputContainer, style]}>
      <Text style={[styles.inputLabel]}>
        {label}
        {mandatory ? (
          <Text style={{ color: "red", fontWeight: "bold" }}> *</Text>
        ) : null}
      </Text>
      <DropDownPicker
        items={options}
        value={value}
        containerStyle={{ height: 40 }}
        listItemLabelStyle={{
          fontSize: 18,
          color: "black",
        }}
        labelStyle={{
          fontSize: 18,
          color: "black",
        }}
        selectedItemContainerStyle={{
          backgroundColor: GlobalStyles.colors.primary200,
        }}
        itemStyle={{
          justifyContent: "flex-start",
        }}
        style={{
          backgroundColor: GlobalStyles.colors.primary200,
          borderColor: "transparent",
        }}
        dropDownContainerStyle={{
          borderColor: "transparent",
          borderWidth: 1,
        }}
        placeholderStyle={{
          fontSize: 18,
          color: "black",
        }}
        setValue={onChanged}
        placeholder={placeholder}
        open={open}
        setOpen={setOpen}
        zIndex={zIndex}
        zIndexInverse={zIndexInverse}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 8,
    marginHorizontal: 4,
  },
  inputLabel: {
    fontSize: 16,
    marginBottom: 4,
    color: GlobalStyles.colors.primary800,
  },
  pickerStyles: {
    backgroundColor: GlobalStyles.colors.primary200,
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
    color: "black",
  },
});

export default MyDropdownPicker;
