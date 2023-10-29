import { useEffect, useState } from "react";
import { SelectInput } from "./SelectInput";
import PacienteService from "../services/PacienteService";

export function DoctorSelect({ value, onChange }) {
  const [doctores, setDoctores] = useState({ lista: [] });

  const getPacientes = async () => {
    const doctores = await PacienteService.getPacientes({
      flag_es_doctor: true,
    });
    setDoctores(doctores);
  };

  useEffect(() => {
    getPacientes();
  }, []);

  return (
    <SelectInput
      value={value}
      label="Doctor"
      onChange={onChange}
      items={doctores.lista?.map((doctor) => ({
        label: doctor.nombre,
        value: doctor.idPersona,
      }))}
    />
  );
}
