"use client"

import type React from "react"
import { useState } from "react"
import { Header } from "../components/Header"
import { Footer } from "../components/Footer"

export default function BookAppointment() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    appointmentDateTime: "",
    consultationType: "",
    reason: "",
    services: [] as string[],
    additionalNotes: "",
    hearAboutUs: "",
    hearAboutUsOther: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleServiceChange = (service: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      services: checked ? [...prev.services, service] : prev.services.filter((s) => s !== service),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const appointmentData = {
      ...formData,
      submittedAt: new Date().toISOString(),
    }

    try {
      const response = await fetch("https://api.test-appointment.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(appointmentData),
      })

      if (response.ok) {
        alert("Appointment request submitted successfully!")
        // Reset form
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          appointmentDateTime: "",
          consultationType: "",
          reason: "",
          services: [],
          additionalNotes: "",
          hearAboutUs: "",
          hearAboutUsOther: "",
        })
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      alert("Error submitting form. Please try again.")
    }
  }

  const services = [
    "PCOS Diagnosis and Evaluation",
    "AI-Powered Ultrasound Analysis",
    "Personalized Treatment and Lifestyle Recommendations",
    "Symptom Assessment and Risk Evaluation",
  ]

  const hearAboutOptions = ["Social Media", "Word of Mouth", "Search Engine", "Referral", "Other"]

  return (
    <>
    <Header/>
    <main className="min-h-screen bg-gradient-to-br from-teal-500 via-teal-400 to-blue-500 py-12 px-4">
      <section className="max-w-4xl mx-auto bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-white/20">
        <header className="text-center mb-10">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent mb-6">
            Appointment Request Form for PCOS Consultation
          </h1>
          <p className="text-gray-700 text-lg leading-relaxed max-w-3xl mx-auto">
            Please fill out the form below to schedule an appointment with one of our healthcare professionals for your
            PCOS-related concerns or tests. Our doctor will review your information and confirm your appointment
            details.
          </p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-6">
            <div>
              <label htmlFor="fullName" className="block text-sm font-semibold text-gray-800 mb-2">
                Full Name:
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-400 focus:border-transparent mb-4 bg-white/80 backdrop-blur-sm transition-all duration-200 hover:bg-white"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-800 mb-2">
                Email Address:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-400 focus:border-transparent mb-4 bg-white/80 backdrop-blur-sm transition-all duration-200 hover:bg-white"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-semibold text-gray-800 mb-2">
                Phone Number:
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-400 focus:border-transparent mb-4 bg-white/80 backdrop-blur-sm transition-all duration-200 hover:bg-white"
              />
            </div>

            <div>
              <label htmlFor="appointmentDateTime" className="block text-sm font-semibold text-gray-800 mb-2">
                Preferred Date and Time for Appointment:
              </label>
              <input
                type="datetime-local"
                id="appointmentDateTime"
                name="appointmentDateTime"
                value={formData.appointmentDateTime}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-400 focus:border-transparent mb-4 bg-white/80 backdrop-blur-sm transition-all duration-200 hover:bg-white"
              />
            </div>

            <div>
              <p className="block text-sm font-semibold text-gray-800 mb-4">Preferred Consultation Type:</p>
              <p className="text-sm text-gray-600 mb-4">Please select the consultation type you prefer:</p>
              <div className="space-y-3 mb-4">
                <label className="flex items-center p-3 rounded-xl bg-white/60 hover:bg-white/80 transition-all duration-200 cursor-pointer">
                  <input
                    type="radio"
                    name="consultationType"
                    value="in-person"
                    checked={formData.consultationType === "in-person"}
                    onChange={handleInputChange}
                    className="mr-3 text-teal-500 focus:ring-teal-400"
                  />
                  <span className="font-medium text-gray-800">In-person Consultation</span>
                </label>
                <label className="flex items-center p-3 rounded-xl bg-white/60 hover:bg-white/80 transition-all duration-200 cursor-pointer">
                  <input
                    type="radio"
                    name="consultationType"
                    value="virtual"
                    checked={formData.consultationType === "virtual"}
                    onChange={handleInputChange}
                    className="mr-3 text-teal-500 focus:ring-teal-400"
                  />
                  <span className="font-medium text-gray-800">Virtual Consultation (Video/Phone Call)</span>
                </label>
              </div>
            </div>

            <div>
              <label htmlFor="reason" className="block text-sm font-semibold text-gray-800 mb-2">
                Reason for Appointment:
              </label>
              <p className="text-sm text-gray-600 mb-2">
                Please briefly describe the reason you're seeking an appointment. (e.g., symptoms, concerns, testing,
                etc.)
              </p>
              <textarea
                id="reason"
                name="reason"
                value={formData.reason}
                onChange={handleInputChange}
                required
                rows={4}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-400 focus:border-transparent mb-4 bg-white/80 backdrop-blur-sm transition-all duration-200 hover:bg-white resize-none"
              />
            </div>

            <div>
              <p className="block text-sm font-semibold text-gray-800 mb-4">
                Which service(s) would you like to discuss during your appointment?
              </p>
              <p className="text-sm text-gray-600 mb-4">Please select the relevant services for your consultation:</p>
              <div className="space-y-3 mb-4">
                {services.map((service, index) => (
                  <label
                    key={index}
                    className="flex items-start p-3 rounded-xl bg-white/60 hover:bg-white/80 transition-all duration-200 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={formData.services.includes(service)}
                      onChange={(e) => handleServiceChange(service, e.target.checked)}
                      className="mr-3 mt-1 flex-shrink-0 text-teal-500 focus:ring-teal-400 rounded"
                    />
                    <span className="text-sm font-medium text-gray-800">{service}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="additionalNotes" className="block text-sm font-semibold text-gray-800 mb-2">
                Additional Notes or Questions:
              </label>
              <p className="text-sm text-gray-600 mb-2">
                If you have any specific questions or additional information you'd like to share, please provide it
                here:
              </p>
              <textarea
                id="additionalNotes"
                name="additionalNotes"
                value={formData.additionalNotes}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-400 focus:border-transparent mb-4 bg-white/80 backdrop-blur-sm transition-all duration-200 hover:bg-white resize-none"
              />
            </div>
 
          </div>

          <div className="text-center pt-8">
            <button
              type="submit"
              className="bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white font-semibold py-4 px-12 rounded-xl transition-all duration-300 text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Submit Appointment Request
            </button>
          </div>
        </form>
      </section>
    </main>
    <Footer/>
    </>
  )
}
