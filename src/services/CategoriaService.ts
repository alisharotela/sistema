import AsyncStorage from "@react-native-async-storage/async-storage";

class CategoriaService {
  async getCategoria(id) {
    const categorias =
      JSON.parse(await AsyncStorage.getItem("categorias")) || [];
    return categorias.find((element) => element.idCategoria === id);
  }

  async getCategorias() {
    const categorias =
      JSON.parse(await AsyncStorage.getItem("categorias")) || [];
    return {
      lista: categorias,
      totalDatos: categorias.length,
    };
  }

  async delCategoria(id) {
    const categorias =
      JSON.parse(await AsyncStorage.getItem("categorias")) || [];
    const arrayId = categorias.findIndex(
      (element) => element.idCategoria === id
    );
    if (arrayId === -1) {
      return null;
    }
    const categoria = categorias[arrayId];
    categorias.splice(arrayId, 1);
    await AsyncStorage.setItem("categorias", JSON.stringify(categorias));
    return categoria;
  }

  async createCategoria(p) {
    const categorias =
      JSON.parse(await AsyncStorage.getItem("categorias")) || [];
    p.idCategoria = categorias.length + 1;
    categorias.push(p);
    await AsyncStorage.setItem("categorias", JSON.stringify(categorias));
  }

  async updateCategoria(p) {
    const categorias =
      JSON.parse(await AsyncStorage.getItem("categorias")) || [];
    const arrayId = categorias.findIndex(
      (element) => element.idCategoria === p.idCategoria
    );
    if (arrayId === -1) {
      return false;
    }
    categorias[arrayId] = p;
    await AsyncStorage.setItem("categorias", JSON.stringify(categorias));
    return true;
  }
}

export default new CategoriaService();
