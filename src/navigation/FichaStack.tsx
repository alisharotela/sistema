import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PersonaEditScreen from "../screen/PersonaEditScreen";
import ReservaScreen from "../screen/ReservaScreen";
import FichaCreateScreen from "../screen/FichaCreateScreen";
import FichaScreen from "../screen/FichaScreen";

const Stack = createNativeStackNavigator();

export default function FichaStack() {
  return (
    <Stack.Navigator initialRouteName="Lista de fichas">
      <Stack.Screen name="Lista de fichas" component={FichaScreen} />
      <Stack.Screen name="Nueva ficha" component={FichaCreateScreen} />
      <Stack.Screen name="Editar persona" component={PersonaEditScreen} />
    </Stack.Navigator>
  );
}
