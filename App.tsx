import * as React from "react";
import { AppRegistry } from "react-native";
import { PaperProvider } from "react-native-paper";
// import App from "./src/App";

import { NavigationContainer } from "@react-navigation/native";
import RootNav from "./src/navigation/RootNav";

export default function Main() {
  return (
    <PaperProvider>
      <RootNav />
    </PaperProvider>
  );
}

// AppRegistry.registerComponent(appName, () => Main);
