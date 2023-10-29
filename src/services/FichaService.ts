import AsyncStorage from "@react-native-async-storage/async-storage";

class FichaService {
  async getFicha(id) {
    const fichas = JSON.parse(await AsyncStorage.getItem("fichas")) || [];
    return fichas.find((element) => element.idFicha === id);
  }

  async getFichas(filtros) {
    const fichas = JSON.parse(await AsyncStorage.getItem("fichas")) || [];

    if (!filtros) {
      return {
        lista: fichas,
        totalDatos: fichas.length,
      };
    }

    let fichasFiltradas = fichas.slice(); // clone the array
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
      fichasFiltradas = fichasFiltradas.filter(
        (element) => element[key] === filtros[key]
      );
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

  async createFicha(p) {
    const fichas = JSON.parse(await AsyncStorage.getItem("fichas")) || [];
    p.idFicha = fichas.length + 1;
    fichas.push(p);
    await AsyncStorage.setItem("fichas", JSON.stringify(fichas));
  }

  async updateFicha(p) {
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
}

export default new FichaService();
