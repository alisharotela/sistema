import { useQuery } from "@tanstack/react-query";

import ReservaService from "../services/ReservaService";
import { SelectInput } from "./SelectInput";
import { listadatos } from "../interfaces/Datos";
import { Reserva } from "../interfaces/Reserva";
import { formatDate } from "../utils";

export function ReservaSelect({ value, onChange }) {
  const { data: reservas, isLoading } = useQuery({
    queryKey: ["reservas"],
    queryFn: () => ReservaService.getReservas(),
    initialData: { lista: [], totalDatos: 0 } as listadatos<Reserva>,
  });

  return (
    <SelectInput
      value={value}
      label="Reserva"
      onChange={onChange}
      items={reservas.lista?.map((reserva) => ({
        label: `${formatDate(reserva.fecha)}-${reserva.hora}`,
        value: reserva.idReserva.toString(),
      }))}
    />
  );
}
