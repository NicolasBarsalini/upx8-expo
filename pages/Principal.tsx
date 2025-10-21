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

import house1 from "../assets/house1.jpg";
import house2 from "../assets/house2.jpg";

export default function Principal({ navigation }: any) {
  const { width } = useWindowDimensions();

  // espaçamento base
  const GAP = width < 400 ? 10 : 14;
  // padding lateral
  const SIDE_PADDING = width < 400 ? 10 : 16;

  // calcula largura do card dinamicamente
  const CARD_WIDTH =
    (width - SIDE_PADDING * 2 - GAP) / 2; // sempre cabe 2 colunas justas

  const models = [
    {
      id: 1,
      name: "Casa Moderna",
      image: house1,
      rooms: "3 Quartos",
      area: "120m²",
    },
    {
      id: 2,
      name: "Apartamento Compacto",
      image: house2,
      rooms: "2 Quartos",
      area: "80m²",
    },
    {
      id: 3,
      name: "Casa de Campo",
      image: house1,
      rooms: "3 Quartos",
      area: "150m²",
    },
    {
      id: 4,
      name: "Escritório Compacto",
      image: house2,
      rooms: "40m²",
      area: "2 Estações",
    },
        {
      id: 5,
      name: "Escritório Compacto",
      image: house1,
      rooms: "40m²",
      area: "2 Estações",
    },
        {
      id: 6,
      name: "Escritório Compacto",
      image: house2,
      rooms: "40m²",
      area: "2 Estações",
    },
        {
      id: 7,
      name: "Escritório Compacto",
      image: house1,
      rooms: "40m²",
      area: "2 Estações",
    },
  ];

  const renderCard = ({ item }: any) => (
    <TouchableOpacity
      style={[styles.card, { width: CARD_WIDTH }]}
      activeOpacity={0.85}
      onPress={() => navigation.navigate("Detalhes", { model: item })}
    >
      <Image source={item.image} style={styles.image} />
      <View style={styles.cardBody}>
        <Text style={styles.modelName}>{item.name}</Text>
        <Text style={styles.infoText}>
          {item.rooms} | {item.area}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Catálogo de Projetos</Text>
      </View>

      {/* Grade com padding e gap adaptativos */}
      <FlatList
        data={models}
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
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  header: {
    backgroundColor: "#fff",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e5e5",
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
});
