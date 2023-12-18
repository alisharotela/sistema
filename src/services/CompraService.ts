//Manejara las Trx de compra
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Reserva } from "../interfaces/Reserva";
import ReservaService from "./ReservaService";

class CompraService {
  async registrarCompra(idProducto: number, cantidad: number) {
    console.log("Intentando registrar compra para el producto ID:", idProducto);
    
    // Obtén la reserva (producto) actual
    const producto = await ReservaService.getReserva(idProducto?.toString());
    
    if (!producto) {
      console.error(`Error: Producto con ID ${idProducto} no encontrado.`);
      throw new Error(`Producto con ID ${idProducto} no encontrado.`);
    } else {
      console.log(`Producto encontrado:`, producto);
    }
    
    // Verifica que la propiedad existencia esté presente
    if (producto.existencia === undefined) {
      console.error(`Error: El producto con ID ${idProducto} no tiene una propiedad de existencia definida.`);
      throw new Error(`El producto con ID ${idProducto} no tiene una propiedad de existencia definida.`);
    }

    // Aumenta la existencia
    // Aumenta la existencia
    const existenciaActual = Number(producto.existencia); // Convertir la existencia a número
    const cantidadNumerica = Number(cantidad); // Asegurarse de que la cantidad también sea un número
    producto.existencia = existenciaActual + cantidadNumerica; // Realizar la suma como operación numérica
    console.log(`Nueva existencia: ${producto.existencia}`);

    // Guarda los cambios
    await ReservaService.updateReserva(producto);
  }
}

export default new CompraService();
