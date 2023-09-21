import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Vector3 } from "three";

export const Cabel = ({ start, end }) => {
  const lineRef = useRef();

  // Calculate the angle between two vectors using the dot product
  const angle = () => {
    const vectorA = new Vector3().subVectors(end, start);
    const vectorB = new Vector3(1, 0, 0); // Reference vector

    const dotProduct = vectorA.dot(vectorB);
    const lengthA = vectorA.length();
    const lengthB = vectorB.length();

    const cosTheta = dotProduct / (lengthA * lengthB);
    const angleRad = Math.acos(cosTheta);

    // Convert the angle to degrees
    return (angleRad * 180) / Math.PI;
  };

  useFrame(() => {
    lineRef.current.geometry.verticesNeedUpdate = true;
  });

  return (
    <line ref={lineRef}>
      <geometry attach="geometry" vertices={[start, end]} />
      <lineBasicMaterial attach="material" color="red" />
    </line>
  );
};

function App() {
  return (
    <Canvas>
      <Cabel start={new Vector3(0, 0, 0)} end={new Vector3(2, 1, 0)} />
      <Cabel start={new Vector3(0, 0, 0)} end={new Vector3(1, 2, 0)} />

      {/* Output the angle between the two lines */}
      <div
        style={{
          position: "absolute",
          top: "10px",
          left: "10px",
          color: "white",
        }}
      >
        Angle between lines: {angle()} degrees
      </div>

      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
    </Canvas>
  );
}
