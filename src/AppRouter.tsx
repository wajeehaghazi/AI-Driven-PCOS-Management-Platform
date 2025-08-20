import { BrowserRouter, Routes, Route } from "react-router-dom";
import { App } from "./App";
import { LandingPage } from "./pages/LandingPage";

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </BrowserRouter>
  );
}