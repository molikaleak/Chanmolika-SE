import AppLayout from "./AppLayout";
import MapScene from "../components/map/MapScene";

export default function Job() {
  return (
    <AppLayout variant="overlay">
      <div className="relative w-screen h-screen overflow-hidden">
        <MapScene />

        {/* HUD */}
        <div className="pointer-events-none absolute top-6 left-6 z-20 text-white">
          <h1 className="text-2xl font-bold">Career Journey</h1>
          <p className="text-sm opacity-80">
            Click locations to explore my experience
          </p>
        </div>
      </div>
    </AppLayout>
  );
}
