import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PersonaEditScreen from "../screen/PersonaEditScreen";
import CategoriaScreen from "../screen/CategoriaScreen";
import CategoriaCreateScreen from "../screen/CategoriaCreateScreen";
import CategoriaEditScreen from "../screen/CategoriaEditScreen";

const Stack = createNativeStackNavigator();

export default function CategoriaStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Lista de categorias" component={CategoriaScreen} />
      <Stack.Screen name="Nueva categoria" component={CategoriaCreateScreen} />
      <Stack.Screen name="Editar categoria" component={CategoriaEditScreen} />
    </Stack.Navigator>
  );
}
