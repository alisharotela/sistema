import { Paciente } from "./Paciente";

export interface Reserva {
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
  fechaInicio?: Date;
  fechaFin?: Date;
  fecha?: string;
  hora?: string;
  paciente?: Paciente;
  doctor?: Paciente;
  estado?: string;
}
