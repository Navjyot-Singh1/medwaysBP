import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { BACKEND_URL } from "../constants/urlConstants";
import axios from "axios";

const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [appRerenderKey, setAppRerenderKey] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [type, setType] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [loggedInUserDetails, setLoggedInUserDetails] = useState({});

  const checkLoginData = () => {
    AsyncStorage.getItem("phoneNumber").then((phoneNumber) => {
      if (phoneNumber) {
        setPhoneNumber(phoneNumber);
      }
    });

    AsyncStorage.getItem("user").then((user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });
    AsyncStorage.getItem("user_type").then((user_type) => {
      if (user_type) {
        setType(user_type);
      }
    });
  };

  const getLoggedInUserDetails = async () => {
    if (isLoggedIn) {
      if (type === "Doctor") {
        axios
          .get(`${BACKEND_URL}api/doctors/${phoneNumber}`)
          .then((res) => {
            setLoggedInUserDetails(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      } else if (type === "Patient") {
        axios
          .get(`${BACKEND_URL}api/patients/${phoneNumber}`)
          .then((res) => {
            setLoggedInUserDetails(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  };

  useEffect(() => {
    // Check AsyncStorage for login data when the app is loaded
    checkLoginData();
    setTimeout(() => {
      getLoggedInUserDetails();
    }, 2000);
  }, []);

  useEffect(() => {
    getLoggedInUserDetails();
  }, [isLoggedIn, type, phoneNumber]);

  const login = () => {
    setIsLoggedIn(true);
    checkLoginData();
  };

  const logout = () => {
    setIsLoggedIn(false);
    AsyncStorage.removeItem("user");
    AsyncStorage.removeItem("userId");
    AsyncStorage.removeItem("type");
    AsyncStorage.removeItem("user_type");
    AsyncStorage.removeItem("phoneNumber");
  };

  // Define a function to trigger re-render
  const forceRerender = () => {
    // Increment the key to trigger a re-render
    setAppRerenderKey((prevKey) => prevKey + 1);
  };

  return (
    <AppContext.Provider
      value={{
        forceRerender,
        isLoggedIn,
        login,
        logout,
        type,
        loggedInUserDetails,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to access the context
export const useAppContext = () => {
  return useContext(AppContext);
};
