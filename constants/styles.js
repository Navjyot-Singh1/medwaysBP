import Toast from "react-native-root-toast";

export const GlobalStyles = {
  //Cool colors
  colors: {
    primary50: "#F7FBFC",
    primary100: "#E1F4FA",
    primary200: "#B4E4FE",
    primary300: "#8BD5FE",
    primary400: "#5EB5F0",
    primary500: "#3594E3",
    primary600: "#2776B2",
    primary700: "#19598A",
    primary800: "#0C3C61",
    accent500: "#F25E15",
    error50: "#fcc4e4",
    error500: "#9b095c",
    gray500: "#39324a",
    gray700: "#221c30",
  },

  //Warm colors
  // colors: {
  //   primary50: "#FFF8F0",
  //   primary100: "#FFE2CA",
  //   primary200: "#FFC19E",
  //   primary300: "#FFA270",
  //   primary400: "#FF8251",
  //   primary500: "#FF5E1E",
  //   primary600: "#DB4E0E",
  //   primary700: "#B83D0B",
  //   primary800: "#952B08",
  //   accent50: "#FFFAF0",
  //   accent100: "#FFF0DB",
  //   accent200: "#FFE5BF",
  //   accent300: "#FFD8A3",
  //   accent400: "#FFC378",
  //   accent500: "#FFA941",
  //   accent600: "#DB9030",
  //   accent700: "#B87620",
  //   accent800: "#955D10",
  //   error50: "#FEE9E9",
  //   error100: "#FCB0B0",
  //   error200: "#FA7777",
  //   error300: "#F84D4D",
  //   error400: "#F62626",
  //   error500: "#F40000",
  //   error600: "#D10000",
  //   error700: "#A80000",
  //   error800: "#7E0000",
  // },
};

export const toastConfigSuccess = {
  duration: Toast.durations.LONG,
  position: Toast.positions.BOTTOM,
  shadow: true,
  animation: true,
  hideOnPress: true,
  delay: 0,
  backgroundColor: "#5cb85c",
  textColor: "#fff",
};

export const toastConfigFailure = {
  duration: Toast.durations.LONG,
  position: Toast.positions.BOTTOM,
  shadow: true,
  animation: true,
  hideOnPress: true,
  delay: 0,
  backgroundColor: "#d9534f",
  textColor: "#fff",
};
