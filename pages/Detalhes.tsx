import React, { useMemo } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Share,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useProjetos } from "../context/ProjetosContext";
import QRCode from "react-native-qrcode-svg";
import * as Linking from "expo-linking";

export default function Detalhes({ route, navigation }: any) {
  const { model } = route.params || {};
  const { removerProjeto } = useProjetos();

  if (!model) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Projeto não encontrado.</Text>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate("Principal")}
        >
          <Ionicons name="arrow-back-outline" size={20} color="#fff" />
          <Text style={styles.backText}>Voltar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const editarProjeto = () => {
    navigation.navigate("CadastrarProjeto", { editar: true, projeto: model });
  };

  const excluirProjeto = () => {
    Alert.alert(
      "Excluir Projeto",
      `Tem certeza que deseja excluir o projeto "${model.name}"?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: () => {
            removerProjeto(model.id);
            Alert.alert("Removido", "O projeto foi excluído com sucesso.");
            navigation.navigate("Principal");
          },
        },
      ]
    );
  };

  // ✅ link fixo e universal (independente de ambiente)
  const deepLink = useMemo(() => {
    const scheme = "upx8://";
    const projectId = encodeURIComponent(String(model?.id || ""));
    return `${scheme}ar?projectId=${projectId}`;
  }, [model?.id]);

  // ✅ abrir AR localmente
  const abrirAR = () => navigation.navigate("ARViewer", { projectId: model.id });

  // ✅ compartilhar link
  const compartilharLink = async () => {
    try {
      await Share.share({
        message: `Veja este projeto em Realidade Aumentada:\n${deepLink}`,
      });
    } catch (error) {
      console.warn("Erro ao compartilhar link:", error);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#F5F5F5" }}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-outline" size={26} color="#2E8376" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Detalhes do Projeto</Text>
        <View style={{ width: 26 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Imagem */}
        {model.image && (
          <Image
            source={
              typeof model.image === "string" ? { uri: model.image } : model.image
            }
            style={styles.projectImage}
          />
        )}

        {/* Título */}
        <Text style={styles.title}>{model.name}</Text>

        {/* Informações */}
        <View style={styles.infoBox}>
          <Ionicons name="information-circle-outline" size={18} color="#2E8376" />
          <Text style={styles.infoText}>
            {model.info || "Sem informações adicionais"}
          </Text>
        </View>

        {/* Descrição */}
        <Text style={styles.sectionTitle}>Descrição</Text>
        <Text style={styles.description}>
          {model.descricao || "Nenhuma descrição adicionada."}
        </Text>

        {/* QR Code */}
        <Text style={styles.sectionTitle}>QR Code do Projeto</Text>
        <View style={styles.qrBox}>
          <QRCode value={deepLink} size={160} color="#2E8376" />
          <Text style={styles.qrHint}>
            Escaneie este QR com outro dispositivo para abrir o projeto em AR.
          </Text>
          <Text style={styles.qrLink}>{deepLink}</Text>

          {/* botão de compartilhar */}
          <TouchableOpacity style={styles.shareButton} onPress={compartilharLink}>
            <Ionicons name="share-outline" size={18} color="#fff" />
            <Text style={styles.shareText}>Compartilhar link</Text>
          </TouchableOpacity>
        </View>

        {/* Botão: Abrir em AR */}
        <TouchableOpacity style={styles.arButton} onPress={abrirAR}>
          <Ionicons name="cube-outline" size={20} color="#fff" />
          <Text style={styles.arText}>Ver em Realidade Aumentada</Text>
        </TouchableOpacity>

        {/* Botões padrão */}
        <TouchableOpacity style={styles.editButton} onPress={editarProjeto}>
          <Ionicons name="create-outline" size={20} color="#fff" />
          <Text style={styles.editText}>Editar Projeto</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.deleteButton} onPress={excluirProjeto}>
          <Ionicons name="trash-outline" size={20} color="#fff" />
          <Text style={styles.deleteText}>Excluir Projeto</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2E8376",
  },
  content: {
    padding: 20,
  },
  projectImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#000",
    marginBottom: 10,
  },
  infoBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  infoText: {
    marginLeft: 8,
    fontSize: 15,
    color: "#333",
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: "600",
    color: "#2E8376",
    marginBottom: 6,
  },
  description: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
    fontSize: 15,
    color: "#444",
    lineHeight: 22,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 20,
  },
  qrBox: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 16,
  },
  qrHint: {
    marginTop: 10,
    fontSize: 13,
    color: "#555",
    textAlign: "center",
  },
  qrLink: {
    marginTop: 6,
    fontSize: 12,
    color: "#2E8376",
    textAlign: "center",
  },
  shareButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2E8376",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
    marginTop: 12,
  },
  shareText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 6,
  },
  arButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2E8376",
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 10,
  },
  arText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 6,
  },
  editButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 10,
  },
  editText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 6,
  },
  deleteButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E53935",
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 10,
    marginBottom: 30,
  },
  deleteText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 6,
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F5F5F5",
  },
  emptyText: {
    fontSize: 16,
    color: "#444",
    marginBottom: 12,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2E8376",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  backText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 15,
    marginLeft: 6,
  },
});
