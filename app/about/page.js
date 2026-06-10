"use client";

import {
  FaShip,
  FaPlane,
  FaTruck,
  FaGlobeAmericas,
  FaShieldAlt,
  FaClock,
  FaWarehouse,
} from "react-icons/fa";

export default function About() {
  const services = [
    {
      icon: <FaShip />,
      title: "Sea Freight",
      text: "Reliable container shipping for import and export cargo.",
    },
    {
      icon: <FaPlane />,
      title: "Air Freight",
      text: "Fast air cargo movement for urgent global shipments.",
    },
    {
      icon: <FaTruck />,
      title: "Road Transport",
      text: "Domestic and cross-border delivery with smooth coordination.",
    },
  ];

  return (
    <main className="bg-white">
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-r from-[#111827] via-[#1f2937] to-[#E65100]">
        <div className="absolute inset-0 bg-black/35" />

        <div className="relative mx-auto grid min-h-[560px] max-w-7xl items-center gap-10 px-5 py-20 lg:grid-cols-2 lg:px-8">
          <div className="text-white">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-[#FFD700]">
              Logistics & Freight Forwarding
            </p>

            <h1 className="text-4xl font-bold leading-tight md:text-6xl">
              Smart Logistics Solutions for Growing Businesses
            </h1>

            <p className="mt-6 max-w-xl text-lg text-white/85">
              We simplify cargo movement through reliable air, sea, road,
              warehousing and customs support.
            </p>

            <a
              href="/contact"
              className="mt-8 inline-flex rounded-xl bg-[#FFD700] px-7 py-4 font-bold text-black transition hover:bg-[#FF8F00]"
            >
              Get a Quote
            </a>
          </div>

          <div className="hidden lg:block">
            <img
              src="/Logistics_Team.jpg"
              alt="Logistics team"
              className="h-[420px] w-full rounded-3xl object-cover shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="-mt-12 relative z-10">
        <div className="mx-auto max-w-6xl px-5">
          <div className="rounded-3xl bg-white p-8 shadow-2xl">
            <div className="mb-8 text-center">
              <h2 className="text-4xl font-bold text-gray-900">
                Our Services
              </h2>
              <p className="mt-3 text-gray-600">
                Complete logistics support for your business success.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {services.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-gray-100 bg-gray-50 p-7 text-center shadow-sm"
                >
                  <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#E65100]/10 text-3xl text-[#E65100]">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-gray-600">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* VISION */}
      <section className="py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 lg:grid-cols-2 lg:px-8">
          <div>
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-[#E65100]">
              Our Vision
            </p>

            <h2 className="text-4xl font-bold leading-tight text-gray-900 md:text-5xl">
              Moving your cargo faster, safer and smarter.
            </h2>

            <p className="mt-6 text-lg leading-8 text-gray-600">
              Our goal is to become a trusted logistics partner for companies
              that need dependable shipment handling, clear communication and
              efficient supply chain support.
            </p>

            <div className="mt-8 grid gap-5 sm:grid-cols-3">
              <div>
                <FaGlobeAmericas className="mb-3 text-3xl text-[#E65100]" />
                <h4 className="font-bold">Global Network</h4>
              </div>
              <div>
                <FaClock className="mb-3 text-3xl text-[#E65100]" />
                <h4 className="font-bold">24/7 Support</h4>
              </div>
              <div>
                <FaShieldAlt className="mb-3 text-3xl text-[#E65100]" />
                <h4 className="font-bold">Secure Handling</h4>
              </div>
            </div>
          </div>

          <img
            src="/Logistic_Vision.jpg" 
            alt="Logistics vision"
            className="h-[420px] w-full rounded-3xl object-cover shadow-xl"
          />
        </div>
      </section>

      {/* WHY US */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-5 pb-20 lg:px-8">
          <div className="grid overflow-hidden bg-[#111827] lg:grid-cols-[0.95fr_1.05fr]">
            <div className="flex min-h-[360px] flex-col justify-center px-8 py-12 text-white sm:px-12 lg:px-16">
              <p className="mb-5 text-sm font-bold uppercase tracking-[0.3em] text-[#FFD700]">
                Why Choose Us
              </p>
              <h2 className="max-w-lg text-4xl font-bold leading-tight md:text-5xl">
                Reliable logistics built around your business.
              </h2>
              <p className="mt-6 max-w-xl text-lg leading-8 text-white/75">
                We combine freight planning, shipment visibility and careful
                cargo handling so your supply chain keeps moving without
                unnecessary delays.
              </p>
            </div>

            <img
              src="/Warehouse.jpg"
              alt="Warehouse logistics operation"
              className="h-[360px] w-full object-cover lg:h-full"
            />
          </div>

          <div className="grid gap-12 bg-white px-0 py-16 lg:grid-cols-[0.85fr_1.15fr] lg:px-16">
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-[#E65100]">
                Our Advantage
              </p>
              <h3 className="text-4xl font-bold leading-tight text-gray-900 md:text-5xl">
                Complete freight support from pickup to final delivery.
              </h3>
            </div>

            <div className="space-y-5 text-base leading-8 text-gray-600">
              <p>
                Every shipment is handled with a clear plan, dependable carrier
                coordination and regular updates. Our team supports air, sea,
                road, warehouse and documentation needs through one organized
                workflow.
              </p>
              <p>
                From urgent cargo to scheduled distribution, we focus on safe
                movement, transparent communication and practical solutions that
                help businesses avoid costly disruptions.
              </p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                icon: <FaWarehouse />,
                title: "Smart Warehousing",
                text: "Secure storage, inventory handling and dispatch support for growing operations.",
              },
              {
                icon: <FaTruck />,
                title: "Planned Transport",
                text: "Reliable route planning for local delivery and international cargo movement.",
              },
              {
                icon: <FaShieldAlt />,
                title: "Safe Coordination",
                text: "Clear updates, careful handling and smooth documentation at every stage.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="border border-gray-100 bg-gray-50 p-8 transition hover:border-[#E65100]/30 hover:bg-white hover:shadow-xl"
              >
                <div className="mb-6 flex h-12 w-12 items-center justify-center bg-[#E65100]/10 text-2xl text-[#E65100]">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  {item.title}
                </h3>
                <p className="mt-4 leading-7 text-gray-600">{item.text}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 grid items-stretch gap-10 bg-gray-50 lg:grid-cols-[1.05fr_0.95fr]">
            <img
              src="/Logistics_Team.jpg"
              alt="Logistics professionals"
              className="h-[420px] w-full object-cover lg:h-full"
            />

            <div className="flex flex-col justify-center px-8 py-12 sm:px-12">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-[#E65100]">
                Efficient Process
              </p>
              <h3 className="text-3xl font-bold leading-tight text-gray-900 md:text-4xl">
                Faster decisions, fewer shipment delays.
              </h3>
              <p className="mt-5 leading-8 text-gray-600">
                Our operations team checks shipment requirements early,
                confirms the right transport mode and keeps documents aligned
                before cargo reaches the next step.
              </p>

              <div className="mt-8 space-y-4 border-l-4 border-[#FFD700] bg-white p-6 shadow-sm">
                {[
                  "Shipment planning and carrier coordination",
                  "Warehouse, pickup and delivery scheduling",
                  "Documentation checks and customer updates",
                ].map((point) => (
                  <div key={point} className="flex gap-3 text-gray-700">
                    <span className="mt-2 h-2 w-2 shrink-0 bg-[#E65100]" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="relative mt-20 overflow-hidden bg-white py-16">
            <div className="absolute left-0 top-16 hidden h-72 w-72 overflow-hidden rounded-full bg-[#E65100]/20 lg:block">
              <img
                src="/about-logistics-globe-truck.png"
                alt="Orange logistics truck with global freight network"
                className="h-full w-full object-cover object-center opacity-45 mix-blend-multiply"
              />
              <div className="absolute inset-0 bg-[#E65100]/25 mix-blend-color" />
            </div>

            <div className="relative border-y border-gray-200 py-8">
              <div className="mb-12 flex items-center justify-between text-xs font-bold uppercase tracking-[0.28em] text-gray-400">
                <span>AS</span>
                <span className="text-[#E65100]">Logistics</span>
                <span>Studio</span>
              </div>

              <div className="ml-auto max-w-4xl">
                <h3 className="text-3xl font-bold leading-tight text-gray-900 md:text-5xl">
                  We believe that good logistics is powerful, clear planning is
                  essential, and every shipment deserves confident handling.
                </h3>
              </div>
            </div>

            <div className="relative ml-auto max-w-4xl">
              <div className="grid gap-8 border-b border-gray-200 py-10 md:grid-cols-2">
                <div>
                  <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-[#E65100]">
                    Smart Freight Planning
                  </p>
                  <p className="leading-8 text-gray-600">
                    We study shipment needs, timelines and routes before cargo
                    moves, so each delivery has the right mode and the right
                    schedule.
                  </p>
                </div>

                <div>
                  <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-[#E65100]">
                    Reliable Work Design
                  </p>
                  <p className="leading-8 text-gray-600">
                    Our process connects pickup, warehousing, documentation and
                    delivery updates into one dependable operating flow.
                  </p>
                </div>
              </div>

              <div className="border-b border-gray-200 py-10">
                <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-[#E65100]">
                  Less Risk, More Control
                </p>
                <p className="max-w-3xl leading-8 text-gray-600">
                  We coordinate with carriers, customers and operations teams to
                  reduce delays, avoid document gaps and keep every shipment
                  visible from start to finish.
                </p>
              </div>

              <div className="grid gap-8 border-b border-gray-200 py-10 md:grid-cols-2">
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
                    <div className="h-16 w-16 shrink-0 overflow-hidden rounded-full bg-[#111827]">
                      <img
                        src="/logo/logo2.png"
                        alt=""
                        className="h-full w-full object-contain p-3"
                      />
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <p className="font-bold text-gray-900">
                          {person.name}
                        </p>
                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#FFD700]">
                          {person.role}
                        </p>
                      </div>
                      <p className="mt-3 leading-7 text-gray-600">
                        {person.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-5 py-10 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm font-semibold text-gray-500">
                  Ready to move cargo with a stronger logistics partner?
                </p>
                <a
                  href="/contact"
                  className="inline-flex w-fit bg-[#E65100] px-6 py-3 font-bold text-white transition hover:bg-[#FF8F00]"
                >
                  Request Consultation
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
