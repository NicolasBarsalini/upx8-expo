import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";
import * as Linking from "expo-linking";

export default function QRScanner({ navigation }: any) {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [loading, setLoading] = useState(false);

  // Solicita permissão automaticamente ao abrir
  useEffect(() => {
    if (!permission) {
      requestPermission();
    }
  }, [permission]);

  // Manipula leitura do QR Code
  const handleBarCodeScanned = async ({ data }: { data: string }) => {
    if (scanned || loading) return;

    setScanned(true);
    setLoading(true);

    try {
      if (data.startsWith("upx8://ar")) {
        await Linking.openURL(data);
      } else {
        Alert.alert("QR inválido", "Esse QR não pertence a um projeto válido.");
        setScanned(false);
      }
    } catch (error) {
      console.warn("Erro ao abrir link:", error);
      Alert.alert("Erro", "Não foi possível abrir o link do QR Code.");
      setScanned(false);
    } finally {
      setLoading(false);
    }
  };

  // Caso ainda esteja verificando permissão
  if (!permission) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#2E8376" />
        <Text style={styles.permissionText}>Verificando permissão...</Text>
      </View>
    );
  }

  // Caso o usuário tenha negado a permissão
  if (!permission.granted) {
    return (
      <View style={styles.center}>
        <Ionicons name="alert-circle-outline" size={50} color="#E53935" />
        <Text style={styles.permissionText}>
          Acesso à câmera negado. Vá em Configurações e permita o uso da câmera.
        </Text>
        <TouchableOpacity
          onPress={requestPermission}
          style={styles.backButton}
        >
          <Ionicons name="camera-outline" size={20} color="#fff" />
          <Text style={styles.backButtonText}>Permitir Câmera</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Layout principal
  return (
    <View style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-outline" size={26} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Leitor de QR Code</Text>
        <View style={{ width: 26 }} />
      </View>

      {/* Câmera (nova API do Expo 51+) */}
      <CameraView
        style={StyleSheet.absoluteFillObject}
        facing="back"
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
      />

      {/* Overlay e feedback */}
      <View style={styles.overlay}>
        <View style={styles.scanBox} />

        {loading ? (
          <View style={styles.feedbackBox}>
            <ActivityIndicator size="large" color="#fff" />
            <Text style={styles.feedbackText}>Abrindo link...</Text>
          </View>
        ) : scanned ? (
          <TouchableOpacity
            style={styles.rescanButton}
            onPress={() => setScanned(false)}
          >
            <Ionicons name="scan-outline" size={20} color="#fff" />
            <Text style={styles.rescanText}>Escanear novamente</Text>
          </TouchableOpacity>
        ) : (
          <Text style={styles.instruction}>Aponte a câmera para o QR Code</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  header: {
    position: "absolute",
    top: 50,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    zIndex: 10,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  scanBox: {
    width: 250,
    height: 250,
    borderWidth: 3,
    borderColor: "#2E8376",
    borderRadius: 12,
    backgroundColor: "rgba(0,0,0,0.2)",
  },
  instruction: {
    color: "#fff",
    marginTop: 20,
    fontSize: 16,
    textAlign: "center",
  },
  feedbackBox: {
    position: "absolute",
    bottom: 100,
    alignItems: "center",
  },
  feedbackText: {
    color: "#fff",
    fontSize: 15,
    marginTop: 10,
  },
  rescanButton: {
    position: "absolute",
    bottom: 90,
    backgroundColor: "#2E8376",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  rescanText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 6,
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  permissionText: {
    textAlign: "center",
    fontSize: 15,
    color: "#444",
    marginTop: 15,
  },
  backButton: {
    marginTop: 20,
    backgroundColor: "#2E8376",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  backButtonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
    marginLeft: 6,
  },
});
