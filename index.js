import React from "react";
import store, { persistor } from "./store/store";
import { Provider } from "react-redux";
import App from "./App";
import { PersistGate } from "redux-persist/integration/react";
import { AppContextProvider } from "./context/AppContext";
import registerRootComponent from "expo/build/launch/registerRootComponent";

export default function Main() {
  return (
    <Provider store={store}>
      <AppContextProvider>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </AppContextProvider>
    </Provider>
  );
}

registerRootComponent(Main);
