import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Detalhes({ route, navigation }: any) {
  const { model } = route.params; // 👈 dados vindos do card

  return (
    <View style={{ flex: 1, backgroundColor: "#F5F5F5" }}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-outline" size={26} color="#2E8376" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Detalhes do Projeto</Text>
        <View style={{ width: 26 }} /> {/* espaçamento p/ centralizar */}
      </View>

      {/* Conteúdo */}
      <ScrollView contentContainerStyle={styles.content}>
        {/* Imagem */}
        {model.image && (
          <Image source={{ uri: model.image }} style={styles.projectImage} />
        )}

        {/* Título */}
        <Text style={styles.title}>{model.name}</Text>

        {/* Informações */}
        <View style={styles.infoBox}>
          <Ionicons name="information-circle-outline" size={18} color="#2E8376" />
          <Text style={styles.infoText}>{model.info || "Sem informações"}</Text>
        </View>

        {/* Descrição */}
        <Text style={styles.sectionTitle}>Descrição</Text>
        <Text style={styles.description}>
          {model.descricao || "Nenhuma descrição adicionada."}
        </Text>

        {/* Arquivos */}
        {(model.fbx || model.dae) && (
          <>
            <Text style={styles.sectionTitle}>Arquivos do Projeto</Text>
            {model.fbx && (
              <Text style={styles.fileText}>
                <Ionicons name="cube-outline" size={16} color="#2E8376" /> FBX:{" "}
                {model.fbx.split("/").pop()}
              </Text>
            )}
            {model.dae && (
              <Text style={styles.fileText}>
                <Ionicons name="cloud-upload-outline" size={16} color="#2E8376" />{" "}
                DAE: {model.dae.split("/").pop()}
              </Text>
            )}
          </>
        )}
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
  fileText: {
    fontSize: 14,
    color: "#444",
    marginTop: 4,
  },
});
