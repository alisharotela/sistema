import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
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
import { AnimatedFAB, Button, IconButton } from "react-native-paper";
import PacienteService from "../services/PacienteService";
import { ListItem } from "../components/ListItem";
import { Paciente } from "../interfaces/Paciente";
import { DeleteIcon } from "../icons/DeleteIcon";
import { EditIcon } from "../icons/EditIcon";
import { Reserva } from "../interfaces/Reserva";
import ReservaService from "../services/ReservaService";

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

  const isIOS = Platform.OS === "ios";

  const onScroll = ({ nativeEvent }) => {
    const currentScrollPosition =
      Math.floor(nativeEvent?.contentOffset?.y) ?? 0;

    setIsExtended(currentScrollPosition <= 0);
  };

  const fabStyle = { [animateFrom]: 16 };

  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const getReservas = async () => {
    setIsLoading(true);
    const pacientes = await ReservaService.getReservas();
    setIsLoading(false);
    setReservas(pacientes.lista);
  };
  useEffect(() => {
    getReservas();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        onScroll={onScroll}
        refreshControl={
          <RefreshControl
            onRefresh={() => getReservas()}
            refreshing={isLoading}
          />
        }
        contentContainerStyle={{
          marginVertical: 16,
          marginBottom: 100,
        }}
      >
        {/* <Button onPress={() => ReservaService.deleteAll()}>Borrar todo</Button> */}
        <ScrollView />
        {reservas.map((reserva) => (
          <ListItem
            text4={reserva.fecha}
            text5={reserva.hora}
            text6={reserva.estado}
            text1={reserva.doctor?.nombre + " " + reserva.doctor?.apellido}
            text2={reserva.paciente?.nombre + " " + reserva.paciente?.apellido}
            IconSection={
              <>
                <IconButton
                  onPress={() =>
                    createTwoButtonAlert({
                      onConfirm: async () => {
                        await ReservaService.cancelarReserva(reserva.idReserva);
                        getReservas();
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
        <View style={{ height: 96 }}></View>
      </ScrollView>
      <AnimatedFAB
        icon={"plus"}
        label={"Nueva reserva"}
        extended={isExtended}
        onPress={() => navigation.navigate("Nueva reserva")}
        visible={visible}
        animateFrom={"right"}
        iconMode={"static"}
        style={[styles.fabStyle, style, fabStyle]}
        onLongPress={() =>
          createTwoButtonAlert({
            onConfirm: async () => {
              await ReservaService.deleteAll();
              getReservas();
            },
          })
        }
      />
    </SafeAreaView>
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
