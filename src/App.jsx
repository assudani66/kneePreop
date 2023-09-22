import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useKneeCapContext } from "./store/context";
import { MdOutlineOpacity } from "react-icons/md";
import { RxOpacity } from "react-icons/rx";
import { BsFillCameraVideoFill } from "react-icons/bs";
import { GrRadialSelected } from "react-icons/gr";
import * as THREE from "three";
import Scene from "./components/scene";

const App = () => {
  const {
    pointsList,
    setActivePoint,
    activePoint,
    pointsRef,
    updateAllLines,
    updatevalgusPlane,
    resectionRef,
    updateflexionPlane,
    hideNames,
    setHideNames,
    updateResectionAmount,
    cameraControlsRef,
    kneeModelMaterialRef,
    updatedInfo,
  } = useKneeCapContext();

  return (
    <div className="app-container">
      <div className="centerOverlay">
        <h1>Femur Preop Planning Platform</h1>
      </div>
      <div className="leftOverlay">
        <ul>
          {pointsList.map((point, index) => (
            <li
              key={index}
              onClick={() => {
                console.log(pointsRef.current[index].current);
                setActivePoint(index);
              }}
            >
              {point.name}
              {activePoint === index && <GrRadialSelected />}
            </li>
          ))}
        </ul>
        <button onClick={() => updateAllLines()}>update Line</button>
        <button onClick={() => setHideNames(!hideNames)}>hide names</button>
      </div>
      <div className="bottomOverlay">
        <p>Knee Material Settings</p>
        <div>
          <button onClick={() => (kneeModelMaterialRef.current.opacity = 0.5)}>
            <MdOutlineOpacity />
          </button>
          <button onClick={() => (kneeModelMaterialRef.current.opacity = 1)}>
            <RxOpacity />
          </button>
        </div>
      </div>
      <div className="rightBottomOverlay">
        <button
          onClick={() => {
            cameraControlsRef.current.setPosition(
              -12.316954420396522,
              352.50088268781536,
              148.1245260847429,
              true
            );
            cameraControlsRef.current.setTarget(-13, -10, 200, true);
          }}
        >
          <BsFillCameraVideoFill />
          Top part
        </button>
        <button
          onClick={() => {
            cameraControlsRef.current.setPosition(-11, 222, -11, true);
            cameraControlsRef.current.setTarget(-12, -34, 35, true);
          }}
        >
          <BsFillCameraVideoFill />
          Middle part
        </button>
        <button
          onClick={() => {
            cameraControlsRef.current.setPosition(18, 300, -175, true);
            cameraControlsRef.current.setTarget(17, -60, -110, true);
          }}
        >
          <BsFillCameraVideoFill />
          bottom part location
        </button>
        <button
          onClick={() => {
            cameraControlsRef.current.setPosition(267, 40, -186, true);
            cameraControlsRef.current.setTarget(8.94, 31, -165, true);
          }}
        >
          <BsFillCameraVideoFill />
          Flexion Angle Location
        </button>
      </div>
      <div className="rightOverlay">
        <ul>
          <li>
            Valgus Angle
            <button onClick={() => updatevalgusPlane(1)}>+</button>
            {updatedInfo.valgusAngle}
            <button onClick={() => updatevalgusPlane(-1)}>-</button>
          </li>
          <li>
            Flexion Angle
            <button onClick={() => updateflexionPlane(1)}>+</button>
            {updatedInfo.flexionAngle}
            <button onClick={() => updateflexionPlane(-1)}>-</button>
          </li>
          <li>
            Resection
            <button onClick={() => updateResectionAmount(1)}>+</button>
            {updatedInfo.resection + 10}
            <button onClick={() => updateResectionAmount(-1)}>-</button>
          </li>
          <li>
            <button
              onClick={() =>
                (resectionRef.current.opacity =
                  resectionRef.current.opacity === 1 ? 0 : 1)
              }
            >
              Resection
            </button>
          </li>
        </ul>
      </div>
      <Canvas
        camera={{
          fov: 70,
          position: [3, 462, 23.932999560802852],
          target: [-5, -31, 50],
          far: 100000,

          near: 0.01,
        }}
        className="canvas"
      >
        {/* <OrbitControls target={target} ref={controlsRef} /> */}
        {/* <group rotation={[0, -Math.PI / 1.7, 0]}> */}
        <Scene />
        {/* </group> */}
      </Canvas>
    </div>
  );
};

export default App;
