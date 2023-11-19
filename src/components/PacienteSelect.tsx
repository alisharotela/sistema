import { useEffect, useState } from "react";
import { SelectInput } from "../components/SelectInput";
import PacienteService from "../services/PacienteService";

export function PacienteSelect({ value, onChange }) {
  const [pacientes, setPacientes] = useState({ lista: [] });

  const getPacientes = async () => {
    const pacientes = await PacienteService.getPacientes({
      flag_es_doctor: false,
    });
    setPacientes(pacientes);
  };

  useEffect(() => {
    getPacientes();
  }, []);

  return (
    <SelectInput
      value={value}
      label="Cliente"
      onChange={onChange}
      items={pacientes.lista?.map((paciente) => ({
        label: paciente.nombre,
        value: paciente.idPersona,
      }))}
    />
  );
}
