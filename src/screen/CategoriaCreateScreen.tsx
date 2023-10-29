import { useFormik } from "formik";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { TextInput } from "../components/TextInput";
import { SelectInput } from "../components/SelectInput";
import PacienteService from "../services/PacienteService";
import { useNavigation } from "@react-navigation/native";
import { FormButton } from "../components/FormButton";
import CategoriaService from "../services/CategoriaService";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const initialValues = {
  descripcion: ''
};
export default function CategoriaCreateScreen() {
  const navigation = useNavigation();
  const queryClient = useQueryClient()

  const { mutate, isPending } = useMutation({
    mutationKey: ['categorias'],
    mutationFn: CategoriaService.createCategoria,
  })

  const { values, handleChange, handleSubmit } = useFormik({
    initialValues,
    onSubmit: async (values) => {
      mutate(values, {
        onSuccess: () => {
          navigation.goBack()
          queryClient.invalidateQueries({ queryKey: ['categorias'] })
        }
      })
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
            value={values.descripcion}
            label="Descripción"
            onChangeText={handleChange("descripcion")}
          />

          <FormButton
            goBack={navigation.goBack}
            handleSubmit={handleSubmit}
            isLoading={isPending}
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
