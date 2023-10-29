import * as React from "react";
import { PaperProvider, Portal } from "react-native-paper";
// import App from "./src/App";

import RootNav from "./src/navigation/RootNav";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function Main() {
  return (
    <PaperProvider>
      <Portal>
        <QueryClientProvider client={queryClient}>
          <RootNav />
        </QueryClientProvider>
      </Portal>
    </PaperProvider>
  );
}

// AppRegistry.registerComponent(appName, () => Main);
