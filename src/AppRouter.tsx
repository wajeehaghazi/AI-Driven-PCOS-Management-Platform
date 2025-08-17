import { BrowserRouter, Routes, Route } from "react-router-dom";
import { App } from "./App";
import Chat from "./components/Chat";

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  );
}