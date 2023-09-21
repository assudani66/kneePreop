import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
// Define your custom shader material
const holdoutMaterial = new THREE.ShaderMaterial({
  vertexShader: `
      void main() {
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
  fragmentShader: `
    void main() {
      gl_FragColor = vec4(1.0, 1.0, 1.0, 0.0); // Transparent white color
    }
  `,
});

export function Model(props) {
  const { nodes, materials } = useGLTF("./models/test_model.glb");

  // Apply the custom shader material to the model
  if (nodes.Cube001) {
    nodes.Cube001.material = holdoutMaterial;
  }

  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube001.geometry}
        material={nodes.Cube001.material} // Use the custom material here
        position={[0, 0, 1.011]}
        scale={[0.345, 0.345, 0.023]}
      />
    </group>
  );
}

useGLTF.preload("/test_model.glb");
