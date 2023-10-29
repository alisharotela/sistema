import PersonaScreen from "../screen/PersonaScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PersonaCreateScreen from "../screen/PersonaCreateScreen";
import PersonaEditScreen from "../screen/PersonaEditScreen";

const Stack = createNativeStackNavigator();

export default function PersonaStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Lista de personas" component={PersonaScreen} />
      <Stack.Screen name="Nueva persona" component={PersonaCreateScreen} />
      <Stack.Screen name="Editar persona" component={PersonaEditScreen} />
    </Stack.Navigator>
  );
}
