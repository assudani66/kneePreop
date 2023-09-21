import { useLoader } from "@react-three/fiber";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
import { useKneeCapContext } from "../store/context";
import * as THREE from "three";

export default function BoneModel() {
  const { KneeModelRef, distalResectionPlaneRef, rayOrigin } =
    useKneeCapContext();
  const geom = useLoader(STLLoader, "./models/Right_Femur.stl");
  return (
    <>
      <mesh geometry={geom} name="bone" ref={KneeModelRef}>
        <meshPhysicalMaterial opacity={0.7} transparent />
      </mesh>
    </>
  );
}
