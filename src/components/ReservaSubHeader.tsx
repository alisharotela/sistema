import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, useTheme } from "react-native-paper";
import { ReservaFiltros } from "./ReservaFiltros";
import { ReservaChips } from "./ReservaChips";
import { initialFilters } from "../screen/ReservaScreen";

export const ReservaSubHeader = ({ filters, setFilters }) => {
  const [showFilter, setShowFilter] = useState(false);
  const scrollRef = useRef<View>(null);
  const ViewRef2 = useRef<View>(null);
  const toggleFilter = () => setShowFilter((prev) => !prev);
  useEffect(() => {
    if (showFilter) {
      // set height of scrollview to 100%
      scrollRef.current?.setNativeProps({
        style: {
          height: "auto",
          display: "flex",
        },
      });
      ViewRef2.current.setNativeProps({
        style: {
          ...styles.subHeader,
        },
      });
    } else {
      scrollRef.current?.setNativeProps({
        style: {
          height: 0,
          display: "none",
        },
      });
      ViewRef2.current.setNativeProps({
        style: {
          backgroundColor: colors.elevation.level0,
        },
      });
    }
    // console.log("showFilter", showFilter);
  }, [showFilter]);

  const { colors } = useTheme();

  return (
    <View style={[styles.subHeader]} ref={ViewRef2}>
      <View style={styles.filterContainer}>
        <ReservaChips data={filters} />
        <Button onPress={() => toggleFilter()} style={{ width: 148 }}>
          {showFilter ? "Ocultar filtros" : "Mostrar filtros"}
        </Button>
      </View>
      <View ref={scrollRef}>
        <ReservaFiltros
          onReset={() => {
            setFilters(initialFilters);
            toggleFilter();
          }}
          onFilter={(filters) => {
            setFilters(filters);
            toggleFilter();
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  filterContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  subHeader: {
    position: "absolute",
    top: 0,
    zIndex: 4,
    right: 0,
    left: 0,
    // height: 80,
    flex: 1,
    // marginHorizontal: 16,
    // marginTop: 16,
    padding: 16,
    // backgroundColor: theme
    border: "5px solid black",

    backgroundColor: "#f0f0f0",
    opacity: 0.9,
  },
});
