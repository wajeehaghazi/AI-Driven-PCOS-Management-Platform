import React, { useEffect, useState } from 'react';
import { MenuIcon, XIcon } from 'lucide-react';
export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  // Add scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return <header className={`sticky top-0 z-10 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-md' : 'bg-white shadow-sm'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="flex items-center">
                <div className="bg-gradient-to-r from-teal-500 to-blue-500 rounded-lg w-8 h-8 flex items-center justify-center mr-2 shadow-md">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-600 font-bold text-xl">
                  PCOS Companion
                </span>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              <a href="#features" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-teal-600 transition-colors">
                Features
              </a>
              <a href="#analysis" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-teal-600 transition-colors">
                Ultrasound Analysis
              </a>
              <a href="#assessment" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-teal-600 transition-colors">
                Symptom Assessment
              </a>
              <a href="#treatment" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-teal-600 transition-colors">
                Treatment Plans
              </a>
              <button className="ml-4 px-5 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-teal-500 to-blue-500 rounded-lg hover:from-teal-600 hover:to-blue-600 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                Sign In
              </button>
            </div>
          </div>
          <div className="md:hidden">
            <button onClick={toggleMenu} className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none" aria-expanded="false">
              {isMenuOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
            </button>
          </div>
        </div>
      </div>
      {isMenuOpen && <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gradient-to-b from-white to-gray-50">
            <a href="#features" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-teal-600 hover:bg-gray-100 rounded-md transition-colors">
              Features
            </a>
            <a href="#analysis" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-teal-600 hover:bg-gray-100 rounded-md transition-colors">
              Ultrasound Analysis
            </a>
            <a href="#assessment" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-teal-600 hover:bg-gray-100 rounded-md transition-colors">
              Symptom Assessment
            </a>
            <a href="#treatment" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-teal-600 hover:bg-gray-100 rounded-md transition-colors">
              Treatment Plans
            </a>
            <button className="mt-3 w-full px-5 py-3 text-base font-medium text-white bg-gradient-to-r from-teal-500 to-blue-500 rounded-lg hover:from-teal-600 hover:to-blue-600 transition-all duration-300 shadow-md">
              Sign In
            </button>
          </div>
        </div>}
    </header>;
}