import { useQuery } from "@tanstack/react-query";

import ReservaService from "../services/ReservaService";
import { SelectInput } from "./SelectInput";
import { listadatos } from "../interfaces/Datos";
import { Reserva } from "../interfaces/Reserva";
import CategoriaService from "../services/CategoriaService";
import { Categoria } from "../interfaces/Categoria";

export function CategoriaSelect({ value, onChange }) {
  const { data: categorias, isLoading } = useQuery({
    queryKey: ["categorias"],
    queryFn: () => CategoriaService.getCategorias(),
    initialData: { lista: [], totalDatos: 0 } as listadatos<Categoria>,
  });

  return (
    <SelectInput
      value={value}
      label="Categoria"
      onChange={onChange}
      items={categorias.lista?.map((categoria) => ({
        label: `${categoria.descripcion}`,
        value: categoria.idCategoria.toString(),
      }))}
    />
  );
}
