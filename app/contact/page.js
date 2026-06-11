"use client";

import { useState, useRef, useEffect } from "react";
import emailjs from "@emailjs/browser";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPaperPlane,
  FaUser,
  FaBuilding,
  FaClipboard,
  FaClock,
  FaHeadset,
  FaGlobe,
  FaShieldAlt,
  FaWhatsapp,
  FaSpinner,
  FaCheckCircle,
  FaExclamationTriangle,
  FaArrowRight,
  FaDirections,
} from "react-icons/fa";

export default function Contact() {
  const formRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    subject: "",
    message: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submittedRef, setSubmittedRef] = useState("");
  const [error, setError] = useState("");
  const [validationErrors, setValidationErrors] = useState({});
  const [currentTime, setCurrentTime] = useState("");

  /*
    ✅ EmailJS IDs
    ✅ Service ID: service_mcpdje4
    ✅ Team Template: template_rxfkmfm
    ✅ Auto Reply Template: template_yxv7zne
    ✅ Public Key: u7xiyzEAFzoY1nPfR

    ⚠️ Do not add private key inside client component.
  */
  const EMAILJS_CONFIG = {
    SERVICE_ID: "service_mcpdje4",
    TEAM_TEMPLATE_ID: "template_rxfkmfm",
    AUTO_REPLY_TEMPLATE_ID: "template_yxv7zne",
    PUBLIC_KEY: "u7xiyzEAFzoY1nPfR",
  };

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options = {
        timeZone: "Europe/Amsterdam",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      };

      setCurrentTime(now.toLocaleTimeString("en-US", options));
    };

    updateTime();

    const interval = setInterval(updateTime, 60000);

    return () => clearInterval(interval);
  }, []);

  const contactInfo = [
    {
      icon: <FaPhone />,
      title: "Call Us",
      details: "+31685865799",
      description: "Available for urgent shipment support",
      action: "tel:+31685865799",
    },
    {
      icon: <FaEnvelope />,
      title: "Email Us",
      details: "info@invictuslogi.com",
      description: "Send us your inquiry anytime",
      action: "mailto:info@invictuslogi.com",
    },
    {
      icon: <FaWhatsapp />,
      title: "WhatsApp",
      details: "+918291293651",
      description: "Instant chat support",
      action: "https://wa.me/918291293651",
    },
  ];

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (error) setError("");
    if (isSuccess) setIsSuccess(false);

    if (validationErrors[name]) {
      setValidationErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.name.trim()) {
      errors.name = "Full name is required";
    }

    if (!formData.email.trim()) {
      errors.email = "Email address is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }

    if (formData.phone && !/^[\d\s+()-]+$/.test(formData.phone)) {
      errors.phone = "Phone number contains invalid characters";
    }

    if (!formData.message.trim()) {
      errors.message = "Message is required";
    }

    setValidationErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const generateReferenceNumber = () => {
    return `INV-${Math.floor(Math.random() * 10000)
      .toString()
      .padStart(4, "0")}`;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    setError("");
    setIsSuccess(false);
    setSubmittedRef("");

    try {
      emailjs.init({
        publicKey: EMAILJS_CONFIG.PUBLIC_KEY,
      });

      const referenceNumber = generateReferenceNumber();

      const submissionTime = new Date().toLocaleString("en-US", {
        dateStyle: "full",
        timeStyle: "long",
      });

      const teamParams = {
        to_email: "info@invictuslogi.com",
        title: formData.subject || "New Contact Inquiry",
        from_name: formData.name,
        from_email: formData.email,
        reply_to: formData.email,
        phone: formData.phone || "Not provided",
        company: formData.company || "Not provided",
        subject: formData.subject || "General Inquiry",
        message: formData.message,
        submitted_at: submissionTime,
        reference_number: referenceNumber,
      };

      await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEAM_TEMPLATE_ID,
        teamParams
      );

      const autoReplyParams = {
        to_email: formData.email,
        to_name: formData.name,
        from_name: "Invictus Logistics",
        from_email: "info@invictuslogi.com",
        reply_to: "info@invictuslogi.com",
        subject: formData.subject || "General Inquiry",
        message: formData.message,
        submitted_at: submissionTime,
        reference_number: referenceNumber,
      };

      await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.AUTO_REPLY_TEMPLATE_ID,
        autoReplyParams
      );

      setSubmittedRef(referenceNumber);
      setIsSuccess(true);

      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        subject: "",
        message: "",
      });

      setValidationErrors({});
    } catch (err) {
      console.error("EmailJS error:", err);

      setError(
        err?.text
          ? `Failed: ${err.text}`
          : "Failed to send message. Please try again or contact us directly."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#FFFDF8] text-gray-900">
      {/* Hero Section - Light Color */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#FFF7ED] via-[#FFFBEB] to-white px-4 py-20 text-gray-900 sm:px-6 lg:px-8">
        <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-[#E65100]/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-[#FFD700]/25 blur-3xl" />

        <div className="relative mx-auto max-w-7xl text-center">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.28em] text-[#E65100]">
            Contact Us
          </p>

          <h1 className="mx-auto max-w-4xl text-4xl font-bold leading-tight text-gray-950 sm:text-5xl lg:text-6xl">
            Get in touch with our{" "}
            <span className="bg-gradient-to-r from-[#E65100] via-[#FF8F00] to-[#D9A600] bg-clip-text text-transparent">
              logistics experts
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-gray-600 sm:text-lg">
            Need a quote, tracking help, shipment support or business
            assistance? Send us your details and our team will respond quickly.
          </p>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="relative -mt-10 px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Left Contact Cards */}
            <aside className="space-y-5 lg:col-span-1">
              {contactInfo.map((item, index) => (
                <a
                  key={index}
                  href={item.action}
                  target={item.action.startsWith("http") ? "_blank" : undefined}
                  rel={
                    item.action.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className="group block rounded-[24px] border border-orange-100 bg-white p-6 shadow-[0_20px_60px_rgba(230,81,0,0.08)] transition-all duration-300 hover:-translate-y-1 hover:border-[#E65100]/30 hover:shadow-[0_25px_80px_rgba(230,81,0,0.13)]"
                >
                  <div className="flex items-start gap-5">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-r from-[#FF8F00] to-[#FFD700] text-xl text-white shadow-lg transition-transform duration-300 group-hover:scale-110">
                      {item.icon}
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-gray-900 transition-colors duration-300 group-hover:text-[#E65100]">
                        {item.title}
                      </h3>

                      <p className="mt-1 text-sm text-gray-500">
                        {item.description}
                      </p>

                      <p className="mt-3 break-all text-base font-semibold text-gray-800">
                        {item.details}
                      </p>
                    </div>
                  </div>
                </a>
              ))}

              {/* Business Hours - Light */}
              <div className="rounded-[24px] border border-orange-100 bg-gradient-to-br from-[#FFF7ED] via-white to-[#FFFBEB] p-6 text-gray-900 shadow-[0_20px_70px_rgba(230,81,0,0.10)]">
                <div className="mb-5 flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r from-[#FF8F00] to-[#FFD700] text-xl text-white shadow-lg">
                    <FaClock />
                  </div>

                  <div>
                    <h3 className="text-xl font-bold">Business Hours</h3>
                    <p className="text-sm text-gray-500">
                      Local Time: {currentTime || "--:--"}
                    </p>
                  </div>
                </div>

                <div className="space-y-4 text-sm">
                  <div className="flex items-center justify-between border-b border-orange-100 pb-3">
                    <span className="text-gray-600">Monday - Friday</span>
                    <span className="font-bold text-[#E65100]">
                      9:00 AM - 6:00 PM
                    </span>
                  </div>

                  <div className="flex items-center justify-between border-b border-orange-100 pb-3">
                    <span className="text-gray-600">Saturday</span>
                    <span className="font-bold text-[#E65100]">
                      10:00 AM - 4:00 PM
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Sunday</span>
                    <span className="font-bold text-[#E65100]">
                      Emergency Only
                    </span>
                  </div>
                </div>
              </div>

              {/* Emergency Support */}
              <div className="rounded-[24px] border border-[#E65100]/15 bg-gradient-to-r from-[#FFF7ED] to-[#FFFBEB] p-6 shadow-[0_20px_60px_rgba(230,81,0,0.07)]">
                <div className="mb-4 flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r from-[#FF8F00] to-[#FFD700] text-white">
                    <FaHeadset />
                  </div>

                  <div>
                    <h3 className="font-bold text-gray-900">
                      Emergency Support
                    </h3>
                    <p className="text-sm text-gray-600">
                      For urgent shipments only
                    </p>
                  </div>
                </div>

                <p className="mb-4 text-sm leading-6 text-gray-700">
                  For critical shipment issues, contact our support line
                  directly.
                </p>

                <a
                  href="tel:+31685865799"
                  className="inline-flex items-center gap-2 font-bold text-[#E65100] transition-colors hover:text-[#FF8F00]"
                >
                  <FaPhone />
                  +31685865799
                </a>
              </div>
            </aside>

            {/* Form Section */}
            <div className="lg:col-span-2">
              <div className="relative overflow-hidden rounded-[28px] border border-orange-100 bg-white shadow-[0_30px_90px_rgba(230,81,0,0.10)]">
                <div className="absolute -right-32 -top-32 h-72 w-72 rounded-full bg-[#FFD700]/25 blur-3xl" />
                <div className="absolute -bottom-32 -left-32 h-72 w-72 rounded-full bg-[#E65100]/10 blur-3xl" />

                <div className="relative grid lg:grid-cols-[0.9fr_1.6fr]">
                  {/* Form Left Panel - Light */}
                  <div className="relative overflow-hidden bg-gradient-to-br from-[#FFF7ED] via-[#FFFBEB] to-white p-6 text-gray-900 sm:p-8 md:p-10">
                    <div className="absolute inset-0 opacity-60">
                      <div className="absolute left-8 top-10 h-24 w-24 rounded-full bg-[#FFD700]/30 blur-3xl" />
                      <div className="absolute bottom-10 right-8 h-28 w-28 rounded-full bg-[#E65100]/15 blur-3xl" />
                    </div>

                    <div className="relative z-10">
                      <div className="mb-8 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r from-[#FF8F00] to-[#FFD700] shadow-lg">
                        <FaPaperPlane className="text-xl text-white" />
                      </div>

                      <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-[#E65100]">
                        Contact Form
                      </p>

                      <h2 className="mb-4 text-3xl font-bold leading-tight text-gray-950 sm:text-4xl">
                        Let’s move your shipment with confidence.
                      </h2>

                      <p className="mb-8 text-sm leading-7 text-gray-600 sm:text-base">
                        Share your shipment details, tracking issue, quote
                        request, or business inquiry. Our team will review your
                        message and respond as soon as possible.
                      </p>

                      <div className="space-y-4">
                        <div className="flex items-center gap-4 rounded-2xl border border-orange-100 bg-white/80 p-4 shadow-sm backdrop-blur">
                          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#FFF1E6]">
                            <FaClock className="text-[#E65100]" />
                          </div>

                          <div>
                            <p className="text-sm font-semibold text-gray-900">
                              Fast response
                            </p>
                            <p className="text-xs text-gray-500">
                              Usually within business hours
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 rounded-2xl border border-orange-100 bg-white/80 p-4 shadow-sm backdrop-blur">
                          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#FFF1E6]">
                            <FaShieldAlt className="text-[#E65100]" />
                          </div>

                          <div>
                            <p className="text-sm font-semibold text-gray-900">
                              Secure inquiry
                            </p>
                            <p className="text-xs text-gray-500">
                              Your information stays protected
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 rounded-2xl border border-orange-100 bg-white/80 p-4 shadow-sm backdrop-blur">
                          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#FFF1E6]">
                            <FaGlobe className="text-[#E65100]" />
                          </div>

                          <div>
                            <p className="text-sm font-semibold text-gray-900">
                              Global logistics
                            </p>
                            <p className="text-xs text-gray-500">
                              Shipment support and business inquiries
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actual Form */}
                  <div className="bg-white p-5 sm:p-8 md:p-10">
                    <div className="mb-8">
                      <p className="mb-2 text-sm font-bold uppercase tracking-[0.22em] text-[#E65100]">
                        Send Message
                      </p>

                      <h3 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                        Tell us how we can help
                      </h3>

                      <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-500">
                        Please fill in the form below. Required fields are
                        marked with an asterisk.
                      </p>
                    </div>

                    <form
                      ref={formRef}
                      onSubmit={handleSubmit}
                      className="space-y-5"
                    >
                      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                        {/* Name */}
                        <div>
                          <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-800">
                            <FaUser className="text-[#E65100]" />
                            Full Name *
                          </label>

                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter your full name"
                            className={`w-full rounded-2xl border bg-[#FFFDF8] px-4 py-4 text-sm text-gray-800 outline-none transition-all duration-300 placeholder:text-gray-400 focus:bg-white focus:ring-4 focus:ring-[#E65100]/10 ${
                              validationErrors.name
                                ? "border-red-500 focus:border-red-500"
                                : "border-orange-100 focus:border-[#E65100]"
                            }`}
                          />

                          {validationErrors.name && (
                            <p className="mt-2 text-xs font-medium text-red-600">
                              {validationErrors.name}
                            </p>
                          )}
                        </div>

                        {/* Email */}
                        <div>
                          <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-800">
                            <FaEnvelope className="text-[#E65100]" />
                            Email Address *
                          </label>

                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email address"
                            className={`w-full rounded-2xl border bg-[#FFFDF8] px-4 py-4 text-sm text-gray-800 outline-none transition-all duration-300 placeholder:text-gray-400 focus:bg-white focus:ring-4 focus:ring-[#E65100]/10 ${
                              validationErrors.email
                                ? "border-red-500 focus:border-red-500"
                                : "border-orange-100 focus:border-[#E65100]"
                            }`}
                          />

                          {validationErrors.email && (
                            <p className="mt-2 text-xs font-medium text-red-600">
                              {validationErrors.email}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                        {/* Phone */}
                        <div>
                          <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-800">
                            <FaPhone className="text-[#FF8F00]" />
                            Phone Number
                          </label>

                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="+31 6 85865799"
                            className={`w-full rounded-2xl border bg-[#FFFDF8] px-4 py-4 text-sm text-gray-800 outline-none transition-all duration-300 placeholder:text-gray-400 focus:bg-white focus:ring-4 focus:ring-[#E65100]/10 ${
                              validationErrors.phone
                                ? "border-red-500 focus:border-red-500"
                                : "border-orange-100 focus:border-[#E65100]"
                            }`}
                          />

                          {validationErrors.phone && (
                            <p className="mt-2 text-xs font-medium text-red-600">
                              {validationErrors.phone}
                            </p>
                          )}
                        </div>

                        {/* Company */}
                        <div>
                          <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-800">
                            <FaBuilding className="text-[#FF8F00]" />
                            Company
                          </label>

                          <input
                            type="text"
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            placeholder="Your company name"
                            className="w-full rounded-2xl border border-orange-100 bg-[#FFFDF8] px-4 py-4 text-sm text-gray-800 outline-none transition-all duration-300 placeholder:text-gray-400 focus:border-[#E65100] focus:bg-white focus:ring-4 focus:ring-[#E65100]/10"
                          />
                        </div>
                      </div>

                      {/* Subject */}
                      <div>
                        <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-800">
                          <FaClipboard className="text-[#E65100]" />
                          Subject
                        </label>

                        <select
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          className="w-full cursor-pointer rounded-2xl border border-orange-100 bg-[#FFFDF8] px-4 py-4 text-sm text-gray-800 outline-none transition-all duration-300 focus:border-[#E65100] focus:bg-white focus:ring-4 focus:ring-[#E65100]/10"
                        >
                          <option value="">Select inquiry type</option>
                          <option value="Get a Quote">Get a Quote</option>
                          <option value="Tracking Issue">Tracking Issue</option>
                          <option value="Service Inquiry">Service Inquiry</option>
                          <option value="Partnership Opportunity">
                            Partnership Opportunity
                          </option>
                          <option value="Urgent Shipment">
                            Urgent Shipment
                          </option>
                          <option value="Other">Other</option>
                        </select>
                      </div>

                      {/* Message */}
                      <div>
                        <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-800">
                          <FaPaperPlane className="text-[#E65100]" />
                          Message *
                        </label>

                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          rows={6}
                          placeholder="Tell us about your logistics needs, shipment details, tracking issue, or business inquiry..."
                          className={`w-full resize-none rounded-2xl border bg-[#FFFDF8] px-4 py-4 text-sm text-gray-800 outline-none transition-all duration-300 placeholder:text-gray-400 focus:bg-white focus:ring-4 focus:ring-[#E65100]/10 ${
                            validationErrors.message
                              ? "border-red-500 focus:border-red-500"
                              : "border-orange-100 focus:border-[#E65100]"
                          }`}
                        />

                        {validationErrors.message && (
                          <p className="mt-2 text-xs font-medium text-red-600">
                            {validationErrors.message}
                          </p>
                        )}
                      </div>

                      {/* Success Message */}
                      {isSuccess && (
                        <div className="rounded-2xl border border-green-200 bg-green-50 p-4">
                          <div className="flex gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-500">
                              <FaCheckCircle className="text-white" />
                            </div>

                            <div>
                              <p className="font-bold text-green-800">
                                Message sent successfully!
                              </p>

                              <p className="mt-1 text-sm leading-6 text-green-700">
                                A confirmation email has been sent to your email
                                address.
                              </p>

                              {submittedRef && (
                                <p className="mt-2 text-xs font-semibold text-green-700">
                                  Reference Number: {submittedRef}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Error Message */}
                      {error && (
                        <div className="rounded-2xl border border-red-200 bg-red-50 p-4">
                          <div className="flex gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-500">
                              <FaExclamationTriangle className="text-white" />
                            </div>

                            <div>
                              <p className="font-bold text-red-800">
                                Message could not be sent
                              </p>

                              <p className="mt-1 text-sm leading-6 text-red-700">
                                {error}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Submit Area */}
                      <div className="flex flex-col gap-5 border-t border-orange-100 pt-6 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-r from-[#E65100]/10 to-[#FFD700]/20">
                            <FaShieldAlt className="text-[#E65100]" />
                          </div>

                          <div>
                            <p className="text-sm font-semibold text-gray-800">
                              Secure contact form
                            </p>
                            <p className="text-xs text-gray-500">
                              Your details are used only for this inquiry.
                            </p>
                          </div>
                        </div>

                        <button
                          type="submit"
                          disabled={isLoading}
                          className={`group inline-flex w-full cursor-pointer items-center justify-center rounded-2xl bg-gradient-to-r from-[#FF8F00] to-[#FFD700] px-8 py-4 text-sm font-bold text-white shadow-lg shadow-[#E65100]/15 transition-all duration-300 hover:-translate-y-0.5 hover:from-[#E65100] hover:to-[#FFD700] hover:shadow-xl hover:shadow-[#E65100]/20 sm:w-auto ${
                            isLoading ? "cursor-not-allowed opacity-80" : ""
                          }`}
                        >
                          {isLoading ? (
                            <>
                              <FaSpinner className="mr-2 animate-spin" />
                              Sending Message...
                            </>
                          ) : (
                            <>
                              Send Message
                              <FaArrowRight className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                            </>
                          )}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>

              {/* Location Box */}
              <div
                data-location-section
                className="location-card group/location mt-8 overflow-hidden rounded-[28px] border border-orange-100 bg-white p-6 shadow-[0_20px_70px_rgba(230,81,0,0.08)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_24px_80px_rgba(230,81,0,0.14)] sm:p-8"
              >
                <div className="mb-6 flex items-center gap-4">
                  <div className="location-icon-small flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r from-[#FF8F00] to-[#FFD700] text-xl text-white shadow-lg">
                    <FaMapMarkerAlt />
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">
                      Global Headquarters
                    </h3>
                    <p className="text-sm text-gray-500">
                      Leyweg 836, 2545GR The Hague, Netherlands
                    </p>
                  </div>
                </div>

                <div className="location-map rounded-3xl border border-orange-100 bg-gradient-to-br from-[#FFF7ED] via-white to-[#FFFBEB] p-8 text-center">
                  <div className="location-pin relative mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-[#FF8F00] to-[#FFD700] text-3xl text-white shadow-xl">
                    <FaMapMarkerAlt />
                  </div>

                  <h4 className="text-xl font-bold text-gray-900">
                    Leyweg 836
                  </h4>

                  <p className="mt-2 text-gray-600">
                    2545GR The Hague, Netherlands
                  </p>

                  <a
                    href="https://maps.google.com/?q=Leyweg+836+2545GR+The+Hague+Netherlands"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex cursor-pointer items-center justify-center rounded-2xl border-2 border-[#FF8F00] bg-white px-6 py-3 text-sm font-bold text-[#E65100] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#FF8F00] hover:text-white hover:shadow-lg"
                  >
                    <FaDirections className="mr-2" />
                    Get Directions
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes locationCardGlow {
          0%,
          100% {
            border-color: rgba(255, 143, 0, 0.16);
          }
          50% {
            border-color: rgba(255, 143, 0, 0.34);
          }
        }

        @keyframes locationFloat {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-6px);
          }
        }

        @keyframes locationRing {
          0% {
            transform: scale(0.9);
            opacity: 0.42;
          }
          100% {
            transform: scale(1.55);
            opacity: 0;
          }
        }

        [data-location-section].location-card {
          animation: locationCardGlow 3.5s ease-in-out infinite;
        }

        [data-location-section] .location-icon-small {
          animation: locationFloat 3s ease-in-out infinite;
        }

        [data-location-section] .location-map {
          position: relative;
          overflow: hidden;
        }

        [data-location-section] .location-map::before {
          background: linear-gradient(
            120deg,
            transparent,
            rgba(255, 214, 0, 0.18),
            transparent
          );
          content: "";
          inset: 0;
          position: absolute;
          transform: translateX(-100%);
          transition: transform 0.9s ease;
        }

        [data-location-section].location-card:hover .location-map::before {
          transform: translateX(100%);
        }

        [data-location-section] .location-pin {
          animation: locationFloat 2.8s ease-in-out infinite;
        }

        [data-location-section] .location-pin::before {
          animation: locationRing 1.9s ease-out infinite;
          border: 2px solid rgba(255, 143, 0, 0.45);
          border-radius: 9999px;
          content: "";
          inset: -8px;
          position: absolute;
        }
      `}</style>
    </main>
  );
}

// 'use client';
// import { useState, useRef, useEffect } from 'react';
// import emailjs from '@emailjs/browser';
// import { 
//   FaPhone, FaEnvelope, FaMapMarkerAlt, FaPaperPlane, FaUser,
//   FaBuilding, FaClipboard, FaClock, FaHeadset, FaGlobe,
//   FaShieldAlt, FaTruck, FaWhatsapp, FaSpinner, FaCheckCircle,
//   FaExclamationTriangle, FaPlane, FaCar, FaCoffee, FaWifi,
//   FaRegClock, FaArrowRight, FaDirections, FaRegBuilding,
//   FaParking, FaVideo, FaRegSmile, FaStar, FaStarHalfAlt
// } from 'react-icons/fa';
// import { MdLocationOn, MdAccessible, MdSecurity } from 'react-icons/md';

// export default function Contact() {
//   const formRef = useRef();
  
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     company: '',
//     subject: '',
//     message: ''
//   });

//   const [isLoading, setIsLoading] = useState(false);
//   const [isSuccess, setIsSuccess] = useState(false);
//   const [error, setError] = useState('');
//   const [validationErrors, setValidationErrors] = useState({});
  
//   // Location section animation states
//   const [isMapHovered, setIsMapHovered] = useState(false);
//   const [activeAmenity, setActiveAmenity] = useState(null);
//   const [currentTime, setCurrentTime] = useState('');
//   const [weatherIcon, setWeatherIcon] = useState('☀️');
//   const [weatherTemp, setWeatherTemp] = useState('18°C');

//   // EmailJS configuration – replace with your actual IDs
//   const EMAILJS_CONFIG = {
//     SERVICE_ID: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
//     TEAM_TEMPLATE_ID: process.env.NEXT_PUBLIC_EMAILJS_TEAM_TEMPLATE,
//     AUTO_REPLY_TEMPLATE_ID: process.env.NEXT_PUBLIC_EMAILJS_AUTO_TEMPLATE,
//     PUBLIC_KEY: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
//   };

//   // Simulate current time in The Hague
//   useEffect(() => {
//     const updateTime = () => {
//       const now = new Date();
//       const options = { timeZone: 'Europe/Amsterdam', hour: '2-digit', minute: '2-digit', hour12: false };
//       setCurrentTime(now.toLocaleTimeString('en-US', options));
//     };
//     updateTime();
//     const interval = setInterval(updateTime, 60000);
//     return () => clearInterval(interval);
//   }, []);

//   // Simulate weather changes
//   useEffect(() => {
//     const weathers = [
//       { icon: '☀️', temp: '18°C' },
//       { icon: '⛅', temp: '16°C' },
//       { icon: '🌤️', temp: '19°C' },
//       { icon: '☁️', temp: '15°C' }
//     ];
//     let index = 0;
//     const interval = setInterval(() => {
//       index = (index + 1) % weathers.length;
//       setWeatherIcon(weathers[index].icon);
//       setWeatherTemp(weathers[index].temp);
//     }, 10000);
//     return () => clearInterval(interval);
//   }, []);

//   // Handle form field changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//     if (error) setError('');
//     if (validationErrors[name]) {
//       setValidationErrors(prev => ({ ...prev, [name]: '' }));
//     }
//   };

//   // Validate all required fields
//   const validateForm = () => {
//     const errors = {};
//     if (!formData.name.trim()) errors.name = 'Name is required';
//     if (!formData.email.trim()) errors.email = 'Email is required';
//     else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Email is invalid';
//     if (!formData.message.trim()) errors.message = 'Message is required';
//     if (formData.phone && !/^[\d\s+()-]+$/.test(formData.phone)) {
//       errors.phone = 'Phone number contains invalid characters';
//     }
//     setValidationErrors(errors);
//     return Object.keys(errors).length === 0;
//   };

//   // Generate a random reference number
//   const generateReferenceNumber = () => {
//     return 'INV-' + Math.floor(Math.random() * 10000).toString().padStart(4, '0');
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateForm()) return;

//     setIsLoading(true);
//     setError('');
//     setIsSuccess(false);

//     try {
//       emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);

//       const referenceNumber = generateReferenceNumber();
//       const submissionTime = new Date().toLocaleString('en-US', {
//         dateStyle: 'full',
//         timeStyle: 'long'
//       });

//       const teamParams = {
//         to_email: 'info@invictuslogi.com',
//         title: formData.subject || 'New Inquiry',
//         from_name: formData.name,
//         from_email: formData.email,
//         reply_to: formData.email,
//         phone: formData.phone || 'Not provided',
//         company: formData.company || 'Not provided',
//         subject: formData.subject || 'General Inquiry',
//         message: formData.message,
//         submitted_at: submissionTime,
//         reference_number: referenceNumber
//       };

//       await emailjs.send(
//         EMAILJS_CONFIG.SERVICE_ID,
//         EMAILJS_CONFIG.TEAM_TEMPLATE_ID,
//         teamParams
//       );

//       const autoReplyParams = {
//         to_email: formData.email,
//         to_name: formData.name,
//         from_name: 'Invictus Logistics',
//         from_email: 'info@invictuslogi.com',
//         reply_to: 'info@invictuslogi.com',
//         subject: formData.subject || 'General Inquiry',
//         message: formData.message,
//         submitted_at: submissionTime,
//         reference_number: referenceNumber
//       };

//       await emailjs.send(
//         EMAILJS_CONFIG.SERVICE_ID,
//         EMAILJS_CONFIG.AUTO_REPLY_TEMPLATE_ID,
//         autoReplyParams
//       );

//       setIsSuccess(true);
//       setFormData({
//         name: '',
//         email: '',
//         phone: '',
//         company: '',
//         subject: '',
//         message: ''
//       });
//       setValidationErrors({});
//     } catch (err) {
//       console.error('EmailJS error:', err);
//       setError(
//         err?.text
//           ? `Failed: ${err.text}`
//           : 'Failed to send message. Please try again or contact us directly via phone.'
//       );
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Contact info cards data
//   const contactInfo = [
//     {
//       icon: <FaPhone />,
//       title: 'Call Us',
//       details: ['+31685865799'],
//       description: 'Available 24/7',
//       color: 'from-[#E65100] to-[#FFD700]',
//       bgColor: 'bg-gradient-to-br from-[#E65100]/10 to-[#FFD700]/10',
//       action: 'tel:+31685865799'
//     },
//     {
//       icon: <FaEnvelope />,
//       title: 'Email Us',
//       details: ['info@invictuslogi.com'],
//       description: 'Response within 2 hours',
//       color: 'from-[#FF8F00] to-[#FFD700]',
//       bgColor: 'bg-gradient-to-br from-[#FF8F00]/10 to-[#FFD700]/10',
//       action: 'mailto:info@invictuslogi.com'
//     },
//     {
//       icon: <FaWhatsapp />,
//       title: 'WhatsApp',
//       details: ['+918291293651'],
//       description: 'Instant chat support',
//       color: 'from-green-500 to-green-600',
//       bgColor: 'bg-gradient-to-br from-green-500/10 to-green-600/10',
//       action: 'https://wa.me/918291293651'
//     }
//   ];

//   // Enhanced amenities data
//   const amenities = [
//     { icon: <FaParking className="text-green-600" />, title: 'Parking', detail: 'Secure Underground', status: '24/7 Available', color: 'green' },
//     { icon: <FaPlane className="text-blue-600" />, title: 'Nearest Airport', detail: 'Rotterdam The Hague', status: 'RTM - 15 min', color: 'blue' },
//     { icon: <FaRegBuilding className="text-purple-600" />, title: 'Meeting Rooms', detail: 'Smart Conference', status: 'Book Online', color: 'purple' },
//     { icon: <FaWifi className="text-orange-600" />, title: 'High-Speed WiFi', detail: '1 Gbps Fiber', status: 'Free Access', color: 'orange' },
//     { icon: <FaCoffee className="text-amber-700" />, title: 'Refreshments', detail: 'Coffee & Snacks', status: 'Complimentary', color: 'amber' },
//     { icon: <MdAccessible className="text-teal-600" />, title: 'Accessibility', detail: 'Wheelchair Access', status: 'Fully Equipped', color: 'teal' }
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white overflow-x-hidden -mt-10">
//       {/* Hero Section - Mobile Optimized */}
//       <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white/80 py-12 sm:py-16 md:py-20">
//         <div className="absolute inset-0 opacity-10">
//           <div className="absolute top-1/4 left-1/4 w-48 sm:w-64 h-48 sm:h-64 bg-[#E65100]/70 rounded-full blur-3xl animate-pulse-slow"></div>
//           <div className="absolute bottom-1/4 right-1/4 w-48 sm:w-64 h-48 sm:h-64 bg-[#FFD700]/70 rounded-full blur-3xl animate-pulse-slower"></div>
//         </div>

//         <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 text-center">
//           <h1 className="text-2xl sm:text-3xl md:text-5xl font-light mb-4 sm:mb-6 leading-snug tracking-wide text-white/70 font-medium">
//             Get In{" "}
//             <span className="bg-gradient-to-r from-[#E65100] via-[#FFD700] to-[#FF8F00] bg-clip-text text-transparent font-medium animate-gradient">
//               Touch
//             </span>
//           </h1>

//           <p className="text-sm sm:text-base md:text-lg max-w-2xl mx-auto text-gray-400/80 mb-8 sm:mb-10 leading-relaxed font-medium px-7">
//             Connect with our logistics experts for tailored solutions that streamline your supply chain
//           </p>

//           {/* <div className="flex flex-wrap justify-center gap-6 sm:gap-10 md:gap-14 mt-8 sm:mt-12">
//             <div className="text-center group">
//               <div className="text-xl sm:text-3xl font-bold text-[#FFD700]/90 mb-1 animate-pulse">24/7</div>
//               <div className="text-gray-400/80 flex items-center justify-center gap-2 text-xs sm:text-sm font-medium">
//                 <FaClock className="text-[#FFD700]/80 text-base sm:text-xl animate-spin-slow" />
//                 <span>Support Available</span>
//               </div>
//             </div>
//             <div className="text-center group">
//               <div className="text-xl sm:text-3xl font-bold text-[#FFD700]/90 mb-1">2h</div>
//               <div className="text-gray-400/80 flex items-center justify-center gap-2 text-xs sm:text-sm font-medium">
//                 <FaHeadset className="text-[#FFD700]/80 text-xs sm:text-xl" />
//                 <span>Avg. Response Time</span>
//               </div>
//             </div> 
//             <div className="text-center group">
//               <div className="text-xl sm:text-3xl font-bold text-[#FFD700]/90 mb-1">150+</div>
//               <div className="text-gray-400/80 flex items-center justify-center gap-2 text-xs sm:text-sm font-medium">
//                 <FaGlobe className="text-[#FFD700]/80 text-xs sm:text-xl animate-rotate-slow" />
//                 <span>Countries Supported</span>
//               </div>
//             </div>
//           </div> */}
//         </div>
//       </section>

//       {/* Main Content */}
//       <section className="relative -mt-8 sm:-mt-12 md:-mt-16 pb-12 sm:pb-16 md:pb-20">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="max-w-7xl mx-auto">
//             <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
//               {/* Contact Information Cards */}
//               <div className="space-y-6 sm:space-y-8 order-2 lg:order-1">
//                 {contactInfo.map((info, index) => (
//                   <a
//                     key={index}
//                     href={info.action}
//                     target={info.action.startsWith('http') ? '_blank' : undefined}
//                     rel={info.action.startsWith('http') ? 'noopener noreferrer' : undefined}
//                     className="group relative overflow-hidden block transform hover:-translate-y-1 transition-all duration-300"
//                   >
//                     <div className="absolute inset-0 bg-gradient-to-r from-[#E65100]/5 to-transparent rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
//                     <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-5 sm:p-6 md:p-8 border border-gray-100 hover:border-[#E65100]/30 transition-all duration-300 hover:shadow-2xl">
//                       <div className="flex items-start mb-4 sm:mb-6">
//                         <div className={`w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r ${info.color} rounded-xl sm:rounded-2xl flex items-center justify-center mr-4 sm:mr-5 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
//                           <div className="text-white text-lg sm:text-2xl">{info.icon}</div>
//                         </div>
//                         <div>
//                           <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1 group-hover:text-[#E65100] transition-colors">{info.title}</h3>
//                           <p className="text-gray-500 text-xs sm:text-sm">{info.description}</p>
//                         </div>
//                       </div>
//                       <div className="space-y-1 sm:space-y-2">
//                         {info.details.map((detail, idx) => (
//                           <p key={idx} className="text-gray-700 font-medium text-base sm:text-lg break-all">{detail}</p>
//                         ))}
//                       </div>
//                     </div>
//                   </a>
//                 ))}

//                 {/* Office Hours Card with Live Clock */}
//                 <div className="group relative overflow-hidden">
//                   <div className="absolute inset-0 bg-gradient-to-r from-[#FFD700]/5 to-transparent rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
//                   <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-2xl shadow-xl p-5 sm:p-6 md:p-8 border border-gray-800">
//                     <div className="flex items-center mb-4 sm:mb-6">
//                       <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-[#E65100] to-[#FFD700] rounded-xl sm:rounded-2xl flex items-center justify-center mr-4 sm:mr-5 shadow-lg group-hover:scale-110 transition-transform">
//                         <FaClock className="text-white text-lg sm:text-2xl" />
//                       </div>
//                       <div>
//                         <h3 className="text-xl sm:text-2xl font-bold mb-1">Business Hours</h3>
//                         <p className="text-gray-100 text-xs sm:text-sm">We're here when you need us</p>
//                       </div>
//                     </div>
//                     <div className="space-y-3 sm:space-y-4">
//                       <div className="flex justify-between items-center pb-2 sm:pb-3 border-b border-gray-700 text-sm sm:text-base">
//                         <span className="text-gray-300">Monday - Friday</span>
//                         <span className="font-bold text-[#FFD700]">9:00 AM - 6:00 PM</span>
//                       </div>
//                       <div className="flex justify-between items-center pb-2 sm:pb-3 border-b border-gray-700 text-sm sm:text-base">
//                         <span className="text-gray-300">Saturday</span>
//                         <span className="font-bold text-[#FFD700]">10:00 AM - 4:00 PM</span>
//                       </div>
//                       <div className="flex justify-between items-center text-sm sm:text-base">
//                         <span className="text-gray-300">Sunday</span>
//                         <span className="font-bold text-[#FFD700]">Emergency Only</span>
//                       </div>
//                     </div>
//                     {/* Live Clock Display */}
//                     <div className="mt-4 pt-3 border-t border-gray-700/50 flex justify-between items-center">
//                       <span className="text-gray-400 text-xs">Local Time (The Hague)</span>
//                       <span className="font-mono text-[#FFD700] text-sm font-bold animate-pulse">{currentTime || '--:--'}</span>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Emergency Support */}
//                 <div className="bg-gradient-to-r from-[#E65100]/10 to-[#FFD700]/10 rounded-2xl p-5 sm:p-6 border border-[#E65100]/20">
//                   <div className="flex items-center mb-3 sm:mb-4">
//                     <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-[#E65100] to-[#FFD700] rounded-lg sm:rounded-xl flex items-center justify-center mr-3 sm:mr-4 animate-pulse-glow">
//                       <FaHeadset className="text-white text-base sm:text-xl" />
//                     </div>
//                     <div>
//                       <h4 className="font-bold text-base sm:text-lg text-gray-700">Emergency Support</h4>
//                       <p className="text-xs sm:text-sm text-gray-600">Critical shipments only</p>
//                     </div>
//                   </div>
//                   <p className="text-gray-700 text-xs sm:text-sm mb-3">
//                     For urgent shipment issues requiring immediate attention
//                   </p>
//                   <a href="tel:+31685865799" className="flex items-center group">
//                     <FaPhone className="text-[#E65100] mr-2 group-hover:animate-bounce text-sm" />
//                     <span className="font-bold text-gray-900 group-hover:text-[#E65100] transition-colors text-sm sm:text-base">+31685865799</span>
//                   </a>
//                 </div>
//               </div>

//               {/* Contact Form Section */}
//               <div className="lg:col-span-2 order-1 lg:order-2">
//                 <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl shadow-2xl mb-8">
//                   <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50"></div>
//                   <div className="relative p-5 sm:p-8 md:p-12">
//                     <div className="flex items-center mb-6 sm:mb-8 md:mb-10">
//                       <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-[#E65100] to-[#FFD700] rounded-xl sm:rounded-2xl flex items-center justify-center mr-4 sm:mr-6 shadow-lg animate-float">
//                         <FaPaperPlane className="text-white text-lg sm:text-2xl" />
//                       </div>
//                       <div>
//                         <h2 className="text-xl sm:text-2xl md:text-3xl font-light text-gray-700/80 mb-1 tracking-wide font-medium">
//                           Send Us a Message
//                         </h2>
//                         <p className="text-gray-500/80 font-light text-lg leading-relaxed">
//                           Fill out the form below and we'll get back to you promptly
//                         </p>
//                       </div>
//                     </div>

//                     <form ref={formRef} onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
//                         <div className="group">
//                           <label className="block text-sm font-semibold text-gray-700 mb-2 sm:mb-3 flex items-center">
//                             <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-[#E65100]/10 to-[#FFD700]/10 rounded-lg flex items-center justify-center mr-2 sm:mr-3 group-hover:scale-110 transition-transform">
//                               <FaUser className="text-[#E65100] text-xs sm:text-sm" />
//                             </div>
//                             Full Name *
//                           </label>
//                           <input
//                             type="text"
//                             name="name"
//                             value={formData.name}
//                             onChange={handleChange}
//                             required
//                             className={`w-full px-4 sm:px-5 py-3 sm:py-4 text-gray-600 bg-white border-2 ${
//                               validationErrors.name ? 'border-red-500' : 'border-gray-200'
//                             } rounded-xl focus:outline-none focus:border-[#E65100] focus:ring-4 focus:ring-[#E65100]/20 transition-all duration-300 text-sm sm:text-base`}
//                             placeholder="John Doe"
//                           />
//                           {validationErrors.name && <p className="mt-1 text-xs sm:text-sm text-red-600">{validationErrors.name}</p>}
//                         </div>

//                         <div className="group">
//                           <label className="block text-sm font-semibold text-gray-700 mb-2 sm:mb-3 flex items-center">
//                             <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-[#E65100]/10 to-[#FFD700]/10 rounded-lg flex items-center justify-center mr-2 sm:mr-3 group-hover:scale-110 transition-transform">
//                               <FaEnvelope className="text-[#E65100] text-xs sm:text-sm" />
//                             </div>
//                             Email Address *
//                           </label>
//                           <input
//                             type="email"
//                             name="email"
//                             value={formData.email}
//                             onChange={handleChange}
//                             required
//                             className={`w-full px-4 sm:px-5 py-3 sm:py-4 text-gray-600 bg-white border-2 ${
//                               validationErrors.email ? 'border-red-500' : 'border-gray-200'
//                             } rounded-xl focus:outline-none focus:border-[#E65100] focus:ring-4 focus:ring-[#E65100]/20 transition-all duration-300 text-sm sm:text-base`}
//                             placeholder="john@example.com"
//                           />
//                           {validationErrors.email && <p className="mt-1 text-xs sm:text-sm text-red-600">{validationErrors.email}</p>}
//                         </div>
//                       </div>

//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
//                         <div className="group">
//                           <label className="block text-sm font-semibold text-gray-700 mb-2 sm:mb-3 flex items-center">
//                             <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-[#FF8F00]/10 to-[#FFD700]/10 rounded-lg flex items-center justify-center mr-2 sm:mr-3 group-hover:scale-110 transition-transform">
//                               <FaPhone className="text-[#FF8F00] text-xs sm:text-sm" />
//                             </div>
//                             Phone Number
//                           </label>
//                           <input
//                             type="tel"
//                             name="phone"
//                             value={formData.phone}
//                             onChange={handleChange}
//                             className={`w-full px-4 sm:px-5 py-3 sm:py-4 text-gray-600 bg-white border-2 ${
//                               validationErrors.phone ? 'border-red-500' : 'border-gray-200'
//                             } rounded-xl focus:outline-none focus:border-[#E65100] focus:ring-4 focus:ring-[#E65100]/20 transition-all duration-300 text-sm sm:text-base`}
//                             placeholder="+31 6 85865799"
//                           />
//                           {validationErrors.phone && <p className="mt-1 text-xs sm:text-sm text-red-600">{validationErrors.phone}</p>}
//                         </div>

//                         <div className="group">
//                           <label className="block text-sm font-semibold text-gray-700 mb-2 sm:mb-3 flex items-center">
//                             <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-[#FF8F00]/10 to-[#FFD700]/10 rounded-lg flex items-center justify-center mr-2 sm:mr-3 group-hover:scale-110 transition-transform">
//                               <FaBuilding className="text-[#FF8F00] text-xs sm:text-sm" />
//                             </div>
//                             Company
//                           </label>
//                           <input
//                             type="text"
//                             name="company"
//                             value={formData.company}
//                             onChange={handleChange}
//                             className="w-full px-4 sm:px-5 py-3 sm:py-4 text-gray-600 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#E65100] focus:ring-4 focus:ring-[#E65100]/20 transition-all duration-300 text-sm sm:text-base"
//                             placeholder="Your Company Name"
//                           />
//                         </div>
//                       </div>

//                       <div className="group">
//                         <label className="block text-sm font-semibold text-gray-700 mb-2 sm:mb-3 flex items-center">
//                           <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-[#E65100]/10 to-[#FFD700]/10 rounded-lg flex items-center justify-center mr-2 sm:mr-3 group-hover:scale-110 transition-transform">
//                             <FaClipboard className="text-[#E65100] text-xs sm:text-sm" />
//                           </div>
//                           Subject
//                         </label>
//                         <select
//                           name="subject"
//                           value={formData.subject}
//                           onChange={handleChange}
//                           className="w-full px-4 sm:px-5 py-3 sm:py-4 text-gray-600 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#E65100] focus:ring-4 focus:ring-[#E65100]/20 transition-all duration-300 text-sm sm:text-base appearance-none cursor-pointer"
//                         >
//                           <option value="">Select a subject</option>
//                           <option value="quote">📋 Get a Quote</option>
//                           <option value="tracking">📍 Tracking Issue</option>
//                           <option value="service">⚡ Service Inquiry</option>
//                           <option value="partnership">🤝 Partnership Opportunity</option>
//                           <option value="urgent">🚨 Urgent Shipment</option>
//                           <option value="other">💬 Other</option>
//                         </select>
//                       </div>

//                       <div className="group">
//                         <label className="block text-sm font-semibold text-gray-700 mb-2 sm:mb-3">Message *</label>
//                         <textarea
//                           name="message"
//                           value={formData.message}
//                           onChange={handleChange}
//                           required
//                           rows="5"
//                           className={`w-full text-gray-600 px-4 sm:px-5 py-3 sm:py-4 bg-white border-2 ${
//                             validationErrors.message ? 'border-red-500' : 'border-gray-200'
//                           } rounded-xl focus:outline-none focus:border-[#E65100] focus:ring-4 focus:ring-[#E65100]/20 transition-all duration-300 text-sm sm:text-base resize-none`}
//                           placeholder="Tell us about your logistics needs, challenges, and how we can help streamline your supply chain..."
//                         />
//                         {validationErrors.message && <p className="mt-1 text-xs sm:text-sm text-red-600">{validationErrors.message}</p>}
//                       </div>

//                       {isSuccess && (
//                         <div className="p-4 sm:p-6 bg-green-50 border border-green-200 rounded-xl flex items-start animate-fadeIn">
//                           <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-500 rounded-full flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0">
//                             <FaCheckCircle className="text-white text-sm sm:text-xl" />
//                           </div>
//                           <div>
//                             <p className="font-semibold text-green-800 text-sm sm:text-lg mb-1">Message sent successfully!</p>
//                             <p className="text-green-600 text-xs sm:text-sm">We'll get back to you within 2 hours. A confirmation has been sent to your email.</p>
//                             <p className="text-green-500 text-xs sm:text-sm mt-2">Reference: {generateReferenceNumber()}</p>
//                           </div>
//                         </div>
//                       )}

//                       {error && (
//                         <div className="p-4 sm:p-6 bg-red-50 border border-red-200 rounded-xl flex items-start animate-fadeIn">
//                           <div className="w-8 h-8 sm:w-10 sm:h-10 bg-red-500 rounded-full flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0">
//                             <FaExclamationTriangle className="text-white text-sm sm:text-xl" />
//                           </div>
//                           <div>
//                             <p className="font-semibold text-red-800 text-sm sm:text-lg mb-1">{error}</p>
//                             <p className="text-red-600 text-xs sm:text-sm">Please try again or use our phone/email directly.</p>
//                           </div>
//                         </div>
//                       )}

//                       <div className="flex flex-col sm:flex-row items-center justify-between pt-4 sm:pt-6 border-t border-gray-100 gap-4">
//                         <div className="flex items-center">
//                           <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-[#FF8F00]/10 to-[#FFD700]/10 rounded-lg flex items-center justify-center mr-2 sm:mr-3">
//                             <FaShieldAlt className="text-[#FF8F00] text-xs sm:text-sm" />
//                           </div>
//                           <div>
//                             <p className="text-xs sm:text-sm text-gray-600">Secure & encrypted form</p>
//                             <p className="text-[10px] sm:text-xs text-gray-500">Your information is protected</p>
//                           </div>
//                         </div>
                        
//                         <button
//                           type="submit"
//                           disabled={isLoading}
//                           className={`group relative cursor-pointer overflow-hidden bg-gradient-to-r from-[#E65100] to-[#FFD700] hover:from-[#FF8F00] hover:to-[#E65100] text-white font-bold py-3 sm:py-4 px-6 sm:px-10 rounded-xl sm:rounded-2xl text-sm sm:text-base md:text-lg transition-all duration-300 hover:shadow-xl hover:scale-105 flex items-center shadow-lg w-full sm:w-auto justify-center ${
//                             isLoading ? 'opacity-80 cursor-not-allowed' : ''
//                           }`}
//                         >
//                           <span className="relative z-10 flex items-center">
//                             {isLoading ? (
//                               <>
//                                 <FaSpinner cursor-pointer className="mr-2 animate-spin" />
//                                 Sending...
//                               </>
//                             ) : (
//                               <>
//                                 <FaPaperPlane cursor-pointer className="mr-2 group-hover:translate-x-1 transition-transform" />
//                                 Send Message
//                               </>
//                             )}
//                           </span>
//                           <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
//                         </button>
//                       </div>
//                     </form>
//                   </div>
//                 </div>

//                 {/* ENHANCED LOCATION SECTION - Without Dots */}
//                 <div 
//                   className="bg-gradient-to-br from-gray-50 to-white rounded-2xl sm:rounded-3xl shadow-xl p-5 sm:p-8 border border-gray-100 transition-all duration-500 hover:shadow-2xl overflow-hidden relative group/location"
//                   onMouseEnter={() => setIsMapHovered(true)}
//                   onMouseLeave={() => setIsMapHovered(false)}
//                 >
//                   {/* Animated Background Particles - No dots, just smooth gradients */}
//                   <div className="absolute inset-0 pointer-events-none overflow-hidden">
//                     <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#FFD700]/5 rounded-full blur-3xl animate-pulse-slow"></div>
//                     <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#E65100]/5 rounded-full blur-3xl animate-pulse-slower"></div>
//                     <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-r from-transparent via-[#FF8F00]/5 to-transparent animate-shimmer-horizontal"></div>
//                   </div>

//                   {/* Header with animated icon */}
//                   <div className="flex items-center mb-5 sm:mb-8 relative z-10">
//                     <div className="w-10 h-10 sm:w-14 sm:h-14 bg-gradient-to-r from-[#FF8F00] to-[#FFD700] rounded-xl sm:rounded-2xl flex items-center justify-center mr-4 sm:mr-5 shadow-lg animate-float group-hover/location:scale-110 transition-all duration-300">
//                       <FaGlobe className="text-white text-base sm:text-xl animate-spin-slow" />
//                     </div>
//                     <div>
//                       <h3 className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent mb-1">
//                         Global Headquarters
//                       </h3>
//                       <div className="flex items-center gap-2 text-gray-500 text-xs sm:text-sm">
//                         <span className="flex items-center gap-1">
//                           <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
//                           Operational
//                         </span>
//                         <span>•</span>
//                         <span className="flex items-center gap-1">
//                           {weatherIcon} {weatherTemp}
//                         </span>
//                         <span>•</span>
//                         <span className="font-mono">{currentTime}</span>
//                       </div>
//                     </div>
//                   </div>
                  
//                   {/* Map Container with Enhanced Animations - No Dots */}
//                   <div className="relative overflow-hidden rounded-xl sm:rounded-2xl border-2 border-gray-200 transition-all duration-500 group-hover/location:border-[#FFD700]/50">
//                     {/* Animated Map Background - Clean gradient without dot patterns */}
//                     <div className="bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 h-64 sm:h-80 flex flex-col items-center justify-center relative transition-all duration-500 group-hover/location:scale-105">
                      
//                       {/* Moving Light Beams */}
//                       <div className="absolute inset-0 opacity-0 group-hover/location:opacity-100 transition-opacity duration-700">
//                         <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#FFD700]/10 via-transparent to-[#E65100]/10 animate-sweep"></div>
//                       </div>

//                       {/* Pulsing Rings */}
//                       <div className="absolute inset-0 flex items-center justify-center">
//                         <div className="absolute w-40 h-40 rounded-full border-2 border-[#E65100]/20 animate-ping-ring"></div>
//                         <div className="absolute w-60 h-60 rounded-full border border-[#FFD700]/15 animate-ping-ring-delayed"></div>
//                         <div className="absolute w-80 h-80 rounded-full border border-[#FF8F00]/10 animate-ping-ring-slower"></div>
//                       </div>
                      
//                       {/* Animated Marker Section */}
//                       <div className="relative z-10 group/marker cursor-pointer text-center px-4 transform transition-all duration-500 hover:scale-110">
//                         {/* Floating Marker with Bounce */}
//                         <div className="relative w-14 h-14 sm:w-20 sm:h-20 bg-gradient-to-r from-[#E65100] to-[#FFD700] rounded-full flex items-center justify-center mb-3 sm:mb-4 shadow-2xl transition-all duration-300 animate-float-bounce mx-auto">
//                           {/* Glow Effects */}
//                           <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#E65100] to-[#FFD700] opacity-75 blur-md animate-pulse-glow"></div>
//                           <div className="absolute inset-0 rounded-full bg-[#FFD700] opacity-50 animate-ripple"></div>
//                           <FaMapMarkerAlt className="text-white text-xl sm:text-3xl z-10 relative drop-shadow-lg animate-pulse-light" />
//                         </div>
                        
//                         <div className="transform transition-all duration-300 group-hover/marker:scale-105 group-hover/marker:-translate-y-2">
//                           <p className="text-base sm:text-xl font-extrabold text-gray-800 mb-1 tracking-tight flex items-center justify-center gap-2">
//                             Leyweg 836
//                             <span className="text-xs bg-[#E65100]/10 text-[#E65100] px-2 py-0.5 rounded-full animate-pulse">HQ</span>
//                           </p>
//                           <p className="text-gray-600 text-sm sm:text-lg font-medium flex items-center justify-center gap-1">
//                             <MdLocationOn className="text-[#E65100] animate-bounce-custom" />
//                             2545GR The Hague, Netherlands
//                           </p>
//                           <div className="mt-4 sm:mt-6">
//                             <a 
//                               href="https://maps.google.com/?q=Leyweg+836+2545GR+The+Hague+Netherlands" 
//                               target="_blank" 
//                               rel="noopener noreferrer"
//                               className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-white border-2 border-[#E65100] text-[#E65100] font-semibold rounded-lg text-xs sm:text-sm hover:bg-[#E65100] hover:text-white transition-all duration-300 group/btn hover:shadow-xl relative overflow-hidden"
//                             >
//                               <span className="relative z-10 flex items-center">
//                                 <FaDirections className="mr-2 text-sm group-hover/btn:animate-bounce" />
//                                 <span>Get Directions</span>
//                                 <FaArrowRight className="ml-2 transition-transform duration-300 group-hover/btn:translate-x-1" />
//                               </span>
//                               <div className="absolute inset-0 bg-gradient-to-r from-[#E65100] to-[#FFD700] translate-x-[-100%] group-hover/btn:translate-x-0 transition-transform duration-300"></div>
//                             </a>
//                           </div>
//                         </div>
//                       </div>

//                       {/* Decorative elements */}
//                       <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-gray-100 to-transparent pointer-events-none"></div>
//                     </div>
                    
//                     {/* Enhanced Amenities Grid with Hover Animations */}
//                     <div className="bg-white p-4 sm:p-6 border-t border-gray-200">
//                       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 sm:gap-4">
//                         {amenities.map((item, idx) => (
//                           <div 
//                             key={idx}
//                             className="group/amenity relative cursor-pointer"
//                             onMouseEnter={() => setActiveAmenity(idx)}
//                             onMouseLeave={() => setActiveAmenity(null)}
//                           >
//                             <div className={`flex flex-col items-center text-center p-2 sm:p-3 rounded-xl transition-all duration-300 transform hover:scale-105 ${
//                               activeAmenity === idx ? 'shadow-lg bg-gradient-to-br from-white to-gray-50' : ''
//                             }`}
//                             style={{
//                               boxShadow: activeAmenity === idx ? `0 10px 25px -5px ${item.color === 'green' ? 'rgba(34,197,94,0.2)' : item.color === 'blue' ? 'rgba(59,130,246,0.2)' : item.color === 'purple' ? 'rgba(168,85,247,0.2)' : 'rgba(249,115,22,0.2)'}` : 'none'
//                             }}>
//                               <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center mb-2 transition-all duration-300 group-hover/amenity:scale-110 group-hover/amenity:rotate-6 ${
//                                 item.color === 'green' ? 'bg-green-100' : 
//                                 item.color === 'blue' ? 'bg-blue-100' : 
//                                 item.color === 'purple' ? 'bg-purple-100' : 
//                                 item.color === 'orange' ? 'bg-orange-100' :
//                                 item.color === 'amber' ? 'bg-amber-100' : 'bg-teal-100'
//                               }`}>
//                                 <div className="text-base sm:text-lg">{item.icon}</div>
//                               </div>
//                               <p className="text-[10px] sm:text-xs font-bold text-gray-700">{item.title}</p>
//                               <p className="text-[8px] sm:text-[10px] text-gray-500 mt-0.5">{item.detail}</p>
//                               {activeAmenity === idx && (
//                                 <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-[10px] px-2 py-1 rounded-full whitespace-nowrap z-20 animate-slide-up">
//                                   {item.status}
//                                 </div>
//                               )}
//                             </div>
//                           </div>
//                         ))}
//                       </div>
//                     </div>

//                     {/* Rating Badge */}
//                     <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-lg flex items-center gap-1 animate-pulse-glow z-20">
//                       <FaStar className="text-yellow-500 text-xs" />
//                       <FaStar className="text-yellow-500 text-xs" />
//                       <FaStar className="text-yellow-500 text-xs" />
//                       <FaStar className="text-yellow-500 text-xs" />
//                       <FaStarHalfAlt className="text-yellow-500 text-xs" />
//                       <span className="text-xs font-bold text-gray-700 ml-1">4.9</span>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Quick Contact Tips */}
//                 <div className="mt-6 sm:mt-8 p-4 sm:p-6 bg-gradient-to-r from-[#E65100]/5 to-[#FFD700]/5 rounded-xl sm:rounded-2xl border border-[#E65100]/20">
//                   <h4 className="font-bold text-base sm:text-lg text-gray-700 mb-3 sm:mb-4 flex items-center">
//                     <FaShieldAlt className="text-[#E65100] mr-2 text-sm sm:text-base animate-pulse" />
//                     Quick Tips for Faster Response
//                   </h4>
//                   <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
//                     <li className="flex items-center text-xs sm:text-sm text-gray-700 group hover:text-[#E65100] transition-colors">
//                       <div className="w-5 h-5 sm:w-6 sm:h-6 bg-[#E65100]/20 rounded-full flex items-center justify-center mr-2 group-hover:bg-[#E65100] group-hover:text-white transition-all">
//                         <span className="text-[#E65100] text-[10px] sm:text-xs group-hover:text-white">1</span>
//                       </div>
//                       Include tracking numbers if applicable
//                     </li>
//                     <li className="flex items-center text-xs sm:text-sm text-gray-700 group hover:text-[#E65100] transition-colors">
//                       <div className="w-5 h-5 sm:w-6 sm:h-6 bg-[#E65100]/20 rounded-full flex items-center justify-center mr-2 group-hover:bg-[#E65100] group-hover:text-white transition-all">
//                         <span className="text-[#E65100] text-[10px] sm:text-xs group-hover:text-white">2</span>
//                       </div>
//                       Specify shipment urgency level
//                     </li>
//                     <li className="flex items-center text-xs sm:text-sm text-gray-700 group hover:text-[#E65100] transition-colors">
//                       <div className="w-5 h-5 sm:w-6 sm:h-6 bg-[#E65100]/20 rounded-full flex items-center justify-center mr-2 group-hover:bg-[#E65100] group-hover:text-white transition-all">
//                         <span className="text-[#E65100] text-[10px] sm:text-xs group-hover:text-white">3</span>
//                       </div>
//                       Mention preferred contact method
//                     </li>
//                     <li className="flex items-center text-xs sm:text-sm text-gray-700 group hover:text-[#E65100] transition-colors">
//                       <div className="w-5 h-5 sm:w-6 sm:h-6 bg-[#E65100]/20 rounded-full flex items-center justify-center mr-2 group-hover:bg-[#E65100] group-hover:text-white transition-all">
//                         <span className="text-[#E65100] text-[10px] sm:text-xs group-hover:text-white">4</span>
//                       </div>
//                       Provide company VAT for quotes
//                     </li>
//                   </ul>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       <style jsx global>{`
//         @keyframes fadeIn {
//           from { opacity: 0; transform: translateY(-10px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//         @keyframes gradient {
//           0% { background-position: 0% 50%; }
//           50% { background-position: 100% 50%; }
//           100% { background-position: 0% 50%; }
//         }
//         @keyframes bounce-slow {
//           0%, 100% { transform: translateY(0); }
//           50% { transform: translateY(-10px); }
//         }
//         @keyframes float {
//           0%, 100% { transform: translateY(0px); }
//           50% { transform: translateY(-8px); }
//         }
//         @keyframes float-bounce {
//           0%, 100% { transform: translateY(0) rotate(0deg); }
//           50% { transform: translateY(-12px) rotate(3deg); }
//         }
//         @keyframes pulse-glow {
//           0% { box-shadow: 0 0 0 0 rgba(230, 81, 0, 0.4); }
//           70% { box-shadow: 0 0 0 15px rgba(230, 81, 0, 0); }
//           100% { box-shadow: 0 0 0 0 rgba(230, 81, 0, 0); }
//         }
//         @keyframes pulse-light {
//           0%, 100% { opacity: 0.7; transform: scale(1); }
//           50% { opacity: 1; transform: scale(1.05); }
//         }
//         @keyframes ping-ring {
//           0% { transform: scale(0.8); opacity: 0.5; }
//           100% { transform: scale(1.5); opacity: 0; }
//         }
//         @keyframes ripple {
//           0% { transform: scale(0.8); opacity: 0.6; }
//           100% { transform: scale(1.6); opacity: 0; }
//         }
//         @keyframes sweep {
//           0% { transform: translateX(-100%) rotate(0deg); }
//           100% { transform: translateX(100%) rotate(0deg); }
//         }
//         @keyframes shimmer-horizontal {
//           0% { transform: translateX(-100%); }
//           100% { transform: translateX(100%); }
//         }
//         @keyframes slide-up {
//           from { opacity: 0; transform: translate(-50%, 10px); }
//           to { opacity: 1; transform: translate(-50%, -2px); }
//         }
//         @keyframes rotate-slow {
//           from { transform: rotate(0deg); }
//           to { transform: rotate(360deg); }
//         }
//         @keyframes spin-slow {
//           from { transform: rotate(0deg); }
//           to { transform: rotate(360deg); }
//         }
//         @keyframes bounce-custom {
//           0%, 100% { transform: translateY(0); }
//           50% { transform: translateY(-3px); }
//         }
//         .animate-fadeIn { animation: fadeIn 0.3s ease-out; }
//         .animate-gradient { animation: gradient 3s ease infinite; background-size: 200% auto; }
//         .animate-bounce-slow { animation: bounce-slow 2s ease-in-out infinite; }
//         .animate-float { animation: float 3s ease-in-out infinite; }
//         .animate-float-bounce { animation: float-bounce 2.5s ease-in-out infinite; }
//         .animate-pulse-glow { animation: pulse-glow 2s ease-in-out infinite; }
//         .animate-pulse-light { animation: pulse-light 1.5s ease-in-out infinite; }
//         .animate-ping-ring { animation: ping-ring 2s ease-out infinite; }
//         .animate-ping-ring-delayed { animation: ping-ring 2s ease-out 0.7s infinite; }
//         .animate-ping-ring-slower { animation: ping-ring 2.5s ease-out 1.4s infinite; }
//         .animate-ripple { animation: ripple 1.5s ease-out infinite; }
//         .animate-sweep { animation: sweep 3s ease-in-out infinite; }
//         .animate-shimmer-horizontal { animation: shimmer-horizontal 4s ease-in-out infinite; }
//         .animate-slide-up { animation: slide-up 0.2s ease-out forwards; }
//         .animate-rotate-slow { animation: rotate-slow 12s linear infinite; }
//         .animate-spin-slow { animation: spin-slow 8s linear infinite; }
//         .animate-bounce-custom { animation: bounce-custom 1s ease-in-out infinite; }
//         .animate-pulse-slow { animation: pulse-slow 5s ease-in-out infinite; }
//         .animate-pulse-slower { animation: pulse-slower 7s ease-in-out infinite; }
        
//         @keyframes pulse-slow {
//           0%, 100% { opacity: 0.1; transform: scale(1); }
//           50% { opacity: 0.15; transform: scale(1.05); }
//         }
//         @keyframes pulse-slower {
//           0%, 100% { opacity: 0.08; transform: scale(1); }
//           50% { opacity: 0.12; transform: scale(1.08); }
//         }
        
//         .animate-spin { animation: spin 1s linear infinite; }
//         @keyframes spin {
//           from { transform: rotate(0deg); }
//           to { transform: rotate(360deg); }
//         }
//       `}</style>
      
//     </div>
//   );
// }
