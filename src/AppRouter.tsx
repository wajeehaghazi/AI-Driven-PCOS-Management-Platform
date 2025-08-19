import { BrowserRouter, Routes, Route } from "react-router-dom";
import { App } from "./App";
import AtHomeTesting from "./pages/AtHomeTesting";
import { LandingPage } from "./pages/LandingPage";

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/at-home-testing" element={<AtHomeTesting />} />
      </Routes>
    </BrowserRouter>
  );
}