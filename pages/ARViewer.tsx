import React, { useMemo } from "react";
import { View, Text } from "react-native";
import { useProjetos } from "../context/ProjetosContext";
import { ViroARSceneNavigator } from "@viro-community/react-viro";
import ARScene from "../scenes/ARScenes";

export default function ARViewer({ route }: any) {
  const { projectId } = route.params || {};
  const { projetos } = useProjetos();

  const projeto = useMemo(
    () => projetos.find((p) => String(p.id) === String(projectId)),
    [projectId, projetos]
  );

  if (!projeto) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Projeto não encontrado para AR.</Text>
      </View>
    );
  }

  // prioridade: modelUrl → fbx → dae
  const modelSource = projeto.modelUrl || projeto.fbx || projeto.dae;
  if (!modelSource) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center", padding: 24 }}>
        <Text>Este projeto não possui modelo 3D configurado.</Text>
      </View>
    );
  }

  // 👇 função que cria a cena com o modelSource (sem props explícitos)
  const SceneWithProps = () => <ARScene modelSource={modelSource} />;

  return (
    <ViroARSceneNavigator
      autofocus
      initialScene={{ scene: SceneWithProps }}
      style={{ flex: 1 }}
    />
  );
}
