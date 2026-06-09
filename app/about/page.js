"use client";

import { useEffect, useState } from "react";
import {
  FaRocket,
  FaHandshake,
  FaLightbulb,
  FaLeaf,
  FaChevronUp,
  FaShip,
  FaPlane,
  FaTruck,
  FaGlobeAmericas,
  FaShieldAlt,
  FaClock,
} from "react-icons/fa";
import { FiArrowRight } from "react-icons/fi";

export default function About() {
  const [expandedValue, setExpandedValue] = useState(null);
  const [activeSlide, setActiveSlide] = useState(0);

 const banners = [
  {
    image: "/L1.jpg",
    title: "Smart Global Logistics Solutions",
    text: "Connecting air, sea, road, and customs operations with speed, safety, and reliability.",
  },
  {
    image: "/L2.jpg",
    title: "Customs, Cargo & Supply Chain Experts",
    text: "From documentation to delivery, we simplify complex logistics for your business.",
  },
];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % banners.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  const values = [
    {
      icon: <FaRocket />,
      title: "Innovation",
      description: "Leveraging modern technology for smarter logistics.",
      moreInfo:
        "We use digital tracking, route optimization, shipment visibility, and process automation to make cargo movement faster and more transparent.",
    },
    {
      icon: <FaHandshake />,
      title: "Reliability",
      description: "Dependable service for every shipment.",
      moreInfo:
        "Our team follows structured logistics processes, timely updates, and careful coordination to ensure shipments move smoothly across regions.",
    },
    {
      icon: <FaLightbulb />,
      title: "Excellence",
      description: "Focused execution in every delivery.",
      moreInfo:
        "We maintain strong operational standards across freight forwarding, customs coordination, documentation, and client communication.",
    },
    {
      icon: <FaLeaf />,
      title: "Sustainability",
      description: "Smarter logistics with responsible planning.",
      moreInfo:
        "We support optimized routing, better load planning, and efficient supply chain practices to reduce unnecessary movement and delays.",
    },
  ];

  const services = [
    {
      icon: <FaShip />,
      title: "Sea Freight",
      text: "Reliable container shipping for import and export cargo.",
    },
    {
      icon: <FaPlane />,
      title: "Air Freight",
      text: "Fast international air cargo movement for urgent shipments.",
    },
    {
      icon: <FaTruck />,
      title: "Road Transport",
      text: "Domestic and cross-border road logistics with smooth coordination.",
    },
    {
      icon: <FaShieldAlt />,
      title: "Customs Support",
      text: "Documentation and clearance assistance for smoother trade flow.",
    },
  ];

  const stats = [
    { icon: <FaGlobeAmericas />, value: "Global", label: "Trade Network" },
    { icon: <FaClock />, value: "24/7", label: "Shipment Support" },
    { icon: <FaShip />, value: "Air / Sea", label: "Freight Solutions" },
  ];

  const toggleValue = (index) => {
    setExpandedValue(expandedValue === index ? null : index);
  };

  return (
    <main className="bg-white">
      {/* HERO SLIDER */}
      <section className="relative h-[560px] overflow-hidden">
        {banners.map((banner, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              activeSlide === index ? "opacity-100" : "opacity-0"
            }`}
          >
       <img
  src={banner.image}
  alt={banner.title}
  className="h-full w-full object-cover"
/>

            <div className="absolute inset-0 bg-black/50" />

            <div className="absolute inset-0 flex items-center">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-2xl text-white">
                  <p className="mb-4 text-sm font-semibold uppercase tracking-[0.35em] text-[#FFD700]">
                    Logistics & Freight Forwarding
                  </p>

                  <h1 className="text-4xl font-bold leading-tight md:text-6xl">
                    {banner.title}
                  </h1>

                  <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/85">
                    {banner.text}
                  </p>

                  <div className="mt-8 flex flex-wrap gap-4">
                    <a
                      href="/contact"
                      className="rounded-full bg-[#E65100] px-7 py-3 font-semibold text-white transition hover:bg-[#FF8F00]"
                    >
                      Get Quote
                    </a>

                    <a
                      href="/services"
                      className="rounded-full border border-white/60 px-7 py-3 font-semibold text-white transition hover:bg-white hover:text-gray-900"
                    >
                      Explore Services
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 gap-3">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveSlide(index)}
              className={`h-3 rounded-full transition-all ${
                activeSlide === index
                  ? "w-10 bg-[#FFD700]"
                  : "w-3 bg-white/60"
              }`}
            />
          ))}
        </div>
      </section>

      {/* STATS */}
      <section className="relative z-10 -mt-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 rounded-3xl bg-white p-6 shadow-2xl md:grid-cols-3">
            {stats.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-5 rounded-2xl border border-gray-100 p-5"
              >
                <div className="text-4xl text-[#E65100]">{item.icon}</div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    {item.value}
                  </h3>
                  <p className="text-gray-500">{item.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT CONTENT */}
      <section className="py-20">
        <div className="container mx-auto grid gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-[#E65100]">
              About Our Company
            </p>

            <h2 className="text-4xl font-bold leading-tight text-gray-900 md:text-5xl">
              Moving Cargo With Confidence, Speed & Care
            </h2>
          </div>

          <div className="space-y-5 text-gray-600">
            <p>
              We provide complete logistics support for businesses that need
              reliable movement of goods across local and international markets.
              Our services cover freight, customs, transport coordination, and
              end-to-end shipment handling.
            </p>

            <p>
              Whether your cargo moves by sea, air, or road, our team focuses on
              clear communication, proper documentation, and smooth delivery
              planning.
            </p>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-4xl font-bold text-gray-900">
              Logistics Solutions We Offer
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-gray-600">
              Complete support for cargo movement, documentation, and delivery.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {services.map((service, index) => (
              <div
                key={index}
                className="rounded-2xl bg-white p-8 shadow-sm transition hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="mb-5 text-4xl text-[#E65100]">
                  {service.icon}
                </div>
                <h3 className="mb-3 text-xl font-bold text-gray-900">
                  {service.title}
                </h3>
                <p className="text-gray-600">{service.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CORE VALUES */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-4xl font-bold text-gray-900 md:text-5xl">
              Core <span className="text-[#FF8F00]">Values</span> That Drive Us
            </h2>

            <p className="mx-auto mt-4 max-w-3xl text-lg text-gray-600">
              These principles guide every decision we make and every service we
              deliver.
            </p>
          </div>

          <div className="grid items-start gap-8 md:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => {
              const isOpen = expandedValue === index;

              return (
                <div
                  key={index}
                  className={`relative overflow-hidden rounded-2xl border bg-white transition-all duration-300 ${
                    isOpen
                      ? "border-[#E65100] shadow-xl"
                      : "border-gray-200 hover:border-[#E65100]/50 hover:shadow-xl"
                  }`}
                >
                  <div className="h-1 bg-gradient-to-r from-[#E65100] to-[#FFD700]" />

                  <div className="flex h-full flex-col p-8">
                    <button
                      onClick={() => toggleValue(index)}
                      className="self-start cursor-pointer"
                    >
                      <div
                        className={`inline-flex rounded-xl p-4 text-3xl transition-all duration-300 hover:scale-110 ${
                          isOpen
                            ? "bg-gradient-to-br from-[#E65100] to-[#FFD700] text-white"
                            : "bg-gradient-to-br from-[#E65100]/20 to-[#FFD700]/20 text-[#E65100]"
                        }`}
                      >
                        {value.icon}
                      </div>
                    </button>

                    <h3 className="mb-3 mt-6 text-2xl font-bold text-gray-900">
                      {value.title}
                    </h3>

                    <p className="mb-4 text-gray-600">{value.description}</p>

                    <div
                      className={`overflow-hidden transition-all duration-300 ${
                        isOpen ? "mt-4 max-h-96" : "max-h-0"
                      }`}
                    >
                      <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                        <p className="text-sm leading-relaxed text-gray-700">
                          {value.moreInfo}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => toggleValue(index)}
                      className="mt-4 inline-flex cursor-pointer items-center font-semibold text-[#E65100] transition hover:text-[#FF8F00]"
                    >
                      {isOpen ? (
                        <>
                          <FaChevronUp className="mr-2" />
                          Show Less
                        </>
                      ) : (
                        <>
                          Learn More
                          <FiArrowRight className="ml-2" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}