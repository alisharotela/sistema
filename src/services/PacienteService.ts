import AsyncStorage from "@react-native-async-storage/async-storage";
import { Paciente, PacienteCreate } from "../interfaces/Paciente";

class PacienteService {
  async getPaciente(id) {
    const pacientes = JSON.parse(await AsyncStorage.getItem("pacientes")) || [];
    return pacientes.find((element) => element.idPersona === id);
  }

  async getPacientes(filtros?: GetPacientesProps) {
    const pacientes = JSON.parse(await AsyncStorage.getItem("pacientes")) || [];

    if (!filtros) {
      return {
        lista: pacientes,
        totalDatos: pacientes.length,
      };
    }

    const { flag_es_doctor } = filtros;
    const pacientsFiltradas = pacientes.filter(
      (element) => element.flag_es_doctor === flag_es_doctor
    );

    return {
      lista: pacientsFiltradas,
      totalDatos: pacientes.length,
    };
  }

  async delPaciente(id) {
    const pacientes = JSON.parse(await AsyncStorage.getItem("pacientes")) || [];
    const arrayId = pacientes.findIndex((element) => element.idPersona === id);
    if (arrayId === -1) {
      return null;
    }
    const paciente = pacientes[arrayId];
    pacientes.splice(arrayId, 1);
    await AsyncStorage.setItem("pacientes", JSON.stringify(pacientes));
    return paciente;
  }

  async createPaciente(p: PacienteCreate) {
    const pacientes = JSON.parse(await AsyncStorage.getItem("pacientes")) || [];
    p.idPersona = pacientes.length + 1;
    pacientes.push(p);
    await AsyncStorage.setItem("pacientes", JSON.stringify(pacientes));
  }

  async updatePaciente(p:Paciente) {
    const pacientes = JSON.parse(await AsyncStorage.getItem("pacientes")) || [];
    const arrayId = pacientes.findIndex(
      (element) => element.idPersona === p.idPersona
    );
    if (arrayId === -1) {
      return false;
    }
    pacientes[arrayId] = p;
    await AsyncStorage.setItem("pacientes", JSON.stringify(pacientes));
    return true;
  }
}

export default new PacienteService();

type GetPacientesProps = {
  flag_es_doctor?: boolean;
};
