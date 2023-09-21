import { Suspense, useEffect, useRef } from "react";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import {
  Line,
  PivotControls,
  Points,
  Point,
  Environment,
  Plane,
  Box,
  Html,
  PointMaterial,
} from "@react-three/drei";
import { useKneeCapContext } from "../store/context";
import { lineList, pointsListData } from "../store/pointandLineList";
import BoneModel from "./boneModel";
import { MeshBasicMaterial, Vector3 } from "three";
import DerivedLines from "./derivedLines";
import DerivedPlanes from "./derivedPlanes";
import Shape from "./sgc";
import { Model } from "./testModle";

const pointPosition = [0, 0, 0];
const point2Position = [0, 0, 0];

const Scene = () => {
  const {
    boxRef,
    lineRef,
    rayRef,
    valgusPlaneRef,
    disableOrbitControls,
    pointsRef,
    linesRef,
    pointsList,
    KneeModelRef,
    updateAllLines,
    rayDirection,
    rayOrigin,
  } = useKneeCapContext();

  const scene = useThree((state) => state);

  const { raycaster } = useThree();

  useEffect(() => {
    console.log(scene.camera);
    if (raycaster.params.Points) {
      raycaster.params.Points.threshold = 0.1;
    }
  }, []);

  return (
    <>
      <DerivedLines />
      <DerivedPlanes />

      {/* <Box position={[1.23, 0, 0]} ref={boxRef} name="box"></Box> */}

      <Points>
        {pointsListData.map((point, index) => {
          const pointRef = useRef();
          useEffect(() => {
            if (!pointsRef.current.includes(pointRef)) {
              pointsRef.current.push(pointRef);
            }
          }, []);
          return (
            <PivotControls
              key={index}
              name={`${point.name}`}
              scale={5}
              visible={false}
              ref={pointRef}
              onDragStart={() => disableOrbitControls()}
              onDragEnd={() => disableOrbitControls()}
              object={boxRef}
              depthTest={false}
              offset={point.location}
            >
              <Html position={point.location} center>
                {point.name}
              </Html>
              <PointMaterial scale={15} depthWrite={false} color="red" />
              <Point
                position={point.location}
                ref={boxRef}
                color="red"
                scale={10}
              />
            </PivotControls>
          );
        })}
      </Points>
      {lineList.map((line) => {
        const linRef = useRef();
        useEffect(() => {
          if (linesRef && !linesRef.current.includes(linRef)) {
            linesRef.current.push(linRef);
          }
        }, []);
        return (
          <Line
            ref={linRef}
            name={line.name}
            depthTest={false}
            points={[pointPosition, point2Position]}
            color={line.color}
            lineWidth={3}
          />
        );
      })}

      <Suspense>
        <BoneModel />
      </Suspense>
      {/* <Shape /> */}
      {/* <Model /> */}
      {/* <Box ref={valgusPlaneRef} args={[1, 1, 1]} /> */}
      <Environment preset="studio" />
      <ambientLight />
    </>
  );
};

export default Scene;
