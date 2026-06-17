"use client";

import { useState } from "react";
import Image from "next/image";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaClock,
  FaPaperPlane,
} from "react-icons/fa";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    setTimeout(() => {
      setLoading(false);
      setStatus("Message sent successfully!");
      e.currentTarget.reset();
    }, 900);
  };

  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* ================= HERO BANNER ================= */}
      <section className="relative w-full overflow-hidden bg-[#061827]">
        <div className="relative w-full">
          <Image
            src="/contact_Image.png"
            alt="Contact Us Banner"
            width={1920}
            height={650}
            priority
            quality={100}
            sizes="100vw"
            className="block h-auto w-full object-contain"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-[#020b13]/55 via-[#061827]/25 to-transparent" />
        </div>
      </section>

      {/* ================= CONTACT SECTION ================= */}
      <section className="bg-white py-12 sm:py-16">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 sm:px-8 sm:gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:px-10">
          <div className="order-2 lg:order-1">
            <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              Get In Touch
            </h2>

            <p className="mt-3 text-sm leading-6 text-gray-600 sm:text-base sm:leading-7">
              We&apos;re here to help and answer any question you might have.
            </p>

            <div className="mt-7 space-y-4">
              <ContactCard
                icon={<FaMapMarkerAlt />}
                title="Office Address"
                text={
                  <>
                    Leyweg 836, 2545GR
                    <br />
                    &apos;s-Gravenhage
                  </>
                }
              />

              <ContactCard
                icon={<FaPhoneAlt />}
                title="Phone Number"
                text={
                  <>
                    +31685865799
                    <br />
                    Call anytime
                  </>
                }
              />

              <ContactCard
                icon={<FaEnvelope />}
                title="Email Address"
                text={
                  <>
                    info@invictuslogi.com
                    <br />
                    Email support
                  </>
                }
              />

              <ContactCard
                icon={<FaClock />}
                title="Business Hours"
                text={
                  <>
                    Monday – Friday
                    <br />
                    9:00 AM – 6:00 PM EST
                  </>
                }
              />
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              Send Us a Message
            </h2>

            <p className="mt-3 text-sm leading-6 text-gray-600 sm:text-base sm:leading-7">
              Fill out the form below and we&apos;ll get back to you shortly.
            </p>

            <form
              onSubmit={handleSubmit}
              className="mt-7 rounded-2xl border border-gray-200 bg-white p-4 shadow-lg sm:p-7"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  required
                  className="h-12 rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#D9A441] sm:h-14 sm:px-4"
                />

                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  required
                  className="h-12 rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#D9A441] sm:h-14 sm:px-4"
                />
              </div>

              <input
                type="text"
                name="subject"
                placeholder="Subject"
                required
                className="mt-4 h-12 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#D9A441] sm:h-14 sm:px-4"
              />

              <textarea
                name="message"
                placeholder="Message"
                required
                rows={5}
                className="mt-4 w-full resize-none rounded-lg border border-gray-300 bg-white px-3 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#D9A441] sm:px-4 sm:py-4"
              />

              <button
                type="submit"
                disabled={loading}
                className="mt-5 w-full rounded-lg bg-[#D9A441] px-6 py-3 text-sm font-bold text-gray-900 transition hover:bg-[#f1bd57] disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto sm:px-8 sm:py-4"
              >
                <FaPaperPlane className="mr-2 inline" />
                {loading ? "Sending..." : "Send Message"}
              </button>

              {status && (
                <p className="mt-4 text-sm font-semibold text-[#D9A441]">
                  {status}
                </p>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* ================= MAP SECTION ================= */}
      <section className="bg-[#f5f7f9] py-12 text-[#061827] sm:py-14">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="grid overflow-hidden rounded-2xl bg-white shadow-xl lg:grid-cols-[1.15fr_0.85fr]">
            <div className="min-h-[250px] overflow-hidden sm:min-h-[320px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2452.2678644937316!2d4.2947234!3d52.0725326!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c5b5b7b5b5b5b5%3A0x5b5b5b5b5b5b5b5b!2sLeyweg%20836%2C%202545%20GR%20%27s-Gravenhage!5e0!3m2!1sen!2snl!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "250px" }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <div className="p-5 sm:p-7 lg:p-10">
              <h2 className="text-2xl font-extrabold sm:text-3xl">
                Our Location
              </h2>

              <p className="mt-4 text-sm leading-6 text-gray-600 sm:text-base sm:leading-7">
                Visit our office or contact our team directly for any business
                inquiry, support request, or service information.
              </p>

              <div className="mt-7 space-y-3 text-sm text-gray-700 sm:space-y-4 sm:text-base">
                <p>
                  <strong className="text-[#061827]">Address:</strong> Leyweg
                  836, 2545 GR &apos;s-Gravenhage
                </p>
                <p>
                  <strong className="text-[#061827]">Phone:</strong>{" "}
                  +31685865799
                </p>
                <p>
                  <strong className="text-[#061827]">Email:</strong>{" "}
                  info@invictuslogi.com
                </p>
              </div>

              <a
                href="https://www.google.com/maps/place/Leyweg+836,+2545+GR+'s-Gravenhage/@52.0725326,4.2947234,17z"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-7 inline-flex w-full items-center justify-center rounded-lg bg-[#061827] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#0c2a43] sm:mt-8 sm:w-auto sm:px-7 sm:py-4"
              >
                View On Google Maps
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function ContactCard({ icon, title, text }) {
  return (
    <div className="flex gap-4 rounded-xl border border-gray-300 bg-gray-50 p-4 shadow-md transition hover:border-[#D9A441] sm:gap-5 sm:p-5">
      <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-[#D9A441] text-lg text-gray-900 sm:h-12 sm:w-12 sm:text-xl">
        {icon}
      </div>

      <div>
        <h3 className="font-bold text-gray-900">{title}</h3>
        <p className="mt-1 text-sm leading-6 text-gray-600">{text}</p>
      </div>
    </div>
  );
}