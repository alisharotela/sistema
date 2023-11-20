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
import FichaService from "../services/FichaService";
import { ReservaSelect } from "../components/ReservaSelect";
import { CategoriaSelect } from "../components/CategoriaSelect";

const initialValues = {
  fecha: new Date().toISOString(),
  pedido: undefined,
  numeroFactura: "",
  cantidad: 0,
  cliente: undefined,
  categoria: undefined,
  total:0,
  paciente: undefined,
};
export default function FichaCreateScreen() {
  const navigation = useNavigation();
  const queryClient = useQueryClient();
  const { values, setValues, handleChange, handleSubmit } = useFormik({
    initialValues,
    onSubmit: async (values) => {
      await FichaService.createFicha(values);
      queryClient.invalidateQueries({ queryKey: ["fichas"] });
      navigation.goBack();
    },
  });
  // Función para actualizar el precio total cuando cambia el producto o la cantidad
  
  const isIOs = Platform.OS === "ios";
  function updateTotal(value: any, precio: any) {
    throw new Error("Function not implemented.");
  }

  function setFieldValue(arg0: string, value: any) {
    throw new Error("Function not implemented.");
  }

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
            value={values.cantidad.toString()}
            label="Cantidad" //Hora = Precio
            keyboardType="numeric"
            onChangeText={handleChange("cantidad")}
          />
          <TextInput
            value={values.numeroFactura}
            label="Numero de Factura" //Hora = Precio
            onChangeText={handleChange("numeroFactura")}
          />
          <ReservaSelect
            value={values.pedido}
            onChange={(reservaSeleccionada) => {
            // Aquí estableces el ID de la reserva y actualizas el total basado en el precio de la reserva
            setValues({ ...values, pedido: reservaSeleccionada.idReserva, total: reservaSeleccionada.precio * values.cantidad});
            }}
          />
          <PacienteSelect
            value={values.paciente}
            onChange={(id) => {
              setValues({ ...values, paciente: id });
            }}
          />

          <CategoriaSelect
            value={values.categoria}
            onChange={(id) => {
              setValues({ ...values, categoria: id });
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

