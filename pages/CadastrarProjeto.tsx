import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Animated,
  Easing,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { useProjetos } from "../context/ProjetosContext"; // 👈 contexto global

export default function CadastrarProjeto({ navigation }: any) {
  const { adicionarProjeto } = useProjetos(); // 👈 adiciona projeto globalmente

  const [nome, setNome] = useState("");
  const [info, setInfo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [imagem, setImagem] = useState<string | null>(null);
  const [arquivos, setArquivos] = useState<{ fbx?: string; dae?: string }>({});
  const [erroCampos, setErroCampos] = useState<{ [key: string]: boolean }>({});
  const [toastAnim] = useState(new Animated.Value(0));
  const [toastMsg, setToastMsg] = useState("");

  // 📸 Selecionar imagem
  const selecionarImagem = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });
    if (!result.canceled) setImagem(result.assets[0].uri);
  };

  // 📂 Selecionar arquivo FBX/DAE
  const selecionarArquivo = async (tipo: "fbx" | "dae") => {
    const res = await DocumentPicker.getDocumentAsync({
      type:
        tipo === "fbx"
          ? ["model/fbx", "application/octet-stream"]
          : "model/vnd.collada+xml",
      copyToCacheDirectory: true,
    });
    if (res.assets && res.assets.length > 0) {
      setArquivos((prev) => ({ ...prev, [tipo]: res.assets[0].uri }));
    }
  };

  // 🎯 Toast animado
  const showToast = (msg: string) => {
    setToastMsg(msg);
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

  // 💾 Salvar com validação e limpar depois
  const salvarProjeto = () => {
    const novosErros: { [key: string]: boolean } = {
      nome: nome.trim() === "",
      info: info.trim() === "",
      descricao: descricao.trim() === "",
      imagem: !imagem,
    };

    setErroCampos(novosErros);

    if (Object.values(novosErros).includes(true)) {
      showToast("Preencha todos os campos obrigatórios.");
      return;
    }

    // Adiciona projeto no contexto global
    adicionarProjeto({
      id: Date.now(),
      name: nome,
      image: imagem,
      info,
      descricao,
    });

    // Mostra sucesso
    showToast(`Projeto "${nome}" cadastrado com sucesso!`);

    // 🧹 Limpa todos os campos para novo cadastro
    setNome("");
    setInfo("");
    setDescricao("");
    setImagem(null);
    setArquivos({});
    setErroCampos({});

    // Retorna pra tela principal depois de um curto delay
    setTimeout(() => navigation.navigate("Início"), 2000);
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Cadastrar Novo Projeto</Text>

        {/* IMAGEM */}
        <TouchableOpacity
          style={[
            styles.imagePicker,
            erroCampos.imagem && { borderColor: "#E53935" },
          ]}
          onPress={selecionarImagem}
        >
          {imagem ? (
            <Image source={{ uri: imagem }} style={styles.previewImage} />
          ) : (
            <>
              <Ionicons name="image-outline" size={32} color="#2E8376" />
              <Text style={styles.imageText}>Selecionar Imagem</Text>
            </>
          )}
        </TouchableOpacity>

        {/* CAMPOS */}
        <TextInput
          style={[styles.input, erroCampos.nome && styles.inputError]}
          placeholder="Título do projeto"
          value={nome}
          onChangeText={(v) => {
            setNome(v);
            if (erroCampos.nome) setErroCampos({ ...erroCampos, nome: false });
          }}
        />
        <TextInput
          style={[styles.input, erroCampos.info && styles.inputError]}
          placeholder="Informações (ex: 3 Quartos | 120m²)"
          value={info}
          onChangeText={(v) => {
            setInfo(v);
            if (erroCampos.info) setErroCampos({ ...erroCampos, info: false });
          }}
        />
        <TextInput
          style={[
            styles.input,
            styles.textarea,
            erroCampos.descricao && styles.inputError,
          ]}
          placeholder="Descrição do projeto"
          value={descricao}
          onChangeText={(v) => {
            setDescricao(v);
            if (erroCampos.descricao)
              setErroCampos({ ...erroCampos, descricao: false });
          }}
          multiline
          numberOfLines={4}
        />

        {/* UPLOADS */}
        <View style={styles.uploadRow}>
          <TouchableOpacity
            style={styles.uploadButton}
            onPress={() => selecionarArquivo("fbx")}
          >
            <Ionicons name="cube-outline" size={20} color="#fff" />
            <Text style={styles.uploadText}>Upload FBX</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.uploadButton}
            onPress={() => selecionarArquivo("dae")}
          >
            <Ionicons name="cloud-upload-outline" size={20} color="#fff" />
            <Text style={styles.uploadText}>Upload DAE</Text>
          </TouchableOpacity>
        </View>

        {arquivos.fbx || arquivos.dae ? (
          <View style={styles.fileList}>
            {arquivos.fbx && (
              <Text style={styles.fileText}>
                FBX: {arquivos.fbx.split("/").pop()}
              </Text>
            )}
            {arquivos.dae && (
              <Text style={styles.fileText}>
                DAE: {arquivos.dae.split("/").pop()}
              </Text>
            )}
          </View>
        ) : null}

        {/* BOTÕES */}
        <View style={styles.buttonsRow}>
          <TouchableOpacity
            style={[styles.button, styles.backButton]}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>Voltar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={salvarProjeto}>
            <Text style={styles.buttonText}>Salvar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* TOAST */}
      <Animated.View
        style={[
          styles.toast,
          {
            opacity: toastAnim,
            transform: [
              {
                translateY: toastAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [50, 0],
                }),
              },
            ],
          },
        ]}
      >
        <Text style={styles.toastText}>{toastMsg}</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F5F5F5",
    padding: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#000",
  },
  imagePicker: {
    width: "100%",
    height: 160,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  previewImage: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  imageText: {
    marginTop: 6,
    fontSize: 14,
    color: "#2E8376",
  },
  input: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    fontSize: 15,
    color: "#000",
  },
  inputError: {
    borderColor: "#E53935",
  },
  textarea: {
    height: 100,
    textAlignVertical: "top",
  },
  uploadRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginVertical: 10,
  },
  uploadButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2E8376",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    width: "48%",
    justifyContent: "center",
  },
  uploadText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
    marginLeft: 6,
  },
  fileList: {
    alignSelf: "flex-start",
    marginTop: 8,
  },
  fileText: {
    fontSize: 13,
    color: "#555",
  },
  buttonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 20,
  },
  button: {
    backgroundColor: "#2E8376",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  backButton: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#2E8376",
  },
  backButtonText: {
    color: "#2E8376",
    fontWeight: "bold",
    fontSize: 16,
  },
  toast: {
    position: "absolute",
    bottom: 30,
    left: 40,
    right: 40,
    backgroundColor: "#2E8376",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    elevation: 4,
  },
  toastText: {
    color: "#fff",
    fontWeight: "600",
  },
});
