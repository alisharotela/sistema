import PersonaScreen from "../screen/PersonaScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PersonaCreateScreen from "../screen/PersonaCreateScreen";
import PersonaEditScreen from "../screen/PersonaEditScreen";
import ReservaCreateScreen from "../screen/ReservaCreateScreen";
import ReservaScreen from "../screen/ReservaScreen";

const Stack = createNativeStackNavigator();

export default function ReservaStack() {
  return (
    <Stack.Navigator initialRouteName="Lista de reservas">
      <Stack.Screen name="Lista de reservas" component={ReservaScreen} />
      <Stack.Screen
        name="Nueva reserva"
        component={ReservaCreateScreen}
        options={{}}
      />
      <Stack.Screen name="Editar persona" component={PersonaEditScreen} />
    </Stack.Navigator>
  );
}
