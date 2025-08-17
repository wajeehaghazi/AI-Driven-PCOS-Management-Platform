import React from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { LandingPage } from './pages/LandingPage';
export function App() {
  return <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Header />
      <main className="flex-grow">
        <LandingPage />
      </main>
      <Footer />
    </div>;
}