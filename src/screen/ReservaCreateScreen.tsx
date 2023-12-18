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
import { Categoria } from "../interfaces/Categoria";
import { CategoriaSelect } from "../components/CategoriaSelect";

const initialValues = {
  precio: 0,
  nombre: "",
  categoria: undefined,
  codigo: "",
  existencia: 0,
  idReserva:0
};
export default function ReservaCreateScreen() {
  const navigation = useNavigation();
  const queryClient = useQueryClient();
  const { values, setValues, handleChange, handleSubmit } = useFormik({
    initialValues,
    onSubmit: async (values) => {
      await ReservaService.createReserva(values);
      queryClient.invalidateQueries({ queryKey: ["reservas"] });
      navigation.goBack();
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
            <TextInput
              value={values.nombre}
              label="Nombre del Producto" //Hora = Precio
              onChangeText={handleChange("nombre")}
            />
          <TextInput
            value={values.precio.toString()}
            label="Precio" //Hora = Precio
            keyboardType="numeric"
            onChangeText={handleChange("precio")}
          />
          <CategoriaSelect
            value={values.categoria}
            onChange={(id) => {
              setValues({ ...values, categoria: id });
            }}
          />
           <TextInput
            value={values.codigo}
            label="Codigo del producto" //Hora = Precio
            onChangeText={handleChange("codigo")}
          />
          <TextInput
            value={values.existencia.toString()}
            label="Stock del Producto" //Hora = Precio
            keyboardType="numeric"
            onChangeText={handleChange("existencia")}
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
