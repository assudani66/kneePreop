import { Suspense, useEffect, useRef } from "react";
import { useThree } from "@react-three/fiber";
import {
  Line,
  PivotControls,
  Points,
  Point,
  Environment,
  Html,
  PointMaterial,
  CameraControls,
} from "@react-three/drei";
import { useKneeCapContext } from "../store/context";
import { lineList, pointsListData } from "../store/pointandLineList";
import BoneModel from "./boneModel";
import DerivedLines from "./derivedLines";
import DerivedPlanes from "./derivedPlanes";

const pointPosition = [0, 0, 0];
const point2Position = [0, 0, 0];

const Scene = () => {
  const {
    boxRef,
    disableOrbitControls,
    pointsRef,
    linesRef,
    activePoint,
    cameraControlsRef,
    hideNames,
  } = useKneeCapContext();

  const { raycaster } = useThree();

  useEffect(() => {
    if (raycaster.params.Points) {
      raycaster.params.Points.threshold = 0.1;
    }
  }, []);

  return (
    <>
      <DerivedLines />
      <DerivedPlanes />
      <CameraControls ref={cameraControlsRef} />
      {pointsListData.map((point, index) => {
        const pointRef = useRef();
        useEffect(() => {
          if (!pointsRef.current.includes(pointRef)) {
            pointsRef.current.push(pointRef);
          }
        }, [activePoint, hideNames]);

        return (
          <PivotControls
            key={index}
            name={`${point.name}`}
            scale={5}
            visible={activePoint === index ? true : false}
            ref={pointRef}
            onDragStart={() => disableOrbitControls()}
            onDragEnd={() => disableOrbitControls()}
            object={boxRef}
            depthTest={false}
            offset={point.location}
          >
            {hideNames && (
              <Html position={point.location} center>
                {
                  <div
                    style={{
                      backgroundColor: "white",
                      padding: "10px",
                      opacity: "0.5",
                      borderRadius: "10px",
                    }}
                  >
                    {point.name}
                  </div>
                }
              </Html>
            )}
            <mesh position={point.location} depthTest={false}>
              <sphereGeometry args={[2, 16, 16]} />
              <meshBasicMaterial color={"red"} depthTest={false} />
            </mesh>
          </PivotControls>
        );
      })}

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
      <Environment preset="studio" />
      <ambientLight />
    </>
  );
};

export default Scene;
