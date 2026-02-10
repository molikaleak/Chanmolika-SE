import { Routes, Route, Navigate } from "react-router-dom";
import Introduction from "../pages/Introduction";
import Job from "../pages/Job";
import type { JSX } from "react";
import Skills from "../pages/Skills";
import Resume from "../pages/Resume";
import Achievements from "../pages/Achievements";

export default function AppRouter(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/profile" replace />} />
      <Route path="/profile" element={<Introduction />} />
      <Route path="/job" element={<Job />} />
      // routes.tsx or App.tsx
      <Route path="/skills" element={<Skills />} />
      <Route path="/resume" element={<Resume />} />
      <Route path="/achievements" element={<Achievements />} />
    </Routes>
  );
}
