import AsyncStorage from "@react-native-async-storage/async-storage";
import { FiltroReserva, Reserva, ReservaCreate } from "../interfaces/Reserva";
import PacienteService from "./PacienteService";

class ReservaService {
  async deleteAll() {
    await AsyncStorage.removeItem("reservas");
  }
  async getReserva(id) {
    const reservas = JSON.parse(await AsyncStorage.getItem("reservas")) || [];
    return reservas.find((element) => element.idReserva === id);
  }

  async getReservas(filtros?: FiltroReserva) {
    const reservas: Reserva[] =
      JSON.parse(await AsyncStorage.getItem("reservas")) || [];

    if (!filtros) {
      return {
        lista: reservas,
        totalDatos: reservas.length,
      };
    }
    // console.log({ filtros });

    let reservasFiltradas = reservas;
    for (const key in filtros) {
      if (!filtros[key]) continue;
      if (key === "fechaInicio") {
        reservasFiltradas = reservasFiltradas.filter(
          (element) => new Date(element.fecha) >= new Date(filtros[key])
        );
        continue;
      }
      if (key === "fechaFin") {
        reservasFiltradas = reservasFiltradas.filter(
          (element) => new Date(element.fecha) <= new Date(filtros[key])
        );
        continue;
      }
      if (key === "fecha") {
        reservasFiltradas = reservasFiltradas.filter(
          (element) =>
            isSameDate(element.fecha,
              filtros[key]
            )
        );
        continue;
      }
      if (key === "hora") {
        reservasFiltradas = reservasFiltradas.filter(
          (element) => element.hora === filtros[key]
        );
        continue;
      }
      if (key === "paciente") {
        reservasFiltradas = reservasFiltradas.filter(
          (element) => element.paciente.idPersona === filtros[key]
        );
        continue;
      }
      if (key === "doctor") {
        reservasFiltradas = reservasFiltradas.filter(
          (element) => element.doctor.idPersona === filtros[key]
        );
        continue;
      }
      if (key === "estado") {
        reservasFiltradas = reservasFiltradas.filter(
          (element) => element.estado === filtros[key]
        );
        continue;
      }
    }
    return {
      lista: reservasFiltradas,
      totalDatos: reservas.length,
    };
  }

  async delReserva(id) {
    const reservas = JSON.parse(await AsyncStorage.getItem("reservas")) || [];
    const arrayId = reservas.findIndex((element) => element.idReserva === id);
    if (arrayId === -1) {
      return null;
    }
    const reserva = reservas[arrayId];
    reservas.splice(arrayId, 1);
    await AsyncStorage.setItem("reservas", JSON.stringify(reservas));
    return reserva;
  }

  async cancelarReserva(idReserva) {
    const reservas = JSON.parse(await AsyncStorage.getItem("reservas")) || [];
    const arrayId = reservas.findIndex(
      (element) => element.idReserva === idReserva
    );
    if (arrayId === -1) {
      return null;
    }
    const reserva = reservas[arrayId];
    reserva.estado = "Cancelada";
    reservas[arrayId] = reserva;
    await AsyncStorage.setItem("reservas", JSON.stringify(reservas));
    return reserva;
  }

  async createReserva(p: ReservaCreate) {
    const reserva = {} as Reserva;
    const reservas = JSON.parse(await AsyncStorage.getItem("reservas")) || [];
    const paciente = await PacienteService.getPaciente(p.paciente);
    const doctor = await PacienteService.getPaciente(p.doctor);
    reserva.fecha = p.fecha;
    reserva.hora = p.hora;
    reserva.paciente = paciente;
    reserva.doctor = doctor;

    reserva.idReserva = reservas.length + 1;
    reserva.estado = "Activa";
    reservas.push(reserva);
    await AsyncStorage.setItem("reservas", JSON.stringify(reservas));
  }

  async updateReserva(p) {
    const reservas = JSON.parse(await AsyncStorage.getItem("reservas")) || [];
    const arrayId = reservas.findIndex(
      (element) => element.idReserva === p.idReserva
    );
    if (arrayId === -1) {
      return false;
    }
    reservas[arrayId] = p;
    await AsyncStorage.setItem("reservas", JSON.stringify(reservas));
    return true;
  }
}

export default new ReservaService();

type GetReservaProps = {
  estado?: "Activa" | "Cancelada" | "Finalizada";
};

const isSameDate = (strDate1, strDate2)=>{
  const date1 = new Date(strDate1)
  const date2 = new Date(strDate2)
  return date1.getDate()==date2.getDate() 
  && date1.getMonth()==date2.getMonth() 
  && date1.getFullYear()==date2.getFullYear()
}