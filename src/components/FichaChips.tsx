import React from "react";
import { FlatList, ScrollView, StyleSheet, View } from "react-native";
import { Chip } from "react-native-paper";
import PacienteService from "../services/PacienteService";
import { Paciente } from "../interfaces/Paciente";
import { useQuery } from "@tanstack/react-query";
import { formatDate } from "../utils";

export const FichaChips = ({ data }) => {
  return (
    <ScrollView horizontal style={{ flexGrow: 0 }}>
      <ChipDoctor idDoctor={data.doctor} />
      <ChipPaciente idPaciente={data.paciente} />
      {data.fechaInicio && (
        <Chip icon="filter" style={styles.chip}>
          Ini:{""}
          {formatDate(data.fechaInicio)}
        </Chip>
      )}
      {data.fechaFin && (
        <Chip icon="filter" style={styles.chip}>
          Fin:{""}
          {formatDate(data.fechaFin)}
        </Chip>
      )}
      {data.fecha && (
        <Chip icon="filter" style={styles.chip}>
          {formatDate(data.fecha)}
        </Chip>
      )}
    </ScrollView>
  );
};
const ChipPaciente = ({ idPaciente }) => {
  const { data: paciente } = useQuery<Paciente>({
    queryKey: ["paciente", idPaciente],
    queryFn: () => PacienteService.getPaciente(idPaciente),
    enabled: idPaciente != null,
  });

  return (
    <>
      {paciente && (
        <Chip style={styles.chip} icon="filter">
          {paciente.nombre + " " + paciente.apellido}
        </Chip>
      )}
    </>
  );
};
const ChipDoctor = ({ idDoctor }) => {
  const { data: doctor } = useQuery<Paciente>({
    queryKey: ["doctor", idDoctor],
    queryFn: () => PacienteService.getPaciente(idDoctor),
    enabled: idDoctor != null,
  });

  return (
    <>
      {doctor && (
        <Chip style={styles.chip} icon="filter">
          {doctor.nombre + " " + doctor.apellido}
        </Chip>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  chip: {
    marginEnd: 4,
    marginVertical: 4,
  },
});
