import * as React from "react";
import { PaperProvider, Portal } from "react-native-paper";
// import App from "./src/App";

import RootNav from "./src/navigation/RootNav";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

const queryClient = new QueryClient();

export default function Main() {
  return (
    <PaperProvider>
      <Portal>
        <QueryClientProvider client={queryClient}>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <BottomSheetModalProvider>
              <RootNav />
            </BottomSheetModalProvider>
          </GestureHandlerRootView>
        </QueryClientProvider>
      </Portal>
    </PaperProvider>
  );
}

// AppRegistry.registerComponent(appName, () => Main);
