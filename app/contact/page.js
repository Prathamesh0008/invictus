"use client";

import { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import Image from "next/image";
import {
  FaArrowRight,
  FaBuilding,
  FaCheckCircle,
  FaClipboard,
  FaClock,
  FaEnvelope,
  FaExclamationTriangle,
  FaHeadset,
  FaMapMarkerAlt,
  FaPaperPlane,
  FaPhone,
  FaShieldAlt,
  FaSpinner,
  FaTruckMoving,
  FaUser,
  FaWhatsapp,
} from "react-icons/fa";

const EMAILJS_CONFIG = {
  SERVICE_ID: "service_w8f4cwo",
  TEAM_TEMPLATE_ID: "template_yxv7zne",
  AUTO_REPLY_TEMPLATE_ID: "template_bq4scyi",
  PUBLIC_KEY: "olGXjuLp7G7NKZfcg",
};

const contactInfo = [
  {
    icon: FaEnvelope,
    title: "Email Us",
    value: "info@invictuslogi.com",
    description: "Send shipment documents or quote requests.",
    href: "mailto:info@invictuslogi.com",
  },
  {
    icon: FaPhone,
    title: "Phone Us",
    value: "+31685865799",
    description: "Speak with our logistics support team.",
    href: "tel:+31685865799",
  },
  {
    icon: FaWhatsapp,
    title: "WhatsApp",
    value: "+918291293651",
    description: "Instant chat for quick shipment questions.",
    href: "https://wa.me/918291293651",
  },
];

const trustItems = [
  { icon: FaTruckMoving, value: "Freight", label: "Road, air, sea support" },
  { icon: FaShieldAlt, value: "Secure", label: "Careful cargo handling" },
  { icon: FaHeadset, value: "24/7", label: "Customer assistance" },
];

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

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("en-US", {
          timeZone: "Europe/Amsterdam",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);

    return () => clearInterval(interval);
  }, []);

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

    if (!formData.name.trim()) errors.name = "Full name is required";

    if (!formData.email.trim()) {
      errors.email = "Email address is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }

    if (formData.phone && !/^[\d\s+()-]+$/.test(formData.phone)) {
      errors.phone = "Phone number contains invalid characters";
    }

    if (!formData.message.trim()) errors.message = "Message is required";

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
    <main className="min-h-screen bg-white text-[#071120]">
      <section className="relative min-h-[430px] overflow-hidden">
        <Image
          src="/client.jpg"
          alt="Logistics support team"
          fill
          sizes="100vw"
          className="absolute inset-0 h-full w-full object-cover"
          priority
        />
        <div className="absolute inset-0 bg-[#071120]/78" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#071120] via-[#071120]/75 to-[#12333B]/40" />

        <div className="relative mx-auto flex min-h-[430px] max-w-7xl items-center justify-center px-5 py-20 text-center sm:px-8">
          <div>
            <p className="mb-5 text-sm font-bold uppercase tracking-[0.22em] text-[#FFD700]">
              Invictus Logistics
            </p>
            <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
              Contact Us
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-white/75">
              We would love to hear what you need to move
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-14 text-[#071120] sm:px-8 lg:py-16">
        <div className="mx-auto grid max-w-7xl items-start gap-10 lg:grid-cols-[0.72fr_1.18fr] xl:gap-14">
          <aside className="rounded-lg border border-gray-200 bg-white p-6 shadow-[0_18px_50px_rgba(7,17,32,0.06)] sm:p-8">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#E65100]">
                Contact Details
              </p>
              <h2 className="mt-4 text-3xl font-bold leading-tight text-[#071120]">
                Logistics support, quotes, and shipment questions.
              </h2>
            </div>

            <div className="mt-8 space-y-6">
              {contactInfo.map((item) => {
                const Icon = item.icon;

                return (
                  <a
                    key={item.title}
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      item.href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="group flex gap-4 border-b border-gray-200 pb-6 last:border-b-0 last:pb-0"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#E65100]/10 text-[#E65100] transition group-hover:bg-[#E65100] group-hover:text-white">
                      <Icon aria-hidden="true" />
                    </span>
                    <span>
                      <span className="block text-sm font-bold text-[#071120]">
                        {item.title}
                      </span>
                      <span className="mt-2 block break-all text-base font-semibold text-[#12333B] group-hover:text-[#E65100]">
                        {item.value}
                      </span>
                      <span className="mt-2 block text-sm leading-6 text-gray-600">
                        {item.description}
                      </span>
                    </span>
                  </a>
                );
              })}
            </div>

            <div className="mt-8 border border-gray-200 bg-[#F6F8FA] p-5 sm:p-6">
              <div className="flex items-center gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#E65100] text-white">
                  <FaClock aria-hidden="true" />
                </span>
                <div>
                  <h3 className="font-bold text-[#071120]">Business Hours</h3>
                  <p className="text-sm text-gray-600">
                    Local Time: {currentTime || "--:--"}
                  </p>
                </div>
              </div>
              <div className="mt-6 space-y-3 text-sm text-gray-700">
                <p className="flex justify-between gap-4">
                  <span>Monday - Friday</span>
                  <span className="font-bold text-[#E65100]">9:00 - 18:00</span>
                </p>
                <p className="flex justify-between gap-4">
                  <span>Saturday</span>
                  <span className="font-bold text-[#E65100]">10:00 - 16:00</span>
                </p>
                <p className="flex justify-between gap-4">
                  <span>Sunday</span>
                  <span className="font-bold text-[#E65100]">Emergency Only</span>
                </p>
              </div>
            </div>
          </aside>

          <section className="rounded-lg border border-gray-200 bg-white p-6 shadow-[0_18px_50px_rgba(7,17,32,0.06)] sm:p-8">
            <div className="mb-8">
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#E65100]">
                Let us work together
              </p>
              <h2 className="mt-4 text-3xl font-bold leading-tight text-[#071120] sm:text-4xl">
                Send us your shipment details
              </h2>
            </div>

            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <FormField
                  icon={FaUser}
                  label="Full Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  error={validationErrors.name}
                  required
                />
                <FormField
                  icon={FaBuilding}
                  label="Company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                />
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <FormField
                  icon={FaEnvelope}
                  label="Email Address"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={validationErrors.email}
                  required
                />
                <FormField
                  icon={FaPhone}
                  label="Phone Number"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  error={validationErrors.phone}
                />
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <Label icon={FaClipboard} text="Inquiry Type" />
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="mt-2 w-full border border-gray-200 bg-[#F6F8FA] px-4 py-3.5 text-sm text-[#071120] outline-none transition focus:border-[#E65100] focus:bg-white focus:ring-4 focus:ring-[#E65100]/10"
                  >
                    <option value="">
                      Select inquiry type
                    </option>
                    <option value="Get a Quote">
                      Get a Quote
                    </option>
                    <option value="Tracking Issue">
                      Tracking Issue
                    </option>
                    <option value="Service Inquiry">
                      Service Inquiry
                    </option>
                    <option value="Partnership Opportunity">
                      Partnership Opportunity
                    </option>
                    <option value="Urgent Shipment">
                      Urgent Shipment
                    </option>
                  </select>
                </div>

                <div>
                  <Label icon={FaMapMarkerAlt} text="Office Location" />
                  <a
                    href="https://maps.google.com/?q=Leyweg+836+2545GR+The+Hague+Netherlands"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 flex min-h-[50px] items-center border border-gray-200 bg-[#F6F8FA] px-4 py-3 text-sm font-semibold text-[#12333B] transition hover:border-[#E65100] hover:text-[#E65100]"
                  >
                    Leyweg 836, 2545GR The Hague
                  </a>
                </div>
              </div>

              <div>
                <Label icon={FaPaperPlane} text="Details" required />
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  placeholder="Tell us about pickup, destination, cargo type, timing, documents, or tracking issue..."
                  className={`mt-2 w-full resize-none border bg-[#F6F8FA] px-4 py-4 text-sm text-[#071120] outline-none transition placeholder:text-gray-400 focus:bg-white focus:ring-4 focus:ring-[#E65100]/10 ${
                    validationErrors.message
                      ? "border-red-500 focus:border-red-500"
                      : "border-gray-200 focus:border-[#E65100]"
                  }`}
                />
                {validationErrors.message && (
                  <p className="mt-2 text-xs font-semibold text-red-400">
                    {validationErrors.message}
                  </p>
                )}
              </div>

              {isSuccess && (
                <StatusMessage
                  type="success"
                  title="Message sent successfully"
                  text={`A confirmation email has been sent. Reference: ${submittedRef}`}
                />
              )}

              {error && (
                <StatusMessage
                  type="error"
                  title="Message could not be sent"
                  text={error}
                />
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="group flex w-full items-center justify-center border border-[#E65100] bg-[#E65100] px-8 py-4 text-sm font-bold text-white shadow-[0_14px_30px_rgba(230,81,0,0.16)] transition hover:border-[#FF8F00] hover:bg-[#FF8F00] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isLoading ? (
                  <>
                    <FaSpinner className="mr-3 animate-spin" />
                    Sending
                  </>
                ) : (
                  <>
                    Submit
                    <FaArrowRight className="ml-3 transition group-hover:translate-x-1" />
                  </>
                )}
              </button>
            </form>
          </section>
        </div>
      </section>

      <section className="bg-[#F6F8FA] px-5 py-14 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-center text-sm font-bold uppercase tracking-[0.22em] text-[#E65100]">
            Why contact Invictus
          </p>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {trustItems.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.value}
                  className="border border-gray-200 bg-white p-6 text-center shadow-sm"
                >
                  <Icon
                    className="mx-auto text-3xl text-[#E65100]"
                    aria-hidden="true"
                  />
                  <h3 className="mt-5 text-2xl font-bold text-[#071120]">
                    {item.value}
                  </h3>
                  <p className="mt-2 text-sm text-gray-600">{item.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}

function Label({ icon: Icon, text, required = false }) {
  return (
    <label className="flex items-center gap-2 text-sm font-bold text-[#12333B]">
      <Icon className="text-[#E65100]" aria-hidden="true" />
      {text} {required && <span className="text-[#E65100]">*</span>}
    </label>
  );
}

function FormField({
  icon,
  label,
  name,
  value,
  onChange,
  error,
  type = "text",
  required = false,
}) {
  return (
    <div>
      <Label icon={icon} text={label} required={required} />
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className={`mt-2 w-full border bg-[#F6F8FA] px-4 py-3.5 text-sm text-[#071120] outline-none transition placeholder:text-gray-400 focus:bg-white focus:ring-4 focus:ring-[#E65100]/10 ${
          error
            ? "border-red-500 focus:border-red-500"
            : "border-gray-200 focus:border-[#E65100]"
        }`}
      />
      {error && <p className="mt-2 text-xs font-semibold text-red-400">{error}</p>}
    </div>
  );
}

function StatusMessage({ type, title, text }) {
  const isSuccess = type === "success";
  const Icon = isSuccess ? FaCheckCircle : FaExclamationTriangle;

  return (
    <div
      className={`border p-4 ${
        isSuccess
          ? "border-green-500/30 bg-green-500/10"
          : "border-red-500/30 bg-red-500/10"
      }`}
    >
      <div className="flex gap-3">
        <Icon
          className={isSuccess ? "mt-1 text-green-400" : "mt-1 text-red-400"}
          aria-hidden="true"
        />
        <div>
          <p className="font-bold text-[#071120]">{title}</p>
          <p className="mt-1 text-sm leading-6 text-gray-600">{text}</p>
        </div>
      </div>
    </div>
  );
}
