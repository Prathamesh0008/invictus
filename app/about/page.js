"use client";

import Image from "next/image";
import Link from "next/link";
import {
  FaAward,
  FaCheckCircle,
  FaClock,
  FaGlobeAmericas,
  FaHeadset,
  FaPlane,
  FaRoute,
  FaShieldAlt,
  FaShip,
  FaTruck,
  FaWarehouse,
} from "react-icons/fa";
import clientEmily from "../assets/testimonials/client-emily-real.png";
import clientJames from "../assets/testimonials/client-james-real.png";
import clientMichael from "../assets/testimonials/client-michael-real.png";
import clientSarah from "../assets/testimonials/client-sarah-real.png";

export default function About() {
  const strengths = [
    {
      icon: <FaAward />,
      title: "Experience And Expertise",
      text: "Practical freight planning for import, export and scheduled distribution.",
    },
    {
      icon: <FaClock />,
      title: "Reliability And Timeliness",
      text: "Clear coordination that keeps cargo moving through every checkpoint.",
    },
    {
      icon: <FaShieldAlt />,
      title: "Comprehensive Services",
      text: "Air, sea, road, warehouse and documentation support in one workflow.",
    },
  ];

  const services = [
    "Freight Forwarding",
    "Last-Mile Delivery",
    "Warehouse Services",
    "Ocean Shipping Facilities",
    "Air Freight Support",
    "24/7 Customer Support",
  ];

  const team = [
    {
      name: "Michael Rodriguez",
      role: "Supply Chain Director",
      image: clientMichael,
    },
    {
      name: "Emily Thompson",
      role: "Logistics Coordinator",
      image: clientEmily,
    },
    {
      name: "Sarah Chen",
      role: "Logistics Manager",
      image: clientSarah,
    },
    {
      name: "James Wilson",
      role: "Operations Head",
      image: clientJames,
    },
  ];

  return (
    <main className="bg-white text-[#2F343A]">
      <section className="relative overflow-hidden bg-[#12333B]">
        <Image
          src="/ship_1.jpg"
          alt="Container ship at sunset on the ocean"
          fill
          priority
          quality={100}
          sizes="100vw"
          className="object-cover object-center brightness-[1.06] contrast-[1.08] saturate-[1.06]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#071120]/64 via-[#071120]/18 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#071120]/4 via-transparent to-[#071120]/10" />

        <div className="relative mx-auto flex min-h-[390px] max-w-7xl items-center px-5 pb-20 pt-14 sm:px-8 lg:min-h-[440px]">
          <div className="max-w-2xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-[#071120]/35 px-4 py-2 text-sm font-bold text-white shadow-sm">
              <Link href="/" className="cursor-pointer transition hover:text-[#FFD700]">
                Home
              </Link>
              <span className="text-[#FFD700]">+</span>
              <Link href="/about" className="cursor-pointer transition hover:text-[#FFD700]">
                About us
              </Link>
            </div>
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.32em] text-[#FFD700]">
              Invictus Logistics
            </p>
            <h1 className="text-4xl font-bold leading-tight text-white md:text-6xl">
              About Us
            </h1>
            <div className="mt-5 h-1 w-24 rounded-full bg-gradient-to-r from-[#E65100] to-[#FFD700]" />
            <h2 className="mt-7 max-w-xl text-2xl font-bold leading-tight text-white md:text-3xl">
              Clear freight planning, dependable handling, and shipment updates
              your business can trust.
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-8 text-white/80">
              We coordinate air, sea, road, warehousing and documentation in one
              practical logistics workflow.
            </p>

            <div className="mt-8 grid max-w-xl gap-3 sm:grid-cols-3">
              {[
                // { icon: <FaRoute />, label: "Planned Routes" },
                // { icon: <FaClock />, label: "On-Time Focus" },
                // { icon: <FaShieldAlt />, label: "Secure Cargo" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-xl border border-white/20 bg-[#071120]/30 p-4 text-white shadow-sm"
                >
                  <div className="mb-3 text-2xl text-[#FFD700]">{item.icon}</div>
                  <p className="text-sm font-bold">{item.label}</p>
                </div>
              ))}
            </div>

            {/* <Link
              href="/contact"
              className="mt-8 inline-flex cursor-pointer rounded-full bg-white px-7 py-3 text-sm font-bold text-[#12333B] transition hover:bg-[#FFD700]"
            >
              Contact Us
            </Link> */}
          </div>
        </div>

        <svg
          className="absolute bottom-[-1px] left-0 h-20 w-full text-white sm:h-28"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            fill="currentColor"
            d="M0 76L80 72C160 68 320 60 480 68C640 76 800 100 960 98C1120 96 1280 68 1360 54L1440 40V120H0V76Z"
          />
        </svg>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-[1700px] px-5 sm:px-8 lg:px-12">
          <div className="grid items-center gap-12 rounded-3xl border border-gray-200 bg-white p-6 shadow-xl sm:p-8 lg:grid-cols-2 lg:p-10">
            <div className="relative h-[360px] overflow-hidden rounded-2xl bg-gray-100 sm:h-[500px] lg:h-[560px]">
              <img
                src="/ship@1.jpg"
                alt="Container ship"
                className="h-full w-full object-cover object-center transition duration-700 hover:scale-105"
              />
              <div className="absolute bottom-6 right-6 hidden w-48 overflow-hidden rounded-xl border-4 border-white shadow-2xl sm:block">
                <img
                  src="/Warehouse.jpg"
                  alt="Warehouse operation"
                  className="h-36 w-full object-cover"
                />
              </div>
            </div>

            <div className="lg:px-10">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.22em] text-[#E65100]">
              Trusted Freight Partner
            </p>
            <h2 className="max-w-xl text-3xl font-bold leading-tight text-[#12333B] sm:text-4xl lg:text-5xl">
              Providing full range of transportation solutions
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-9 text-gray-600">
              Invictus Logistics simplifies cargo movement with reliable air,
              sea, road, warehousing and customs support. We help businesses
              move shipments with better planning, clear communication and
              dependable delivery coordination.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link
                href="/contact"
                className="inline-flex w-fit rounded-md bg-[#E65100] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#FF8F00]"
              >
                Discover More
              </Link>
              {/* <a
                href="tel:+31685865799"
                className="inline-flex items-center gap-3 text-sm font-bold text-[#12333B]"
              >
                <FaHeadset className="text-xl text-[#E65100]" />
                Call Anytime
                <span className="text-[#E65100]">+31685865799</span>
              </a> */}
            </div>
          </div>
          </div>
        </div>

        <div className="mx-auto mt-12 grid max-w-[1700px] gap-8 px-5 sm:px-8 md:grid-cols-3 lg:px-12">
          {strengths.map((item) => (
            <div
              key={item.title}
              className="flex gap-5 rounded-2xl border border-gray-200 bg-white p-6 shadow-[0_14px_35px_rgba(47,52,58,0.07)]"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#E65100]/20 text-xl text-[#E65100]">
                {item.icon}
              </div>
              <div>
                <h3 className="font-bold text-[#12333B]">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-gray-600">
                  {item.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white pb-16">
        <div className="mx-auto max-w-[1700px] px-5 sm:px-8 lg:px-12">
          <div className="grid items-center gap-12 rounded-3xl border border-gray-200 bg-white p-6 shadow-xl sm:p-8 lg:grid-cols-2 lg:p-10">
          <div className="lg:px-10">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.32em] text-[#E65100]">
              Our Capability
            </p>
            <h2 className="max-w-xl text-3xl font-bold leading-tight text-[#12333B] sm:text-4xl lg:text-5xl">
              Our industry-explicit competence
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-9 text-gray-600">
              From urgent shipments to planned supply chain movement, our team
              connects carriers, warehouses and customers with a practical
              operating process that reduces delays and keeps cargo visible.
            </p>

            <div className="mt-8 grid gap-x-10 gap-y-5 sm:grid-cols-2">
              {services.map((service) => (
                <div
                  key={service}
                  className="flex items-center gap-4 text-base font-bold text-[#12333B]"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#E65100] text-xs text-white">
                    <FaCheckCircle />
                  </span>
                  {service}
                </div>
              ))}
            </div>

            <Link
              href="/services"
              className="mt-10 inline-flex rounded-md bg-[#E65100] px-8 py-4 text-sm font-bold text-white shadow-[0_14px_30px_rgba(230,81,0,0.18)] transition hover:-translate-y-0.5 hover:bg-[#FF8F00]"
            >
              Get Help Now
            </Link>
          </div>

          <div className="relative h-[360px] overflow-hidden rounded-2xl bg-gray-100 sm:h-[500px] lg:h-[560px]">
            <img
              src="/inovation.jpg"
              alt="Logistics team reviewing operational plans"
              className="h-full w-full object-cover object-center transition duration-700 hover:scale-105"
            />
          </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-[1700px] px-5 sm:px-8 lg:px-12">
          <div className="grid items-center gap-12 rounded-3xl border border-gray-200 bg-white p-6 shadow-xl sm:p-8 lg:grid-cols-2 lg:p-10">
            <div className="relative h-[360px] overflow-hidden rounded-2xl bg-gray-100 sm:h-[500px] lg:h-[560px]">
              <img
                src="/l3.jpg"
                alt="Port logistics operation with cargo ship and dock handling"
                className="h-full w-full object-cover object-center transition duration-700 hover:scale-105"
              />
            </div>

            <div className="lg:px-10">
              <p className="mb-4 text-sm font-bold uppercase tracking-[0.32em] text-[#E65100]">
                Efficient Process
              </p>
              <h2 className="max-w-xl text-3xl font-bold leading-tight text-[#12333B] sm:text-4xl lg:text-5xl">
                Faster decisions, fewer shipment delays.
              </h2>
              <p className="mt-6 max-w-2xl text-lg leading-9 text-gray-600">
                Our operations team checks shipment requirements early, confirms
                the right transport mode and keeps documents aligned before
                cargo reaches the next step.
              </p>

              <div className="mt-8 border-l-4 border-[#FFD700] bg-[#F6F8FA] p-5 shadow-[0_12px_35px_rgba(47,52,58,0.08)] sm:p-6">
                {[
                  "Shipment planning and carrier coordination",
                  "Warehouse, pickup and delivery scheduling",
                  "Documentation checks and customer updates",
                ].map((point) => (
                  <div
                    key={point}
                    className="flex items-start gap-4 py-2.5 text-base font-medium text-gray-700"
                  >
                    <span className="mt-2 h-2.5 w-2.5 shrink-0 bg-[#E65100]" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white pb-16">
        <div className="mx-auto max-w-[1700px] px-5 sm:px-8 lg:px-12">
          <div className="grid items-center gap-12 rounded-3xl border border-gray-200 bg-white p-6 shadow-xl sm:p-8 lg:grid-cols-2 lg:p-10">
            <div className="flex flex-col justify-center lg:px-10">
              <p className="mb-4 text-sm font-bold uppercase tracking-[0.32em] text-[#E65100]">
                Integrated Transport
              </p>
              <h2 className="max-w-2xl text-3xl font-bold leading-tight text-[#12333B] sm:text-4xl lg:text-5xl">
                Plan, coordinate and move cargo with one trusted logistics team.
              </h2>
              <p className="mt-6 max-w-2xl text-lg leading-9 text-gray-600">
                We connect sea freight, road transport, warehousing and
                delivery support into a clear operating flow. Every movement is
                planned around timing, documentation and safe cargo handling.
              </p>

              <div className="mt-8 space-y-4">
                {[
                  "Route planning with clear shipment visibility",
                  "Warehouse coordination before pickup and dispatch",
                  "Reliable updates from origin to final delivery",
                ].map((point) => (
                  <div
                    key={point}
                    className="flex items-center gap-3 text-base font-semibold text-[#12333B]"
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#E65100] text-xs text-white">
                      <FaCheckCircle />
                    </span>
                    {point}
                  </div>
                ))}
              </div>

              <Link
                href="/contact"
                className="mt-9 inline-flex w-fit rounded-md bg-[#12333B] px-7 py-4 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#E65100]"
              >
                Start A Shipment
              </Link>
            </div>

            <div className="grid w-full gap-4 sm:grid-cols-2">
              <div className="relative overflow-hidden rounded-lg shadow-[0_18px_45px_rgba(47,52,58,0.14)]">
                <img
                  src="/Top_Banner.jpg" 
                  alt="Fast freight vessel"
                  className="h-80 w-full object-cover sm:h-[420px]"
                />
              </div>

              <div className="relative overflow-hidden rounded-lg shadow-[0_18px_45px_rgba(47,52,58,0.14)]">
                <img
                  src="/contener.jpg"
                  alt="Container logistics operation"
                  className="h-80 w-full object-cover sm:h-[420px]"
                />
              </div>

              <div className="relative overflow-hidden rounded-lg shadow-[0_18px_45px_rgba(47,52,58,0.14)] sm:col-span-2">
                <img
                  src="/Ocean_Freight.jpg"
                  alt="Ocean freight cargo vessel"
                  className="h-64 w-full object-cover"
                />
              </div>
            </div>
          </div>

          <div className="mt-20 bg-[#071F29] px-5 py-8 sm:px-8">
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  icon: <FaShip />,
                  title: "Ocean Freight",
                  text: "Container movement for import and export cargo.",
                },
                {
                  icon: <FaRoute />,
                  title: "Route Planning",
                  text: "Smarter schedules for fewer delays and clearer handoffs.",
                },
                {
                  icon: <FaShieldAlt />,
                  title: "Cargo Safety",
                  text: "Careful handling and documentation at every checkpoint.",
                },
                {
                  icon: <FaClock />,
                  title: "Timely Updates",
                  text: "Status communication from pickup to final delivery.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="border border-white/15 p-6 text-white transition hover:border-[#FFD700]/60 hover:bg-white/5"
                >
                  <div className="mb-5 text-3xl text-[#FFD700]">
                    {item.icon}
                  </div>
                  <h3 className="font-bold">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-white/65">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-[1700px] px-5 sm:px-8 lg:px-12">
          <div className="grid items-center gap-12 rounded-3xl border border-gray-200 bg-white p-6 shadow-xl sm:p-8 lg:grid-cols-2 lg:p-10">
            <div className="relative order-1 h-[360px] overflow-hidden rounded-2xl bg-gray-100 sm:h-[500px] lg:h-[560px]">
              <img
                src="/Logistic_Vision.jpg"
                alt="Logistics team reviewing warehouse dashboard"
                className="h-full w-full object-cover object-center transition duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#071F29]/18 via-transparent to-transparent" />
            </div>

            <div className="order-2 lg:px-10">
              <p className="mb-5 text-sm font-bold uppercase tracking-[0.32em] text-[#E65100]">
                Our Vision
              </p>
              <h2 className="max-w-2xl text-3xl font-bold leading-tight text-[#111827] sm:text-4xl lg:text-5xl">
                Moving your cargo faster, safer and smarter.
              </h2>
              <p className="mt-7 max-w-2xl text-lg leading-9 text-gray-600">
                Our goal is to become a trusted logistics partner for companies
                that need dependable shipment handling, clear communication and
                efficient supply chain support.
              </p>

              <div className="mt-10 grid gap-6 sm:grid-cols-3">
                {[
                  {
                    icon: <FaGlobeAmericas />,
                    title: "Global Network",
                  },
                  {
                    icon: <FaHeadset />,
                    title: "24/7 Support",
                  },
                  {
                    icon: <FaShieldAlt />,
                    title: "Secure Handling",
                  },
                ].map((item) => (
                  <div key={item.title}>
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-[#E65100] text-lg text-white shadow-[0_12px_28px_rgba(230,81,0,0.22)]">
                      {item.icon}
                    </div>
                    <h3 className="text-base font-bold text-[#111827]">
                      {item.title}
                    </h3>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-8 pt-8">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.22em] text-[#E65100]">
              People Behind The Process
            </p>
            <h2 className="text-4xl font-bold text-[#12333B] md:text-4xl">
              Transport expert team
            </h2>
            <p className="mt-4 leading-7 text-gray-600">
              A dedicated operations team supports shipment planning,
              documentation, tracking updates and customer communication.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((person) => (
              <article
                key={person.name}
                className="overflow-hidden rounded-md bg-[#071120] shadow-lg"
              >
                <Image
                  src={person.image}
                  alt={person.name}
                  className="h-64 w-full object-cover"
                />
                <div className="p-4 text-white">
                  <p className="text-xs text-[#FFD700]">{person.role}</p>
                  <h3 className="mt-1 font-bold">{person.name}</h3>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white pb-16 pt-6">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="border-y border-gray-200 py-10">
            <div className="mb-10 flex items-center justify-between text-xs font-bold uppercase tracking-[0.28em] text-gray-400">
              <span>AS</span>
              <span className="text-[#E65100]">Logistics</span>
              <span>Studio</span>
            </div>

            <div className="grid items-center gap-10 lg:grid-cols-[320px_1fr]">
              <div className="relative mx-auto h-64 w-64 overflow-hidden rounded-full bg-[#E65100]/10 lg:mx-0 lg:h-72 lg:w-72">
                <img
                  src="/about-logistics-globe-truck.png"
                  alt="Orange logistics truck with global freight network"
                  className="h-full w-full object-cover opacity-80 mix-blend-multiply"
                />
                <div className="absolute inset-0 bg-[#E65100]/20 mix-blend-color" />
              </div>

              <h2 className="max-w-5xl text-3xl font-bold leading-tight text-[#12333B] md:text-4xl lg:text-5xl">
                We believe that good logistics is powerful, clear planning is
                essential, and every shipment deserves confident handling.
              </h2>
            </div> 
          </div> 

          <div className="grid gap-10 border-b border-gray-200 py-12 md:grid-cols-2">
            <div>
              <p className="mb-5 text-sm font-bold uppercase tracking-[0.28em] text-[#E65100]">
                Smart Freight Planning
              </p>
              <p className="max-w-xl text-base leading-8 text-gray-600 md:text-lg">
                We study shipment needs, timelines and routes before cargo
                moves, so each delivery has the right mode and the right
                schedule.
              </p>
            </div>

            <div>
              <p className="mb-5 text-sm font-bold uppercase tracking-[0.28em] text-[#E65100]">
                Reliable Work Design
              </p>
              <p className="max-w-xl text-base leading-8 text-gray-600 md:text-lg">
                Our process connects pickup, warehousing, documentation and
                delivery updates into one dependable operating flow.
              </p>
            </div>
          </div>

          <div className="border-b border-gray-200 py-12">
            <p className="mb-5 text-sm font-bold uppercase tracking-[0.28em] text-[#E65100]">
              Less Risk, More Control
            </p>
            <p className="max-w-4xl text-base leading-8 text-gray-600 md:text-lg">
              We coordinate with carriers, customers and operations teams to
              reduce delays, avoid document gaps and keep every shipment visible
              from start to finish.
            </p>
          </div>

          <div className="grid gap-10 border-b border-gray-200 py-12 md:grid-cols-2">
            {[
              {
                name: "Operations Team",
                role: "Shipment Coordination",
                text: "We confirm cargo details early and keep customers updated before every key movement.",
              },
              {
                name: "Support Team",
                role: "Customer Assistance",
                text: "We stay available for delivery questions, documents and quick shipment status checks.",
              },
            ].map((person) => (
              <div key={person.name} className="flex gap-5">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#111827]">
                  <img
                    src="/logo/logo2.png"
                    alt=""
                    className="h-full w-full object-contain p-3"
                  />
                </div>
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <p className="text-lg font-bold text-[#111827]">
                    {person.name}
                  </p>
                  <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#FFD700]">
                    {person.role}
                  </p>
                </div>
                <p className="mt-3 max-w-lg text-base leading-8 text-gray-600 md:text-lg">
                  {person.text}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-5 py-10 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-base font-bold text-gray-500">
              Ready to move cargo with a stronger logistics partner?
            </p>
            <Link
              href="/contact"
              className="inline-flex w-fit bg-[#E65100] px-7 py-4 text-sm font-bold text-white transition hover:bg-[#FF8F00]"
            >
              Request Consultation
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
