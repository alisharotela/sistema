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
var Text
  if (isLoading) {
    return <Text>Cargando reservas...</Text>;
  }

  const handleChange = (itemValue) => {
    // Encuentra la reserva seleccionada basada en el ID
    const reservaSeleccionada = reservas.lista.find(r => r.idReserva.toString() === itemValue);
    // Invoca el callback onChange con toda la información de la reserva
    onChange(reservaSeleccionada);
  };

  // Mapea las reservas para el SelectInput
  const options = reservas.lista.map((reserva) => ({
    label: `${reserva.nombre} - Precio: ${reserva.precio}`,
    value: reserva.idReserva.toString(),
  }));

  return (
    <SelectInput
      value={value}
      label="Pedido"
      onChange={handleChange}
      items={options}
    />
  );
}
