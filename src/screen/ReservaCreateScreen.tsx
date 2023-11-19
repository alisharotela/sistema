import { useFormik } from "formik";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TextBase,
  View,
} from "react-native";
import { Button } from "react-native-paper";
import { TextInput } from "../components/TextInput";
import { SelectInput } from "../components/SelectInput";
import PacienteService from "../services/PacienteService";
import { useNavigation } from "@react-navigation/native";
import { Reserva } from "../interfaces/Reserva";
import { DoctorSelect } from "../components/DoctorSelect";
import { PacienteSelect } from "../components/PacienteSelect";
import ReservaService from "../services/ReservaService";
import { FormButton } from "../components/FormButton";
import { DatePicker } from "../components/DatePicker";
import { useQueryClient } from "@tanstack/react-query";

const initialValues = {
  fecha: new Date().toISOString(),
  precio: "",
  paciente: "",
  doctor: undefined,
  estado: "activo",
  nombre: "",
};
export default function ReservaCreateScreen() {
  const navigation = useNavigation();
  const queryClient = useQueryClient();
  const { values, setValues, handleChange, handleSubmit } = useFormik({
    initialValues,
    onSubmit: async (values) => {
      await ReservaService.createReserva;
      queryClient.invalidateQueries({ queryKey: ["reservas"] });
      navigation.goBack();
      precio: values.precio;
      nombre: values.nombre
    },
  });
  const isIOs = Platform.OS === "ios";
  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        marginBottom: 20,
      }}
      behavior={isIOs ? "padding" : "height"}
      enabled
      // keyboardVerticalOffset={100}
    >
      <ScrollView>
        <View style={styles.container}>
          <DatePicker
            value={values.fecha}
            onChange={(value) => setValues({ ...values, fecha: value })}
            label="Fecha"
          />
          <TextInput
            value={values.precio}
            label="Precio" //Hora = Precio
            onChangeText={handleChange("descripcion")}
          />
          <TextInput
            value={values.nombre}
            label="Nombre del Producto" //Hora = Precio
            onChangeText={handleChange("descripcion")}
          />
          <DoctorSelect
            value={values.doctor}
            onChange={(id) => {
              setValues({ ...values, doctor: id });
            }}
          />
          <PacienteSelect
            value={values.paciente}
            onChange={(id) => {
              setValues({ ...values, paciente: id });
            }}
          />
          <FormButton
            goBack={navigation.goBack}
            handleSubmit={handleSubmit}
            label="Crear"
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    marginHorizontal: 16,
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },
});

{/*const createHoras = () => {
  const horas: { value: string; label: string }[] = [];
  for (let i = 9; i < 21; i++) {
    const option = i + ":00 a " + (i + 1) + ":00";
    horas.push({ label: option, value: option });
  }
  return horas;
};*/}
