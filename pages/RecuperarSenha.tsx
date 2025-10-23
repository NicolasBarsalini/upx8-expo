import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Animated,
  Easing,
} from "react-native";

export default function RecuperarSenha({ navigation }: any) {
  const [email, setEmail] = useState("");
  const [erro, setErro] = useState("");
  const [toastAnim] = useState(new Animated.Value(0));

  const showToast = (msg: string) => {
    setErro(msg);
    Animated.sequence([
      Animated.timing(toastAnim, {
        toValue: 1,
        duration: 300,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.delay(2000),
      Animated.timing(toastAnim, {
        toValue: 0,
        duration: 300,
        easing: Easing.in(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start();
  };

  const enviarLink = () => {
    if (email.trim() === "") {
      showToast("Digite seu e-mail.");
      return;
    }

    // Simulação de envio
    Alert.alert(
      "E-mail enviado",
      "Um link de redefinição foi enviado para o seu e-mail."
    );
    setEmail("");
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <Text style={styles.logo}>ArchiViewAR</Text>
        <Text style={styles.subtitle}>
          Recuperar acesso à sua conta
        </Text>
      </View>

      {/* Formulário */}
      <View style={styles.form}>
        <TextInput
          style={[styles.input, erro && { borderColor: "#E53935" }]}
          placeholder="Digite seu e-mail"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <TouchableOpacity style={styles.buttonGreen} onPress={enviarLink}>
          <Text style={styles.buttonGreenText}>Enviar link de redefinição</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>Voltar ao login</Text>
        </TouchableOpacity>
      </View>

      {/* Toast */}
      <Animated.View
        style={[
          styles.toast,
          {
            opacity: toastAnim,
            transform: [
              {
                translateY: toastAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [40, 0],
                }),
              },
            ],
          },
        ]}
      >
        <Text style={styles.toastText}>{erro}</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    paddingHorizontal: 30,
  },
  header: {
    alignItems: "center",
    marginBottom: 40,
  },
  logo: {
    fontSize: 32,
    fontWeight: "700",
    color: "#2E8376",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
  },
  form: {
    gap: 14,
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
  },
  buttonGreenText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "600",
  },
  backButton: {
    alignItems: "center",
    paddingVertical: 10,
  },
  backButtonText: {
    fontSize: 15,
    color: "#2E8376",
    fontWeight: "600",
  },
  toast: {
    position: "absolute",
    bottom: 30,
    left: 40,
    right: 40,
    backgroundColor: "#2E8376",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    elevation: 4,
  },
  toastText: {
    color: "#fff",
    fontWeight: "600",
  },
});
