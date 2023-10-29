export interface Paciente {
  idPersona: number;
  nombre: string;
  apellido: string;
  telefono: string;
  email: string;
  cedula: string;
  flag_es_doctor: boolean;
}

export interface PacienteCreate {
  idPersona?: number;
  nombre: string;
  apellido: string;
  telefono: string;
  email: string;
  cedula: string;
  flag_es_doctor: boolean;
}
