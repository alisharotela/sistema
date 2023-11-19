import { useFormik } from "formik";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { Button, Text } from "react-native-paper";
import { TextInput } from "../components/TextInput";
import { useState } from "react";
import { SelectInput } from "../components/SelectInput";
import PacienteService from "../services/PacienteService";
import { useNavigation } from "@react-navigation/native";
import { FormButton } from "../components/FormButton";

const initialValues = {
  nombre: "",
  apellido: "",
  tel: "",
  ci: "",
  email: "",
  rol: null,// rol = tipopersona
};
export default function PersonaCreateScreen() {
  const navigation = useNavigation();
  const { values, handleChange, handleSubmit } = useFormik({
    initialValues,
    onSubmit: async (values) => {
      await PacienteService.createPaciente({
        nombre: values.nombre,
        apellido: values.apellido,
        telefono: values.tel,
        email: values.email,
        cedula: values.ci,
        flag_es_doctor: values.rol == "cliente" ? true : false,
      });
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
      keyboardVerticalOffset={100}
    >
      <ScrollView>
        <View style={styles.container}>
          <TextInput
            value={values.nombre}
            label="Nombre"
            onChangeText={handleChange("nombre")}
          />
          <TextInput
            value={values.apellido}
            label="Apellido"
            onChangeText={handleChange("apellido")}
          />
          {/*<TextInput
            value={values.tel}
            label="Teléfono"
            onChangeText={handleChange("tel")}
            keyboardType="phone-pad"
    />*/}
          <TextInput
            value={values.ci}
            label="Ruc"
            onChangeText={handleChange("ci")}
            keyboardType="phone-pad"
          />
          <TextInput
            value={values.email}
            label="Email"
            onChangeText={handleChange("email")}
            keyboardType="email-address"
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
