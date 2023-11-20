import { useFormik } from "formik";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TextBase,
  View,
} from "react-native";
import { Button, Text } from "react-native-paper";
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
  cantidad: undefined,
  cliente: undefined,
  categoria: undefined,
  total: undefined,
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
            value={values.cantidad?.toString()}
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
            value={values.pedido?.toString()}
            onChange={(reservaSeleccionada) => {
              // Aquí estableces el ID de la reserva y actualizas el total basado en el precio de la reserva
              const precio = reservaSeleccionada?.precio;
              const total = precio * values.cantidad;
              const pedido = reservaSeleccionada?.idReserva;
              setValues({
                ...values,
                pedido: pedido,
                total: total,
              });
            }}
          />
          <PacienteSelect
            value={values.cliente}
            onChange={(id) => {
              setValues({ ...values, cliente: id });
            }}
          />

          <CategoriaSelect
            value={values.categoria}
            onChange={(id) => {
              setValues({ ...values, categoria: id });
            }}
          />
          {values.total && !Number.isNaN(values.total) && (
            <Text style={{ marginHorizontal: 16 }}>Total: {values.total}</Text>
          )}
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
