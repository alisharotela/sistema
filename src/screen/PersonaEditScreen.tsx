import { useFormik } from "formik";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { TextInput } from "../components/TextInput";
import { useEffect, useState } from "react";
import { SelectInput } from "../components/SelectInput";
import PacienteService from "../services/PacienteService";
import { useNavigation } from "@react-navigation/native";
import { Paciente } from "../interfaces/Paciente";
import { FormButton } from "../components/FormButton";

const initialValues1 = {
  nombre: "",
  apellido: "",
  //tel: "",
  ci: "",
  email: "",
  tipoPersona: null,
};

export default function PersonaEditScreen(props) {
  const idPersona = props.route.params?.idPersona;
  const [initialValues, setinitialValues] = useState<any>(initialValues1);

  useEffect(() => {
    const getPaciente = async () => {
      const paciente = (await PacienteService.getPaciente(
        idPersona
      )) as Paciente;
      setinitialValues({
        nombre: paciente.nombre,
        apellido: paciente.apellido,
        //tel: paciente.telefono,
        ci: paciente.cedula,
        email: paciente.email,
        tipoPersona: paciente.flag_es_doctor ? "cliente" : "cliente",
      });
    };
    getPaciente();
  }, [idPersona]);

  const navigation = useNavigation();
  const { values, handleChange, handleSubmit } = useFormik({
    initialValues,
    onSubmit: async (values) => {
      await PacienteService.updatePaciente({
        idPersona: idPersona,
        nombre: values.nombre,
        apellido: values.apellido,
        telefono: values.tel,
        email: values.email,
        cedula: values.ci,
        flag_es_doctor: values.tipoPersona == "cliente" ? true : false,
      });
      navigation.goBack();
    },
    enableReinitialize: true,
  });
  return (
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
      <SelectInput
        value={values.tipoPersona}
        label="Tipo de persona"
        onChange={handleChange("tipoPersona")}
        items={[
          { label: "Cliente", value: "cliente" },
          { label: "CLiente", value: "cliente" },
        ]}
      />
      <FormButton
        goBack={navigation.goBack}
        handleSubmit={handleSubmit}
        label="Guardar"
      />
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    marginHorizontal: 16,
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    gap: 16,
  },
});
