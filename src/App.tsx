import { BrowserRouter } from "react-router-dom";
import AppRouter from "./routes/AppRouter";
import type { JSX } from "react";

export default function App(): JSX.Element {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
}
