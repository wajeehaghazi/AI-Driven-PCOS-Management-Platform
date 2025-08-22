import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { App } from "./App";
import { LandingPage } from "./pages/LandingPage";
import  {SampleCollectionPage}  from "./pages/BookAppointment";

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/book-appointment" element={<SampleCollectionPage />} />
      </Routes>
    </BrowserRouter>
  );
}