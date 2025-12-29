import { useThree, useFrame } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import * as THREE from "three";

type Props = {
  target: THREE.Vector3 | null;
  onArrive?: () => void;
};

export default function CameraController({ target, onArrive }: Props) {
  const { camera } = useThree();
  const arrived = useRef(false);

  // 🔥 RESET arrival state when target changes
  useEffect(() => {
    arrived.current = false;
  }, [target]);

  useFrame(() => {
    // 🧭 Default overview camera
    if (!target) {
      camera.position.lerp(new THREE.Vector3(0, 12, 18), 0.05);
      camera.lookAt(0, 0, 0);
      return;
    }

    // 🎥 Focused camera position
    const desiredPosition = target.clone().add(
      new THREE.Vector3(0, 2, 4)
    );

    camera.position.lerp(desiredPosition, 0.05);
    camera.lookAt(target);

    // ✅ Fire onArrive EVERY TIME target changes
    if (
      camera.position.distanceTo(desiredPosition) < 0.1 &&
      !arrived.current
    ) {
      arrived.current = true;
      onArrive?.();
    }
  });

  return null;
}
