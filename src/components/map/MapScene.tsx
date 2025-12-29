import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { useState, type JSX } from "react";
import * as THREE from "three";

import LocationMarker from "./LocationMarker";
import CameraController from "./CameraController";
import ExperiencePopup from "./ExperiencePopup";
import { jobLocations } from "../../data/jobLocations";

/* ================================
   3D MAP MODEL
================================ */
function MapModel() {
  const { scene } = useGLTF("/map.glb");
  return <primitive object={scene} scale={1} />;
}

/* ================================
   MAIN MAP SCENE
================================ */
export default function MapScene(): JSX.Element {
  const [focusTarget, setFocusTarget] = useState<THREE.Vector3 | null>(null);
  const [selectedJob, setSelectedJob] =
    useState<(typeof jobLocations)[number] | null>(null);
  const [activeExperience, setActiveExperience] =
    useState<(typeof jobLocations)[number] | null>(null);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* ================= POPUP ================= */}
{activeExperience && (
  <ExperiencePopup
    experience={activeExperience}
    onBack={() => {
      setActiveExperience(null);
      setSelectedJob(null);
      setFocusTarget(null);
    }}
  />
)}


      <Canvas camera={{ position: [0, 12, 18], fov: 45 }}>
        {/* LIGHT */}
        <ambientLight intensity={1} />
        <directionalLight position={[5, 8, 5]} intensity={1.2} />

        {/* MAP */}
        <MapModel />

        {/* 🎥 CAMERA */}
        <CameraController
          target={focusTarget}
          onArrive={() => {
            if (selectedJob) {
              setActiveExperience(selectedJob);
            }
          }}
        />

{jobLocations.map((job, index) => (
  <LocationMarker
    key={job.id}
    position={job.position}
    index={index + 1}
    isActive={selectedJob?.id === job.id}   // ✅ controls fade
    onClick={() => {
      setSelectedJob(job);
      setFocusTarget(new THREE.Vector3(...job.position));
    }}
  />
))}



        {/* CONTROLS */}
        <OrbitControls
          enablePan={false}
          enableRotate={!activeExperience}
          enableZoom={!activeExperience}
        />
      </Canvas>
    </div>
  );
}

useGLTF.preload("/map.glb");
