import React from 'react';
import { UltrasoundAnalysis } from '../components/UltrasoundAnalysis';
import { SymptomAssessment } from '../components/SymptomAssessment';
import { ChevronDownIcon, ActivityIcon, BrainIcon, HeartIcon, LineChartIcon, BookOpenIcon, SparklesIcon, ShieldIcon } from 'lucide-react';
export function LandingPage() {
  return <div className="w-full">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-teal-600 via-blue-500 to-cyan-600 text-white py-24">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?ixlib=rb-4.0.3&auto=format&fit=crop&q=80')] opacity-10 bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-teal-600/90 via-blue-500/80 to-cyan-600/90"></div>
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute top-[10%] left-[5%] w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-[20%] right-[10%] w-80 h-80 bg-blue-300/10 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
                <SparklesIcon size={16} className="mr-2" /> Powered by Advanced
                AI Technology
              </div>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight tracking-tight">
                AI-Powered PCOS <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100">
                  Management & Support
                </span>
              </h1>
              <p className="text-xl md:text-2xl leading-relaxed text-blue-50">
                Revolutionary healthcare companion providing personalized PCOS
                assessment, monitoring, and treatment recommendations.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <button className="px-8 py-4 bg-white text-teal-600 rounded-xl font-medium hover:bg-blue-50 hover:scale-105 transition-all duration-300 shadow-lg shadow-teal-700/20">
                  Get Started
                </button>
                <button className="px-8 py-4 bg-transparent border-2 border-white rounded-xl font-medium hover:bg-white/10 hover:scale-105 transition-all duration-300">
                  Learn More
                </button>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="relative">
                <div className="absolute -inset-4 bg-white/20 rounded-2xl blur-md"></div>
                <img src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=500&q=80" alt="Healthcare professional with patient" className="relative rounded-2xl shadow-2xl transform hover:scale-[1.02] transition-all duration-500 z-10" />
                <div className="absolute -bottom-6 -right-6 bg-gradient-to-br from-teal-400 to-blue-500 p-4 rounded-xl shadow-xl z-20">
                  <ShieldIcon size={32} className="text-white" />
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-16">
            <a href="#features" className="animate-bounce bg-white/30 backdrop-blur-sm rounded-full p-3 hover:bg-white/40 transition-all duration-300">
              <ChevronDownIcon size={24} />
            </a>
          </div>
        </div>
      </section>
      {/* Features Overview Section */}
      <section id="features" className="py-24 bg-gradient-to-b from-white to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-4 py-2 bg-teal-100 rounded-full text-sm font-medium text-teal-800 mb-4">
              Core Features
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Cutting-Edge Technology{' '}
              <span className="text-teal-600">for PCOS Management</span>
            </h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform combines advanced AI technology with medical
              expertise to provide comprehensive PCOS management.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-teal-100 group">
              <div className="bg-gradient-to-r from-teal-500 to-blue-500 rounded-2xl w-16 h-16 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <ActivityIcon size={28} className="text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4 group-hover:text-teal-600 transition-colors duration-300">
                AI-Powered Ultrasound Analysis
              </h3>
              <p className="text-gray-600 mb-6">
                Upload ovarian ultrasound images for instant AI analysis using
                computer vision models to identify cyst patterns and get
                preliminary PCOS indicators within seconds.
              </p>
              <a href="#analysis" className="inline-flex items-center font-medium text-teal-600 hover:text-teal-800 transition-colors">
                Learn more
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
            {/* Feature 2 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-teal-100 group">
              <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl w-16 h-16 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <BrainIcon size={28} className="text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                Intelligent Symptom Assessment
              </h3>
              <p className="text-gray-600 mb-6">
                Multi-modal input processing with contextual questioning that
                adapts based on your responses, providing risk stratification
                with confidence scores.
              </p>
              <a href="#assessment" className="inline-flex items-center font-medium text-blue-600 hover:text-blue-800 transition-colors">
                Learn more
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
            {/* Feature 3 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-teal-100 group">
              <div className="bg-gradient-to-r from-blue-500 to-teal-500 rounded-2xl w-16 h-16 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <HeartIcon size={28} className="text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                Personalized Treatment Planning
              </h3>
              <p className="text-gray-600 mb-6">
                Receive tailored lifestyle recommendations, medication guidance,
                and SMART goals adapted to your individual circumstances.
              </p>
              <a href="#treatment" className="inline-flex items-center font-medium text-blue-600 hover:text-blue-800 transition-colors">
                Learn more
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
            {/* Feature 4 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-teal-100 group">
              <div className="bg-gradient-to-r from-cyan-500 to-teal-500 rounded-2xl w-16 h-16 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <LineChartIcon size={28} className="text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4 group-hover:text-cyan-600 transition-colors duration-300">
                Continuous Monitoring & Support
              </h3>
              <p className="text-gray-600 mb-6">
                Track symptoms with natural language input, analyze progress
                patterns, and receive adaptive recommendations based on your
                journey.
              </p>
              <a href="#monitoring" className="inline-flex items-center font-medium text-cyan-600 hover:text-cyan-800 transition-colors">
                Learn more
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
            {/* Feature 5 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-teal-100 group">
              <div className="bg-gradient-to-r from-teal-500 to-cyan-500 rounded-2xl w-16 h-16 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <BookOpenIcon size={28} className="text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4 group-hover:text-teal-600 transition-colors duration-300">
                Educational Companion
              </h3>
              <p className="text-gray-600 mb-6">
                Engage in interactive Q&A about PCOS, get evidence-based
                information that busts common myths, and benefit from community
                insights.
              </p>
              <a href="#education" className="inline-flex items-center font-medium text-teal-600 hover:text-teal-800 transition-colors">
                Learn more
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
            {/* Architecture Card */}
            <div className="bg-gradient-to-br from-blue-50 to-teal-50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-blue-100 group">
              <div className="bg-gradient-to-r from-blue-600 to-teal-600 text-white px-4 py-2 rounded-lg inline-block mb-4 font-medium">
                Advanced Technology
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4 group-hover:text-teal-600 transition-colors duration-300">
                Medically-Informed AI Architecture
              </h3>
              <p className="text-gray-600 mb-6">
                Our system combines Retrieval Augmented Generation with advanced
                AI to provide accurate, personalized, and medically-sound
                information.
              </p>
              <div className="bg-white p-5 rounded-xl shadow-inner text-sm font-mono text-gray-700 border border-teal-100 group-hover:border-teal-200 transition-colors">
                <div className="flex items-center mb-2">
                  <div className="w-3 h-3 bg-red-400 rounded-full mr-2"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full mr-2"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                </div>
                <p className="mb-1">
                  User Query <span className="text-teal-500">→</span> Vector
                  Search <span className="text-teal-500">→</span> Context
                </p>
                <p className="mb-1 text-teal-500">↓</p>
                <p className="mb-1">
                  Medical KB + Context <span className="text-teal-500">→</span>{' '}
                  AI Analysis
                </p>
                <p className="mb-1 text-teal-500">↓</p>
                <p>Personalized Response + Citations</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Ultrasound Analysis Section */}
      <section id="analysis" className="py-24 bg-gradient-to-b from-blue-50 to-white">
        <UltrasoundAnalysis />
      </section>
      {/* Symptom Assessment Section */}
      <section id="assessment" className="py-24 bg-white">
        <SymptomAssessment />
      </section>
      {/* CTA Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-teal-600 via-blue-600 to-cyan-600"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1504439468489-c8920d796a29?ixlib=rb-4.0.3&auto=format&fit=crop&q=80')] opacity-10 bg-cover bg-center mix-blend-overlay"></div>
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="absolute top-[30%] left-[10%] w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-[20%] right-[15%] w-80 h-80 bg-cyan-300/20 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white">
            Ready to Take Control of Your PCOS Journey?
          </h2>
          <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto text-blue-100">
            Join thousands of users who have transformed their PCOS management
            with our AI-powered platform.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <button className="px-8 py-4 bg-white text-teal-600 rounded-xl font-medium hover:bg-blue-50 hover:scale-105 transition-all duration-300 shadow-lg shadow-teal-700/20">
              Sign Up Free
            </button>
            <button className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-xl font-medium hover:bg-white/10 hover:scale-105 transition-all duration-300">
              Schedule a Demo
            </button>
          </div>
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">10k+</div>
              <div className="text-blue-100">Users Helped</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">98%</div>
              <div className="text-blue-100">Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">24/7</div>
              <div className="text-blue-100">AI Support</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">100+</div>
              <div className="text-blue-100">Medical Partners</div>
            </div>
          </div>
        </div>
      </section>
    </div>;
}