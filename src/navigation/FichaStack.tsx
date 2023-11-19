import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PersonaEditScreen from "../screen/PersonaEditScreen";
import ReservaScreen from "../screen/ReservaScreen";
import FichaCreateScreen from "../screen/FichaCreateScreen";
import FichaScreen from "../screen/FichaScreen";

const Stack = createNativeStackNavigator();

export default function FichaStack() {
  return (
    <Stack.Navigator initialRouteName="Lista de Ventas">
      <Stack.Screen name="Lista de Ventas" component={FichaScreen} />
      <Stack.Screen name="Nueva Venta" component={FichaCreateScreen} />
      <Stack.Screen name="Editar persona" component={PersonaEditScreen} />
    </Stack.Navigator>
  );
}
