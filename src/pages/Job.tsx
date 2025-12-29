import type { JSX } from "react";
import MapScene from "../components/map/MapScene";

export default function Job(): JSX.Element {
  return (
    <div className="w-full h-screen bg-black relative">
      {/* Optional title overlay */}
      <div className="absolute top-6 left-6 z-10 text-white">
        <h1 className="text-2xl font-bold">Career Journey</h1>
        <p className="text-sm opacity-80">
          Click locations to explore my experience
        </p>
      </div>

      {/* 3D Map */}
      <MapScene />
    </div>
  );
}
