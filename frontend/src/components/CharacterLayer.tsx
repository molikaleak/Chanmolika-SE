import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import CharacterModel from "./CharacterModel";

export default function CharacterLayer() {
  return (
    <div
      className="
        absolute
        right-[-20px] bottom-[-20px]
        sm:right-[-40px] sm:bottom-[-40px]
        md:right-[-60px] md:bottom-[-60px]

        w-[260px] h-[320px]
        sm:w-[340px] sm:h-[420px]
        md:w-[420px] md:h-[520px]

        z-30
        pointer-events-none
      "
    >
      <Canvas camera={{ position: [0, 5.5, 5], fov: 62 }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 7, 5]} intensity={1.2} />

        <CharacterModel />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 2.4}
          maxPolarAngle={Math.PI / 2}
        />

        <Environment preset="studio" />
      </Canvas>
    </div>
  );
}
