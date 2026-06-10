"use client";

import { useState } from "react";
import {
  FaArrowLeft,
  FaArrowRight,
  FaBox,
  FaCheck,
  FaExclamationTriangle,
  FaMapMarkerAlt,
  FaShip,
  FaTruck,
  FaUser,
} from "react-icons/fa";

export default function Tracking({ trackingId, setTrackingId }) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    origin: "",
    destination: "",
    packageType: "",
    weight: "",
    service: "",
  });

  const totalSteps = 5;

  const updateField = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const validateStep = () => {
    const newErrors = {};

    if (step === 1) {
      if (!formData.name.trim()) newErrors.name = "Full name is required";
      if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    }

    if (step === 2) {
      if (!formData.origin.trim()) newErrors.origin = "Origin location is required";
      if (!formData.destination.trim())
        newErrors.destination = "Destination is required";
    }

    if (step === 3) {
      if (!formData.packageType.trim())
        newErrors.packageType = "Package type is required";
      if (!formData.weight.trim()) newErrors.weight = "Weight is required";
    }

    if (step === 4) {
      if (!formData.service.trim()) newErrors.service = "Service type is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (!validateStep()) return;

    if (step < totalSteps) {
      setStep(step + 1);
      setErrors({});
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
      setErrors({});
    }
  };

  const handleSubmit = () => {
    if (!validateStep()) return;

    const generatedId = `TRK${Date.now().toString().slice(-9)}`;
    setTrackingId(generatedId);
    setSubmitted(true);
    setOpen(false);
  };

  const stepTitles = {
    1: "Personal Details",
    2: "Shipment Details",
    3: "Cargo Details",
    4: "Service Type",
    5: "Review & Submit",
  };

  return (
    <section className="relative bg-white pt-3 pb-12 sm:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {!submitted ? (
          <div className="mx-auto max-w-4xl rounded-3xl border border-gray-200 bg-white p-8 text-center shadow-2xl">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-[#E65100] to-[#FFD700] text-3xl text-white">
              <FaShip />
            </div>

            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Start Your Shipment
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-gray-600">
              Fill the shipment form step by step and submit your details.
            </p>

            <button
              onClick={() => {
                setOpen(true);
                setStep(1);
                setErrors({});
              }}
              className="mt-8 inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-[#E65100] to-[#FFD700] px-8 py-4 font-bold text-white shadow-lg transition hover:scale-[1.02]"
            >
              Start Shipment
              <FaArrowRight className="ml-3" />
            </button>
          </div>
        ) : (
          <div className="mx-auto max-w-4xl rounded-3xl border border-gray-200 bg-white p-8 shadow-2xl">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-500 text-2xl text-white">
              <FaCheck />
            </div>

            <h2 className="text-3xl font-bold text-gray-900">
              Shipment Request Submitted
            </h2>

            <p className="mt-3 text-gray-600">
              Your tracking ID has been generated successfully.
            </p>

            <div className="mt-6 rounded-2xl bg-gray-50 p-5">
              <p className="text-sm font-semibold text-gray-500">
                Tracking Number
              </p>
              <p className="mt-2 text-2xl font-bold text-[#E65100]">
                {trackingId}
              </p>
            </div>
          </div>
        )}
      </div>

      {open && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 px-4">
          <div className="w-full max-w-6xl overflow-hidden rounded-3xl bg-white shadow-2xl">
            <div className="flex items-center justify-between bg-gradient-to-r from-[#E65100] to-[#FFD166] px-6 py-6 sm:px-8">
              <div>
                <h2 className="text-2xl font-bold text-white sm:text-3xl">
                  Start Your Shipment
                </h2>
                <p className="mt-1 text-sm text-white sm:text-base">
                  Complete the form below to get a quote
                </p>
              </div>

              <button
                onClick={nextStep}
                disabled={step === totalSteps}
                className="hidden rounded-xl bg-white/70 px-6 py-3 font-semibold text-gray-700 disabled:opacity-50 sm:flex sm:items-center"
              >
                Next <FaArrowRight className="ml-2" />
              </button>
            </div>

            <div className="px-6 py-8 sm:px-8">
              <div className="mb-10 flex items-center justify-between">
                {[1, 2, 3, 4, 5].map((item, index) => (
                  <div key={item} className="flex flex-1 items-center">
                    <div
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full font-bold ${
                        item < step
                          ? "bg-green-500 text-white"
                          : item === step
                          ? "bg-[#FFB84D] text-white"
                          : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {item < step ? <FaCheck /> : item}
                    </div>

                    {index !== 4 && (
                      <div
                        className={`mx-3 h-1 flex-1 rounded-full ${
                          item < step ? "bg-green-500" : "bg-gray-200"
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>

              <h3 className="text-center text-2xl font-bold text-gray-900">
                {stepTitles[step]}
              </h3>

              <p className="mb-8 mt-2 text-center text-gray-500">
                Step {step} of {totalSteps}
              </p>

              {step === 1 && (
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <div className="relative">
                      <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        value={formData.name}
                        onChange={(e) => updateField("name", e.target.value)}
                        className={`w-full rounded-xl border py-4 pl-12 pr-4 outline-none ${
                          errors.name
                            ? "border-red-500"
                            : "border-gray-300 focus:border-[#E65100]"
                        }`}
                        placeholder="Full Name *"
                      />
                    </div>
                    {errors.name && (
                      <p className="mt-2 text-sm text-red-500">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <input
                      value={formData.phone}
                      onChange={(e) => updateField("phone", e.target.value)}
                      className={`w-full rounded-xl border px-4 py-4 outline-none ${
                        errors.phone
                          ? "border-red-500"
                          : "border-gray-300 focus:border-[#E65100]"
                      }`}
                      placeholder="Phone Number *"
                    />
                    {errors.phone && (
                      <p className="mt-2 text-sm text-red-500">{errors.phone}</p>
                    )}
                  </div>
                </div>
              )}

              {step === 2 && (
                <>
                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <div className="relative">
                        <FaMapMarkerAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          value={formData.origin}
                          onChange={(e) =>
                            updateField("origin", e.target.value)
                          }
                          className={`w-full rounded-xl border py-4 pl-12 pr-4 outline-none ${
                            errors.origin
                              ? "border-red-500"
                              : "border-gray-300 focus:border-[#E65100]"
                          }`}
                          placeholder="Origin Location *"
                        />
                      </div>
                      {errors.origin && (
                        <p className="mt-2 text-sm text-red-500">
                          {errors.origin}
                        </p>
                      )}
                    </div>

                    <div>
                      <input
                        value={formData.destination}
                        onChange={(e) =>
                          updateField("destination", e.target.value)
                        }
                        className={`w-full rounded-xl border px-4 py-4 outline-none ${
                          errors.destination
                            ? "border-red-500"
                            : "border-gray-300 focus:border-[#E65100]"
                        }`}
                        placeholder="Destination *"
                      />
                      {errors.destination && (
                        <p className="mt-2 text-sm text-red-500">
                          {errors.destination}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="mt-8 flex items-center gap-4 rounded-xl border border-yellow-300 bg-yellow-50 p-4 text-gray-700">
                    <FaExclamationTriangle className="text-yellow-500" />
                    <p>Please ensure the addresses are complete and accurate.</p>
                  </div>
                </>
              )}

              {step === 3 && (
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <div className="relative">
                      <FaBox className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        value={formData.packageType}
                        onChange={(e) =>
                          updateField("packageType", e.target.value)
                        }
                        className={`w-full rounded-xl border py-4 pl-12 pr-4 outline-none ${
                          errors.packageType
                            ? "border-red-500"
                            : "border-gray-300 focus:border-[#E65100]"
                        }`}
                        placeholder="Package Type *"
                      />
                    </div>
                    {errors.packageType && (
                      <p className="mt-2 text-sm text-red-500">
                        {errors.packageType}
                      </p>
                    )}
                  </div>

                  <div>
                    <input
                      value={formData.weight}
                      onChange={(e) => updateField("weight", e.target.value)}
                      className={`w-full rounded-xl border px-4 py-4 outline-none ${
                        errors.weight
                          ? "border-red-500"
                          : "border-gray-300 focus:border-[#E65100]"
                      }`}
                      placeholder="Weight *"
                    />
                    {errors.weight && (
                      <p className="mt-2 text-sm text-red-500">{errors.weight}</p>
                    )}
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <select
                      value={formData.service}
                      onChange={(e) => updateField("service", e.target.value)}
                      className={`w-full rounded-xl border px-4 py-4 outline-none ${
                        errors.service
                          ? "border-red-500"
                          : "border-gray-300 focus:border-[#E65100]"
                      }`}
                    >
                      <option value="">Select Service *</option>
                      <option value="Air Freight">Air Freight</option>
                      <option value="Sea Freight">Sea Freight</option>
                      <option value="Road Freight">Road Freight</option>
                      <option value="Express Delivery">Express Delivery</option>
                    </select>
                    {errors.service && (
                      <p className="mt-2 text-sm text-red-500">
                        {errors.service}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center rounded-xl border border-gray-300 px-4 py-4 text-gray-500">
                    <FaTruck className="mr-3 text-[#E65100]" />
                    Fast & secure shipment service
                  </div>
                </div>
              )}

              {step === 5 && (
                <div className="rounded-2xl bg-gray-50 p-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <p>
                      <b>Name:</b> {formData.name || "-"}
                    </p>
                    <p>
                      <b>Phone:</b> {formData.phone || "-"}
                    </p>
                    <p>
                      <b>Origin:</b> {formData.origin || "-"}
                    </p>
                    <p>
                      <b>Destination:</b> {formData.destination || "-"}
                    </p>
                    <p>
                      <b>Package:</b> {formData.packageType || "-"}
                    </p>
                    <p>
                      <b>Weight:</b> {formData.weight || "-"}
                    </p>
                    <p>
                      <b>Service:</b> {formData.service || "-"}
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between border-t border-gray-200 px-6 py-5 sm:px-8">
              <button
                onClick={prevStep}
                disabled={step === 1}
                className="flex items-center font-semibold text-gray-700 disabled:opacity-40"
              >
                <FaArrowLeft className="mr-2" />
                Back
              </button>

              <div className="flex items-center gap-4">
                <button
                  onClick={() => setOpen(false)}
                  className="font-semibold text-gray-700"
                >
                  Cancel
                </button>

                <button
                  onClick={step === totalSteps ? handleSubmit : nextStep}
                  className="flex items-center rounded-xl bg-gradient-to-r from-[#E65100] to-[#FFD166] px-8 py-4 font-bold text-white shadow-lg"
                >
                  {step === totalSteps ? "Submit" : "Continue"}
                  <FaArrowRight className="ml-3" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
