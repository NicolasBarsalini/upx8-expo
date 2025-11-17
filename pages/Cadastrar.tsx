import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  Pressable,
} from "react-native";

export default function Cadastrar({ navigation }: any) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [aceitouTermos, setAceitouTermos] = useState(false);

  const handleCadastro = () => {
    if (!email || !senha || !confirmarSenha) {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return;
    }

    if (senha !== confirmarSenha) {
      Alert.alert("Erro", "As senhas não coincidem.");
      return;
    }

    if (!aceitouTermos) {
      Alert.alert("Atenção", "Você precisa aceitar os termos de uso.");
      return;
    }

    Alert.alert("Sucesso", "Cadastro realizado com sucesso!");
    navigation.navigate("Login");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <Text style={styles.logo}>Criar Conta</Text>
        <Text style={styles.subtitle}>
          Preencha os campos abaixo para criar sua conta
        </Text>
      </View>

      {/* Form */}
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="E-mail"
          placeholderTextColor="#888"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          style={styles.input}
          placeholder="Senha"
          placeholderTextColor="#888"
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
        />

        <TextInput
          style={styles.input}
          placeholder="Confirmar senha"
          placeholderTextColor="#888"
          secureTextEntry
          value={confirmarSenha}
          onChangeText={setConfirmarSenha}
        />

        {/* Termos */}
        <Pressable
          style={styles.termosContainer}
          onPress={() => setAceitouTermos(!aceitouTermos)}
        >
          <View
            style={[
              styles.checkboxCustom,
              aceitouTermos && styles.checkboxChecked,
            ]}
          >
            {aceitouTermos && (
              <Text style={styles.checkboxMark}>✓</Text>
            )}
          </View>

          <Text style={styles.termosText}>
            Li e aceito os{" "}
            <Text
              style={styles.linkTermos}
              onPress={() =>
                Alert.alert(
                  "Termos de Uso",
                  "Ao se cadastrar, você concorda em proteger suas credenciais e utilizar o aplicativo de forma responsável."
                )
              }
            >
              Termos de Uso
            </Text>
            .
          </Text>
        </Pressable>

        {/* Botão cadastrar */}
        <TouchableOpacity style={styles.buttonGreen} onPress={handleCadastro}>
          <Text style={styles.buttonGreenText}>Cadastrar</Text>
        </TouchableOpacity>

        {/* Voltar */}
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.voltarText}>
            Já possui conta? Voltar para Login
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#f2f2f2",
    paddingVertical: 40,
  },
  header: {
    alignItems: "center",
    marginTop: 40,
    marginBottom: 20,
  },
  logo: {
    fontSize: 28,
    fontWeight: "700",
    color: "#000",
    marginBottom: 10,
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
    gap: 16,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 6,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ddd",
  },

  /* Checkbox customizado */
  termosContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginVertical: 10,
  },
  checkboxCustom: {
    width: 22,
    height: 22,
    borderWidth: 2,
    borderColor: "#64b6ac",
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  checkboxChecked: {
    backgroundColor: "#64b6ac",
  },
  checkboxMark: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: -2,
  },
  termosText: {
    flex: 1,
    fontSize: 14,
    color: "#333",
    lineHeight: 18,
  },
  linkTermos: {
    color: "#64b6ac",
    textDecorationLine: "underline",
  },

  buttonGreen: {
    backgroundColor: "#64b6ac",
    paddingVertical: 14,
    borderRadius: 6,
    alignItems: "center",
    marginTop: 10,
  },
  buttonGreenText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "600",
  },
  voltarText: {
    fontSize: 14,
    color: "#64b6ac",
    textAlign: "center",
    marginTop: 12,
    textDecorationLine: "underline",
  },
});
