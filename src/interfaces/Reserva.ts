import { Paciente } from "./Paciente";
import { Categoria } from "./Categoria";

export interface Reserva {
  cantidad: any;
  cliente: any;
  numeroFactura: any;
  idReserva: number;
  fecha: string;
  hora: string;
  paciente: Paciente;
  doctor: Paciente;
  codigo: string;
  categoria: Categoria;
  nombre: string;
  precio: number;
  existencia: number;// Añadir este campo para controlar el inventario

}
export interface ReservaCreate {
  idReserva?: number;
  codigo: string;
  categoria: string;
  nombre: string;
  precio: number;
  existencia: number;// Añadir este campo para controlar el inventario
}

export interface FiltroReserva {
  idReserva?: number;
  fechaInicio?: string;
  fechaFin?: string;
  fecha?: string;
  hora?: string;
  paciente?: number;
  doctor?: number;
  codigo?: string;
  nombre?: string;
  precio: number;
}
