import { Categoria } from "./Categoria";
import { Paciente } from "./Paciente";
import { Reserva } from "./Reserva";

export interface Ficha {
  cantidad: number;
  idFicha: number;
  paciente: Paciente;
  cliente: Paciente;
  fecha: string;
  categoria: Categoria;
  pedido:Reserva
  numeroFactura: string;
  //detalles: DetalleVenta[]; // Usando la nueva interfaz DetalleVenta
  total: number; // Este sería el total calculado de todos los DetalleVenta
}
export interface FichaCreate {
  pedido: string;
  numeroFactura: string;
  cantidad: number;
  paciente: string;
  cliente: string;
  fecha: string;
  categoria: string;
  total: number;
}

export interface FiltroFicha {
  idFicha?: number;
  paciente?: number;
  fechaInicio?: string;
  fechaFin?: string;
  numeroFactura?: string;
  cantidad?: string;
  categoria?: number;
  reserva?: number;
}

