import { useLoader } from "@react-three/fiber";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
import { useKneeCapContext } from "../store/context";
import * as THREE from "three";

export default function BoneModel() {
  const {
    KneeModelRef,
    distalResectionPlaneRef,
    rayOrigin,
    kneeModelMaterialRef,
  } = useKneeCapContext();
  const geom = useLoader(STLLoader, "./models/Right_Femur.stl");
  return (
    <>
      <mesh geometry={geom} name="bone" ref={KneeModelRef}>
        <meshPhysicalMaterial
          ref={kneeModelMaterialRef}
          color={"#E966A0"}
          opacity={0.5}
          depthTest={true}
          transparent
        />
      </mesh>
    </>
  );
}
