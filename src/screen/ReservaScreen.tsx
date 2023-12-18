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
import CompraModal from "../components/CompraModal";
import CompraService from "../services/CompraService";
import { writeExcel, writePDF } from "../excel";


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
  const [openCompraModal, setOpenCompraModal] = useState(false);


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
    queryFn: () => ReservaService.getReservas(),
    initialData: { lista: [], totalDatos: 0 } as listadatos<Reserva>,
  });

  return (
    <>
      {/* <SafeAreaView></SafeAreaView> */}
      <SafeAreaView style={styles.container}>
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
            <Text style={{ textAlign: "center" }}>No hay productos</Text>
          )}
          {reservas.lista.map((reserva, i) => (
            <ListItem
              key={i}
              label1={"ID:"}
              text1={reserva.idReserva?.toString()}
              label2={"Producto:"}
              text2={reserva.nombre}
              label3={"Codigo:"}
              text3={reserva.codigo}
              label4={"Precio:"}
              text4={reserva.precio?.toString()}
              label5={"Categoria:"}
              text5={reserva.categoria?.nombre} IconSection={undefined}
              label6={"Stock:"}
              text6={reserva.existencia?.toString()}
              />
          ))}
          <View style={{ height: 78 }}></View>
        </ScrollView>
        <AnimatedFAB
          icon={"plus"}
          label={"Nuevo producto"}
          extended={isExtended}
          onPress={() => navigation.navigate("Nuevo producto")}
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
        <AnimatedFAB
  // ... otras props
  icon={"printer"}
  label={"Exportar"}
  extended={isExtended}
  onPress={() => exportData(reservas.lista)}
  visible={visible}
  animateFrom={"right"}
  variant="tertiary"
  style={[styles.fabStyle2]} // Aplica el estilo que hace que el botón aparezca más arriba
  // ... otras props
/>
        <AnimatedFAB
        icon={"cart-plus"}
        label={"Registrar Compra"}
        extended={isExtended}
        onPress={() => setOpenCompraModal(true)}
        visible={visible}
        animateFrom={"right"}
        style={[styles.fabStyle, { bottom: 145 }, fabStyle]}
      />
      {openCompraModal && (
      <CompraModal
        onClose={() => setOpenCompraModal(false)}
        onConfirm={(idProducto, cantidad) => {
        CompraService.registrarCompra(idProducto, cantidad);
        setOpenCompraModal(false);
      }}
    />
    
  )}
  </SafeAreaView>    
  </>
  );
};

export default ReservaScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingTop: 16,
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
  Alert.alert("Desea cancelar?", undefined, [
    {
      text: "No",
      // onPress: () => onCancel,
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
          data.map((d: Reserva) => ({
            idReserva: d.idReserva,
            nombre: d.nombre,
            categoria: d.categoria?.nombre,
            cantidad: d.existencia,
            precio: d.precio,
          }))
        ),
      // style: "default",
    },
    { text: "PDF", onPress: () => writePDF(data) },
  ]);