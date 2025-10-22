import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  TextInput,
  Platform,
} from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";

WebBrowser.maybeCompleteAuthSession();

export default function Login({ navigation }: any) {
  // ---------- ESTADOS ----------
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  // ---------- GOOGLE AUTH ----------
  const clientId =
    Platform.OS === "android"
      ? "SEU_ANDROID_CLIENT_ID.apps.googleusercontent.com"
      : "SEU_WEB_CLIENT_ID.apps.googleusercontent.com";

  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId,
  });

  useEffect(() => {
    if (response?.type === "success") {
      const { authentication } = response;
      Alert.alert("Login com Google", `Token: ${authentication?.accessToken}`);
      navigation.reset({
        index: 0,
        routes: [{ name: "MainTabs" }],
      });
    }
  }, [response]);

  // ---------- LOGIN TRADICIONAL ----------
  const fazerLogin = () => {
    const emailValido = "pedro@gmail.com";
    const senhaValida = "1234";

    // Limpa erro anterior
    setErro("");

    if (email.trim() === "" || senha.trim() === "") {
      setErro("Preencha todos os campos.");
      return;
    }

    if (email === emailValido && senha === senhaValida) {
      Alert.alert("Sucesso", "Login realizado com sucesso!");
      setErro("");
      navigation.reset({
        index: 0,
        routes: [{ name: "MainTabs" }],
      });
    } else {
      setErro("E-mail ou senha incorretos.");
    }
  };

  // ---------- RENDERIZAÇÃO ----------
  return (
    <View style={styles.container}>
      {/* Logo e textos */}
      <View style={styles.header}>
        <Text style={styles.logo}>ArchiViewAR</Text>
        <Text style={styles.subtitle}>
          Visualize seu futuro lar{"\n"}em realidade aumentada
        </Text>
      </View>

      {/* Campos de login */}
      <View style={styles.form}>
        <TextInput
          style={[styles.input, erro && { borderColor: "#E53935" }]}
          placeholder="E-mail"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          style={[styles.input, erro && { borderColor: "#E53935" }]}
          placeholder="Senha"
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
        />

        {erro ? <Text style={styles.errorText}>{erro}</Text> : null}

        <TouchableOpacity style={styles.buttonGreen} onPress={fazerLogin}>
          <Text style={styles.buttonGreenText}>Entrar</Text>
        </TouchableOpacity>
      </View>

      {/* Outras opções */}
      <View style={styles.buttons}>
        {/* GOOGLE */}
        <TouchableOpacity
          style={styles.buttonWhite}
          onPress={() => promptAsync()}
          disabled={!request}
        >
          <Text style={styles.buttonWhiteText}>Continuar com Google</Text>
        </TouchableOpacity>

        {/* CRIAR CONTA */}
        <TouchableOpacity
          style={styles.buttonOutline}
          onPress={() => navigation.navigate("Cadastrar")}
        >
          <Text style={styles.buttonOutlineText}>Criar Conta</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// ---------- ESTILOS ----------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    justifyContent: "space-between",
    paddingVertical: 50,
  },
  header: {
    marginTop: 80,
    alignItems: "center",
  },
  logo: {
    fontSize: 32,
    fontWeight: "700",
    color: "#2E8376",
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
    lineHeight: 22,
    paddingHorizontal: 40,
  },
  form: {
    paddingHorizontal: 30,
    gap: 12,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "#ddd",
    fontSize: 15,
    color: "#000",
  },
  buttonGreen: {
    backgroundColor: "#2E8376",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
  },
  buttonGreenText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "600",
  },
  buttons: {
    paddingHorizontal: 30,
    gap: 12,
    marginBottom: 40,
  },
  buttonWhite: {
    backgroundColor: "#fff",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    elevation: 1,
  },
  buttonWhiteText: {
    fontSize: 16,
    color: "#000",
    fontWeight: "500",
  },
  buttonOutline: {
    borderWidth: 1,
    borderColor: "#bbb",
    backgroundColor: "#fff",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonOutlineText: {
    fontSize: 16,
    color: "#000",
    fontWeight: "500",
  },
  errorText: {
    color: "#E53935",
    fontSize: 14,
    marginTop: 2,
    textAlign: "center",
    fontWeight: "500",
  },
});
