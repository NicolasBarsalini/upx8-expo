import React from "react";
import { View, Platform } from "react-native";
import {
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  NavigationContainer,
  LinkingOptions,
} from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import * as Linking from "expo-linking";

// 🧩 Telas principais
import Login from "../pages/Login";
import Cadastrar from "../pages/Cadastrar";
import Principal from "../pages/Principal";
import Detalhes from "../pages/Detalhes";
import CadastrarProjeto from "../pages/CadastrarProjeto";
import Perfil from "../pages/Perfil";
import RecuperarSenha from "../pages/RecuperarSenha";

// 🆕 Telas novas (QR Scanner + AR Viewer)
import QRScanner from "../pages/QRScanner";
// import ARViewer from "../pages/ARViewer";

// Contexto global
import { ProjetosProvider } from "../context/ProjetosContext";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

/**
 * ⚙️ Configuração de deep linking (ativa apenas em plataformas móveis)
 */
const linking: LinkingOptions<any> = {
  prefixes: [Linking.createURL("/")],
  config: {
    screens: {
      Login: "login",
      Cadastrar: "cadastrar",
      RecuperarSenha: "recuperar",
      MainTabs: {
        screens: {
          Início: {
            screens: {
              Principal: "home",
              Detalhes: "detalhes",
            },
          },
          Adicionar: "add",
          Perfil: "perfil",
        },
      },
      QRScanner: "scanner",
      ARViewer: "ar",
    },
  },
};

/**
 * 🧭 Stack interno da aba "Início"
 * (lista de projetos e tela de detalhes)
 */
function PrincipalStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Principal" component={Principal} />
      <Stack.Screen
        name="Detalhes"
        component={Detalhes}
        options={{ title: "Detalhes do Projeto" }}
      />
      {/* ✅ novas rotas dentro da stack de Início */}
      <Stack.Screen
        name="QRScanner"
        component={QRScanner}
        options={{ title: "Scanner de QR", headerShown: true }}
      />
      {/* <Stack.Screen
        name="ARViewer"
        component={ARViewer}
        options={{ title: "Realidade Aumentada", headerShown: true }}
      /> */}
    </Stack.Navigator>
  );
}

/**
 * 📱 Abas principais: Início, Adicionar, Perfil
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
  const isWeb = Platform.OS === "web"; // ✅ detecta se está rodando no navegador

  return (
    <ProjetosProvider>
      <NavigationContainer {...(!isWeb ? { linking } : {})}>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{ headerShown: false }}
        >
          {/* 🔐 Autenticação */}
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Cadastrar" component={Cadastrar} />
          <Stack.Screen name="RecuperarSenha" component={RecuperarSenha} />

          {/* 🧭 Navegação principal */}
          <Stack.Screen name="MainTabs" component={MainTabs} />

          {/* 🆕 Rotas globais fora das abas */}
          <Stack.Screen
            name="QRScanner"
            component={QRScanner}
            options={{ title: "Scanner de QR", headerShown: true }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ProjetosProvider>
  );
}
