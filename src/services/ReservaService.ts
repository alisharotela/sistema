import AsyncStorage from "@react-native-async-storage/async-storage";
import { FiltroReserva, Reserva, ReservaCreate } from "../interfaces/Reserva";
import { Ficha, FichaCreate, FiltroFicha } from "../interfaces/Ficha";
import PacienteService from "./PacienteService";
import { isSameDate } from "../utils";
import CategoriaService from "./CategoriaService";



class ReservaService {
  getFicha(idProducto: number) {
    throw new Error("Method not implemented.");
  }
  async deleteAll() {
    await AsyncStorage.removeItem("reservas");
  }
  //async getReserva(id) {
    //const reservas = JSON.parse(await AsyncStorage.getItem("reservas")) || [];
    //return reservas.find((element) => element.idReserva === id);
  //}
  async getReserva(id) {
    const idBusqueda = String(id); // o Number(id), dependiendo de cómo se almacenan
    const reservas = JSON.parse(await AsyncStorage.getItem("reservas")) || [];
    return reservas.find((element) => String(element.idReserva) === idBusqueda);
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
        reservasFiltradas = reservasFiltradas.filter((element) =>
          isSameDate(element.fecha, filtros[key])
        );
        continue;
      }
      if (key === "categoria") {
        reservasFiltradas = reservasFiltradas.filter(
          (element) => element.categoria.idCategoria === filtros[key]
        );
        continue;
      }
      if (key === "codigo") {
        reservasFiltradas = reservasFiltradas.filter(
          (element) => element.codigo === filtros[key]
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
          (element) => element.codigo === filtros[key]
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

  async createReserva(p: ReservaCreate) {
    const reserva = {} as Reserva;
    const reservas = JSON.parse(await AsyncStorage.getItem("reservas")) || [];
    const categoria = await CategoriaService.getCategoria(p.categoria);
    
    reserva.precio = p.precio;
    reserva.nombre = p.nombre;
    reserva.idReserva = reservas.length + 1;
    reserva.codigo = p.codigo;
    reserva.categoria = categoria;
    reserva.existencia = Number(p.existencia); // Convertir a número antes de guardar
    reservas.push(reserva);
    await AsyncStorage.setItem("reservas", JSON.stringify(reservas));
  }

  async updateReserva(p) {
    const reservas = JSON.parse(await AsyncStorage.getItem("reservas")) || [];
    const arrayId = reservas.findIndex(
      (element) => element.idReserva === p.idReserva
    );
    p.existencia = Number(p.existencia); // Asegúrate de convertir a número antes de actualizar
    if (arrayId === -1) {
      return false;
    }
    reservas[arrayId] = p;
    await AsyncStorage.setItem("reservas", JSON.stringify(reservas));
    return true;
  }

  //Nuevo metodos
  async venderProducto(idReserva: number, cantidadVendida: number): Promise<boolean> {
    const reservas = JSON.parse(await AsyncStorage.getItem("reservas")) || [];
    const index = reservas.findIndex((res: Reserva) => res.idReserva === idReserva);
  
    if (index === -1 || reservas[index].existencia < cantidadVendida) {
      return false; // Indica que la venta no se pudo realizar
    }
  
    reservas[index].existencia -= cantidadVendida;
    await AsyncStorage.setItem("reservas", JSON.stringify(reservas));
    return true; // Indica que la venta fue exitosa
  }

  // Método para aumentar la existencia cuando hay una compra
  async comprarProducto(idReserva: number, cantidadComprada: number) {
    const reservas = JSON.parse(await AsyncStorage.getItem("reservas")) || [];
    const index = reservas.findIndex((res: Reserva) => res.idReserva === idReserva);

    if (index !== -1) {
      reservas[index].existencia += cantidadComprada;
      await AsyncStorage.setItem("reservas", JSON.stringify(reservas));
    }
  }

}

export default new ReservaService();

type GetReservaProps = {
  estado?: "Activa" | "Cancelada" | "Finalizada";
};
