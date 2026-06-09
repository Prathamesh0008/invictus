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
      image: "/l1.jpg",
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
      image: "/images/value-innovation.png",
      title: "Innovation",
      description: "Leveraging modern technology for smarter logistics.",
      moreInfo:
        "We use digital tracking, route optimization, shipment visibility, and process automation to make cargo movement faster and more transparent.",
    },
    {
      icon: <FaHandshake />,
      image: "/images/value-reliability.png",
      title: "Reliability",
      description: "Dependable service for every shipment.",
      moreInfo:
        "Our team follows structured logistics processes, timely updates, and careful coordination to ensure shipments move smoothly across regions.",
    },
    {
      icon: <FaLightbulb />,
      image: "/images/value-excellence.png",
      title: "Excellence",
      description: "Focused execution in every delivery.",
      moreInfo:
        "We maintain strong operational standards across freight forwarding, customs coordination, documentation, and client communication.",
    },
    {
      icon: <FaLeaf />,
      image: "/images/value-sustainability.png",
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
   <section className="py-20 bg-white">
  <div className="container mx-auto px-4 sm:px-6 lg:px-8">
    <div className="grid gap-16 lg:grid-cols-2 lg:items-stretch">

      <div className="relative h-[420px] overflow-hidden rounded-3xl shadow-2xl lg:h-full">
        <img
          src="/L4.jpg"
          alt="Global Logistics"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute bottom-6 left-6 bg-white p-5 rounded-2xl shadow-xl">
          <h4 className="text-3xl font-bold text-[#E65100]">15+</h4>
          <p className="text-gray-600 text-sm">
            Years Of Logistics Excellence
          </p>
        </div>
      </div>

      <div>
        <span className="text-[#E65100] uppercase tracking-[0.25em] font-semibold">
          About Our Company
        </span>

        <h2 className="mt-4 text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
          Delivering Global Logistics Solutions With Precision
        </h2>

        <p className="mt-6 text-gray-600 leading-relaxed">
          We are a trusted logistics and freight forwarding company providing
          comprehensive transportation, customs clearance, warehousing, and
          supply chain solutions. Our commitment to operational excellence
          ensures that every shipment reaches its destination safely and on time.
        </p>

        <p className="mt-4 text-gray-600 leading-relaxed">
          Through strong global partnerships and modern logistics technology,
          we offer seamless cargo movement across sea, air, and land transport
          networks while maintaining transparency throughout the entire process.
        </p>

        <div className="grid grid-cols-2 gap-6 mt-8">
          <div>
            <h3 className="text-3xl font-bold text-[#E65100]">180+</h3>
            <p className="text-gray-600">Countries Covered</p>
          </div>

          <div>
            <h3 className="text-3xl font-bold text-[#E65100]">99.8%</h3>
            <p className="text-gray-600">On-Time Deliveries</p>
          </div>

          <div>
            <h3 className="text-3xl font-bold text-[#E65100]">24/7</h3>
            <p className="text-gray-600">Customer Support</p>
          </div>

          <div>
            <h3 className="text-3xl font-bold text-[#E65100]">5000+</h3>
            <p className="text-gray-600">Successful Shipments</p>
          </div>
        </div>
      </div>

    </div>
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
            <p className="mx-auto mt-4 max-w-1xl text-gray-600">
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
    <div className="mx-auto mb-14 max-w-4xl text-center">
      <span className="mb-4 inline-block rounded-full bg-[#E65100]/10 px-5 py-2 text-sm font-semibold uppercase tracking-[0.22em] text-[#E65100]">
        Our Principles
      </span>

      <h2 className="text-4xl font-bold leading-tight text-gray-900 md:text-5xl">
        Core <span className="text-[#FF8F00]">Values</span> That Drive Us
      </h2>

      <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-gray-600">
        These principles guide every decision we make and every logistics service
        we deliver with care, speed, and responsibility.
      </p>
    </div>

    <div className="grid items-stretch gap-8 md:grid-cols-2 lg:grid-cols-4">
      {values.map((value, index) => {
        const isOpen = expandedValue === index;

        return (
          <div
            key={index}
            className={`group flex h-full flex-col overflow-hidden rounded-2xl border bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${
              isOpen
                ? "border-[#E65100] shadow-2xl"
                : "border-gray-200 hover:border-[#E65100]/50"
            }`}
          >
            <div className="relative aspect-[16/9] overflow-hidden">
              <img
                src={value.image}
                alt={value.title}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            </div>

            <div className="flex flex-1 flex-col p-6">
              <h3 className="text-2xl font-bold text-gray-900">
                {value.title}
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-gray-600">
                {value.description}
              </p>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  isOpen ? "mt-4 max-h-96" : "max-h-0"
                }`}
              >
                <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
                  <p className="text-sm leading-relaxed text-gray-700">
                    {value.moreInfo}
                  </p>
                </div>
              </div>

              <button
                onClick={() => toggleValue(index)}
                className="mt-auto inline-flex w-fit cursor-pointer items-center rounded-full border border-[#E65100]/30 px-5 py-2 text-sm font-semibold text-[#E65100] transition hover:bg-[#E65100] hover:text-white"
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
