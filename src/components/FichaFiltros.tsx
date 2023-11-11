import React, { useState } from "react";
import { DoctorSelect } from "./DoctorSelect";
import { PacienteSelect } from "./PacienteSelect";
import { DatePicker } from "./DatePicker";
import { FormButton } from "./FormButton";
import { StyleSheet, View } from "react-native";
import { getNextMonth } from "../utils";
import { Button } from "react-native-paper";
import { CategoriaSelect } from "./CategoriaSelect";

export const FichaFiltros = ({ onFilter, onReset, initialValues }) => {
  const [values, setValues] = useState<any>({
    ...initialValues,
    fecha: undefined,
    fechaInicio: initialValues.fechaInicio ?? new Date().toISOString(),
    fechaFin: initialValues.fechaFin ?? getNextMonth().toISOString(),
  });
  return (
    <View style={styles.container}>
      <DoctorSelect
        value={values.doctor}
        onChange={(value: any) => setValues({ ...values, doctor: value })}
      />
      <PacienteSelect
        value={values.paciente}
        onChange={(value: any) => setValues({ ...values, paciente: value })}
      />
      <CategoriaSelect
        value={values.categoria}
        onChange={(value: any) => setValues({ ...values, categoria: value })}
      />
      <DatePicker
        value={values.fechaInicio}
        onChange={(value: { toISOString: () => any }) =>
          setValues({ ...values, fechaInicio: value?.toISOString() })
        }
        label="Fecha Inicio"
        fadeColor="#fff"
      />
      <DatePicker
        value={values.fechaFin}
        onChange={(value: { toISOString: () => any }) => {
          setValues({ ...values, fechaFin: value?.toISOString() });
        }}
        label="Fecha Fin"
        fadeColor="#fff"
      />
      <View style={styles.buttonContainer}>
        <Button
          onPress={() =>
            setValues({
              fechaInicio: undefined,
              fechaFin: undefined,
              doctor: undefined,
              paciente: undefined,
              categoria: undefined,
            })
          }
        >
          Resetear Filtros
        </Button>
      </View>
      <FormButton
        label="Filtrar"
        cancelLabel="Hoy"
        goBack={function (): void {
          onReset();
        }}
        handleSubmit={() => {
          onFilter(values);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    // justifyContent: "flex-start",
    marginLeft: 16,
  },
});
