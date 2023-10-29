import AsyncStorage from "@react-native-async-storage/async-storage";
import { Reserva, ReservaCreate } from "../interfaces/Reserva";
import PacienteService from "./PacienteService";

class ReservaService {
  async deleteAll() {
    await AsyncStorage.removeItem("reservas");
  }
  async getReserva(id) {
    const reservas = JSON.parse(await AsyncStorage.getItem("reservas")) || [];
    return reservas.find((element) => element.idReserva === id);
  }

  async getReservas(filtros?: any) {
    const reservas = JSON.parse(await AsyncStorage.getItem("reservas")) || [];

    if (!filtros) {
      return {
        lista: reservas,
        totalDatos: reservas.length,
      };
    }

    let reservasFiltradas = reservas;
    for (const key in filtros) {
      if (!filtros[key]) continue;
      if (key === "fechaInicio") {
        reservasFiltradas = reservasFiltradas.filter(
          (element) => element.fecha >= filtros[key]
        );
        continue;
      }
      if (key === "fechaFin") {
        reservasFiltradas = reservasFiltradas.filter(
          (element) => element.fecha <= filtros[key]
        );
        continue;
      }
      reservasFiltradas = reservasFiltradas.filter(
        (element) => element[key] === filtros[key]
      );
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
