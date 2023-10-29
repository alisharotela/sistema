import { Categoria } from "./Categoria";
import { Paciente } from "./Paciente";
import { Reserva } from "./Reserva";

export interface Ficha {
  idFicha: number;
  paciente: Paciente;
  doctor: Paciente;
  fecha: string;
  motivo_consulta: string;
  diagnostico: string;
  categoria: Categoria;
  reserva: Reserva;
}

export interface FiltroFicha {
  idFicha?: number;
  paciente?: Paciente;
  doctor?: Paciente;
  fechaInicio?: string;
  fechaFin?: string;
  motivo_consulta?: string;
  diagnostico?: string;
  categoria?: Categoria;
  reserva?: Reserva;
}
