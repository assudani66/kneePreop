import { useEffect, useRef } from "react";
import { PivotControls, useGLTF } from "@react-three/drei";
import {
  Geometry,
  Base,
  Addition,
  Subtraction,
  Intersection,
  Difference,
} from "@react-three/csg";
import { useLoader } from "@react-three/fiber";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
import { BackSide, Matrix4 } from "three";
import * as THREE from "three";
export default function Shape() {
  const csg = useRef();
  const invisibleRef = useRef();
  //   const geom = useLoader(STLLoader, "./models/Right_Femur.stl");
  const { nodes } = useGLTF("./models/bunny-transformed.glb");
  //   const { nodes } = useGLTF("./models/kneeModel.glb");
  //   const { nodes, materials } = useGLTF("./models/test_model.glb");
  //   console.log(geom);
  //   console.log(nodes.Right_Femur.geometry);
  //   useEffect(() => {
  //     invisibleRef.current.applyMatrix4(new Matrix4().makeScale(-1, 1, 1));
  //     console.log();
  //   }, []);
  useEffect(() => {
    console.log(csg);
    csg.current.update();
  }, []);
  return (
    <mesh>
      <Geometry ref={csg}>
        {/* <Base geometry={nodes.Right_Femur.geometry} /> */}
        <Base scale={[1, 1, 1]} geometry={nodes.bunny.geometry} />
        {/* <Base
          geometry={nodes.Cube001.geometry}
          material={materials.Material}
          position={[0, 0, 1.011]}
          scale={[0.345, 0.345, 0.023]}
        /> */}
        {/* </Base> */}
        <PivotControls
          lineWidth={3}
          scale={10}
          onDrag={() => {
            csg.current.update();
          }}
        >
          <Subtraction position={[-1, 1, 1]}>
            <sphereGeometry args={[0.4, 8, 8]} />
            <meshStandardMaterial color="orange" />
          </Subtraction>
        </PivotControls>
      </Geometry>
      <meshPhysicalMaterial color={"hotPink"} />
    </mesh>
  );
}
