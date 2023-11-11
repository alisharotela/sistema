import React, { useCallback, useRef, useMemo, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { BottomSheetModal, BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { Button } from "react-native-paper";
import { ReservaChips } from "./ReservaChips";

const App = ({ children, filters }) => {
  // hooks
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // variables
  const snapPoints = useMemo(() => ["25%", "50%", "80%"], []);

  // callbacks
  const handleSheetChange = useCallback((index) => {
    console.log("handleSheetChange", index);
  }, []);
  const handleSnapPress = useCallback((index) => {
    bottomSheetModalRef.current?.snapToIndex(index);
  }, []);
  const handleClosePress = useCallback(() => {
    bottomSheetModalRef.current?.close();
  }, []);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  useEffect(() => {
    handleClosePress();
    console.log("filters", filters);
  }, [JSON.stringify(filters)]);

  return (
    <>
      <View style={styles.header}>
        <ReservaChips data={filters} />
        <Button onPress={handlePresentModalPress} style={{ width: 124 }}>
          {/* {showFilter ? "Ocultar filtros" : "Mostrar filtros"} */}
          Agregar filtros
        </Button>
      </View>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={2}
        snapPoints={snapPoints}
        onChange={handleSheetChange}
        enableContentPanningGesture={false}
      >
        <BottomSheetScrollView
          contentContainerStyle={styles.contentContainer}
          focusHook={(e) => e()}
        >
          {children}
        </BottomSheetScrollView>
      </BottomSheetModal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 200,
  },
  contentContainer: {
    backgroundColor: "white",
  },
  itemContainer: {
    padding: 6,
    margin: 6,
    backgroundColor: "#eee",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginStart: 16,
    flex: 0,
  },
});

export default App;
