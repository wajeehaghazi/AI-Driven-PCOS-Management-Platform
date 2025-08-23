"use client";

import type React from "react";
import { useState } from "react";
import {
  Droplets,
  TestTube,
  Beaker,
  AlertCircle,
  Clock,
  Shield,
} from "lucide-react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

const sampleTests = [
  {
    id: "blood",
    title: "Blood Spot Test",
    icon: Droplets,
    bgColor: "bg-red-500",
    borderColor: "border-red-200",
    bgLight: "bg-red-50",
    textColor: "text-red-700",
    iconColor: "text-red-500",
    steps: [
      "Wash your hands with warm water and soap.",
      "Use the small needle (lancet) to prick your fingertip.",
      "Let the blood drop fall on the round spots of the card (do not smear).",
      "Fill at least 3–4 spots.",
      "Leave the card to dry for 3–4 hours in a clean, dry place (not in sunlight).",
      "After drying, put the card in the protective pouch and then in the sample bag.",
      "Write your name, date, and time on the label.",
    ],
    warning: "Ensure all spots are completely dry before packaging",
    warningIcon: AlertCircle,
  },
  {
    id: "urine",
    title: "Urine Test",
    icon: TestTube,
    bgColor: "bg-yellow-500",
    borderColor: "border-yellow-200",
    bgLight: "bg-yellow-50",
    textColor: "text-yellow-700",
    iconColor: "text-yellow-600",
    steps: [
      "Use the clean cup given in your kit.",
      "Start urinating, then move the cup mid-flow to collect urine.",
      "Do not fill too much. Close the lid tightly.",
      "If using a strip: dip it in urine, wait as written in the kit, then place it back in the sleeve.",
      "Write your name, date, and time on the label.",
      "Put everything in the sample bag and keep it cool (not in the freezer) until pickup.",
    ],
    warning: "Process within 1 hour of collection for best results",
    warningIcon: Clock,
  },
  {
    id: "saliva",
    title: "Saliva Test",
    icon: Beaker,
    bgColor: "bg-blue-500",
    borderColor: "border-blue-200",
    bgLight: "bg-blue-50",
    textColor: "text-blue-700",
    iconColor: "text-blue-500",
    steps: [
      "Do not eat, drink, brush your teeth, or chew gum for 30 minutes before the test.",
      "If your mouth is dry, rinse with plain water 10 minutes before.",
      "Spit into the tube until it reaches the line.",
      "Close the tube tightly and write your name, date, and time on the label.",
      "Put the tube in the sample bag and keep it safe until the lab person comes.",
    ],
    warning: "Ensure tube is sealed completely to prevent leakage",
    warningIcon: Shield,
  },
];

const testTypeOptions = [
  { value: "saliva", label: "Saliva Test", description: "Hormone analysis" },
  { value: "urine", label: "Urine Test", description: "Metabolic markers" },
  { value: "blood", label: "Blood Spot", description: "Comprehensive panel" },
];

const timeSlots = [
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
];

