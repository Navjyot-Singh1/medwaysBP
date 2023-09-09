import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { RootSiblingParent } from "react-native-root-siblings";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./screens/HomeScreen";
import RegistrationScreen from "./screens/RegistrationScreen";
import PatientHomeScreen from "./screens/PatientHomeScreen";
import DoctorHomeScreen from "./screens/DoctorHomeScreen";
import ViewBPDetailsScreen from "./screens/ViewBPDetailsScreen";
import UpdateProfileScreen from "./screens/UpdateProfileScreen";
import OTPConfirmationScreen from "./screens/OTPConfirmationScreen";
import { StatusBar } from "expo-status-bar";

import { Ionicons } from "@expo/vector-icons";
import { GlobalStyles } from "./constants/styles";
import GraphsScreen from "./screens/ViewGraphsScreen";

import { initializeApp } from "@firebase/app";

export const firebaseConfig = {
  apiKey: "AIzaSyBa1D7bIRM78hzLdO6ysRioTF96RHfiRqM",
  authDomain: "medways-bp-tracker-4c1fe.firebaseapp.com",
  projectId: "medways-bp-tracker-4c1fe",
  storageBucket: "medways-bp-tracker-4c1fe.appspot.com",
  messagingSenderId: "555071872161",
  appId: "1:555071872161:web:eea9076dd25cea2570e4e0",
  measurementId: "G-6QVV4DNDYJ",
};

export const app = initializeApp(firebaseConfig);

const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: {
          backgroundColor: GlobalStyles.colors.primary500,
        },
        headerTintColor: "white",
        tabBarStyle: {
          backgroundColor: GlobalStyles.colors.primary500,
          paddingTop: 4,
        },
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: GlobalStyles.colors.primary300,
        tabBarLabelStyle: {
          fontSize: 14,
          // fontWeight: "bold",
        },

        // headerRight: ({ tintColor }) => (
        //   <IconButton
        //     icon="add"
        //     size={24}
        //     color={tintColor}
        //     // onPress={() => navigation.navigate("ManageExpenses")}
        //   />
        // ),
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
          title: "Home",
        }}
      />
      <Tab.Screen
        name="View BP Details"
        component={ViewBPDetailsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list" size={size} color={color} />
          ),
          title: "View BP Details",
        }}
      />
      <Tab.Screen
        name="Update Profile"
        component={UpdateProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
          title: "Update Profile",
        }}
      />
    </Tab.Navigator>
  );
}

function App() {
  return (
    <RootSiblingParent>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: GlobalStyles.colors.primary500,
            },
            headerTintColor: "white",
          }}
        >
          <Stack.Screen
            name="HomeTabs"
            component={HomeTabs}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen name="Registration" component={RegistrationScreen} />
          <Stack.Screen name="PatientHome" component={PatientHomeScreen} />
          <Stack.Screen name="DoctorHome" component={DoctorHomeScreen} />
          <Stack.Screen name="ViewGraphsScreen" component={GraphsScreen} />
          <Stack.Screen
            name="OTPConfirmationScreen"
            component={OTPConfirmationScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </RootSiblingParent>
  );
}

export default App;
