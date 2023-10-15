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
import { Image, Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { GlobalStyles } from "./constants/styles";
import GraphsScreen from "./screens/ViewGraphsScreen";
import LoginScreen from "./screens/LoginScreen";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { useAppContext } from "./context/AppContext";
import CustomHeader from "./components/UI/CustomHeader";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeTabs({ route }) {
  const { logout, isLoggedIn } = useAppContext();
  const navigation = useNavigation();
  const { type } = route.params;
  return (
    <Tab.Navigator
      screenOptions={() => ({
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
      <>
        <Tab.Screen
          name="Home"
          component={isLoggedIn ? LoggedInScreens : LoggedOutScreens}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" size={size} color={color} />
            ),
            tabBarShowLabel: false,
            headerShown: isLoggedIn ? false : true,
            title: "Medways BP Tracker",
            headerTitleAlign: "center",
          }}
        />
        {isLoggedIn && (
          <Tab.Screen
            name="Update Profile"
            component={UpdateProfileScreen}
            initialParams={{ type: type }}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="person" size={size} color={color} />
              ),
              tabBarShowLabel: false,
              headerRight: () => (
                <Pressable
                  onPress={() => {
                    logout();
                    setTimeout(() => {
                      navigation.navigate("Home");
                    }, 1500);
                  }}
                >
                  <View style={{ marginRight: 10, flexDirection: "row" }}>
                    <Ionicons
                      name="log-out-outline"
                      size={24}
                      color={"white"}
                      style={{ marginRight: 5 }}
                    />
                    <Text
                      style={{
                        color: "white",
                        fontSize: 20,
                        fontWeight: "bold",
                      }}
                    >
                      Logout
                    </Text>
                  </View>
                </Pressable>
              ),
              title: "Profile",
            }}
          />
        )}
      </>

      {/* <Tab.Screen
        name="HomeMain"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
          title: "Medways BP Tracker",
        }}
      /> */}
    </Tab.Navigator>
  );
}

function LoggedInScreens({ route }) {
  // const [type, setType] = useState("Patient");
  // const { type } = route.params;
  const { type, isLoggedIn } = useAppContext();
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: GlobalStyles.colors.primary500,
        },
        headerTintColor: "white",
        // headerShown: false,
      }}
    >
      {type === "Patient" ? (
        <Stack.Screen
          name="PatientHome"
          component={PatientHomeScreen}
          options={{
            title: "Medways BP Tracker",
            headerBackVisible: false,
            headerTitleAlign: "center",
          }}
        />
      ) : (
        <Stack.Screen
          name="DoctorHome"
          component={DoctorHomeScreen}
          options={{
            title: "Medways BP Tracker",
            headerBackVisible: false,
            headerTitleAlign: "center",
          }}
        />
      )}
      <Stack.Screen
        name="HomeTabs"
        component={HomeTabs}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="ViewGraphsScreen"
        component={GraphsScreen}
        options={{
          title: "Graphical Trends",
          headerBackVisible: true,
        }}
      />
      {/* <Stack.Screen
        name="OTPConfirmationScreen"
        component={OTPConfirmationScreen}
        options={{
          title: "OTP Confirmation",
        }}
      /> */}
    </Stack.Navigator>
  );
}

function LoggedOutScreens() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: GlobalStyles.colors.primary500,
        },
        headerTintColor: "white",
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="HomeMain"
        component={HomeScreen}
        title="Medways BP Tracker"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Registration"
        component={RegistrationScreen}
        options={{
          title: "Registration",
        }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          title: "Login",
          headerBackVisible: true,
        }}
      />
      <Stack.Screen
        name="OTPConfirmationScreen"
        component={OTPConfirmationScreen}
        options={{
          title: "OTP Confirmation",
        }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  const [type, setType] = useState(null);
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);
  // const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const { isLoggedIn } = useAppContext();

  useEffect(() => {
    AsyncStorage.getItem("user").then((user) => {
      if (user) {
        setUser(JSON.parse(user));
        // setLoggedIn(true);
      }
    });

    AsyncStorage.getItem("userId").then((userId) => {
      if (userId) {
        setUserId(userId);
      }
    });

    AsyncStorage.getItem("phoneNumber").then((phoneNumber) => {
      if (phoneNumber) {
        setPhoneNumber(phoneNumber);
      }
    });

    AsyncStorage.getItem("user_type").then((user_type) => {
      if (user_type) {
        setType(user_type);
      }
    });

    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

  return (
    <RootSiblingParent>
      <StatusBar style="auto" />

      {!loading ? (
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
              initialParams={{
                type: type,
                // isLoggedIn: isLoggedIn,
              }}
            />
            {isLoggedIn ? (
              <Stack.Screen
                name="LoggedInScreens"
                component={LoggedInScreens}
                options={{
                  headerShown: false,
                }}
                initialParams={{ type: type }}
              />
            ) : (
              <Stack.Screen
                name="LoggedOutScreens"
                component={LoggedOutScreens}
                options={{
                  // header: ({ scene }) => {
                  //   return <CustomHeader title="Medways BP Tracker" />;
                  // },
                  title: "Medways BP Tracker",
                  headerBackVisible: true,
                  headerTitleAlign: "center",
                }}
              />
            )}
          </Stack.Navigator>
        </NavigationContainer>
      ) : (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Image
            source={require("./assets/Logo.png")}
            style={{ width: 120, height: 100, marginVertical: 10 }}
          />
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            Medways BP Tracker
          </Text>
        </View>
      )}
    </RootSiblingParent>
  );
}
