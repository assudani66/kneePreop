/* eslint-disable react/prop-types */
import { createContext, useContext, useRef, useState } from "react";
import { lineList, pointsListData } from "./pointandLineList";
import * as THREE from "three";
export const kneeCapContext = createContext();

export const KneeCapCotextProvider = ({ children }) => {
  const boxRef = useRef();
  const box2Ref = useRef();
  const lineRef = useRef();
  const pointRef = useRef();
  const valgusPlaneRef = useRef();
  const flexionPlaneRef = useRef();
  const distalMedicalPlaneRef = useRef();
  const distalResectionPlaneRef = useRef();
  const controlsRef = useRef();
  const rayRef = useRef();
  const resectionRef = useRef();
  const resectionBoxRef = useRef();
  const KneeModelRef = useRef();
  const cameraControlsRef = useRef();
  const kneeModelMaterialRef = useRef();
  const pointsRef = useRef([]);
  const linesRef = useRef([]);
  const [hideNames, setHideNames] = useState(false);
  const [updatedInfo, setUpdatedInfo] = useState({
    valgusAngle: 0,
    flexionAngle: 0,
    resection: 0,
  });

  pointsRef.current = [];

  const [activePoint, setActivePoint] = useState(1);
  const [isResectionVisible, setIsResectionVisible] = useState(false);
  const [pointsList, setPointsList] = useState(pointsListData);
  const getAbsolutePostion = (element) => {
    if (typeof element === "string") {
      const elementBasePosition = pointsListData.find(
        ({ name }) => name === element
      );
      const elementPosX = elementBasePosition.location[0];
      const elementPosY = elementBasePosition.location[1];
      const elementPosZ = elementBasePosition.location[2];

      return [elementPosX, elementPosY, elementPosZ];
    }

    const elementInfo = element.current.matrix.elements;
    const elementBasePosition = pointsListData.find(
      ({ name }) => name === element.current.name
    );
    const elementPosX = elementInfo[12] + elementBasePosition.location[0];
    const elementPosY = elementInfo[13] + elementBasePosition.location[1];
    const elementPosZ = elementInfo[14] + elementBasePosition.location[2];

    return [elementPosX, elementPosY, elementPosZ];
  };

  const distalMedicalPlaneLocation = getAbsolutePostion("Distal Medical Pt");
  const rayOriginPosition = getAbsolutePostion("Femur Center");

  const rayOrigin = new THREE.Vector3(
    rayOriginPosition[0],
    rayOriginPosition[1],
    rayOriginPosition[2]
  );
  let rayDirection = new THREE.Vector3(1, 0, 0);

  const disableOrbitControls = () => {
    cameraControlsRef.current.enabled = !cameraControlsRef.current.enabled;
  };

  const updateflexionPlane = (amount) => {
    const rotation = flexionPlaneRef.current.rotation.y;
    setUpdatedInfo({
      ...updatedInfo,
      flexionAngle: amount + updatedInfo.flexionAngle,
    });
    amount = amount * (Math.PI / 180);
    const radians = rotation + amount;
    flexionPlaneRef.current.rotation.set(0, radians, 0);
    distalMedicalPlaneRef.current.rotation.set(0, radians, 0);
  };

  const updatevalgusPlane = (amount) => {
    const rotation = valgusPlaneRef.current.rotation.x;
    setUpdatedInfo({
      ...updatedInfo,
      valgusAngle: amount + updatedInfo.valgusAngle,
    });
    amount = amount * (Math.PI / 180);
    const radians = rotation + amount;

    valgusPlaneRef.current.rotation.set(radians, 0, 0);
  };

  const updateResectionAmount = (amount) => {
    const scale = distalMedicalPlaneRef.current.scale.z;
    setUpdatedInfo({
      ...updatedInfo,
      resection: amount + updatedInfo.resection,
    });
    amount = scale + amount;
    distalMedicalPlaneRef.current.scale.set(150, 150, amount);
  };

  const updateAllLines = () => {
    rayRef.current.set(rayOrigin, rayDirection);
    // const rayIntersect = rayRef.current.intersectObject(KneeModelRef.current);
    // console.log(rayIntersect);
    // console.log(valgusPlaneRef.current);
    const viewingPosition = getAbsolutePostion(pointsRef.current[1]);

    const viewingVector = new THREE.Vector3(
      viewingPosition[0],
      viewingPosition[1],
      viewingPosition[2]
    );

    valgusPlaneRef.current.lookAt(viewingVector);

    for (let i = 0; i < lineList.length; i++) {
      const start = pointsRef.current[lineList[i].start];
      const end = pointsRef.current[lineList[i].end];
      const line = linesRef.current[i];

      updateLinePoints(start, end, line);
    }
  };

  const updateLinePoints = (start, end, line) => {
    const startInfo = start.current.matrix.elements;
    const endInfo = end.current.matrix.elements;

    const startBasePosition = pointsListData.find(
      ({ name }) => name === start.current.name
    );

    const endBasePosition = pointsListData.find(
      ({ name }) => name === end.current.name
    );

    const absoulteStartX = startInfo[12] + startBasePosition.location[0];
    const absoulteStartY = startInfo[13] + startBasePosition.location[1];
    const absoulteStartZ = startInfo[14] + startBasePosition.location[2];

    const absoulteEndX = endInfo[12] + endBasePosition.location[0];
    const absoulteEndY = endInfo[13] + endBasePosition.location[1];
    const absoulteEndZ = endInfo[14] + endBasePosition.location[2];

    const updatedPositions = new Float32Array([
      absoulteStartX,
      absoulteStartY,
      absoulteStartZ,
      absoulteEndX,
      absoulteEndY,
      absoulteEndZ,
    ]);

    const positionAttribute =
      line.current.geometry.attributes.instanceStart.data;
    positionAttribute.array = updatedPositions;
    positionAttribute.needsUpdate = true;
  };

  return (
    <kneeCapContext.Provider
      value={{
        boxRef,
        box2Ref,
        lineRef,
        pointRef,
        controlsRef,
        updateLinePoints,
        disableOrbitControls,
        activePoint,
        valgusPlaneRef,
        flexionPlaneRef,
        distalMedicalPlaneRef,
        distalResectionPlaneRef,
        setActivePoint,
        pointsRef,
        linesRef,
        pointsList,
        updateAllLines,
        rayRef,
        KneeModelRef,
        rayOrigin,
        rayDirection,
        distalMedicalPlaneLocation,
        isResectionVisible,
        setIsResectionVisible,
        resectionRef,
        resectionBoxRef,
        updatevalgusPlane,
        updateflexionPlane,
        updateResectionAmount,
        cameraControlsRef,
        hideNames,
        setHideNames,
        kneeModelMaterialRef,
        updatedInfo,
        setUpdatedInfo,
      }}
    >
      {children}
    </kneeCapContext.Provider>
  );
};

export const useKneeCapContext = () => useContext(kneeCapContext);
