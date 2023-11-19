import { Paciente } from "./Paciente";

export interface Reserva {
  precio: any;
  idReserva: number;
  fecha: string;
  hora: string;
  paciente: Paciente;
  doctor: Paciente;
  estado: string;
}
export interface ReservaCreate {
  idReserva?: number;
  fecha: string;
  hora: string;
  paciente: string;
  doctor: string;
  estado: string;
}

export interface FiltroReserva {
  idReserva?: number;
  fechaInicio?: string;
  fechaFin?: string;
  fecha?: string;
  hora?: string;
  paciente?: number;
  doctor?: number;
  estado?: string;
}
