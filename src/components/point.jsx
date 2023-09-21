import { Point, Points } from "@react-three/drei";

const Landmark = () => {
  return (
    <Points>
      <Point position={[0, 0, 0]} color="lightblue" />
    </Points>
  );
};

export default Landmark;
