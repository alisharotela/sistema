import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "../screen/HomeScreen";
import PersonaStack from "./PersonaStack";
import ReservaStack from "./ReservaStack";
import CategoriaStack from "./CategoriaStack";
import { PersonIcon } from "../icons/PersonIcon";
import { CheckFileIcon } from "../icons/CheckFileIcon";
import { TicketIcon } from "../icons/TicketIcon";
import { CategoryIcon } from "../icons/CategoryIcon";
import { Icon, useTheme } from "react-native-paper";
import FichaStack from "./FichaStack";

const Tab = createBottomTabNavigator();

export default function RootNav() {
  const { colors } = useTheme();
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        backBehavior="initialRoute"
        screenOptions={{
          headerShown: false,

          tabBarStyle: {
            height: 64,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            marginBottom: 8,
          },
          tabBarActiveBackgroundColor: colors.elevation.level2,
          tabBarActiveTintColor: "black",
        }}
      >
        <Tab.Screen
          name="Tab Personas"
          options={{
            tabBarLabel: "Clientes",
            tabBarIcon: () => <PersonIcon height={29} width={29} />,
          }}
          component={PersonaStack}
        />
        <Tab.Screen
          name="Tab Reservas"
          component={ReservaStack}
          options={{
            tabBarLabel: "Productos",
            tabBarIcon: () => <CheckFileIcon height={24} width={24} />,
          }}
        />
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: "Home",
            tabBarIcon: () => <Icon source="home" size={28} />,
          }}
        />
        <Tab.Screen
          name="Tab Categorias"
          component={CategoriaStack}
          options={{
            tabBarLabel: "Categorias",
            tabBarIcon: () => <CategoryIcon height={24} width={24} />,
          }}
        />
        <Tab.Screen
          name="Tab Fichas"
          component={FichaStack}
          options={{
            tabBarLabel: "Ventas",
            tabBarIcon: () => <TicketIcon height={24} width={24} />,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
