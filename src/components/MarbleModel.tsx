import { Canvas } from "@react-three/fiber";
import { OrbitControls, useTexture } from "@react-three/drei";

const MarbleMesh = () => {
  // ✅ LOAD TEXTURE HERE
  const texture = useTexture("/textures/marble.jpg");

  return (
    <mesh rotation={[0.3, 0.5, 0]}>
      <boxGeometry args={[2, 1, 0.4]} />

      {/* ✅ APPLY TEXTURE HERE */}
      <meshStandardMaterial
        map={texture}
        roughness={0.5}
        metalness={0.1}
      />
    </mesh>
  );
};

const MarbleModel = () => {
  return (
    <Canvas camera={{ position: [0, 0, 4] }}>
      <ambientLight intensity={0.8} />
      <directionalLight position={[2, 2, 5]} intensity={1} />

      <MarbleMesh />

      <OrbitControls enableZoom={false} />
    </Canvas>
  );
};

export default MarbleModel;