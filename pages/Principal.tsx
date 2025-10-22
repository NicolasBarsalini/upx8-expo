import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  useWindowDimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useProjetos } from "../context/ProjetosContext"; // 👈 Importa o contexto

export default function Principal({ navigation }: any) {
  const { projetos } = useProjetos(); // 👈 Usa o estado global
  const { width } = useWindowDimensions();

  const GAP = width < 400 ? 10 : 14;
  const SIDE_PADDING = width < 400 ? 10 : 16;
  const CARD_WIDTH = (width - SIDE_PADDING * 2 - GAP) / 2;

  const renderCard = ({ item }: any) => (
    <TouchableOpacity
      style={[styles.card, { width: CARD_WIDTH }]}
      activeOpacity={0.85}
      onPress={() => navigation.navigate("Detalhes", { model: item })}
    >
      <Image
        source={
          typeof item.image === "string"
            ? { uri: item.image } // imagens vindas do cadastro
            : item.image // imagens locais
        }
        style={styles.image}
      />
      <View style={styles.cardBody}>
        <Text style={styles.modelName}>{item.name}</Text>
        <Text style={styles.infoText}>{item.info}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Cabeçalho aprimorado */}
      <View style={styles.topBar}>
        <View style={styles.logoContainer}>
          <Ionicons name="cube-outline" size={28} color="#2E8376" />
          <Text style={styles.appTitle}>ArchiViewAR</Text>
        </View>

        <TouchableOpacity
          style={styles.profileButton}
          onPress={() => navigation.navigate("Perfil")}
        >
          <Ionicons name="person-circle-outline" size={30} color="#2E8376" />
        </TouchableOpacity>
      </View>

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Catálogo de Projetos</Text>
      </View>

      {/* Lista de projetos dinâmica */}
      <FlatList
        data={projetos}
        renderItem={renderCard}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={{ gap: GAP }}
        contentContainerStyle={{
          paddingHorizontal: SIDE_PADDING,
          paddingTop: GAP,
          paddingBottom: 80,
          gap: GAP,
        }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="cube-outline" size={50} color="#ccc" />
            <Text style={styles.emptyText}>
              Nenhum projeto cadastrado ainda
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  topBar: {
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  appTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#2E8376",
    marginLeft: 8,
  },
  profileButton: {
    padding: 4,
  },
  header: {
    backgroundColor: "#fff",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
  },
  card: {
    backgroundColor: "#FAFAFA",
    borderRadius: 12,
    marginBottom: 0,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 120,
  },
  cardBody: {
    padding: 10,
  },
  modelName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
    marginBottom: 4,
  },
  infoText: {
    fontSize: 13,
    color: "#666",
  },
  emptyContainer: {
    alignItems: "center",
    marginTop: 80,
  },
  emptyText: {
    color: "#999",
    fontSize: 15,
    marginTop: 10,
  },
});