export const SampleCollectionPage: React.FC = () => {
  const [formData, setFormData] = useState({
    testType: "",
    fullName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    address: "",
    preferredDate: "",
    preferredTime: "",
    specialInstructions: "",
    agreedToTerms: false,
  });

  const [chatbaseText, setChatbaseText] = useState("");

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleChatbaseSubmit = async () => {
    if (!chatbaseText.trim()) return;

    const testUrl = "https://jsonplaceholder.typicode.com/posts";

    try {
      const response = await fetch(testUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: chatbaseText }),
      });

      if (response.ok) {
        alert("Message sent to chatbase successfully!");
        setChatbaseText("");
      }
    } catch (error) {
      alert("Error sending message. Please try again.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const testUrl = "https://jsonplaceholder.typicode.com/posts";

    try {
      const response = await fetch(testUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Collection request submitted successfully!");
        setFormData({
          testType: "",
          fullName: "",
          email: "",
          phone: "",
          dateOfBirth: "",
          address: "",
          preferredDate: "",
          preferredTime: "",
          specialInstructions: "",
          agreedToTerms: false,
        });
      }
    } catch (error) {
      alert("Error submitting request. Please try again.");
    }
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-100 py-6 sm:py-12">
        <section className="max-w-7xl mx-auto px-4 sm:px-6">
          <header className="text-center mb-8 sm:mb-12">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent mb-6">
              At-Home Laboratory Test Request
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8 max-w-4xl mx-auto leading-relaxed">
              Complete this form to arrange for at-home sample collection for
              laboratory testing. Our medical professionals will come to your
              location to collect the sample.
            </p>

            <article className="bg-white rounded-lg shadow-sm p-4 sm:p-6 max-w-5xl mx-auto">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">
                Sample Collection - Message
              </h2>
              <form
                className="space-y-3"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleChatbaseSubmit();
                }}
              >
                <input
                  type="text"
                  placeholder="Enter your message..."
                  value={chatbaseText}
                  onChange={(e) => setChatbaseText(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!chatbaseText.trim()}
                >
                  Send Message
                </button>
              </form>
            </article>
          </header>

          <section className="max-w-5xl mx-auto mb-12 sm:mb-16">
            <article className="bg-white rounded-lg shadow-sm overflow-hidden">
              <header className="bg-gradient-to-r from-teal-500 to-blue-500 text-white p-4 sm:p-6 flex items-center gap-3">
                <span className="w-6 h-6 sm:w-8 sm:h-8 bg-white bg-opacity-20 rounded-lg flex items-center justify-center flex-shrink-0 text-sm sm:text-lg">
                  📋
                </span>
                <h2 className="text-xl sm:text-2xl font-semibold">
                  Sample Collection Request Form
                </h2>
              </header>

              <section className="p-4 sm:p-6 lg:p-8">
                <form
                  onSubmit={handleSubmit}
                  className="space-y-8 sm:space-y-10"
                >
                  <fieldset className="space-y-4 sm:space-y-6">
                    <legend className="flex items-center gap-3">
                      <span className="w-6 h-6 sm:w-8 sm:h-8 bg-teal-500 text-white rounded-full flex items-center justify-center font-bold text-sm sm:text-lg flex-shrink-0">
                        1
                      </span>
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                        Select Test Type
                      </h3>
                    </legend>

                    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                      {testTypeOptions.map((option, index) => (
                        <label
                          key={option.value}
                          className={`border-2 border-gray-200 rounded-lg p-3 sm:p-4 hover:border-teal-300 transition-colors flex items-center space-x-3 cursor-pointer ${
                            index === 2 ? "sm:col-span-2 lg:col-span-1" : ""
                          }`}
                        >
                          <input
                            type="radio"
                            name="testType"
                            value={option.value}
                            checked={formData.testType === option.value}
                            onChange={(e) =>
                              handleInputChange("testType", e.target.value)
                            }
                            className="w-4 h-4 text-teal-600 border-gray-300 focus:ring-teal-500 flex-shrink-0"
                          />
                          <span className="flex-1">
                            <strong className="block text-gray-900 text-sm sm:text-base">
                              {option.label}
                            </strong>
                            <small className="text-gray-500">
                              {option.description}
                            </small>
                          </span>
                        </label>
                      ))}
                    </section>
                  </fieldset>

                  <fieldset className="space-y-4 sm:space-y-6">
                    <legend className="flex items-center gap-3">
                      <span className="w-6 h-6 sm:w-8 sm:h-8 bg-teal-500 text-white rounded-full flex items-center justify-center font-bold text-sm sm:text-lg flex-shrink-0">
                        2
                      </span>
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                        Personal Information
                      </h3>
                    </legend>

                    <section className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      <label className="space-y-2 mb-4">
                        <span className="text-sm font-medium text-gray-700 mb-2 block">
                          Full Name*
                        </span>
                        <input
                          type="text"
                          placeholder="Enter your full name"
                          value={formData.fullName}
                          onChange={(e) =>
                            handleInputChange("fullName", e.target.value)
                          }
                          className="w-full h-10 sm:h-12 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent mb-4"
                          required
                        />
                      </label>
                      <label className="space-y-2 mb-4">
                        <span className="text-sm font-medium text-gray-700 mb-2 block">
                          Email Address*
                        </span>
                        <input
                          type="email"
                          placeholder="your@email.com"
                          value={formData.email}
                          onChange={(e) =>
                            handleInputChange("email", e.target.value)
                          }
                          className="w-full h-10 sm:h-12 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent mb-4"
                          required
                        />
                      </label>
                      <label className="space-y-2 mb-4">
                        <span className="text-sm font-medium text-gray-700 mb-2 block">
                          Phone Number*
                        </span>
                        <input
                          type="tel"
                          placeholder="(555) 123-4567"
                          value={formData.phone}
                          onChange={(e) =>
                            handleInputChange("phone", e.target.value)
                          }
                          className="w-full h-10 sm:h-12 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent mb-4"
                          required
                        />
                      </label>
                      <label className="space-y-2 mb-4">
                        <span className="text-sm font-medium text-gray-700 mb-2 block">
                          Date of Birth
                        </span>
                        <input
                          type="date"
                          value={formData.dateOfBirth}
                          onChange={(e) =>
                            handleInputChange("dateOfBirth", e.target.value)
                          }
                          className="w-full h-10 sm:h-12 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent mb-4"
                        />
                      </label>
                    </section>
                  </fieldset>

                  <fieldset className="space-y-4 sm:space-y-6">
                    <legend className="flex items-center gap-3">
                      <span className="w-6 h-6 sm:w-8 sm:h-8 bg-teal-500 text-white rounded-full flex items-center justify-center font-bold text-sm sm:text-lg flex-shrink-0">
                        3
                      </span>
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                        Collection Details
                      </h3>
                    </legend>

                    <section className="space-y-4 sm:space-y-6">
                      <label className="space-y-2 mb-4">
                        <span className="text-sm font-medium text-gray-700 mb-2 block">
                          Collection Address*
                        </span>
                        <input
                          type="text"
                          placeholder="Where should our medical professional come?"
                          value={formData.address}
                          onChange={(e) =>
                            handleInputChange("address", e.target.value)
                          }
                          className="w-full h-10 sm:h-12 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent mb-4"
                          required
                        />
                      </label>

                      <section className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                        <label className="space-y-2 mb-4">
                          <span className="text-sm font-medium text-gray-700 mb-2 block">
                            Preferred Date*
                          </span>
                          <input
                            type="date"
                            value={formData.preferredDate}
                            onChange={(e) =>
                              handleInputChange("preferredDate", e.target.value)
                            }
                            className="w-full h-10 sm:h-12 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent mb-4"
                            required
                          />
                        </label>
                        <label className="space-y-2 mb-4">
                          <span className="text-sm font-medium text-gray-700 mb-2 block">
                            Preferred Time*
                          </span>
                          <select
                            value={formData.preferredTime}
                            onChange={(e) =>
                              handleInputChange("preferredTime", e.target.value)
                            }
                            className="w-full h-10 sm:h-12 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm sm:text-base mb-4"
                            required
                          >
                            <option value="">Select a time</option>
                            {timeSlots.map((time) => (
                              <option key={time} value={time}>
                                {time === "12:00"
                                  ? "12:00 PM"
                                  : Number.parseInt(time) < 12
                                  ? `${Number.parseInt(time)}:00 AM`
                                  : `${Number.parseInt(time) - 12}:00 PM`}
                              </option>
                            ))}
                          </select>
                        </label>
                      </section>

                      <label className="space-y-2 mb-4">
                        <span className="text-sm font-medium text-gray-700 mb-2 block">
                          Special Instructions (optional)
                        </span>
                        <textarea
                          placeholder="Any additional information our medical professional should know"
                          value={formData.specialInstructions}
                          onChange={(e) =>
                            handleInputChange(
                              "specialInstructions",
                              e.target.value
                            )
                          }
                          rows={4}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none text-sm sm:text-base mb-4"
                        />
                      </label>
                    </section>
                  </fieldset>

                  <aside className="bg-teal-50 border border-teal-200 rounded-lg p-4 sm:p-6">
                    <label className="flex items-start space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.agreedToTerms}
                        onChange={(e) =>
                          handleInputChange("agreedToTerms", e.target.checked)
                        }
                        className="mt-1 w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500 flex-shrink-0"
                        required
                      />
                      <span className="text-xs sm:text-sm text-teal-800 leading-relaxed">
                        By submitting this form, you agree to our terms of
                        service and privacy policy. A medical professional will
                        contact you to confirm your appointment.
                      </span>
                    </label>
                  </aside>

                  <footer className="text-center pt-4">
                    <button
                      type="submit"
                      className="bg-teal-600 hover:bg-teal-700 text-white px-8 sm:px-12 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-lg w-full sm:w-auto transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={!formData.agreedToTerms}
                    >
                      Schedule Collection
                    </button>
                  </footer>
                </form>
              </section>
            </article>
          </section>

          <section className="mb-12 sm:mb-16 ">
            <header className="text-center mb-8 sm:mb-12">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6 px-4">
                At-Home Sample Collection Instructions
              </h1>
              <p className="text-gray-600 max-w-4xl mx-auto text-base sm:text-lg leading-relaxed px-4">
                Follow these step-by-step instructions to properly collect your
                samples for accurate testing and optimal results.
              </p>
            </header>

            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-4 ">
              {sampleTests.map((test, index) => {
                const IconComponent = test.icon;
                const WarningIconComponent = test.warningIcon;
                return (
                  <article
                    key={test.id}
                    className={`bg-white rounded-lg shadow-md overflow-hidden flex flex-col ${
                      index === 2 ? "md:col-span-2 lg:col-span-1" : ""
                    }`}
                  >
                    <header
                      className={`${test.bgColor} text-white p-4 sm:p-6 flex items-center gap-3`}
                    >
                      <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
                      <h3 className="text-lg sm:text-xl font-semibold">
                        {test.title}
                      </h3>
                    </header>

                    <section className="p-4 sm:p-3 sm:py-6 flex-1 flex flex-col ">
                      <ol className="space-y-3 text-gray-700 flex-1">
                        {test.steps.map((step, stepIndex) => (
                          <li
                            key={stepIndex}
                            className="flex items-start gap-3"
                          >
                            <span className="w-6 h-6 bg-gray-100 text-gray-700 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0 mt-0.5">
                              {stepIndex + 1}
                            </span>
                            <p className="text-sm sm:text-base leading-relaxed">
                              {step}
                            </p>
                          </li>
                        ))}
                      </ol>

                      <aside
                        className={`${
                          test.bgLight
                        } border-l-4 ${test.bgColor.replace(
                          "bg-",
                          "border-"
                        )} rounded-r p-3 sm:p-4 mt-6 flex items-start gap-3`}
                      >
                        <WarningIconComponent
                          className={`w-4 h-4 sm:w-5 sm:h-5 ${test.iconColor} flex-shrink-0 mt-0.5`}
                        />
                        <p
                          className={`${test.textColor} text-xs sm:text-sm font-medium`}
                        >
                          {test.warning}
                        </p>
                      </aside>
                    </section>
                  </article>
                );
              })}
            </section>
          </section>
        </section>
      </main>
      <Footer />
    </>
  );
};
