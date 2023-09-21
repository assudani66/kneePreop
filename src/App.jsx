import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useKneeCapContext } from "./store/context";
import Scene from "./components/scene";

const App = () => {
  const {
    controlsRef,
    disableOrbitControls,
    pointsList,
    pointsRef,
    updateAllLines,
    updatevalgusPlane,
    resectionRef,
    updateflexionPlane,
  } = useKneeCapContext();

  const target = [0, 0, 0];

  return (
    <div className="app-container">
      <div className="overlay">
        <ul>
          {pointsList.map((point, index) => (
            <li
              key={index}
              onClick={() => {
                console.log(
                  (pointsRef.current[index].current.visible =
                    !pointsRef.current[index].current.visible)
                );
                // setActivePoint(point);
              }}
            >
              {point.name}
            </li>
          ))}
        </ul>
        <button onClick={() => updateAllLines()}>update Line</button>
        <button
          onClick={() => {
            console.log(
              pointsRef.current.map(({ current }) => ({
                name: current.name,
                postion: [
                  current.matrix.elements[12],
                  current.matrix.elements[13],
                  current.matrix.elements[14],
                ],
              }))
            );
          }}
        >
          get points Location
        </button>
        <button
          onClick={() => {
            disableOrbitControls();
          }}
        >
          Enable OrbitControls
        </button>
        <div>
          <button onClick={() => updatevalgusPlane(1)}>+</button>
          Valgus Plane Angle
          <button onClick={() => updatevalgusPlane(-1)}>-</button>
          <button>+</button>
          Flexion Plane Angle
          <button>-</button>
        </div>

        <div>
          <button onClick={() => updateflexionPlane(1)}>+</button>
          Distal Resection
          <button onClick={() => updateflexionPlane(-1)}>-</button>
          <button
            onClick={() =>
              (resectionRef.current.opacity =
                resectionRef.current.opacity === 0 ? 1 : 0)
            }
          >
            Resection
          </button>
        </div>
      </div>
      <Canvas
        camera={{
          fov: 70,
          position: [
            38.217110931862386, 1203.9140910343544, 15.932999560802852,
          ],
          far: 100000,
          near: 0.01,
        }}
        className="canvas"
      >
        <OrbitControls target={target} ref={controlsRef} />
        <group>
          <Scene />
        </group>
      </Canvas>
    </div>
  );
};

export default App;
