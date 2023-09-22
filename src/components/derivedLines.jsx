import React, { useEffect, useRef } from "react";
import { useKneeCapContext } from "../store/context";
import { useThree } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import * as THREE from "three";

const LineCaster = ({ position1, position2 }) => {
  const rayRef = useRef();
  const rayOrigin = new THREE.Vector3(position1[0], position1[1], position1[2]);

  return (
    <>
      <Line
        name={"Lateral Epicondyle"}
        depthTest={false}
        points={[position1, position2]}
        color={"blue"}
        lineWidth={3}
      />
      <raycaster ref={rayRef} />
    </>
  );
};

const DerivedLines = () => {
  const { rayRef, rayDirection, rayOrigin } = useKneeCapContext();

  const { raycaster } = useThree();

  useEffect(() => {
    if (raycaster.params.Points) {
      raycaster.params.Points.threshold = 0.1;
    }
  }, []);

  return (
    <>
      <Line
        points={[rayOrigin, rayOrigin.add(rayDirection)]}
        color={"green"}
        lineWidth={3}
      ></Line>
      <raycaster ref={rayRef}></raycaster>
      <LineCaster position1={[0, 0, 1]} position2={[0, 0, 0]} />
    </>
  );
};

export default DerivedLines;
