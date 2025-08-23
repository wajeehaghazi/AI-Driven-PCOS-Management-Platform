import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { App } from "./App";
import { LandingPage } from "./pages/LandingPage";
import  {SampleCollectionPage}  from "./pages/SampleCollection";
import BookAppointment from "./pages/Appiontment";

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/sample-collection" element={<SampleCollectionPage />} />
        <Route path="/book-appointment" element={<BookAppointment />} />

      </Routes>
    </BrowserRouter>
  );
}