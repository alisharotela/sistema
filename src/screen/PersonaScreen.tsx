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
import { AnimatedFAB, IconButton } from "react-native-paper";
import PacienteService from "../services/PacienteService";
import { ListItem } from "../components/ListItem";
import { Paciente } from "../interfaces/Paciente";
import { DeleteIcon } from "../icons/DeleteIcon";
import { EditIcon } from "../icons/EditIcon";
import { useQuery } from "@tanstack/react-query";
import { listadatos } from "../interfaces/Datos";

const PersonaScreen = ({
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

  // const [personas, setPersonas] = useState<Paciente[]>([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const getPacientes = async () => {
  //   setIsLoading(true);
  //   const pacientes = await PacienteService.getPacientes();
  //   setIsLoading(false);
  //   setPersonas(pacientes.lista);
  //   console.log(personas);
  // };
  // useEffect(() => {
  //   getPacientes();
  // }, []);

  const {
    data: personas,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["personas"],
    queryFn: () => PacienteService.getPacientes(),
    initialData: { lista: [], totalDatos: 0 } as listadatos<Paciente>,
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        onScroll={onScroll}
        refreshControl={
          <RefreshControl onRefresh={() => refetch()} refreshing={isLoading} />
        }
        contentContainerStyle={{
          marginVertical: 16,
          marginBottom: 100,
        }}
      >
        {!isLoading && personas.lista?.length == 0 && (
          <Text style={{ textAlign: "center" }}>No hay personas</Text>
        )}
        {personas.lista?.map((persona) => (
          <ListItem
            key={persona.idPersona}
            text1={`#${persona.idPersona} ${persona.nombre}`}
            text2={persona.apellido}
            text3={persona.email}
            text4={persona.telefono}
            text5={persona.flag_es_doctor ? "Doctor" : "Paciente"}
            IconSection={
              <>
                <IconButton
                  onPress={() =>
                    createTwoButtonAlert({
                      onConfirm: async () => {
                        await PacienteService.delPaciente(persona.idPersona);
                        refetch();
                      },
                    })
                  }
                  icon={() => <DeleteIcon width={24} height={24} fill="red" />}
                />
                <IconButton
                  onPress={() =>
                    navigation.navigate("Editar persona", {
                      idPersona: persona.idPersona,
                    })
                  }
                  icon={() => <EditIcon width={24} height={24} fill="black" />}
                />
              </>
            }
          />
        ))}
        <View style={{ height: 96 }}></View>
      </ScrollView>
      <AnimatedFAB
        icon={"plus"}
        label={"Nueva persona"}
        extended={isExtended}
        onPress={() => navigation.navigate("Nueva persona")}
        visible={visible}
        animateFrom={"right"}
        style={[styles.fabStyle, style, fabStyle]}
      />
    </SafeAreaView>
  );
};

export default PersonaScreen;

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
  Alert.alert(
    "Desea eliminar?",
    "Si aceptas eliminar ya no se podra recuperar",
    [
      {
        text: "Cancelar",
        // onPress: () => onCancel,
        style: "cancel",
      },
      { text: "Eliminar", onPress: onConfirm },
    ]
  );
