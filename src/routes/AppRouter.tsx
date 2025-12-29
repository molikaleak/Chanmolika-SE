import { Routes, Route, Navigate } from "react-router-dom";
import Introduction from "../pages/Introduction";
import Job from "../pages/Job";
import type { JSX } from "react";

export default function AppRouter(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/profile" replace />} />
      <Route path="/profile" element={<Introduction />} />
      <Route path="/job" element={<Job />} />
    </Routes>
  );
}
