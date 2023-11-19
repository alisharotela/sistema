import { Categoria } from "./Categoria";
import { Paciente } from "./Paciente";
import { Reserva } from "./Reserva";

export interface Ficha {
  idFicha: number;
  paciente: Paciente;
  doctor: Paciente;
  fecha: string;
  numero_factura: string;
  cantidad: string;
  categoria: Categoria;
  reserva: Reserva;
}

export interface FichaCreate {
  idFicha?: number;
  paciente: string;
  doctor: string;
  fecha: string;
  numero_factura: string;
  cantidad: string;
  categoria: string;
  reserva: string;
}

export interface FiltroFicha {
  idFicha?: number;
  paciente?: number;
  doctor?: number;
  fechaInicio?: string;
  fechaFin?: string;
  numero_factura?: string;
  cantidad?: string;
  categoria?: number;
  reserva?: number;
}
