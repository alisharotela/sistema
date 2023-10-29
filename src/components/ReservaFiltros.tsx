import React, { useState } from "react";
import { DoctorSelect } from "./DoctorSelect";
import { PacienteSelect } from "./PacienteSelect";
import { DatePicker } from "./DatePicker";
import { FormButton } from "./FormButton";

export const ReservaFiltros = ({ onFilter, onReset }) => {
  const [values, setValues] = useState<any>({
    doctor: null,
    paciente: null,
    fechaInicio: null,
    fechaFin: null,
  });
  return (
    <>
      <DoctorSelect
        value={values.doctor}
        onChange={(value: any) => setValues({ ...values, doctor: value })}
      />

      <PacienteSelect
        value={values.paciente}
        onChange={(value: any) => setValues({ ...values, paciente: value })}
      />
      <DatePicker
        value={values.fechaInicio}
        onChange={(value: { toISOString: () => any }) =>
          setValues({ ...values, fechaInicio: value?.toISOString() })
        }
        label="Fecha Inicio"
      />
      <DatePicker
        value={values.fechaFin}
        onChange={(value: { toISOString: () => any }) => {
          setValues({ ...values, fechaFin: value?.toISOString() });
        }}
        label="Fecha Fin"
      />
      <FormButton
        label="Filtrar"
        cancelLabel="Limpiar"
        goBack={function (): void {
          onReset();
          setValues({
            doctor: null,
            paciente: null,
            fechaInicio: null,
            fechaFin: null,
          });
        }}
        handleSubmit={() => {
          onFilter(values);
        }}
      />
    </>
  );
};
