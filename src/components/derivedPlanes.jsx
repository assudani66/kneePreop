import React, { useEffect } from "react";
import { useKneeCapContext } from "../store/context";
import * as THREE from "three";
import { useThree } from "@react-three/fiber";
import { Line, PivotControls } from "@react-three/drei";

const DerivedPlanes = () => {
  const {
    valgusPlaneRef,
    flexionPlaneRef,
    distalMedicalPlaneRef,
    distalResectionPlaneRef,
    distalMedicalPlaneLocation,
    disableOrbitControls,
    rayOrigin,
    isResectionVisible,
    resectionRef,
  } = useKneeCapContext();
  return (
    <>
      <PivotControls
        onDragStart={() => disableOrbitControls()}
        onDragEnd={() => disableOrbitControls()}
        offset={rayOrigin}
      >
        <mesh
          ref={valgusPlaneRef}
          name="Perpendicular Plane"
          position={rayOrigin}
          scale={120}
        >
          <planeGeometry />
          <meshStandardMaterial
            side={THREE.DoubleSide}
            transparent
            depthTest={false}
            opacity={0.1}
            wireframe={true}
            color={"red"}
            wireframeLinewidth={10}
          />
        </mesh>
      </PivotControls>
      <mesh
        ref={flexionPlaneRef}
        name="Perpendicular Plane"
        position={rayOrigin}
        scale={120}
      >
        <planeGeometry />
        <meshBasicMaterial
          side={THREE.DoubleSide}
          opacity={0.1}
          wireframe={true}
          color={"blue"}
        />
      </mesh>
      <mesh
        ref={distalMedicalPlaneRef}
        name="Distal Plane"
        rotation={[0, 0, 0]}
        position={distalMedicalPlaneLocation}
        scale={[150, 150, 10]}
      >
        <boxGeometry />
        <meshBasicMaterial
          ref={resectionRef}
          color={"#000000"}
          opacity={1}
          side={THREE.DoubleSide}
          transparent
        />
      </mesh>
    </>
  );
};

export default DerivedPlanes;
