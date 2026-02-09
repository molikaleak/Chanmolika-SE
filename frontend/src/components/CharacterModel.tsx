import { useEffect } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import * as THREE from "three";

export default function CharacterModel() {
  const { scene, animations } = useGLTF("/aqua__anime_chibi_model.glb");
  const { actions } = useAnimations(animations, scene);

  useEffect(() => {
    if (!actions) return;

    const action = Object.values(actions).find(
      (a): a is THREE.AnimationAction => a !== undefined
    );

    action?.reset().fadeIn(0.4).play();

    return () => {
      action?.fadeOut(0.3);
    };
  }, [actions]);

  return (
    <primitive
  object={scene}
  scale={1.3}
  position={[0, -1, 0]} 
  rotation={[0, Math.PI / 12, 0]}
/>

  );
}

useGLTF.preload("/aqua__anime_chibi_model.glb");
