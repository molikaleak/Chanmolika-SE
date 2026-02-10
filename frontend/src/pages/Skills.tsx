import type { JSX } from "react";
import AppLayout from "./AppLayout";
import VisualNovel from "../components/VisualNovel";

export default function Skills(): JSX.Element {
  return (
    <AppLayout variant="overlay">
      <div className="relative w-full h-screen bg-black overflow-hidden">
        {/* 🧠 UI OVERLAY */}
        <div className="relative z-10 w-full h-full pointer-events-auto">
          {/* Title */}
          <div className="absolute top-6 left-6 text-white">
            <h1 className="text-2xl font-bold">Awakening</h1>
            <p className="text-sm opacity-80">
              Tap to continue the story
            </p>
          </div>

          {/* Visual Novel */}
          <VisualNovel />
        </div>
      </div>
    </AppLayout>
  );
}