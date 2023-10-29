import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "../screen/HomeScreen";
import CategoriaScreen from "../screen/CategoriaScreen";
import FichaScreen from "../screen/FichaScreen";
import PersonaStack from "./PersonaStack";
import ReservaStack from "./ReservaStack";

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
            headerShown: false,
            tabBarLabel: "Personas",

            // unmountOnBlur: true,
          }}
          component={PersonaStack}
        />
        <Tab.Screen
          name="Tab Reservas"
          component={ReservaStack}
          options={{
            headerShown: false,
            tabBarLabel: "Reservas",
            // unmountOnBlur: true,
          }}
        />
        <Tab.Screen
          name="Nombre"
          component={HomeScreen}
          options={{ tabBarLabel: "Home" }}
        />
        <Tab.Screen
          name="Tab Categorias"
          component={CategoriaScreen}
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
