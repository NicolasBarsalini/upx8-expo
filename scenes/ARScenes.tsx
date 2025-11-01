import React, { useState } from "react";
import {
  ViroARScene,
  ViroAmbientLight,
  ViroDirectionalLight,
  Viro3DObject,
  ViroARPlaneSelector,
} from "@viro-community/react-viro";

type ARSceneProps = { modelSource: string };

export default function ARScene({ modelSource }: ARSceneProps) {
  const [scale, setScale] = useState<[number, number, number]>([0.02, 0.02, 0.02]);
  const [rotation, setRotation] = useState<[number, number, number]>([0, 0, 0]);

  return (
    <ViroARScene>
      <ViroAmbientLight color="#ffffff" intensity={500} />
      <ViroDirectionalLight color="#ffffff" direction={[0, -1, -0.2]} />

      <ViroARPlaneSelector>
        <Viro3DObject
        source={{ uri: modelSource }}
        // força o tipo aceito oficialmente pelo pacote
        type={inferType(modelSource) as "OBJ" | "VRX" | "GLTF" | "GLB"}
        position={[0, 0, -1]}
        scale={scale}
        rotation={rotation}
        dragType="FixedToWorld"
        onPinch={(state, factor) => {
            if (state === 2) {
            const k = Math.max(0.005, Math.min(0.2, scale[0] * factor));
            setScale([k, k, k]);
            }
        }}
        onRotate={(state, factor) => {
            if (state === 2) {
            setRotation([rotation[0], rotation[1] + factor, rotation[2]]);
            }
        }}
        resources={[]}
        />

      </ViroARPlaneSelector>
    </ViroARScene>
  );
}

// inferência de tipo de arquivo 3D
function inferType(url: string): "GLTF" | "GLB" | "OBJ" | "FBX" | "VRX" {
  const u = url.toLowerCase();
  if (u.endsWith(".gltf")) return "GLTF";
  if (u.endsWith(".glb")) return "GLB";
  if (u.endsWith(".obj")) return "OBJ";
  if (u.endsWith(".fbx")) return "FBX";
  return "GLB";
}
