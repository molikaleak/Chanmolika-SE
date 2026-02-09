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
=============================== */
function MapModel() {
  const { scene } = useGLTF("/map.glb");
  return <primitive object={scene} scale={1} />;
}

/* ================================
   MAIN MAP SCENE
=============================== */
export default function MapScene(): JSX.Element {
  const [focusTarget, setFocusTarget] = useState<THREE.Vector3 | null>(null);
  const [selectedJob, setSelectedJob] =
    useState<(typeof jobLocations)[number] | null>(null);
  const [activeExperience, setActiveExperience] =
    useState<(typeof jobLocations)[number] | null>(null);

  // 🔥 NEW: view-all index
  const [viewIndex, setViewIndex] = useState<number | null>(null);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* ================= VIEW ALL BUTTON ================= */}
      <button
        onClick={() => {
          setViewIndex(0);
          setSelectedJob(jobLocations[0]);
          setActiveExperience(jobLocations[0]);
          setFocusTarget(new THREE.Vector3(...jobLocations[0].position));
        }}
        className="absolute top-6 right-6 z-50 px-4 py-2
                   bg-white text-black font-bold rounded-md
                   shadow hover:scale-105 transition"
      >
        VIEW ALL
      </button>

      {/* ================= POPUP ================= */}
      {activeExperience && (
        <>
          <ExperiencePopup
            experience={activeExperience}
            onBack={() => {
              setActiveExperience(null);
              setSelectedJob(null);
              setFocusTarget(null);
              setViewIndex(null);
            }}
          />

          {/* 🔁 NEXT / PREV (ONLY IN VIEW ALL MODE) */}
          {viewIndex !== null && (
            <div className="absolute bottom-6 right-6 z-50 flex gap-2">
              <button
                disabled={viewIndex === 0}
                onClick={() => {
                  const prev = viewIndex - 1;
                  setViewIndex(prev);
                  setSelectedJob(jobLocations[prev]);
                  setActiveExperience(jobLocations[prev]);
                  setFocusTarget(
                    new THREE.Vector3(...jobLocations[prev].position)
                  );
                }}
                className="px-4 py-2 bg-black/80 text-white rounded
                           disabled:opacity-40"
              >
                ◀ Prev
              </button>

              <button
                disabled={viewIndex === jobLocations.length - 1}
                onClick={() => {
                  const next = viewIndex + 1;
                  setViewIndex(next);
                  setSelectedJob(jobLocations[next]);
                  setActiveExperience(jobLocations[next]);
                  setFocusTarget(
                    new THREE.Vector3(...jobLocations[next].position)
                  );
                }}
                className="px-4 py-2 bg-black/80 text-white rounded
                           disabled:opacity-40"
              >
                Next ▶
              </button>
            </div>
          )}
        </>
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
            if (selectedJob && viewIndex === null) {
              setActiveExperience(selectedJob);
            }
          }}
        />

        {/* 📍 MARKERS */}
        {jobLocations.map((job, index) => (
          <LocationMarker
            key={job.id}
            position={job.position}
            index={index + 1}
            isActive={selectedJob?.id === job.id}
            onClick={() => {
              setSelectedJob(job);
              setActiveExperience(null);
              setViewIndex(null); // exit view-all mode
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
