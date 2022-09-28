import React from "react";
import { NativeBaseProvider } from "native-base";

import VisitorScreen from "./src/Screens/VisitorScreen";
import LoginScreen from "./src/Screens/LoginScreen";

export default function App() {
  return (
    <NativeBaseProvider>
      <LoginScreen />
    </NativeBaseProvider>
  );
}
