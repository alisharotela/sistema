import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "../screen/HomeScreen";
import FichaScreen from "../screen/FichaScreen";
import PersonaStack from "./PersonaStack";
import ReservaStack from "./ReservaStack";
import CategoriaStack from "./CategoriaStack";

const Tab = createBottomTabNavigator();

export default function RootNav() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        backBehavior="initialRoute"
        screenOptions={{ headerShown: false }}
      >
        <Tab.Screen
          name="Tab Personas"
          options={{
            tabBarLabel: "Personas",

          }}
          component={PersonaStack}
        />
        <Tab.Screen
          name="Tab Reservas"
          component={ReservaStack}
          options={{
            tabBarLabel: "Reservas",
          }}
        />
        <Tab.Screen
          name="Nombre"
          component={HomeScreen}
          options={{ tabBarLabel: "Home" }}
        />
        <Tab.Screen
          name="Tab Categorias"
          component={CategoriaStack}
          options={{ tabBarLabel: "Categorias" }}
        />
        <Tab.Screen
          name="Tab Fichas"
          component={FichaScreen}
          options={{ tabBarLabel: "Fichas" }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
