import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Perfil() {
  const user = {
    name: "Pedro Henrique",
    email: "Pedro@gmail.com",
    phone: "(11) 98765-4321",
    gender: "Masculino",
    birth: "10/04/2004",
    avatar: "https://i.pravatar.cc/200?img=12",
  };

  return (
    <ScrollView style={styles.container}>
      {/* Cabeçalho com imagem */}
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <Image source={{ uri: user.avatar }} style={styles.avatar} />
          <TouchableOpacity style={styles.cameraButton}>
            <Ionicons name="camera" size={18} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Informações */}
      <View style={styles.infoContainer}>
        <View style={styles.infoGroup}>
          <Text style={styles.label}>Nome de usuário</Text>
          <Text style={styles.value}>{user.name}</Text>
        </View>

        <View style={styles.infoGroup}>
          <Text style={styles.label}>E-mail</Text>
          <Text style={styles.value}>{user.email}</Text>
        </View>

        <View style={styles.infoGroup}>
          <Text style={styles.label}>Telefone</Text>
          <Text style={styles.value}>{user.phone}</Text>
        </View>

        <View style={styles.infoGroup}>
          <Text style={styles.label}>Gênero</Text>
          <Text style={styles.value}>{user.gender}</Text>
        </View>

        <View style={styles.infoGroup}>
          <Text style={styles.label}>Data de nascimento</Text>
          <Text style={styles.value}>{user.birth}</Text>
        </View>
      </View>

      {/* Botão de sair */}
      <TouchableOpacity style={styles.logoutButton}>
        <Ionicons name="log-out-outline" size={18} color="#fff" />
        <Text style={styles.logoutText}>Sair</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },

  header: {
    backgroundColor: "#2E8376",
    height: 160,
    justifyContent: "center",
    alignItems: "center",
  },

  avatarContainer: {
    position: "relative",
  },

  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 3,
    borderColor: "#fff",
  },

  cameraButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#2E8376",
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#fff",
  },

  infoContainer: {
    backgroundColor: "#fff",
    marginTop: -20,
    marginHorizontal: 16,
    borderRadius: 12,
    padding: 20,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 3,
  },

  infoGroup: {
    borderBottomWidth: 1,
    borderBottomColor: "#e5e5e5",
    paddingVertical: 10,
  },

  label: {
    fontSize: 13,
    color: "#999",
    marginBottom: 4,
  },

  value: {
    fontSize: 16,
    fontWeight: "500",
    color: "#000",
  },

  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2E8376",
    marginHorizontal: 50,
    marginTop: 30,
    borderRadius: 8,
    paddingVertical: 12,
  },

  logoutText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 15,
    marginLeft: 6,
  },
});
