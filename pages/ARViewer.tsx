import React, { useEffect } from "react";
import { View, Platform, Text } from "react-native";
import { GLView } from "expo-gl";
import { Renderer } from "expo-three";
import * as THREE from "three";
import { Asset } from "expo-asset";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { Camera } from "expo-camera";

export default function ARViewer() {
  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } = await Camera.requestCameraPermissionsAsync();
        if (status !== "granted") {
          console.warn("Permissão de câmera negada. A RA pode não funcionar corretamente.");
        }
      }
    })();
  }, []);

  const onContextCreate = async (gl: any) => {
    const { drawingBufferWidth: width, drawingBufferHeight: height } = gl;

    // 🎥 Cena e câmera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 2;

    // 🧱 Renderer
    const renderer = new Renderer({ gl });
    renderer.setSize(width, height);

    // 💡 Luzes básicas
    const ambient = new THREE.AmbientLight(0xffffff, 0.8);
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.6);
    dirLight.position.set(3, 3, 3);
    scene.add(ambient);
    scene.add(dirLight);

    try {
      // 📦 Carregar modelo GLB
      const asset = Asset.fromModule(require("../assets/model.glb"));
      await asset.downloadAsync();

      const loader = new GLTFLoader();
      const modelData = await new Promise<any>((resolve, reject) => {
        loader.load(asset.localUri || asset.uri || "", resolve, undefined, reject);
      });

      const model = modelData.scene;
      model.scale.set(1, 1, 1);
      model.position.set(0, -0.5, 0);
      scene.add(model);

      // 🔁 Loop de animação
      const animate = () => {
        requestAnimationFrame(animate);
        model.rotation.y += 0.01;
        renderer.render(scene, camera);
        gl.endFrameEXP();
      };
      animate();
    } catch (error) {
      console.error("❌ Erro ao carregar modelo GLB:", error);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#000" }}>
      {Platform.OS === "web" ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#111",
          }}
        >
          <Text style={{ color: "#fff", fontSize: 16, textAlign: "center" }}>
            Visualização AR disponível apenas no app móvel.
          </Text>
        </View>
      ) : (
        // ⚙️ “enableExperimentalWorkaround” evita bug no Android com expo-gl 16.x
        <GLView
        style={{ flex: 1 }}
        onContextCreate={onContextCreate}
        {...({ enableExperimentalWorkaround: true } as any)}
        />

      )}
    </View>
  );
}
