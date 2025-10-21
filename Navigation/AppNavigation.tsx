// Navigation/AppNavigation.tsx
import React from "react";
import { View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

// Importações das telas
import Login from "../pages/Login";
import Cadastrar from "../pages/Cadastrar";
import Principal from "../pages/Principal";
import Detalhes from "../pages/Detalhes";
import CadastrarProjeto from "../pages/CadastrarProjeto";
import Perfil from "../pages/Perfil";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

/**
 * 📱 Abas principais (Início, +, Perfil)
 */
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: "#2E8376",
        tabBarInactiveTintColor: "#777",
        tabBarStyle: {
          backgroundColor: "#fff",
          borderTopWidth: 1,
          borderTopColor: "#ddd",
          height: 70,
          paddingBottom: 8,
          paddingTop: 4,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          marginBottom: 2,
        },
      })}
    >
      {/* 🏠 Início */}
      <Tab.Screen
        name="Início"
        component={PrincipalStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size + 2} color={color} />
          ),
        }}
      />

      {/* ➕ Adicionar */}
      <Tab.Screen
        name="Adicionar"
        component={CadastrarProjeto}
        options={{
          tabBarLabel: "Adicionar",
          tabBarIcon: ({ color }) => (
            <View
              style={{
                width: 30,
                height: 30,
                borderRadius: 35,
                backgroundColor: "#2E8376",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 5, // deixa ele visualmente centralizado
              }}
            >
              <Ionicons name="add" size={23} color="#fff" />
            </View>
          ),
        }}
      />

      {/* 👤 Perfil */}
      <Tab.Screen
        name="Perfil"
        component={Perfil}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size + 2} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

/**
 * 🧩 Stack interno da aba "Início"
 * permite navegação entre Principal e Detalhes
 */
function PrincipalStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Principal"
        component={Principal}
        options={{ title: "Catálogo de Projetos" }}
      />
      <Stack.Screen
        name="Detalhes"
        component={Detalhes}
        options={{ title: "Detalhes do Projeto" }}
      />
    </Stack.Navigator>
  );
}

/**
 * 🚀 Navegação principal do aplicativo
 */
export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{ headerShown: false }}
      >
        {/* Fluxo inicial */}
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Cadastrar" component={Cadastrar} />

        {/* Após login, abre o menu principal */}
        <Stack.Screen name="MainTabs" component={MainTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
