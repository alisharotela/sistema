import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  StyleSheet,
  ScrollView,
  Text,
  SafeAreaView,
  RefreshControl,
  Alert,
  View,
} from "react-native";
import { AnimatedFAB, IconButton } from "react-native-paper";
import { ListItem } from "../components/ListItem";
import { Reserva } from "../interfaces/Reserva";
import ReservaService from "../services/ReservaService";
import { formatDate } from "../utils";
import ReservaModal from "../components/ReservaModal";
import { ReservaFiltros } from "../components/ReservaFiltros";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { listadatos } from "../interfaces/Datos";

export const initialFilters = {
  doctor: null,
  paciente: null,
  fechaInicio: null,
  fechaFin: null,
  fecha: new Date().toISOString(),
};

const ReservaScreen = ({
  animatedValue,
  visible,
  extended,
  label,
  animateFrom,
  style,
  iconMode,
}) => {
  const navigation = useNavigation<any>();

  const [isExtended, setIsExtended] = React.useState(true);

  const onScroll = ({ nativeEvent }) => {
    const currentScrollPosition =
      Math.floor(nativeEvent?.contentOffset?.y) ?? 0;

    setIsExtended(currentScrollPosition <= 0);
  };

  const fabStyle = { [animateFrom]: 16 };

  const [filters, setFilters] = useState(initialFilters);

  const queryClient = useQueryClient();

  const {
    data: reservas,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["reservas", filters],
    queryFn: () => ReservaService.getReservas(filters),
    initialData: { lista: [], totalDatos: 0 } as listadatos<Reserva>,
  });

  return (
    <>
      {/* <SafeAreaView></SafeAreaView> */}
      <SafeAreaView style={styles.container}>
        <ReservaModal filters={filters}>
          <ReservaFiltros
            initialValues={filters}
            onReset={() => {
              setFilters(initialFilters);
            }}
            onFilter={(filters) => {
              setFilters(filters);
            }}
          />
        </ReservaModal>
        <ScrollView
          onScroll={onScroll}
          refreshControl={
            <RefreshControl
              onRefresh={() => refetch()}
              refreshing={isLoading}
            />
          }
          contentContainerStyle={{
            marginBottom: 100,
          }}
          style={{ flex: 1 }}
        >
          {!isLoading && reservas.lista.length == 0 && (
            <Text style={{ textAlign: "center" }}>No hay reservas</Text>
          )}
          {reservas.lista.map((reserva, i) => (
            <ListItem
              key={i}
              text4={formatDate(reserva.fecha)}
              text5={reserva.hora}
              text6={reserva.estado}
              text1={reserva.doctor?.nombre + " " + reserva.doctor?.apellido}
              text2={
                reserva.paciente?.nombre + " " + reserva.paciente?.apellido
              }
              IconSection={
                <>
                  <IconButton
                    onPress={() =>
                      createTwoButtonAlert({
                        onConfirm: async () => {
                          await ReservaService.cancelarReserva(
                            reserva.idReserva
                          );
                          queryClient.invalidateQueries({
                            queryKey: ["reservas", filters],
                          });
                        },
                      })
                    }
                    icon="cancel"
                    iconColor="red"
                    disabled={reserva.estado == "Cancelada"}
                  />
                </>
              }
            />
          ))}
          <View style={{ height: 78 }}></View>
        </ScrollView>
        <AnimatedFAB
          icon={"plus"}
          label={"Nueva reserva"}
          extended={isExtended}
          onPress={() => navigation.navigate("Nueva reserva")}
          visible={visible}
          animateFrom={"right"}
          style={[styles.fabStyle, style, fabStyle]}
          onLongPress={() =>
            createTwoButtonAlert({
              onConfirm: async () => {
                await ReservaService.deleteAll();
                queryClient.invalidateQueries({
                  queryKey: ["reservas", filters],
                });
              },
            })
          }
        />
      </SafeAreaView>
    </>
  );
};

export default ReservaScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  fabStyle: {
    bottom: 16,
    right: 16,
    position: "absolute",
  },
});

const createTwoButtonAlert = ({ onConfirm }) =>
  Alert.alert("Desea cancelar?", undefined, [
    {
      text: "No",
      // onPress: () => onCancel,
      style: "cancel",
    },
    { text: "Si", onPress: onConfirm },
  ]);
