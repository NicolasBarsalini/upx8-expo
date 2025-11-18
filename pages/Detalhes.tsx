import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Share,
  Linking,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useProjetos } from "../context/ProjetosContext";

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

      const abrirAR = () => {
        const modelUrl = "https://archivieew.web.app/modelos/model.glb";

        const viewerUrl =
          "https://archivieew.web.app/ar-view.html?model=" +
          encodeURIComponent(modelUrl);

        Linking.openURL(viewerUrl).catch(() => {
          Alert.alert("Erro", "Não foi possível abrir o modo AR.");
        });
      };

      const abrirARCozinha = () => {
          const modelUrl = "https://archivieew.web.app/modelos/cozinha.glb";

          const viewerUrl =
            "https://archivieew.web.app/ar-view.html?model=" +
            encodeURIComponent(modelUrl);

          Linking.openURL(viewerUrl).catch(() => {
            Alert.alert("Erro", "Não foi possível abrir o modo AR (cozinha).");
          });
        };

         const abrirARQuarto = () => {
          const modelUrl = "https://archivieew.web.app/modelos/quarto.glb";

          const viewerUrl =
            "https://archivieew.web.app/ar-view.html?model=" +
            encodeURIComponent(modelUrl);

          Linking.openURL(viewerUrl).catch(() => {
            Alert.alert("Erro", "Não foi possível abrir o modo AR (cozinha).");
          });
        };


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

  const compartilharProjeto = async () => {
    try {
      const message = `
🏗️ *${model.name}*

📋 ${model.descricao || "Sem descrição adicionada."}

📐 Informações: ${model.info || "Sem informações"}
      
${model.fbx ? `📦 Arquivo FBX: ${model.fbx.split("/").pop()}` : ""}
${model.dae ? `📁 Arquivo DAE: ${model.dae.split("/").pop()}` : ""}
`;

      await Share.share({
        title: `Projeto: ${model.name}`,
        message,
      });
    } catch (error) {
      Alert.alert("Erro", "Não foi possível compartilhar o projeto.");
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

      {/* Conteúdo */}
      <ScrollView contentContainerStyle={styles.content}>
        {model.image && (
          <Image
            source={
              typeof model.image === "string"
                ? { uri: model.image }
                : model.image
            }
            style={styles.projectImage}
          />
        )}

        <Text style={styles.title}>{model.name}</Text>

        <View style={styles.infoBox}>
          <Ionicons
            name="information-circle-outline"
            size={18}
            color="#2E8376"
          />
          <Text style={styles.infoText}>{model.info || "Sem informações"}</Text>
        </View>

        <Text style={styles.sectionTitle}>Descrição</Text>
        <Text style={styles.description}>
          {model.descricao || "Nenhuma descrição adicionada."}
        </Text>

          {/* BOTÃO CASINHA — aparece apenas no card "Casa Moderna" */}
          {model.name === "Casa Moderna" && (
            <TouchableOpacity style={styles.editButton} onPress={abrirAR}>
              <Ionicons name="cube-outline" size={20} color="#fff" />
              <Text style={styles.editText}>Visualizar em RA</Text>
            </TouchableOpacity>
          )}

          {/* BOTÃO COZINHA — aparece apenas no card "Apartamento" */}
          {model.name === "Cozinha Minimalista" && (
            <TouchableOpacity style={styles.editButton} onPress={abrirARCozinha}>
              <Ionicons name="cube-outline" size={20} color="#fff" />
              <Text style={styles.editText}>Visualizar em RA</Text>
            </TouchableOpacity>
          )}

          {model.name === "Quarto Infantil" && (
            <TouchableOpacity style={styles.editButton} onPress={abrirARQuarto}>
              <Ionicons name="cube-outline" size={20} color="#fff" />
              <Text style={styles.editText}>Visualizar em RA</Text>
            </TouchableOpacity>
          )}

        {/* EXCLUIR */}
        <TouchableOpacity style={styles.deleteButton} onPress={excluirProjeto}>
          <Ionicons name="trash-outline" size={20} color="#fff" />
          <Text style={styles.deleteText}>Excluir Projeto</Text>
        </TouchableOpacity>

        {/* COMPARTILHAR */}
        <TouchableOpacity
          style={styles.shareButton}
          onPress={compartilharProjeto}
        >
          <Ionicons name="share-social-outline" size={20} color="#fff" />
          <Text style={styles.shareText}>Compartilhar Projeto</Text>
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
  editButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2E8376",
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
  },
  deleteText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 6,
  },
  shareButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 10,
    marginBottom: 30,
  },
  shareText: {
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
