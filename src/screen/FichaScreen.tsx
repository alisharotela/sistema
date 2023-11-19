import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";

import {
  StyleProp,
  ViewStyle,
  Animated,
  StyleSheet,
  Platform,
  ScrollView,
  Text,
  SafeAreaView,
  I18nManager,
  RefreshControl,
  TouchableNativeFeedback,
  Alert,
  View,
} from "react-native";
import { AnimatedFAB, IconButton } from "react-native-paper";
import { ListItem } from "../components/ListItem";
import { DeleteIcon } from "../icons/DeleteIcon";
import { EditIcon } from "../icons/EditIcon";
import { FiltroReserva, Reserva } from "../interfaces/Reserva";
import ReservaService from "../services/ReservaService";
import { FilterModal } from "../components/FilterModal";
import { useFormik } from "formik";
import { formatDate } from "../utils";
import ReservaModal from "../components/ReservaModal";
import { ReservaFiltros } from "../components/ReservaFiltros";
import { ReservaChips } from "../components/ReservaChips";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { listadatos } from "../interfaces/Datos";
import FichaService from "../services/FichaService";
import { Ficha } from "../interfaces/Ficha";
import FichaModal from "../components/FichaModal";
import { FichaFiltros } from "../components/FichaFiltros";
import { writeExcel, writePDF } from "../excel";

export const initialFilters = {
  doctor: null,
  paciente: null,
  categoria: null,
  fechaInicio: null,
  fechaFin: null,
  fecha: new Date().toISOString(),
};

const FichaScreen = ({
  animatedValue,
  visible,
  extended,
  label,
  animateFrom,
  style,
  iconMode,
}) => {
  const navigation = useNavigation<any>();
  const queryClient = useQueryClient();

  const [isExtended, setIsExtended] = React.useState(true);
  const onScroll = ({ nativeEvent }) => {
    const currentScrollPosition =
      Math.floor(nativeEvent?.contentOffset?.y) ?? 0;

    setIsExtended(currentScrollPosition <= 0);
  };
  const fabStyle = { [animateFrom]: 16 };

  const [filters, setFilters] = useState(initialFilters);
  const {
    data: fichas,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["fichas", filters],
    queryFn: () => FichaService.getFichas(filters),
    initialData: { lista: [], totalDatos: 0 } as listadatos<Ficha>,
  });

  return (
    <SafeAreaView style={styles.container}>
      <FichaModal filters={filters}>
        <FichaFiltros
          initialValues={filters}
          onReset={() => {
            setFilters(initialFilters);
          }}
          onFilter={(filters) => {
            setFilters(filters);
          }}
        />
      </FichaModal>
      <ScrollView
        onScroll={onScroll}
        refreshControl={
          <RefreshControl onRefresh={() => refetch()} refreshing={isLoading} />
        }
        contentContainerStyle={{
          marginBottom: 100,
        }}
        style={{ flex: 1 }}
      >
        {!isLoading && fichas.lista.length == 0 && (
          <Text style={{ textAlign: "center" }}>No hay fichas</Text>
        )}
        {fichas.lista.map((ficha, i) => (
          <ListItem
            key={i}
            label4="Fecha ficha:"
            text4={formatDate(ficha.fecha)}
            label5="Categoria:"
            text5={ficha.categoria?.descripcion}
            label6="Motivo:"
            text6={ficha.motivo_consulta}
            label1={"Doctor"}
            text1={ficha.doctor?.nombre + " " + ficha.doctor?.apellido}
            label2={"Paciente:"}
            text2={ficha.paciente?.nombre + " " + ficha.paciente?.apellido}
            label3={"Diagnostico:"}
            text3={ficha.diagnostico}
            IconSection={
              <>
                <IconButton
                  onPress={() =>
                    createTwoButtonAlert({
                      onConfirm: async () => {
                        await FichaService.delFicha(ficha.idFicha);
                        queryClient.invalidateQueries({
                          queryKey: ["fichas", filters],
                        });
                      },
                    })
                  }
                  icon={() => <DeleteIcon width={24} height={24} />}
                />
              </>
            }
          />
        ))}
        <View style={{ height: 78 }}></View>
      </ScrollView>
      <AnimatedFAB
        icon={"printer"}
        label={"Exportar"}
        extended={isExtended}
        // onPress={() => print()}
        onPress={() => exportData(fichas.lista)}
        visible={visible}
        animateFrom={"right"}
        variant="tertiary"
        style={[styles.fabStyle2, fabStyle]}
        onLongPress={() =>
          createTwoButtonAlert({
            onConfirm: async () => {
              await FichaService.deleteAll();
              queryClient.invalidateQueries({
                queryKey: ["fichas"],
              });
            },
          })
        }
      />
      <AnimatedFAB
        icon={"plus"}
        label={"Nueva Venta"}
        extended={isExtended}
        onPress={() => navigation.navigate("Nueva Venta")}
        visible={visible}
        animateFrom={"right"}
        //
        style={[styles.fabStyle, style, fabStyle]}
        onLongPress={() =>
          createTwoButtonAlert({
            onConfirm: async () => {
              await FichaService.deleteAll();
              queryClient.invalidateQueries({
                queryKey: ["fichas"],
              });
            },
          })
        }
      />
    </SafeAreaView>
  );
};

export default FichaScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  fabStyle: {
    bottom: 16,
    right: 16,
    position: "absolute",
  },
  fabStyle2: {
    bottom: 80,
    right: 16,
    position: "absolute",
  },
});

const createTwoButtonAlert = ({ onConfirm }) =>
  Alert.alert("Desea borrar este registro?", undefined, [
    {
      text: "No",
      style: "cancel",
    },
    { text: "Si", onPress: onConfirm },
  ]);

const exportData = (data) =>
  Alert.alert("Exportar como fichas", undefined, [
    {
      text: "Cancelar",
      style: "cancel",
    },
    {
      text: "Excel",
      onPress: () =>
        writeExcel(
          data.map((d) => ({
            idFicha: d.idFicha,
            paciente: d.paciente?.nombre + " " + d.paciente?.apellido,
            doctor: d.doctor?.nombre + " " + d.doctor?.apellido,
            fecha: d.fecha,
            motivo_consulta: d.motivo_consulta,
            diagnostico: d.diagnostico,
            categoria: d.categoria?.descripcion,
          }))
        ),
      // style: "default",
    },
    { text: "PDF", onPress: () => writePDF(data) },
  ]);
