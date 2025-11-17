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
import RecuperarSenha from "../pages/RecuperarSenha";
import ARViewer from "../pages/ARViewer"; // 👈 NOVA TELA

// Importa o contexto global de projetos
import { ProjetosProvider } from "../context/ProjetosContext";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

/**
 * 🧭 Stack interno da aba "Início"
 * permite navegação entre Principal, Detalhes e ARViewer
 */
function PrincipalStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false, // oculta o cabeçalho padrão do Stack
      }}
    >
      <Stack.Screen name="Principal" component={Principal} />
      <Stack.Screen
        name="Detalhes"
        component={Detalhes}
        options={{ title: "Detalhes do Projeto" }}
      />
      <Stack.Screen
        name="ARViewer"
        component={ARViewer}
        options={{
          title: "Visualização AR",
          headerShown: true,
          headerStyle: { backgroundColor: "#fff" },
          headerTintColor: "#2E8376",
        }}
      />
    </Stack.Navigator>
  );
}

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
          tabBarIcon: () => (
            <View
              style={{
                width: 28,
                height: 28,
                borderRadius: 28,
                backgroundColor: "#2E8376",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 10,
                shadowColor: "#000",
                shadowOpacity: 0.2,
                shadowRadius: 3,
                elevation: 5,
              }}
            >
              <Ionicons name="add" size={21} color="#fff" />
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
 * 🚀 Navegação principal do aplicativo
 */
export default function AppNavigation() {
  return (
    <ProjetosProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{ headerShown: false }}
        >
          {/* Fluxo inicial */}
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Cadastrar" component={Cadastrar} />
          <Stack.Screen name="RecuperarSenha" component={RecuperarSenha} />

          {/* Após login, abre o menu principal */}
          <Stack.Screen name="MainTabs" component={MainTabs} />
        </Stack.Navigator>
      </NavigationContainer>
    </ProjetosProvider>
  );
}
