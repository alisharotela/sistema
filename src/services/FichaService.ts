import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ficha, FichaCreate, FiltroFicha } from "../interfaces/Ficha";
import PacienteService from "./PacienteService";
import CategoriaService from "./CategoriaService";
import ReservaService from "./ReservaService";
import { isSameDate } from "../utils";

class FichaService {
  async getFicha(id) {
    const fichas = JSON.parse(await AsyncStorage.getItem("fichas")) || [];
    return fichas.find((element) => element.idFicha === id);
  }

  async getFichas(filtros: FiltroFicha) {
    const fichas = (JSON.parse(await AsyncStorage.getItem("fichas")) ||
      []) as Ficha[];

    if (!filtros) {
      return {
        lista: fichas,
        totalDatos: fichas.length,
      };
    }

    let fichasFiltradas = fichas;
    for (const key in filtros) {
      if (!filtros[key]) continue;

      if (key === "fechaInicio") {
        fichasFiltradas = fichasFiltradas.filter(
          (element) => new Date(element.fecha) >= new Date(filtros[key])
        );
        continue;
      }
      if (key === "fechaFin") {
        fichasFiltradas = fichasFiltradas.filter(
          (element) => new Date(element.fecha) <= new Date(filtros[key])
        );
        continue;
      }
      if (key === "fecha") {
        fichasFiltradas = fichasFiltradas.filter((element) =>
          isSameDate(element.fecha, filtros[key])
        );
        continue;
      }
      if (key === "paciente") {
        fichasFiltradas = fichasFiltradas.filter(
          (element) => element.paciente.idPersona === filtros[key]
        );
        continue;
      }
      if (key === "doctor") {
        fichasFiltradas = fichasFiltradas.filter(
          (element) => element.doctor.idPersona === filtros[key]
        );
        continue;
      }
      if (key === "categoria") {
        fichasFiltradas = fichasFiltradas.filter(
          (element) => element.categoria.idCategoria === filtros[key]
        );
        continue;
      }
    }

    return {
      lista: fichasFiltradas,
      totalDatos: fichas.length,
    };
  }

  async delFicha(id) {
    const fichas = JSON.parse(await AsyncStorage.getItem("fichas")) || [];
    const arrayId = fichas.findIndex((element) => element.idFicha === id);
    if (arrayId === -1) {
      return null;
    }
    const ficha = fichas[arrayId];
    fichas.splice(arrayId, 1);
    await AsyncStorage.setItem("fichas", JSON.stringify(fichas));
    return ficha;
  }

  async createFicha(p: FichaCreate) {
    const fichas = JSON.parse(await AsyncStorage.getItem("fichas")) || [];
    const idFicha = fichas.length + 1;
    const paciente = await PacienteService.getPaciente(p.paciente);
    const doctor = await PacienteService.getPaciente(p.doctor);
    const categoria = await CategoriaService.getCategoria(p.categoria);
    const reserva = await ReservaService.getReserva(p.reserva);

    const newFicha: Ficha = {
      idFicha,
      paciente,
      doctor,
      fecha: p.fecha,
      numero_factura: p.numero_factura,
      cantidad: p.cantidad,
      categoria,
      reserva,
    };
    fichas.push(newFicha);
    console.log({ newFicha });

    await AsyncStorage.setItem("fichas", JSON.stringify(fichas));
  }

  async updateFicha(p: Ficha) {
    const fichas = JSON.parse(await AsyncStorage.getItem("fichas")) || [];
    const arrayId = fichas.findIndex(
      (element) => element.idFicha === p.idFicha
    );
    if (arrayId === -1) {
      return false;
    }
    fichas[arrayId] = p;
    await AsyncStorage.setItem("fichas", JSON.stringify(fichas));
    return true;
  }

  async deleteAll() {
    await AsyncStorage.removeItem("fichas");
  }
}

export default new FichaService();
