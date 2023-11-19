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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import CategoriaService from "../services/CategoriaService";

export default function CategoriaEditScreen(props) {
  const navigation = useNavigation();
  const queryClient = useQueryClient()
  const idCategoria = props.route.params?.idCategoria;
  const { data: categoria, } = useQuery({
    queryKey: ['categoria', idCategoria],
    queryFn: () => CategoriaService.getCategoria(idCategoria),
    enabled: !!idCategoria
  })

  const { mutate, isPending } = useMutation({
    mutationKey: ['categorias'],
    mutationFn: CategoriaService.updateCategoria,
    retry: 1
  })

  const { values, handleChange, handleSubmit } = useFormik({
    initialValues: {
      idCategoria: idCategoria,
      nombre: categoria?.nombre
    },
    onSubmit: async (values) => mutate(values, {
      onSuccess: () => {
        queryClient.invalidateQueries({queryKey:['categorias']})
        navigation.goBack()}
    }),
    enableReinitialize: true,
  });
return (
  <View style={styles.container}>
    <TextInput
      value={values.nombre}
      label="Nombre"
      onChangeText={handleChange("nombre")}
    />
    <FormButton
      goBack={navigation.goBack}
      handleSubmit={handleSubmit}
      label="Guardar"
      isLoading={isPending}
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
