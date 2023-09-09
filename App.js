import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
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
import LoginScreen from "./screens/LoginScreen";
import { Provider, useDispatch, useSelector } from "react-redux";
import store from "./store/store";
import { setUser } from "./reducers/authSlice";

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

const type = "Patient";

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
      })}
    >
      <Tab.Screen
        name="Home"
        component={type === "Patient" ? PatientHomeScreen : DoctorHomeScreen}
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
        initialParams={{ type: type }}
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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [type, setType] = useState("Patient");

  // const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    AsyncStorage.getItem("user").then((user) => {
      if (user) {
        // dispatch(setUser(JSON.parse(user)));
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });
  }, []);

  useEffect(() => {
    if (user) {
      AsyncStorage.setItem("user", JSON.stringify(user));
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [user]);

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
          {isLoggedIn ? (
            <>
              <Stack.Screen
                name="HomeTabs"
                component={HomeTabs}
                options={{
                  headerShown: false,
                }}
              />
              {type === "Patient" ? (
                <Stack.Screen
                  name="PatientHome"
                  component={PatientHomeScreen}
                />
              ) : (
                <Stack.Screen name="DoctorHome" component={DoctorHomeScreen} />
              )}

              <Stack.Screen name="ViewGraphsScreen" component={GraphsScreen} />
              <Stack.Screen
                name="OTPConfirmationScreen"
                component={OTPConfirmationScreen}
              />
            </>
          ) : (
            <>
              <Stack.Screen
                name="HomeMain"
                component={HomeScreen}
                title="Medways BP Tracker"
              />
              <Stack.Screen
                name="Registration"
                component={RegistrationScreen}
              />
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen
                name="OTPConfirmationScreen"
                component={OTPConfirmationScreen}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </RootSiblingParent>
  );
}

export default App;
