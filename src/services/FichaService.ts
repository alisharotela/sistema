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
  async getFichas() {
    const fichas = (JSON.parse(await AsyncStorage.getItem("fichas")) ||
      []) as Ficha[];

    return {
      lista: fichas,
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
    const cliente = await PacienteService.getPaciente(p.cliente);
    const categoria = await CategoriaService.getCategoria(p.categoria);
    const pedido = await ReservaService.getReserva(p.pedido);

    console.log(p);
    console.log({ cliente, categoria, pedido });

    const newFicha: Ficha = {
      idFicha,
      cliente,
      fecha: p.fecha,
      numeroFactura: p.numeroFactura,
      cantidad: p.cantidad,
      categoria,
      pedido,
      producto: pedido,
      total: p.total,
    };
    fichas.push(newFicha);
    console.log({ newFicha });
    

  // Obten la reserva asociada al producto
  if (pedido.existencia < p.cantidad) {
    throw new Error('No hay suficiente existencia para realizar la venta.');
  }
  
  pedido.existencia -= p.cantidad; // Actualiza la existencia
  await ReservaService.updateReserva(pedido); // Guarda los cambios
  

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
