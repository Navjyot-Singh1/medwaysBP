import React, { createContext, useContext, useState } from "react";

// Create a context
const AppContext = createContext();

// Create a context provider component
export const AppContextProvider = ({ children }) => {
  const [appRerenderKey, setAppRerenderKey] = useState(0);

  // Define a function to trigger re-render
  const forceRerender = () => {
    // Increment the key to trigger a re-render
    setAppRerenderKey((prevKey) => prevKey + 1);
  };

  return (
    <AppContext.Provider value={{ forceRerender }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to access the context
export const useAppContext = () => {
  return useContext(AppContext);
};
