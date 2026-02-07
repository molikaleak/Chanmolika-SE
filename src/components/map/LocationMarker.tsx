import { Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

type Props = {
  position: [number, number, number];
  onClick: () => void;
  index: number;
  isActive: boolean;        // ✅ NEW
  scale?: number;
};

export default function LocationMarker({
  position,
  onClick,
  index,
  isActive,
  scale = 0.25,
}: Props) {
  const ref = useRef<THREE.Group>(null!);

  // Floating animation
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    ref.current.position.y = position[1] + Math.sin(t * 2) * 0.05;
    ref.current.rotation.y += 0.01;
  });

  return (
    <group ref={ref} position={position} scale={scale} onClick={onClick}>
      {/* 3D Marker - fallback sphere */}
      <mesh>
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshStandardMaterial color="cyan" emissive="cyan" emissiveIntensity={0.2} />
      </mesh>

      {/* 🔢 NUMBER LABEL */}
      <Html
        position={[0, 1.2, 0]}
        center
        distanceFactor={10}
        style={{ pointerEvents: "none" }}
      >
        <div
          className={`
            w-7 h-7
            rounded-full
            bg-black/80
            border border-cyan-400
            text-cyan-400
            flex items-center justify-center
            text-xs font-bold
            shadow-[0_0_12px_rgba(0, 255, 255)]
            
            transition-all duration-300 ease-out
            ${isActive ? "opacity-0 scale-75" : "opacity-100 scale-100"}
          `}
        >
          {index}
        </div>
      </Html>
    </group>
  );
}

// Preload removed because location_01.glb is missing
