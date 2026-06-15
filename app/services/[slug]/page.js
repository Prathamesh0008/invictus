import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Script from "next/script";
import {
  FaAnchor,
  FaArrowLeft,
  FaArrowRight,
  FaBolt,
  FaBoxesPacking,
  FaBoxOpen,
  FaCarSide,
  FaCartShopping,
  FaCircleCheck,
  FaClock,
  FaDoorOpen,
  FaGears,
  FaGlobe,
  FaFileLines,
  FaHelmetSafety,
  FaHeadset,
  FaIndustry,
  FaListCheck,
  FaLocationDot,
  FaMap,
  FaPaperPlane,
  FaPhone,
  FaPlane,
  FaPlaneArrival,
  FaPlaneDeparture,
  FaRoad,
  FaRoute,
  FaShieldHalved,
  FaShip,
  FaSnowflake,
  FaStore,
  FaTemperatureThreeQuarters,
  FaTruck,
  FaTruckRampBox,
  FaTruckMoving,
  FaWater,
  FaWarehouse,
} from "react-icons/fa6";
import { getServiceBySlug, services } from "../servicesData";

export function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return {
      title: "Service Not Found",
    };
  }

  return {
    title: service.metaTitle || `${service.title} | Services`,
    description: service.metaDescription || service.description,
    alternates: {
      canonical: `/services/${service.slug}`,
    },
  };
}

function SectionHeader({ eyebrow, title, description, dark = false }) {
  return (
    <div className="max-w-4xl">
      <span
        className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-[11px] font-extrabold uppercase tracking-[0.18em] ${
          dark
            ? "bg-white/10 text-[#ffcc6f]"
            : "bg-[#fef1d8] text-[#c98710]"
        }`}
      >
        {eyebrow}
      </span>

      <h2
        className={`mt-5 text-3xl font-bold leading-[1.05] tracking-[-0.04em] sm:text-4xl lg:text-5xl ${
          dark ? "text-white" : "text-[#08111f]"
        }`}
      >
        {title}
      </h2>

      {description ? (
        <p
          className={`mt-5 max-w-3xl text-base leading-8 sm:text-lg ${
            dark ? "text-white/75" : "text-slate-600"
          }`}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}

function DefaultServicePage({ service, faqSchema }) {
  return (
    <main className="bg-[#f3f5f7] text-black">
      {faqSchema ? (
        <Script
          id={`${service.slug}-faq-schema`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      ) : null}

      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-10 lg:py-16">
        <Link
          href="/services"
          className="mb-8 inline-flex items-center gap-3 rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-400 hover:text-slate-950"
        >
          <FaArrowLeft />
          Back To Services
        </Link>

        <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_28px_70px_rgba(15,23,42,0.08)]">
          <div className="grid gap-0 lg:grid-cols-[1.05fr_0.95fr] lg:items-stretch">
            <div className="relative min-h-[320px] overflow-hidden sm:min-h-[480px]">
              <Image
                src={service.image}
                alt={service.title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(15,23,42,0.08)_0%,rgba(15,23,42,0.72)_78%)]" />
            </div>

            <div className="bg-white p-6 sm:p-8 lg:p-10">
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-500">
                {service.label}
              </p>
              <h1 className="mt-4 text-4xl font-bold leading-tight text-slate-950 sm:text-5xl">
                {service.title}
              </h1>
              <p className="mt-6 text-lg leading-8 text-slate-600">
                {service.description}
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {service.points.map((point) => (
                  <div
                    key={point}
                    className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 font-semibold text-slate-900"
                  >
                    {point}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {service.content ? (
          <div className="mt-12 space-y-8">
            {service.content.intro?.map((paragraph) => (
              <div
                key={paragraph}
                className="rounded-[1.75rem] border border-slate-200 bg-white p-6 text-slate-700 shadow-[0_18px_40px_rgba(15,23,42,0.05)] sm:p-8"
              >
                <p className="text-base leading-8 sm:text-lg">{paragraph}</p>
              </div>
            ))}

            {service.content.sections?.map((section) => (
              <section
                key={section.title}
                className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-[0_18px_40px_rgba(15,23,42,0.05)] sm:p-8"
              >
                <h2 className="text-3xl font-bold text-slate-950">
                  {section.title}
                </h2>

                <div className="mt-5 space-y-4">
                  {section.paragraphs?.map((paragraph) => (
                    <p
                      key={paragraph}
                      className="text-base leading-8 text-slate-700 sm:text-lg"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>

                {section.list?.length ? (
                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    {section.list.map((item) => (
                      <div
                        key={item}
                        className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-slate-700"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                ) : null}

                {section.subsections?.length ? (
                  <div className="mt-6 grid gap-5 lg:grid-cols-2">
                    {section.subsections.map((subsection) => (
                      <article
                        key={subsection.title}
                        className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-6"
                      >
                        <h3 className="text-xl font-semibold text-slate-950">
                          {subsection.title}
                        </h3>

                        <div className="mt-4 space-y-4">
                          {subsection.paragraphs?.map((paragraph) => (
                            <p
                              key={paragraph}
                              className="text-base leading-7 text-slate-700"
                            >
                              {paragraph}
                            </p>
                          ))}
                        </div>
                      </article>
                    ))}
                  </div>
                ) : null}
              </section>
            ))}

            {service.content.faqs?.length ? (
              <section className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-[0_18px_40px_rgba(15,23,42,0.05)] sm:p-8">
                <h2 className="text-3xl font-bold text-slate-950">FAQs</h2>

                <div className="mt-6 space-y-4">
                  {service.content.faqs.map((faq, index) => (
                    <details
                      key={faq.question}
                      open={index === 0}
                      className="overflow-hidden rounded-[1.25rem] border border-slate-200 bg-slate-50"
                    >
                      <summary className="cursor-pointer list-none px-6 py-5 text-lg font-semibold text-slate-950 marker:hidden">
                        <span className="flex items-center justify-between gap-4">
                          <span>{faq.question}</span>
                          <span className="text-slate-500">+</span>
                        </span>
                      </summary>
                      <p className="px-6 pb-6 leading-8 text-slate-700">
                        {faq.answer}
                      </p>
                    </details>
                  ))}
                </div>
              </section>
            ) : null}
          </div>
        ) : null}
      </section>
    </main>
  );
}

function RoadFreightPage({ service, faqSchema }) {
  const trustItems = [
    { icon: FaTruck, value: "FTL + LTL", label: "Flexible road capacity" },
    { icon: FaBolt, value: "Express", label: "Urgent dispatch support" },
    {
      icon: FaTemperatureThreeQuarters,
      value: "Controlled",
      label: "Temperature-sensitive transport",
    },
    { icon: FaRoute, value: "Live Updates", label: "Visibility from pickup to delivery" },
  ];

  const solutionCards = [
    {
      icon: FaTruck,
      title: "Full Truckload Transport",
      text:
        "FTL transport is suitable when your cargo requires dedicated truck capacity. It reduces handling, improves control and supports faster delivery planning for large-volume or time-sensitive shipments.",
    },
    {
      icon: FaBoxOpen,
      title: "Less Than Truckload Transport",
      text:
        "LTL transport is ideal when your shipment does not need a full truck. It helps businesses move smaller cargo loads in a cost-effective way across the Netherlands and Europe.",
    },
    {
      icon: FaBolt,
      title: "Express Road Freight",
      text:
        "Express road freight supports urgent deliveries, emergency stock movement, spare parts, event logistics and high-priority commercial shipments with faster coordination.",
    },
    {
      icon: FaTemperatureThreeQuarters,
      title: "Temperature-Controlled Freight",
      text:
        "Temperature-controlled road freight is suitable for sensitive products that require stable conditions during transport, helping protect cargo quality and delivery confidence.",
    },
    {
      icon: FaDoorOpen,
      title: "Door-to-Door Delivery",
      text:
        "Door-to-door road freight keeps transport simple by moving cargo from pickup point to final delivery destination through one coordinated logistics process.",
    },
    {
      icon: FaRoute,
      title: "Route Planning & Tracking",
      text:
        "Our road transport planning supports efficient routes, delivery timing, live shipment communication and better visibility from dispatch to final destination.",
    },
  ];

  const industryCards = [
    {
      icon: FaStore,
      title: "Retail & Wholesale",
      text: "Regular distribution, stock replenishment and business-to-business delivery.",
    },
    {
      icon: FaCartShopping,
      title: "E-commerce",
      text: "Flexible road transport for fulfilment, returns and customer delivery networks.",
    },
    {
      icon: FaGears,
      title: "Manufacturing",
      text: "Road freight support for factories, suppliers, parts and production movement.",
    },
    {
      icon: FaSnowflake,
      title: "Temperature-Sensitive Goods",
      text: "Controlled transport support for products that need stable delivery conditions.",
    },
    {
      icon: FaCarSide,
      title: "Automotive",
      text: "Transport planning for spare parts, components and urgent operational cargo.",
    },
    {
      icon: FaHelmetSafety,
      title: "Construction",
      text: "Commercial cargo movement for building materials and project requirements.",
    },
    {
      icon: FaShip,
      title: "Import & Export",
      text: "Freight forwarding support from ports, terminals and distribution centres.",
    },
    {
      icon: FaWarehouse,
      title: "Warehousing",
      text: "Road freight coordination between warehouses, hubs and delivery destinations.",
    },
  ];

  const processSteps = [
    {
      number: "01",
      title: "Shipment Review",
      text:
        "We review cargo type, pickup point, destination, delivery deadline and transport requirements.",
    },
    {
      number: "02",
      title: "Transport Planning",
      text:
        "We select the suitable road freight option, including FTL, LTL, express or temperature-controlled transport.",
    },
    {
      number: "03",
      title: "Route Coordination",
      text:
        "We plan the route, pickup timing, delivery schedule and shipment communication process.",
    },
    {
      number: "04",
      title: "Delivery Updates",
      text:
        "You receive clear shipment updates so your team can plan inventory, customers and operations.",
    },
  ];

  const heroBullets = [
    "Door-to-door road freight for local, national and cross-border delivery.",
    "Full truckload and less than truckload support for different cargo volumes.",
    "Express road freight for urgent commercial shipments and time-critical cargo.",
    "Temperature-controlled road freight for sensitive goods and stable delivery conditions.",
  ];

  const netherlandsBullets = [
    "Local road freight for city and regional delivery.",
    "National road freight across the Netherlands.",
    "Cross-border road freight from the Netherlands to Europe.",
    "Practical freight planning for importers, exporters and distribution businesses.",
  ];

  const europeBullets = [
    "Flexible European freight lanes from the Netherlands.",
    "Smart route planning for faster delivery coordination.",
    "Live shipment updates for better supply chain visibility.",
    "Dedicated transport options for urgent and high-priority cargo.",
  ];

  const whyChooseBullets = [
    "Road freight Netherlands and Europe coverage.",
    "FTL and LTL transport options.",
    "Express road delivery for urgent shipments.",
    "Temperature-controlled truck options.",
    "Door-to-door cargo movement.",
    "Route planning and live shipment communication.",
  ];

  return (
    <main className="bg-white text-[#334155]">
      {faqSchema ? (
        <Script
          id={`${service.slug}-faq-schema`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      ) : null}

      <section className="relative overflow-hidden bg-[#08111f] text-white">
        <div className="absolute inset-0">
          <Image
            src={service.image}
            alt={service.title}
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,17,31,0.94),rgba(8,17,31,0.78),rgba(8,17,31,0.35))]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(245,166,35,0.16),transparent_28%),radial-gradient(circle_at_75%_80%,rgba(255,207,99,0.14),transparent_24%)]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-5 pb-36 pt-12 sm:px-8 lg:px-10 lg:pb-44 lg:pt-16">
          <Link
            href="/services"
            className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/8 px-4 py-2 text-sm font-semibold text-white/90 backdrop-blur transition hover:bg-white/14"
          >
            <FaArrowLeft />
            Back To Services
          </Link>

          <div className="mt-12 grid gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-[#f5a623]/15 px-4 py-2 text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#ffcc6f]">
                <FaTruckMoving />
                Road Freight Netherlands
              </span>

              <h1 className="mt-6 max-w-4xl text-5xl font-bold leading-[0.96] tracking-[-0.07em] sm:text-6xl lg:text-7xl">
                Road Freight Services in the Netherlands and Across Europe
              </h1>

              <p className="mt-6 max-w-3xl text-lg leading-8 text-white/78">
                Road freight is one of the most important logistics solutions
                for businesses that need fast, flexible and reliable cargo
                movement across the Netherlands and Europe.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-3 rounded-full bg-[linear-gradient(135deg,#f5a623,#ffcf63)] px-6 py-4 font-extrabold text-[#111827] shadow-[0_16px_35px_rgba(245,166,35,0.35)] transition hover:-translate-y-1"
                >
                  Get A Freight Quote
                  <FaArrowRight />
                </Link>
                <Link
                  href="#services"
                  className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/8 px-6 py-4 font-extrabold text-white backdrop-blur transition hover:-translate-y-1 hover:bg-white/14"
                >
                  Explore Solutions
                </Link>
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-white/15 bg-white/10 p-6 shadow-[0_20px_60px_rgba(8,17,31,0.12)] backdrop-blur-xl lg:p-7">
              <h3 className="text-2xl font-bold text-white">
                Road Freight Planning Snapshot
              </h3>

              <div className="mt-5 space-y-4">
                {heroBullets.map((item, index) => (
                  <div
                    key={item}
                    className="flex gap-4 rounded-[1.1rem] bg-white/10 p-4"
                  >
                    <span className="flex h-11 w-11 flex-none items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#f5a623,#ffcf63)] text-[#08111f]">
                      {index === 0 ? (
                        <FaTruck />
                      ) : index === 1 ? (
                        <FaBoxOpen />
                      ) : index === 2 ? (
                        <FaBolt />
                      ) : (
                        <FaTemperatureThreeQuarters />
                      )}
                    </span>
                    <p className="text-sm leading-7 text-white/78">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 -mt-16 px-5 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl overflow-hidden rounded-[1.6rem] border border-slate-200 bg-white shadow-[0_20px_60px_rgba(8,17,31,0.12)] md:grid-cols-2 xl:grid-cols-4">
          {trustItems.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={item.label}
                className={`p-8 ${
                  index < trustItems.length - 1
                    ? "border-b border-slate-200 xl:border-b-0 xl:border-r"
                    : ""
                }`}
              >
                <Icon className="text-3xl text-[#d88700]" />
                <p className="mt-4 text-3xl font-bold leading-none text-[#08111f]">
                  {item.value}
                </p>
                <p className="mt-2 text-sm font-bold text-slate-500">
                  {item.label}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeader
              eyebrow={
                <>
                  <FaMap />
                  Why Road Freight Matters
                </>
              }
              title="Direct, Flexible Road Transport for European Supply Chains"
              description="Road freight services are valuable because they connect pickup and delivery points more directly, giving businesses better scheduling flexibility, cargo control and visibility."
            />

            <div className="mt-6 space-y-5 text-base leading-8 text-slate-600 sm:text-lg">
              <p>{service.content.intro[1]}</p>
              <p>{service.content.sections[0].paragraphs[1]}</p>
            </div>

            <ul className="mt-8 space-y-4">
              {heroBullets.map((item) => (
                <li key={item} className="flex gap-3">
                  <FaCircleCheck className="mt-1 flex-none text-[#d88700]" />
                  <span className="leading-7 text-slate-600">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative min-h-[360px] overflow-hidden rounded-[2rem] shadow-[0_20px_60px_rgba(8,17,31,0.12)] sm:min-h-[520px]">
            <Image
              src={service.image}
              alt="Road freight warehouse logistics in Europe"
              fill
              className="object-cover"
            />
            <div className="absolute bottom-6 left-6 rounded-[1.1rem] bg-white/92 px-5 py-4 text-[#08111f] shadow-[0_20px_60px_rgba(8,17,31,0.12)] backdrop-blur">
              <p className="flex items-center gap-2 font-black">
                <FaShieldHalved className="text-[#d88700]" />
                Secure Freight Planning
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="bg-[#f8fafc] py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <SectionHeader
            eyebrow={
              <>
                <FaTruckMoving />
                Our Road Freight Solutions
              </>
            }
            title="Complete Road Freight Services for the Netherlands and Europe"
            description="Invictus Logistics provides road freight services for businesses that need dependable cargo movement, flexible delivery options and clear shipment visibility across European routes."
          />

          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {solutionCards.map((card) => {
              const Icon = card.icon;

              return (
                <article
                  key={card.title}
                  className="group relative overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white p-8 shadow-[0_14px_38px_rgba(8,17,31,0.06)] transition duration-300 hover:-translate-y-2 hover:border-[#f5a623]/45 hover:shadow-[0_20px_60px_rgba(8,17,31,0.12)]"
                >
                  <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-[#f5a623]/10 transition duration-300 group-hover:scale-125" />
                  <div className="relative z-10">
                    <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-[1.1rem] bg-[linear-gradient(135deg,#f5a623,#ffcf63)] text-2xl text-[#08111f]">
                      <Icon />
                    </div>
                    <h3 className="text-2xl font-bold text-[#08111f]">
                      {card.title}
                    </h3>
                    <p className="mt-4 leading-8 text-slate-600">
                      {card.text}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
          <div className="relative min-h-[360px] overflow-hidden rounded-[2rem] shadow-[0_20px_60px_rgba(8,17,31,0.12)] sm:min-h-[520px]">
            <Image
              src="/Warehouse.jpg"
              alt="Netherlands logistics road freight network"
              fill
              className="object-cover"
            />
            <div className="absolute bottom-6 left-6 rounded-[1.1rem] bg-white/92 px-5 py-4 text-[#08111f] shadow-[0_20px_60px_rgba(8,17,31,0.12)] backdrop-blur">
              <p className="flex items-center gap-2 font-black">
                <FaLocationDot className="text-[#d88700]" />
                Netherlands Logistics Hub
              </p>
            </div>
          </div>

          <div>
            <SectionHeader
              eyebrow={
                <>
                  <FaMap />
                  Road Freight Netherlands
                </>
              }
              title="A Strong Logistics Base for European Cargo Movement"
              description={service.content.sections[2].paragraphs[0]}
            />

            <p className="mt-6 text-base leading-8 text-slate-600 sm:text-lg">
              {service.content.sections[2].paragraphs[1]}
            </p>

            <ul className="mt-8 space-y-4">
              {netherlandsBullets.map((item) => (
                <li key={item} className="flex gap-3">
                  <FaCircleCheck className="mt-1 flex-none text-[#d88700]" />
                  <span className="leading-7 text-slate-600">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-[radial-gradient(circle_at_10%_20%,rgba(245,166,35,0.14),transparent_30%),linear-gradient(135deg,#08111f,#101b2f)] py-20 text-white">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
            <div>
              <SectionHeader
                dark
                eyebrow={
                  <>
                    <FaGlobe />
                    European Road Freight
                  </>
                }
                title="Cross-Border Road Freight Across Europe"
                description={service.content.sections[3].paragraphs[0]}
              />

              <p className="mt-6 text-base leading-8 text-white/75 sm:text-lg">
                {service.content.sections[3].paragraphs[1]}
              </p>

              <ul className="mt-8 space-y-4">
                {europeBullets.map((item) => (
                  <li key={item} className="flex gap-3">
                  <FaCircleCheck className="mt-1 flex-none text-[#f5a623]" />
                    <span className="leading-7 text-white/75">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative min-h-[360px] overflow-hidden rounded-[2rem] shadow-[0_20px_60px_rgba(8,17,31,0.12)] sm:min-h-[520px]">
              <Image
                src="/Road_fright.jpg"
                alt="European road freight transport route"
                fill
                className="object-cover"
              />
              <div className="absolute bottom-6 left-6 rounded-[1.1rem] bg-white/92 px-5 py-4 text-[#08111f] shadow-[0_20px_60px_rgba(8,17,31,0.12)] backdrop-blur">
                <p className="flex items-center gap-2 font-black">
                  <FaRoad className="text-[#d88700]" />
                  EU Route Coverage
                </p>
              </div>
            </div>
          </div>

          <div className="pt-20">
            <SectionHeader
              dark
              eyebrow={
                <>
                  <FaIndustry />
                  Industries We Support
                </>
              }
              title="Road Freight for Different Business Sectors"
              description="Our road freight services are designed for businesses that need reliable transport, clear communication and cargo-specific planning."
            />

            <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {industryCards.map((card) => {
                const Icon = card.icon;

                return (
                  <article
                    key={card.title}
                    className="rounded-[1.4rem] border border-white/12 bg-white/8 p-6 transition duration-300 hover:-translate-y-2 hover:bg-white/12"
                  >
                    <Icon className="text-3xl text-[#f5a623]" />
                    <h3 className="mt-4 text-xl font-bold text-white">
                      {card.title}
                    </h3>
                    <p className="mt-3 leading-7 text-white/72">{card.text}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10">
        <SectionHeader
          eyebrow={
            <>
              <FaListCheck />
              Our Process
            </>
          }
          title="How We Manage Your Road Freight Shipment"
          description="Invictus Logistics keeps road freight simple, transparent and coordinated from booking to final delivery."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {processSteps.map((step) => (
            <article
              key={step.number}
              className="rounded-[1.5rem] border border-slate-200 bg-white p-8 shadow-[0_14px_35px_rgba(8,17,31,0.06)]"
            >
              <div className="mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-[#08111f] text-sm font-black text-white">
                {step.number}
              </div>
              <h3 className="text-xl font-bold text-[#08111f]">{step.title}</h3>
              <p className="mt-3 leading-8 text-slate-600">{step.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[#f8fafc] py-20">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:items-center lg:px-10">
          <div>
            <SectionHeader
              eyebrow={
                <>
                  <FaShieldHalved />
                  Why Choose Us
                </>
              }
              title="A Road Freight Company Built Around Reliability"
              description="Choosing the right road freight company in the Netherlands can make a major difference to your delivery performance. A strong logistics partner should provide planning, communication, visibility, flexibility and support."
            />

            <ul className="mt-8 space-y-4">
              {whyChooseBullets.map((item) => (
                <li key={item} className="flex gap-3">
                  <FaCircleCheck className="mt-1 flex-none text-[#d88700]" />
                  <span className="leading-7 text-slate-600">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative min-h-[360px] overflow-hidden rounded-[2rem] shadow-[0_20px_60px_rgba(8,17,31,0.12)] sm:min-h-[520px]">
            <Image
              src="/Logistics_Team.jpg"
              alt="Professional logistics company road freight transport"
              fill
              className="object-cover"
            />
            <div className="absolute bottom-6 left-6 rounded-[1.1rem] bg-white/92 px-5 py-4 text-[#08111f] shadow-[0_20px_60px_rgba(8,17,31,0.12)] backdrop-blur">
              <p className="flex items-center gap-2 font-black">
                <FaHeadset className="text-[#d88700]" />
                Live Support
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="quote" className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10">
        <div className="overflow-hidden rounded-[2.25rem] bg-[linear-gradient(90deg,rgba(8,17,31,0.92),rgba(8,17,31,0.62)),url('/Road_fright.jpg')] bg-cover bg-center px-7 py-12 text-white sm:px-10 sm:py-16 lg:px-16 lg:py-20">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#f5a623]/15 px-4 py-2 text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#ffcc6f]">
            <FaPaperPlane />
            Get Reliable Road Freight Support
          </span>

          <h2 className="mt-6 max-w-4xl text-4xl font-bold leading-[1.06] tracking-[-0.05em] sm:text-5xl lg:text-6xl">
            Move Your Cargo with Confidence Across the Netherlands and Europe
          </h2>

          <p className="mt-5 max-w-3xl text-base leading-8 text-white/76 sm:text-lg">
            If your business needs professional road freight in the Netherlands
            or across Europe, Invictus Logistics can help you plan, move and
            manage cargo with confidence. From FTL transport and LTL transport
            to express road freight and temperature-controlled delivery, our
            team supports your shipment from pickup to final destination.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 rounded-full bg-[linear-gradient(135deg,#f5a623,#ffcf63)] px-6 py-4 font-extrabold text-[#111827] shadow-[0_16px_35px_rgba(245,166,35,0.35)] transition hover:-translate-y-1"
            >
              Get A Freight Quote
              <FaArrowRight />
            </Link>
            <a
              href="tel:+31685865799"
              className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/8 px-6 py-4 font-extrabold text-white backdrop-blur transition hover:-translate-y-1 hover:bg-white/14"
            >
              Call Logistics Team
              <FaPhone />
            </a>
          </div>
        </div>
      </section>

      <section className="bg-[#f8fafc] py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <SectionHeader
            eyebrow={
              <>
                <FaListCheck />
                FAQs
              </>
            }
            title="Road Freight Questions Answered"
            description="Here are the most common questions businesses ask when comparing road freight services, European road transport and freight forwarding options."
          />

          <div className="mt-12 space-y-4">
            {service.content.faqs.map((faq, index) => (
              <details
                key={faq.question}
                open={index === 0}
                className="overflow-hidden rounded-[1.25rem] border border-slate-200 bg-white shadow-[0_12px_28px_rgba(8,17,31,0.04)]"
              >
                <summary className="cursor-pointer list-none px-6 py-5 text-lg font-black text-[#08111f] marker:hidden">
                  <span className="flex items-center justify-between gap-5">
                    <span>{faq.question}</span>
                    <span className="text-[#d88700]">+</span>
                  </span>
                </summary>
                <p className="px-6 pb-6 leading-8 text-slate-600">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function AirFreightPage({ service, faqSchema }) {
  const trustItems = [
    {
      icon: FaPlaneDeparture,
      value: "Same-Day",
      label: "Urgent air cargo coordination",
    },
    {
      icon: FaPlaneArrival,
      value: "Next Flight",
      label: "Priority uplift support",
    },
    {
      icon: FaFileLines,
      value: "Customs",
      label: "Documentation and clearance support",
    },
    {
      icon: FaGlobe,
      value: "Visibility",
      label: "Booking to release updates",
    },
  ];

  const solutionCards = [
    {
      icon: FaBolt,
      title: "Same-Day Air Freight",
      text:
        "Same-day air freight supports emergency stock movement, important documents, spare parts, and production-critical cargo that must move without delay.",
    },
    {
      icon: FaPlaneDeparture,
      title: "Next Flight Out Cargo",
      text:
        "Next flight out cargo helps place urgent shipments on the next suitable available flight for deadline-critical and high-priority business movement.",
    },
    {
      icon: FaPlane,
      title: "Airport-to-Airport Air Freight",
      text:
        "Airport-to-airport air freight is practical for businesses that can manage terminal-side cargo handling and want direct air cargo movement.",
    },
    {
      icon: FaDoorOpen,
      title: "Door-to-Door Air Freight",
      text:
        "Door-to-door air freight coordinates pickup, flight handling, customs support, arrival updates, and final delivery through one managed process.",
    },
    {
      icon: FaGlobe,
      title: "International Air Freight",
      text:
        "International air freight supports cargo moving between the Netherlands and major destinations across Europe and global trade lanes.",
    },
    {
      icon: FaFileLines,
      title: "Customs & Shipment Visibility",
      text:
        "Our air freight planning includes customs documentation support, tracking updates, and release communication from booking through delivery.",
    },
  ];

  const industryCards = [
    {
      icon: FaStore,
      title: "Retail & Fashion",
      text: "Fast transport for samples, launches, seasonal goods, and priority stock movement.",
    },
    {
      icon: FaCartShopping,
      title: "E-commerce",
      text: "Priority air support for urgent fulfilment, customer commitments, and replenishment needs.",
    },
    {
      icon: FaGears,
      title: "Manufacturing",
      text: "Critical movement for parts, production inputs, and time-sensitive industrial supply chains.",
    },
    {
      icon: FaSnowflake,
      title: "Sensitive Cargo",
      text: "Suitable for regulated, temperature-sensitive, or carefully handled shipment categories.",
    },
    {
      icon: FaCarSide,
      title: "Automotive",
      text: "Air cargo coordination for urgent spare parts and operational recovery shipments.",
    },
    {
      icon: FaShieldHalved,
      title: "Medical & Healthcare",
      text: "Faster cargo support for healthcare products, equipment, and urgent medical movement.",
    },
    {
      icon: FaGlobe,
      title: "Technology",
      text: "Practical support for electronics, high-value components, and lightweight global shipments.",
    },
    {
      icon: FaWarehouse,
      title: "Import & Export",
      text: "Air freight coordination between warehouses, airports, customs points, and final destinations.",
    },
  ];

  const processSteps = [
    {
      number: "01",
      title: "Cargo Review",
      text:
        "We review urgency, cargo type, destination, airport access, and any documentation or handling requirements.",
    },
    {
      number: "02",
      title: "Flight Planning",
      text:
        "We select the suitable air freight option, including same-day cargo, next flight out, airport-to-airport, or door-to-door delivery.",
    },
    {
      number: "03",
      title: "Airport Coordination",
      text:
        "We support booking, pickup, cargo handover, customs documentation, airport handling, and destination planning.",
    },
    {
      number: "04",
      title: "Release Updates",
      text:
        "Your team receives clear shipment visibility from booking through arrival, release, and final delivery coordination.",
    },
  ];

  const heroBullets = [
    "Same-day air freight for urgent cargo that cannot wait.",
    "Next flight out support for deadline-critical commercial shipments.",
    "Airport-to-airport and door-to-door air freight coordination.",
    "Customs support and shipment visibility from booking to release.",
  ];

  const netherlandsBullets = [
    "Fast airport access through the Netherlands logistics network.",
    "Strong support for Amsterdam, Rotterdam, The Hague, Utrecht, and Eindhoven regions.",
    "Reliable cargo collection from warehouses, factories, offices, and fulfilment centres.",
    "Clear communication, customs coordination, and urgent cargo handling.",
  ];

  const europeBullets = [
    "European air cargo routes for faster cross-border movement.",
    "Road-air combinations for pickup and final delivery flexibility.",
    "Airport handling and customs support for time-sensitive shipments.",
    "Dependable updates for urgent, high-value, and deadline-critical cargo.",
  ];

  const whyChooseBullets = [
    "Air freight Netherlands and Europe coverage.",
    "Same-day air freight coordination.",
    "Next flight out cargo options.",
    "Airport-to-airport air freight support.",
    "Door-to-door air freight delivery.",
    "Customs documentation support and shipment visibility.",
  ];

  return (
    <main className="bg-white text-[#334155]">
      {faqSchema ? (
        <Script
          id={`${service.slug}-faq-schema`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      ) : null}

      <section className="relative overflow-hidden bg-[#08111f] text-white">
        <div className="absolute inset-0">
          <Image
            src={service.image}
            alt={service.title}
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,17,31,0.94),rgba(8,17,31,0.78),rgba(8,17,31,0.35))]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(245,166,35,0.16),transparent_28%),radial-gradient(circle_at_75%_80%,rgba(255,207,99,0.14),transparent_24%)]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-5 pb-36 pt-12 sm:px-8 lg:px-10 lg:pb-44 lg:pt-16">
          <Link
            href="/services"
            className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/8 px-4 py-2 text-sm font-semibold text-white/90 backdrop-blur transition hover:bg-white/14"
          >
            <FaArrowLeft />
            Back To Services
          </Link>

          <div className="mt-12 grid gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-[#f5a623]/15 px-4 py-2 text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#ffcc6f]">
                <FaPlaneDeparture />
                Air Freight Netherlands
              </span>

              <h1 className="mt-6 max-w-4xl text-5xl font-bold leading-[0.96] tracking-[-0.07em] sm:text-6xl lg:text-7xl">
                {service.content?.heroTitle || service.title}
              </h1>

              <p className="mt-6 max-w-3xl text-lg leading-8 text-white/78">
                {service.content?.intro?.[0]}
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-3 rounded-full bg-[linear-gradient(135deg,#f5a623,#ffcf63)] px-6 py-4 font-extrabold text-[#111827] shadow-[0_16px_35px_rgba(245,166,35,0.35)] transition hover:-translate-y-1"
                >
                  Get An Air Freight Quote
                  <FaArrowRight />
                </Link>
                <Link
                  href="#services"
                  className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/8 px-6 py-4 font-extrabold text-white backdrop-blur transition hover:-translate-y-1 hover:bg-white/14"
                >
                  Explore Solutions
                </Link>
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-white/15 bg-white/10 p-6 shadow-[0_20px_60px_rgba(8,17,31,0.12)] backdrop-blur-xl lg:p-7">
              <h3 className="text-2xl font-bold text-white">
                Air Freight Planning Snapshot
              </h3>

              <div className="mt-5 space-y-4">
                {heroBullets.map((item, index) => (
                  <div
                    key={item}
                    className="flex gap-4 rounded-[1.1rem] bg-white/10 p-4"
                  >
                    <span className="flex h-11 w-11 flex-none items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#f5a623,#ffcf63)] text-[#08111f]">
                      {index === 0 ? (
                        <FaBolt />
                      ) : index === 1 ? (
                        <FaPlaneDeparture />
                      ) : index === 2 ? (
                        <FaPlane />
                      ) : (
                        <FaFileLines />
                      )}
                    </span>
                    <p className="text-sm leading-7 text-white/78">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 -mt-16 px-5 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl overflow-hidden rounded-[1.6rem] border border-slate-200 bg-white shadow-[0_20px_60px_rgba(8,17,31,0.12)] md:grid-cols-2 xl:grid-cols-4">
          {trustItems.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={item.label}
                className={`p-8 ${
                  index < trustItems.length - 1
                    ? "border-b border-slate-200 xl:border-b-0 xl:border-r"
                    : ""
                }`}
              >
                <Icon className="text-3xl text-[#d88700]" />
                <p className="mt-4 text-3xl font-bold leading-none text-[#08111f]">
                  {item.value}
                </p>
                <p className="mt-2 text-sm font-bold text-slate-500">
                  {item.label}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeader
              eyebrow={
                <>
                  <FaClock />
                  Why Air Freight Matters
                </>
              }
              title="Fast, Reliable Air Cargo for Modern Business Timelines"
              description={service.content.sections[0].paragraphs[0]}
            />

            <div className="mt-6 space-y-5 text-base leading-8 text-slate-600 sm:text-lg">
              <p>{service.content.sections[0].paragraphs[1]}</p>
              <p>{service.content.sections[0].paragraphs[2]}</p>
            </div>

            <ul className="mt-8 space-y-4">
              {heroBullets.map((item) => (
                <li key={item} className="flex gap-3">
                  <FaCircleCheck className="mt-1 flex-none text-[#d88700]" />
                  <span className="leading-7 text-slate-600">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative min-h-[360px] overflow-hidden rounded-[2rem] shadow-[0_20px_60px_rgba(8,17,31,0.12)] sm:min-h-[520px]">
            <Image
              src={service.image}
              alt="Air freight cargo planning in Europe"
              fill
              className="object-cover"
            />
            <div className="absolute bottom-6 left-6 rounded-[1.1rem] bg-white/92 px-5 py-4 text-[#08111f] shadow-[0_20px_60px_rgba(8,17,31,0.12)] backdrop-blur">
              <p className="flex items-center gap-2 font-black">
                <FaShieldHalved className="text-[#d88700]" />
                Priority Cargo Coordination
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="bg-[#f8fafc] py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <SectionHeader
            eyebrow={
              <>
                <FaPlaneDeparture />
                Our Air Freight Solutions
              </>
            }
            title="Complete Air Freight Services for the Netherlands and Europe"
            description="Invictus Logistics offers air freight services designed for different shipment needs, delivery timelines, and cargo priorities."
          />

          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {solutionCards.map((card) => {
              const Icon = card.icon;

              return (
                <article
                  key={card.title}
                  className="group relative overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white p-8 shadow-[0_14px_38px_rgba(8,17,31,0.06)] transition duration-300 hover:-translate-y-2 hover:border-[#f5a623]/45 hover:shadow-[0_20px_60px_rgba(8,17,31,0.12)]"
                >
                  <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-[#f5a623]/10 transition duration-300 group-hover:scale-125" />
                  <div className="relative z-10">
                    <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-[1.1rem] bg-[linear-gradient(135deg,#f5a623,#ffcf63)] text-2xl text-[#08111f]">
                      <Icon />
                    </div>
                    <h3 className="text-2xl font-bold text-[#08111f]">
                      {card.title}
                    </h3>
                    <p className="mt-4 leading-8 text-slate-600">
                      {card.text}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
          <div className="relative min-h-[360px] overflow-hidden rounded-[2rem] shadow-[0_20px_60px_rgba(8,17,31,0.12)] sm:min-h-[520px]">
            <Image
              src="/Warehouse.jpg"
              alt="Netherlands air freight logistics hub"
              fill
              className="object-cover"
            />
            <div className="absolute bottom-6 left-6 rounded-[1.1rem] bg-white/92 px-5 py-4 text-[#08111f] shadow-[0_20px_60px_rgba(8,17,31,0.12)] backdrop-blur">
              <p className="flex items-center gap-2 font-black">
                <FaLocationDot className="text-[#d88700]" />
                Netherlands Air Cargo Hub
              </p>
            </div>
          </div>

          <div>
            <SectionHeader
              eyebrow={
                <>
                  <FaMap />
                  Air Freight Netherlands
                </>
              }
              title="A Strong Logistics Base for Fast Cargo Movement"
              description={service.content.sections[2].paragraphs[0]}
            />

            <p className="mt-6 text-base leading-8 text-slate-600 sm:text-lg">
              {service.content.sections[2].paragraphs[1]}
            </p>

            <ul className="mt-8 space-y-4">
              {netherlandsBullets.map((item) => (
                <li key={item} className="flex gap-3">
                  <FaCircleCheck className="mt-1 flex-none text-[#d88700]" />
                  <span className="leading-7 text-slate-600">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-[radial-gradient(circle_at_10%_20%,rgba(245,166,35,0.14),transparent_30%),linear-gradient(135deg,#08111f,#101b2f)] py-20 text-white">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
            <div>
              <SectionHeader
                dark
                eyebrow={
                  <>
                    <FaGlobe />
                    Air Freight Europe
                  </>
                }
                title="Air Freight Across Europe"
                description={service.content.sections[3].paragraphs[0]}
              />

              <p className="mt-6 text-base leading-8 text-white/75 sm:text-lg">
                {service.content.sections[3].paragraphs[1]}
              </p>

              <ul className="mt-8 space-y-4">
                {europeBullets.map((item) => (
                  <li key={item} className="flex gap-3">
                    <FaCircleCheck className="mt-1 flex-none text-[#f5a623]" />
                    <span className="leading-7 text-white/75">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative min-h-[360px] overflow-hidden rounded-[2rem] shadow-[0_20px_60px_rgba(8,17,31,0.12)] sm:min-h-[520px]">
              <Image
                src="/Air_filite.jpg"
                alt="European air freight network"
                fill
                className="object-cover"
              />
              <div className="absolute bottom-6 left-6 rounded-[1.1rem] bg-white/92 px-5 py-4 text-[#08111f] shadow-[0_20px_60px_rgba(8,17,31,0.12)] backdrop-blur">
                <p className="flex items-center gap-2 font-black">
                  <FaPlaneArrival className="text-[#d88700]" />
                  European Airport Coverage
                </p>
              </div>
            </div>
          </div>

          <div className="pt-20">
            <SectionHeader
              dark
              eyebrow={
                <>
                  <FaIndustry />
                  Industries We Support
                </>
              }
              title="Air Freight for Different Business Sectors"
              description="Our air freight services are designed for businesses that need speed, customs support, secure handling, and clear communication."
            />

            <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {industryCards.map((card) => {
                const Icon = card.icon;

                return (
                  <article
                    key={card.title}
                    className="rounded-[1.4rem] border border-white/12 bg-white/8 p-6 transition duration-300 hover:-translate-y-2 hover:bg-white/12"
                  >
                    <Icon className="text-3xl text-[#f5a623]" />
                    <h3 className="mt-4 text-xl font-bold text-white">
                      {card.title}
                    </h3>
                    <p className="mt-3 leading-7 text-white/72">{card.text}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10">
        <SectionHeader
          eyebrow={
            <>
              <FaListCheck />
              Our Process
            </>
          }
          title="How We Manage Your Air Freight Shipment"
          description="Invictus Logistics keeps urgent air freight simple, visible, and coordinated from booking to release."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {processSteps.map((step) => (
            <article
              key={step.number}
              className="rounded-[1.5rem] border border-slate-200 bg-white p-8 shadow-[0_14px_35px_rgba(8,17,31,0.06)]"
            >
              <div className="mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-[#08111f] text-sm font-black text-white">
                {step.number}
              </div>
              <h3 className="text-xl font-bold text-[#08111f]">{step.title}</h3>
              <p className="mt-3 leading-8 text-slate-600">{step.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[#f8fafc] py-20">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:items-center lg:px-10">
          <div>
            <SectionHeader
              eyebrow={
                <>
                  <FaShieldHalved />
                  Why Choose Us
                </>
              }
              title="An Air Freight Company Built Around Speed and Visibility"
              description={service.content.sections[7].paragraphs[0]}
            />

            <ul className="mt-8 space-y-4">
              {whyChooseBullets.map((item) => (
                <li key={item} className="flex gap-3">
                  <FaCircleCheck className="mt-1 flex-none text-[#d88700]" />
                  <span className="leading-7 text-slate-600">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative min-h-[360px] overflow-hidden rounded-[2rem] shadow-[0_20px_60px_rgba(8,17,31,0.12)] sm:min-h-[520px]">
            <Image
              src="/Logistics_Team.jpg"
              alt="Professional air freight support team"
              fill
              className="object-cover"
            />
            <div className="absolute bottom-6 left-6 rounded-[1.1rem] bg-white/92 px-5 py-4 text-[#08111f] shadow-[0_20px_60px_rgba(8,17,31,0.12)] backdrop-blur">
              <p className="flex items-center gap-2 font-black">
                <FaHeadset className="text-[#d88700]" />
                Live Air Cargo Support
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="quote" className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10">
        <div className="overflow-hidden rounded-[2.25rem] bg-[linear-gradient(90deg,rgba(8,17,31,0.92),rgba(8,17,31,0.62)),url('/Air_filite.jpg')] bg-cover bg-center px-7 py-12 text-white sm:px-10 sm:py-16 lg:px-16 lg:py-20">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#f5a623]/15 px-4 py-2 text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#ffcc6f]">
            <FaPaperPlane />
            Get Fast Air Freight Support
          </span>

          <h2 className="mt-6 max-w-4xl text-4xl font-bold leading-[1.06] tracking-[-0.05em] sm:text-5xl lg:text-6xl">
            Move Urgent Cargo with Speed, Visibility, and Confidence
          </h2>

          <p className="mt-5 max-w-3xl text-base leading-8 text-white/76 sm:text-lg">
            {service.content.sections[9].paragraphs[0]}
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 rounded-full bg-[linear-gradient(135deg,#f5a623,#ffcf63)] px-6 py-4 font-extrabold text-[#111827] shadow-[0_16px_35px_rgba(245,166,35,0.35)] transition hover:-translate-y-1"
            >
              Request Air Freight Support
              <FaArrowRight />
            </Link>
            <a
              href="tel:+31685865799"
              className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/8 px-6 py-4 font-extrabold text-white backdrop-blur transition hover:-translate-y-1 hover:bg-white/14"
            >
              Call Logistics Team
              <FaPhone />
            </a>
          </div>
        </div>
      </section>

      <section className="bg-[#f8fafc] py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <SectionHeader
            eyebrow={
              <>
                <FaListCheck />
                FAQs
              </>
            }
            title="Air Freight Questions Answered"
            description="Here are common questions businesses ask when comparing air freight services, urgent cargo support, customs coordination, and global forwarding options."
          />

          <div className="mt-12 space-y-4">
            {service.content.faqs.map((faq, index) => (
              <details
                key={faq.question}
                open={index === 0}
                className="overflow-hidden rounded-[1.25rem] border border-slate-200 bg-white shadow-[0_12px_28px_rgba(8,17,31,0.04)]"
              >
                <summary className="cursor-pointer list-none px-6 py-5 text-lg font-black text-[#08111f] marker:hidden">
                  <span className="flex items-center justify-between gap-5">
                    <span>{faq.question}</span>
                    <span className="text-[#d88700]">+</span>
                  </span>
                </summary>
                <p className="px-6 pb-6 leading-8 text-slate-600">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function OceanFreightPage({ service, faqSchema }) {
  const trustItems = [
    {
      icon: FaBoxesPacking,
      value: "FCL + LCL",
      label: "Container flexibility",
    },
    {
      icon: FaAnchor,
      value: "Port-to-Port",
      label: "Direct sea freight planning",
    },
    {
      icon: FaTruckRampBox,
      value: "Door-to-Door",
      label: "Optional inland coordination",
    },
    {
      icon: FaFileLines,
      value: "Docs Support",
      label: "Customs and bill of lading guidance",
    },
  ];

  const solutionCards = [
    {
      icon: FaBoxesPacking,
      title: "Full Container Load Shipping",
      text:
        "FCL shipping is suitable when cargo requires a dedicated container, offering stronger loading control, reduced handling, and better planning for high-volume shipments.",
    },
    {
      icon: FaBoxOpen,
      title: "Less Than Container Load Shipping",
      text:
        "LCL shipping helps smaller cargo volumes move through shared container space, making international ocean freight more cost-effective for partial shipments.",
    },
    {
      icon: FaAnchor,
      title: "Port-to-Port Ocean Freight",
      text:
        "Port-to-port shipping supports direct sea freight movement between origin and destination ports for experienced importers and exporters.",
    },
    {
      icon: FaTruckRampBox,
      title: "Door-to-Door Ocean Freight",
      text:
        "Door-to-door ocean freight combines pickup, export handling, sea transport, destination coordination, customs support, and inland delivery.",
    },
    {
      icon: FaBoxesPacking,
      title: "Cargo Consolidation",
      text:
        "Cargo consolidation helps smaller shipments access international sea freight through shared container planning and controlled logistics coordination.",
    },
    {
      icon: FaFileLines,
      title: "Customs & Documentation Support",
      text:
        "Our ocean freight planning includes documentation guidance, bill of lading support, customs paperwork coordination, and compliance awareness.",
    },
  ];

  const industryCards = [
    {
      icon: FaStore,
      title: "Retail & Wholesale",
      text: "Planned stock movement for wholesale distribution, replenishment, and commercial inventory.",
    },
    {
      icon: FaCartShopping,
      title: "E-commerce",
      text: "Cost-effective sea freight support for inventory movement, import planning, and container-based replenishment.",
    },
    {
      icon: FaGears,
      title: "Manufacturing",
      text: "Reliable transport for machinery, components, raw materials, and industrial supply chain cargo.",
    },
    {
      icon: FaHelmetSafety,
      title: "Construction",
      text: "Ocean freight planning for heavy materials, equipment, and project-related international cargo.",
    },
    {
      icon: FaCarSide,
      title: "Automotive",
      text: "Sea freight support for automotive components, spare parts, and scheduled import-export movement.",
    },
    {
      icon: FaWarehouse,
      title: "Furniture & Home Goods",
      text: "Container shipping for bulky consumer products, packaged goods, and home-related stock movement.",
    },
    {
      icon: FaShip,
      title: "Import & Export",
      text: "Structured freight forwarding support across origin ports, destination ports, and European distribution routes.",
    },
    {
      icon: FaWater,
      title: "Bulk & Containerized Cargo",
      text: "Strong fit for heavy, bulky, planned, or cost-sensitive cargo moving through global sea freight lanes.",
    },
  ];

  const processSteps = [
    {
      number: "01",
      title: "Cargo Planning",
      text:
        "We review shipment size, container requirements, origin port, destination port, delivery timing, and customs needs.",
    },
    {
      number: "02",
      title: "Container Selection",
      text:
        "We help choose the right ocean freight option, including FCL shipping, LCL consolidation, port-to-port service, or door-to-door coordination.",
    },
    {
      number: "03",
      title: "Port Coordination",
      text:
        "We support documentation, export handling, container planning, port-side coordination, and optional inland delivery planning.",
    },
    {
      number: "04",
      title: "Delivery Updates",
      text:
        "Your team receives clearer shipment communication around freight status, documentation, arrival planning, and final cargo movement.",
    },
  ];

  const heroBullets = [
    "FCL shipping for dedicated container movement and better cargo control.",
    "LCL consolidation for smaller shipments that need lower-cost sea freight access.",
    "Port-to-port and door-to-door ocean freight coordination.",
    "Documentation support, customs guidance, and global sea freight planning.",
  ];

  const netherlandsBullets = [
    "Strong access through Dutch seaports and container terminals.",
    "Efficient links to road, rail, inland waterways, and European distribution routes.",
    "Reliable support around Rotterdam, Amsterdam, The Hague, Utrecht, and Eindhoven logistics regions.",
    "Practical freight planning for importers, exporters, and international trading businesses.",
  ];

  const europeBullets = [
    "Sea freight combined with inland transport for European distribution.",
    "Port arrivals in the Netherlands linked to Germany, Belgium, France, Italy, Spain, and wider Europe.",
    "Coordinated sea freight, documentation, and optional inland delivery planning.",
    "Cost-effective international transport with organised European follow-on distribution.",
  ];

  const whyChooseBullets = [
    "Ocean freight Netherlands and Europe support.",
    "FCL shipping for dedicated container movement.",
    "LCL shipping for shared container consolidation.",
    "Port-to-port and door-to-door ocean freight coordination.",
    "Import and export documentation assistance.",
    "Cargo consolidation options and practical international sea freight support.",
  ];

  return (
    <main className="bg-white text-[#334155]">
      {faqSchema ? (
        <Script
          id={`${service.slug}-faq-schema`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      ) : null}

      <section className="relative overflow-hidden bg-[#08111f] text-white">
        <div className="absolute inset-0">
          <Image
            src={service.image}
            alt={service.title}
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,17,31,0.94),rgba(8,17,31,0.78),rgba(8,17,31,0.35))]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(245,166,35,0.16),transparent_28%),radial-gradient(circle_at_75%_80%,rgba(255,207,99,0.14),transparent_24%)]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-5 pb-36 pt-12 sm:px-8 lg:px-10 lg:pb-44 lg:pt-16">
          <Link
            href="/services"
            className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/8 px-4 py-2 text-sm font-semibold text-white/90 backdrop-blur transition hover:bg-white/14"
          >
            <FaArrowLeft />
            Back To Services
          </Link>

          <div className="mt-12 grid gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-[#f5a623]/15 px-4 py-2 text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#ffcc6f]">
                <FaShip />
                Ocean Freight Netherlands
              </span>

              <h1 className="mt-6 max-w-4xl text-5xl font-bold leading-[0.96] tracking-[-0.07em] sm:text-6xl lg:text-7xl">
                {service.content?.heroTitle || service.title}
              </h1>

              <p className="mt-6 max-w-3xl text-lg leading-8 text-white/78">
                {service.content?.intro?.[0]}
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-3 rounded-full bg-[linear-gradient(135deg,#f5a623,#ffcf63)] px-6 py-4 font-extrabold text-[#111827] shadow-[0_16px_35px_rgba(245,166,35,0.35)] transition hover:-translate-y-1"
                >
                  Get An Ocean Freight Quote
                  <FaArrowRight />
                </Link>
                <Link
                  href="#services"
                  className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/8 px-6 py-4 font-extrabold text-white backdrop-blur transition hover:-translate-y-1 hover:bg-white/14"
                >
                  Explore Solutions
                </Link>
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-white/15 bg-white/10 p-6 shadow-[0_20px_60px_rgba(8,17,31,0.12)] backdrop-blur-xl lg:p-7">
              <h3 className="text-2xl font-bold text-white">
                Ocean Freight Planning Snapshot
              </h3>

              <div className="mt-5 space-y-4">
                {heroBullets.map((item, index) => (
                  <div
                    key={item}
                    className="flex gap-4 rounded-[1.1rem] bg-white/10 p-4"
                  >
                    <span className="flex h-11 w-11 flex-none items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#f5a623,#ffcf63)] text-[#08111f]">
                      {index === 0 ? (
                        <FaBoxesPacking />
                      ) : index === 1 ? (
                        <FaBoxOpen />
                      ) : index === 2 ? (
                        <FaAnchor />
                      ) : (
                        <FaFileLines />
                      )}
                    </span>
                    <p className="text-sm leading-7 text-white/78">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 -mt-16 px-5 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl overflow-hidden rounded-[1.6rem] border border-slate-200 bg-white shadow-[0_20px_60px_rgba(8,17,31,0.12)] md:grid-cols-2 xl:grid-cols-4">
          {trustItems.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={item.label}
                className={`p-8 ${
                  index < trustItems.length - 1
                    ? "border-b border-slate-200 xl:border-b-0 xl:border-r"
                    : ""
                }`}
              >
                <Icon className="text-3xl text-[#d88700]" />
                <p className="mt-4 text-3xl font-bold leading-none text-[#08111f]">
                  {item.value}
                </p>
                <p className="mt-2 text-sm font-bold text-slate-500">
                  {item.label}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeader
              eyebrow={
                <>
                  <FaGlobe />
                  Why Ocean Freight Matters
                </>
              }
              title="Cost-Effective Sea Freight for Global Trade and Planned Cargo Movement"
              description={service.content.sections[0].paragraphs[0]}
            />

            <div className="mt-6 space-y-5 text-base leading-8 text-slate-600 sm:text-lg">
              <p>{service.content.sections[0].paragraphs[1]}</p>
              <p>{service.content.sections[0].paragraphs[2]}</p>
            </div>

            <ul className="mt-8 space-y-4">
              {heroBullets.map((item) => (
                <li key={item} className="flex gap-3">
                  <FaCircleCheck className="mt-1 flex-none text-[#d88700]" />
                  <span className="leading-7 text-slate-600">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative min-h-[360px] overflow-hidden rounded-[2rem] shadow-[0_20px_60px_rgba(8,17,31,0.12)] sm:min-h-[520px]">
            <Image
              src={service.image}
              alt="Ocean freight cargo planning in Europe"
              fill
              className="object-cover"
            />
            <div className="absolute bottom-6 left-6 rounded-[1.1rem] bg-white/92 px-5 py-4 text-[#08111f] shadow-[0_20px_60px_rgba(8,17,31,0.12)] backdrop-blur">
              <p className="flex items-center gap-2 font-black">
                <FaAnchor className="text-[#d88700]" />
                Container Freight Planning
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="bg-[#f8fafc] py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <SectionHeader
            eyebrow={
              <>
                <FaShip />
                Our Ocean Freight Solutions
              </>
            }
            title="Complete Ocean Freight Services for the Netherlands and Europe"
            description="Invictus Logistics offers ocean freight services designed for different shipment sizes, cargo types, delivery timelines, and budget requirements."
          />

          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {solutionCards.map((card) => {
              const Icon = card.icon;

              return (
                <article
                  key={card.title}
                  className="group relative overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white p-8 shadow-[0_14px_38px_rgba(8,17,31,0.06)] transition duration-300 hover:-translate-y-2 hover:border-[#f5a623]/45 hover:shadow-[0_20px_60px_rgba(8,17,31,0.12)]"
                >
                  <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-[#f5a623]/10 transition duration-300 group-hover:scale-125" />
                  <div className="relative z-10">
                    <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-[1.1rem] bg-[linear-gradient(135deg,#f5a623,#ffcf63)] text-2xl text-[#08111f]">
                      <Icon />
                    </div>
                    <h3 className="text-2xl font-bold text-[#08111f]">
                      {card.title}
                    </h3>
                    <p className="mt-4 leading-8 text-slate-600">
                      {card.text}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
          <div className="relative min-h-[360px] overflow-hidden rounded-[2rem] shadow-[0_20px_60px_rgba(8,17,31,0.12)] sm:min-h-[520px]">
            <Image
              src="/Warehouse.jpg"
              alt="Netherlands ocean freight logistics hub"
              fill
              className="object-cover"
            />
            <div className="absolute bottom-6 left-6 rounded-[1.1rem] bg-white/92 px-5 py-4 text-[#08111f] shadow-[0_20px_60px_rgba(8,17,31,0.12)] backdrop-blur">
              <p className="flex items-center gap-2 font-black">
                <FaLocationDot className="text-[#d88700]" />
                Netherlands Sea Freight Hub
              </p>
            </div>
          </div>

          <div>
            <SectionHeader
              eyebrow={
                <>
                  <FaMap />
                  Ocean Freight Netherlands
                </>
              }
              title="A Strong Gateway for Container Shipping and European Distribution"
              description={service.content.sections[2].paragraphs[0]}
            />

            <p className="mt-6 text-base leading-8 text-slate-600 sm:text-lg">
              {service.content.sections[2].paragraphs[1]}
            </p>

            <ul className="mt-8 space-y-4">
              {netherlandsBullets.map((item) => (
                <li key={item} className="flex gap-3">
                  <FaCircleCheck className="mt-1 flex-none text-[#d88700]" />
                  <span className="leading-7 text-slate-600">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-[radial-gradient(circle_at_10%_20%,rgba(245,166,35,0.14),transparent_30%),linear-gradient(135deg,#08111f,#101b2f)] py-20 text-white">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
            <div>
              <SectionHeader
                dark
                eyebrow={
                  <>
                    <FaGlobe />
                    Ocean Freight Europe
                  </>
                }
                title="Ocean Freight Across Europe"
                description={service.content.sections[3].paragraphs[0]}
              />

              <p className="mt-6 text-base leading-8 text-white/75 sm:text-lg">
                {service.content.sections[3].paragraphs[1]}
              </p>

              <ul className="mt-8 space-y-4">
                {europeBullets.map((item) => (
                  <li key={item} className="flex gap-3">
                    <FaCircleCheck className="mt-1 flex-none text-[#f5a623]" />
                    <span className="leading-7 text-white/75">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative min-h-[360px] overflow-hidden rounded-[2rem] shadow-[0_20px_60px_rgba(8,17,31,0.12)] sm:min-h-[520px]">
              <Image
                src="/Ocean_Freight.jpg"
                alt="European ocean freight network"
                fill
                className="object-cover"
              />
              <div className="absolute bottom-6 left-6 rounded-[1.1rem] bg-white/92 px-5 py-4 text-[#08111f] shadow-[0_20px_60px_rgba(8,17,31,0.12)] backdrop-blur">
                <p className="flex items-center gap-2 font-black">
                  <FaWater className="text-[#d88700]" />
                  European Distribution Lanes
                </p>
              </div>
            </div>
          </div>

          <div className="pt-20">
            <SectionHeader
              dark
              eyebrow={
                <>
                  <FaIndustry />
                  Industries We Support
                </>
              }
              title="Ocean Freight for Different Business Sectors"
              description="Our ocean freight services are designed for businesses that need cost-effective international shipping, stronger planning, and reliable European distribution support."
            />

            <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {industryCards.map((card) => {
                const Icon = card.icon;

                return (
                  <article
                    key={card.title}
                    className="rounded-[1.4rem] border border-white/12 bg-white/8 p-6 transition duration-300 hover:-translate-y-2 hover:bg-white/12"
                  >
                    <Icon className="text-3xl text-[#f5a623]" />
                    <h3 className="mt-4 text-xl font-bold text-white">
                      {card.title}
                    </h3>
                    <p className="mt-3 leading-7 text-white/72">{card.text}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10">
        <SectionHeader
          eyebrow={
            <>
              <FaListCheck />
              Our Process
            </>
          }
          title="How We Manage Your Ocean Freight Shipment"
          description="Invictus Logistics keeps sea freight planning simple, practical, and coordinated from origin through destination."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {processSteps.map((step) => (
            <article
              key={step.number}
              className="rounded-[1.5rem] border border-slate-200 bg-white p-8 shadow-[0_14px_35px_rgba(8,17,31,0.06)]"
            >
              <div className="mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-[#08111f] text-sm font-black text-white">
                {step.number}
              </div>
              <h3 className="text-xl font-bold text-[#08111f]">{step.title}</h3>
              <p className="mt-3 leading-8 text-slate-600">{step.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[#f8fafc] py-20">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:items-center lg:px-10">
          <div>
            <SectionHeader
              eyebrow={
                <>
                  <FaShieldHalved />
                  Why Choose Us
                </>
              }
              title="An Ocean Freight Company Built Around Reliability and Cost Control"
              description={service.content.sections[5].paragraphs[0]}
            />

            <ul className="mt-8 space-y-4">
              {whyChooseBullets.map((item) => (
                <li key={item} className="flex gap-3">
                  <FaCircleCheck className="mt-1 flex-none text-[#d88700]" />
                  <span className="leading-7 text-slate-600">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative min-h-[360px] overflow-hidden rounded-[2rem] shadow-[0_20px_60px_rgba(8,17,31,0.12)] sm:min-h-[520px]">
            <Image
              src="/Logistics_Team.jpg"
              alt="Professional ocean freight support team"
              fill
              className="object-cover"
            />
            <div className="absolute bottom-6 left-6 rounded-[1.1rem] bg-white/92 px-5 py-4 text-[#08111f] shadow-[0_20px_60px_rgba(8,17,31,0.12)] backdrop-blur">
              <p className="flex items-center gap-2 font-black">
                <FaHeadset className="text-[#d88700]" />
                Live Sea Freight Support
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="quote" className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10">
        <div className="overflow-hidden rounded-[2.25rem] bg-[linear-gradient(90deg,rgba(8,17,31,0.92),rgba(8,17,31,0.62)),url('/Ocean_Freight.jpg')] bg-cover bg-center px-7 py-12 text-white sm:px-10 sm:py-16 lg:px-16 lg:py-20">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#f5a623]/15 px-4 py-2 text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#ffcc6f]">
            <FaPaperPlane />
            Get Reliable Ocean Freight Support
          </span>

          <h2 className="mt-6 max-w-4xl text-4xl font-bold leading-[1.06] tracking-[-0.05em] sm:text-5xl lg:text-6xl">
            Move International Cargo with Better Planning, Visibility, and Cost Control
          </h2>

          <p className="mt-5 max-w-3xl text-base leading-8 text-white/76 sm:text-lg">
            {service.content.sections[9].paragraphs[0]}
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 rounded-full bg-[linear-gradient(135deg,#f5a623,#ffcf63)] px-6 py-4 font-extrabold text-[#111827] shadow-[0_16px_35px_rgba(245,166,35,0.35)] transition hover:-translate-y-1"
            >
              Request Ocean Freight Support
              <FaArrowRight />
            </Link>
            <a
              href="tel:+31685865799"
              className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/8 px-6 py-4 font-extrabold text-white backdrop-blur transition hover:-translate-y-1 hover:bg-white/14"
            >
              Call Logistics Team
              <FaPhone />
            </a>
          </div>
        </div>
      </section>

      <section className="bg-[#f8fafc] py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <SectionHeader
            eyebrow={
              <>
                <FaListCheck />
                FAQs
              </>
            }
            title="Ocean Freight Questions Answered"
            description="Here are common questions businesses ask when comparing sea freight services, container options, documentation needs, and international shipping timelines."
          />

          <div className="mt-12 space-y-4">
            {service.content.faqs.map((faq, index) => (
              <details
                key={faq.question}
                open={index === 0}
                className="overflow-hidden rounded-[1.25rem] border border-slate-200 bg-white shadow-[0_12px_28px_rgba(8,17,31,0.04)]"
              >
                <summary className="cursor-pointer list-none px-6 py-5 text-lg font-black text-[#08111f] marker:hidden">
                  <span className="flex items-center justify-between gap-5">
                    <span>{faq.question}</span>
                    <span className="text-[#d88700]">+</span>
                  </span>
                </summary>
                <p className="px-6 pb-6 leading-8 text-slate-600">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function WarehousingPage({ service, faqSchema }) {
  const trustItems = [
    {
      icon: FaWarehouse,
      value: "Secure Storage",
      label: "Structured warehouse handling",
    },
    {
      icon: FaBoxesPacking,
      value: "Pick & Pack",
      label: "Order preparation support",
    },
    {
      icon: FaFileLines,
      value: "Inventory",
      label: "Stock visibility and movement tracking",
    },
    {
      icon: FaTruckRampBox,
      value: "Distribution",
      label: "Dispatch-ready outbound flow",
    },
  ];

  const solutionCards = [
    {
      icon: FaWarehouse,
      title: "Secure Warehouse Storage",
      text:
        "Secure warehouse storage supports organized, careful handling for commercial products, e-commerce stock, packaged goods, spare parts, and distribution inventory.",
    },
    {
      icon: FaClock,
      title: "Short-Term and Long-Term Storage",
      text:
        "Flexible storage duration helps businesses manage temporary stock holding, seasonal overflow, import arrivals, and ongoing European distribution inventory.",
    },
    {
      icon: FaFileLines,
      title: "Inventory Management",
      text:
        "Inventory management support improves stock visibility, movement tracking, and day-to-day warehouse control for better operational planning.",
    },
    {
      icon: FaBoxesPacking,
      title: "Pick and Pack Services",
      text:
        "Pick and pack services help prepare customer orders, retail shipments, spare parts, promotional goods, and recurring outbound dispatches.",
    },
    {
      icon: FaBoxOpen,
      title: "Labeling and Packaging Support",
      text:
        "Labeling and packaging support helps make goods dispatch-ready for retail handling, customer-specific requirements, and distribution flow.",
    },
    {
      icon: FaTruckRampBox,
      title: "Distribution Warehouse Support",
      text:
        "Distribution support connects organized warehouse storage with dispatch coordination, outbound movement, and wider logistics services.",
    },
  ];

  const industryCards = [
    {
      icon: FaCartShopping,
      title: "E-commerce",
      text: "Practical stock storage, pick and pack, dispatch preparation, and fulfillment support for online orders.",
    },
    {
      icon: FaStore,
      title: "Retail & Wholesale",
      text: "Reliable pallet storage, replenishment support, and organized stock movement for commercial distribution.",
    },
    {
      icon: FaShip,
      title: "Import & Export",
      text: "Warehouse support for goods arriving by sea, air, or road before onward distribution or shipment preparation.",
    },
    {
      icon: FaGears,
      title: "Manufacturing",
      text: "Storage and dispatch planning for industrial supplies, components, spare parts, and production support stock.",
    },
    {
      icon: FaCarSide,
      title: "Automotive",
      text: "Structured warehouse handling for spare parts, components, and scheduled dispatch requirements.",
    },
    {
      icon: FaWarehouse,
      title: "Consumer Goods",
      text: "Order preparation and stock control for packaged goods, retail products, and recurring distribution inventory.",
    },
    {
      icon: FaHelmetSafety,
      title: "Construction Materials",
      text: "Warehouse storage support for project-related goods, heavy materials, and controlled outbound movement.",
    },
    {
      icon: FaShieldHalved,
      title: "Healthcare Supplies",
      text: "Secure stock handling and visibility for commercial healthcare and regulated supply movement.",
    },
  ];

  const processSteps = [
    {
      number: "01",
      title: "Storage Planning",
      text:
        "We review cargo type, storage duration, order flow, and warehouse handling requirements before stock is placed.",
    },
    {
      number: "02",
      title: "Inventory Setup",
      text:
        "We organize stock placement, inventory visibility, count support, and movement tracking around your warehouse workflow.",
    },
    {
      number: "03",
      title: "Order Preparation",
      text:
        "We support picking, packing, labeling, repacking, and dispatch readiness based on customer orders and distribution needs.",
    },
    {
      number: "04",
      title: "Distribution Flow",
      text:
        "Goods move from storage into outbound distribution through coordinated dispatch support and connected logistics services.",
    },
  ];

  const heroBullets = [
    "Secure warehouse storage for commercial goods, imported stock, and distribution inventory.",
    "Inventory management support with stock visibility and movement tracking.",
    "Pick and pack, labeling, and order preparation for dispatch-ready goods.",
    "Distribution warehouse support connected to road, air, ocean, and wider supply chain services.",
  ];

  const netherlandsBullets = [
    "Practical warehousing near major European customer markets.",
    "Strong access to ports, airports, roads, and wider Dutch distribution infrastructure.",
    "Useful for Rotterdam, Amsterdam, The Hague, Utrecht, Eindhoven, Tilburg, and Venlo logistics regions.",
    "Well suited for import handling, fulfillment, stock control, and European distribution preparation.",
  ];

  const europeBullets = [
    "Dutch warehousing connected to Germany, Belgium, France, Spain, Italy, Austria, Poland, Denmark, Sweden, and wider Europe.",
    "Faster order preparation by keeping stock closer to customers.",
    "Warehousing linked with road freight, air freight, ocean freight, and last-mile support.",
    "Flexible European distribution planning from one central warehouse location.",
  ];

  const whyChooseBullets = [
    "Warehousing Netherlands and Europe support.",
    "Secure warehouse storage.",
    "Short-term and long-term storage options.",
    "Inventory management and stock movement tracking.",
    "Pick and pack, packaging, and labeling support.",
    "Dispatch-ready shipment preparation and distribution warehouse support.",
  ];

  return (
    <main className="bg-white text-[#334155]">
      {faqSchema ? (
        <Script
          id={`${service.slug}-faq-schema`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      ) : null}

      <section className="relative overflow-hidden bg-[#08111f] text-white">
        <div className="absolute inset-0">
          <Image
            src={service.image}
            alt={service.title}
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,17,31,0.94),rgba(8,17,31,0.78),rgba(8,17,31,0.35))]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(245,166,35,0.16),transparent_28%),radial-gradient(circle_at_75%_80%,rgba(255,207,99,0.14),transparent_24%)]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-5 pb-36 pt-12 sm:px-8 lg:px-10 lg:pb-44 lg:pt-16">
          <Link
            href="/services"
            className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/8 px-4 py-2 text-sm font-semibold text-white/90 backdrop-blur transition hover:bg-white/14"
          >
            <FaArrowLeft />
            Back To Services
          </Link>

          <div className="mt-12 grid gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-[#f5a623]/15 px-4 py-2 text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#ffcc6f]">
                <FaWarehouse />
                Warehousing Netherlands
              </span>

              <h1 className="mt-6 max-w-4xl text-5xl font-bold leading-[0.96] tracking-[-0.07em] sm:text-6xl lg:text-7xl">
                {service.content?.heroTitle || service.title}
              </h1>

              <p className="mt-6 max-w-3xl text-lg leading-8 text-white/78">
                {service.content?.intro?.[0]}
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-3 rounded-full bg-[linear-gradient(135deg,#f5a623,#ffcf63)] px-6 py-4 font-extrabold text-[#111827] shadow-[0_16px_35px_rgba(245,166,35,0.35)] transition hover:-translate-y-1"
                >
                  Get Warehousing Support
                  <FaArrowRight />
                </Link>
                <Link
                  href="#services"
                  className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/8 px-6 py-4 font-extrabold text-white backdrop-blur transition hover:-translate-y-1 hover:bg-white/14"
                >
                  Explore Solutions
                </Link>
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-white/15 bg-white/10 p-6 shadow-[0_20px_60px_rgba(8,17,31,0.12)] backdrop-blur-xl lg:p-7">
              <h3 className="text-2xl font-bold text-white">
                Warehousing Planning Snapshot
              </h3>

              <div className="mt-5 space-y-4">
                {heroBullets.map((item, index) => (
                  <div
                    key={item}
                    className="flex gap-4 rounded-[1.1rem] bg-white/10 p-4"
                  >
                    <span className="flex h-11 w-11 flex-none items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#f5a623,#ffcf63)] text-[#08111f]">
                      {index === 0 ? (
                        <FaWarehouse />
                      ) : index === 1 ? (
                        <FaFileLines />
                      ) : index === 2 ? (
                        <FaBoxesPacking />
                      ) : (
                        <FaTruckRampBox />
                      )}
                    </span>
                    <p className="text-sm leading-7 text-white/78">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 -mt-16 px-5 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl overflow-hidden rounded-[1.6rem] border border-slate-200 bg-white shadow-[0_20px_60px_rgba(8,17,31,0.12)] md:grid-cols-2 xl:grid-cols-4">
          {trustItems.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={item.label}
                className={`p-8 ${
                  index < trustItems.length - 1
                    ? "border-b border-slate-200 xl:border-b-0 xl:border-r"
                    : ""
                }`}
              >
                <Icon className="text-3xl text-[#d88700]" />
                <p className="mt-4 text-3xl font-bold leading-none text-[#08111f]">
                  {item.value}
                </p>
                <p className="mt-2 text-sm font-bold text-slate-500">
                  {item.label}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeader
              eyebrow={
                <>
                  <FaGlobe />
                  Why Warehousing Matters
                </>
              }
              title="Warehouse Support That Improves Inventory Control and Fulfillment Flow"
              description={service.content.sections[0].paragraphs[0]}
            />

            <div className="mt-6 space-y-5 text-base leading-8 text-slate-600 sm:text-lg">
              <p>{service.content.sections[0].paragraphs[1]}</p>
              <p>{service.content.sections[0].paragraphs[2]}</p>
            </div>

            <ul className="mt-8 space-y-4">
              {heroBullets.map((item) => (
                <li key={item} className="flex gap-3">
                  <FaCircleCheck className="mt-1 flex-none text-[#d88700]" />
                  <span className="leading-7 text-slate-600">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative min-h-[360px] overflow-hidden rounded-[2rem] shadow-[0_20px_60px_rgba(8,17,31,0.12)] sm:min-h-[520px]">
            <Image
              src={service.image}
              alt="Warehousing operations in Europe"
              fill
              className="object-cover"
            />
            <div className="absolute bottom-6 left-6 rounded-[1.1rem] bg-white/92 px-5 py-4 text-[#08111f] shadow-[0_20px_60px_rgba(8,17,31,0.12)] backdrop-blur">
              <p className="flex items-center gap-2 font-black">
                <FaShieldHalved className="text-[#d88700]" />
                Secure Stock Handling
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="bg-[#f8fafc] py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <SectionHeader
            eyebrow={
              <>
                <FaWarehouse />
                Our Warehousing Solutions
              </>
            }
            title="Complete Warehousing Services for the Netherlands and Europe"
            description="Invictus Logistics offers warehouse services businesses can use for flexible stock management, safe goods handling, and efficient distribution."
          />

          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {solutionCards.map((card) => {
              const Icon = card.icon;

              return (
                <article
                  key={card.title}
                  className="group relative overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white p-8 shadow-[0_14px_38px_rgba(8,17,31,0.06)] transition duration-300 hover:-translate-y-2 hover:border-[#f5a623]/45 hover:shadow-[0_20px_60px_rgba(8,17,31,0.12)]"
                >
                  <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-[#f5a623]/10 transition duration-300 group-hover:scale-125" />
                  <div className="relative z-10">
                    <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-[1.1rem] bg-[linear-gradient(135deg,#f5a623,#ffcf63)] text-2xl text-[#08111f]">
                      <Icon />
                    </div>
                    <h3 className="text-2xl font-bold text-[#08111f]">
                      {card.title}
                    </h3>
                    <p className="mt-4 leading-8 text-slate-600">
                      {card.text}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
          <div className="relative min-h-[360px] overflow-hidden rounded-[2rem] shadow-[0_20px_60px_rgba(8,17,31,0.12)] sm:min-h-[520px]">
            <Image
              src="/Warehouse.jpg"
              alt="Netherlands warehousing logistics hub"
              fill
              className="object-cover"
            />
            <div className="absolute bottom-6 left-6 rounded-[1.1rem] bg-white/92 px-5 py-4 text-[#08111f] shadow-[0_20px_60px_rgba(8,17,31,0.12)] backdrop-blur">
              <p className="flex items-center gap-2 font-black">
                <FaLocationDot className="text-[#d88700]" />
                Netherlands Distribution Hub
              </p>
            </div>
          </div>

          <div>
            <SectionHeader
              eyebrow={
                <>
                  <FaMap />
                  Warehousing Netherlands
                </>
              }
              title="A Practical European Base for Storage, Fulfillment, and Distribution"
              description={service.content.sections[2].paragraphs[0]}
            />

            <p className="mt-6 text-base leading-8 text-slate-600 sm:text-lg">
              {service.content.sections[2].paragraphs[1]}
            </p>

            <ul className="mt-8 space-y-4">
              {netherlandsBullets.map((item) => (
                <li key={item} className="flex gap-3">
                  <FaCircleCheck className="mt-1 flex-none text-[#d88700]" />
                  <span className="leading-7 text-slate-600">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-[radial-gradient(circle_at_10%_20%,rgba(245,166,35,0.14),transparent_30%),linear-gradient(135deg,#08111f,#101b2f)] py-20 text-white">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
            <div>
              <SectionHeader
                dark
                eyebrow={
                  <>
                    <FaGlobe />
                    Warehousing Europe
                  </>
                }
                title="Warehousing Across Europe"
                description={service.content.sections[3].paragraphs[0]}
              />

              <p className="mt-6 text-base leading-8 text-white/75 sm:text-lg">
                {service.content.sections[3].paragraphs[1]}
              </p>

              <ul className="mt-8 space-y-4">
                {europeBullets.map((item) => (
                  <li key={item} className="flex gap-3">
                    <FaCircleCheck className="mt-1 flex-none text-[#f5a623]" />
                    <span className="leading-7 text-white/75">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative min-h-[360px] overflow-hidden rounded-[2rem] shadow-[0_20px_60px_rgba(8,17,31,0.12)] sm:min-h-[520px]">
              <Image
                src="/Warehouse.jpg"
                alt="European warehousing network"
                fill
                className="object-cover"
              />
              <div className="absolute bottom-6 left-6 rounded-[1.1rem] bg-white/92 px-5 py-4 text-[#08111f] shadow-[0_20px_60px_rgba(8,17,31,0.12)] backdrop-blur">
                <p className="flex items-center gap-2 font-black">
                  <FaTruckRampBox className="text-[#d88700]" />
                  European Distribution Flow
                </p>
              </div>
            </div>
          </div>

          <div className="pt-20">
            <SectionHeader
              dark
              eyebrow={
                <>
                  <FaIndustry />
                  Industries We Support
                </>
              }
              title="Warehousing for Different Business Sectors"
              description="Our warehousing services are designed for businesses that need safe storage, stock visibility, and dispatch planning across different supply chain models."
            />

            <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {industryCards.map((card) => {
                const Icon = card.icon;

                return (
                  <article
                    key={card.title}
                    className="rounded-[1.4rem] border border-white/12 bg-white/8 p-6 transition duration-300 hover:-translate-y-2 hover:bg-white/12"
                  >
                    <Icon className="text-3xl text-[#f5a623]" />
                    <h3 className="mt-4 text-xl font-bold text-white">
                      {card.title}
                    </h3>
                    <p className="mt-3 leading-7 text-white/72">{card.text}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10">
        <SectionHeader
          eyebrow={
            <>
              <FaListCheck />
              Our Process
            </>
          }
          title="How We Manage Your Warehousing Flow"
          description="Invictus Logistics keeps warehousing practical, organized, and connected to your broader logistics operations."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {processSteps.map((step) => (
            <article
              key={step.number}
              className="rounded-[1.5rem] border border-slate-200 bg-white p-8 shadow-[0_14px_35px_rgba(8,17,31,0.06)]"
            >
              <div className="mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-[#08111f] text-sm font-black text-white">
                {step.number}
              </div>
              <h3 className="text-xl font-bold text-[#08111f]">{step.title}</h3>
              <p className="mt-3 leading-8 text-slate-600">{step.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[#f8fafc] py-20">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:items-center lg:px-10">
          <div>
            <SectionHeader
              eyebrow={
                <>
                  <FaShieldHalved />
                  Why Choose Us
                </>
              }
              title="A Warehousing Partner Built Around Visibility, Control, and Fulfillment Readiness"
              description={service.content.sections[5].paragraphs[0]}
            />

            <ul className="mt-8 space-y-4">
              {whyChooseBullets.map((item) => (
                <li key={item} className="flex gap-3">
                  <FaCircleCheck className="mt-1 flex-none text-[#d88700]" />
                  <span className="leading-7 text-slate-600">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative min-h-[360px] overflow-hidden rounded-[2rem] shadow-[0_20px_60px_rgba(8,17,31,0.12)] sm:min-h-[520px]">
            <Image
              src="/Logistics_Team.jpg"
              alt="Professional warehousing support team"
              fill
              className="object-cover"
            />
            <div className="absolute bottom-6 left-6 rounded-[1.1rem] bg-white/92 px-5 py-4 text-[#08111f] shadow-[0_20px_60px_rgba(8,17,31,0.12)] backdrop-blur">
              <p className="flex items-center gap-2 font-black">
                <FaHeadset className="text-[#d88700]" />
                Live Warehouse Support
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="quote" className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10">
        <div className="overflow-hidden rounded-[2.25rem] bg-[linear-gradient(90deg,rgba(8,17,31,0.92),rgba(8,17,31,0.62)),url('/Warehouse.jpg')] bg-cover bg-center px-7 py-12 text-white sm:px-10 sm:py-16 lg:px-16 lg:py-20">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#f5a623]/15 px-4 py-2 text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#ffcc6f]">
            <FaPaperPlane />
            Get Secure Warehousing Support
          </span>

          <h2 className="mt-6 max-w-4xl text-4xl font-bold leading-[1.06] tracking-[-0.05em] sm:text-5xl lg:text-6xl">
            Keep Stock Organized, Visible, and Ready for Movement Across Europe
          </h2>

          <p className="mt-5 max-w-3xl text-base leading-8 text-white/76 sm:text-lg">
            {service.content.sections[8].paragraphs[0]}
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 rounded-full bg-[linear-gradient(135deg,#f5a623,#ffcf63)] px-6 py-4 font-extrabold text-[#111827] shadow-[0_16px_35px_rgba(245,166,35,0.35)] transition hover:-translate-y-1"
            >
              Request Warehousing Support
              <FaArrowRight />
            </Link>
            <a
              href="tel:+31685865799"
              className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/8 px-6 py-4 font-extrabold text-white backdrop-blur transition hover:-translate-y-1 hover:bg-white/14"
            >
              Call Logistics Team
              <FaPhone />
            </a>
          </div>
        </div>
      </section>

      <section className="bg-[#f8fafc] py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <SectionHeader
            eyebrow={
              <>
                <FaListCheck />
                FAQs
              </>
            }
            title="Warehousing Questions Answered"
            description="Here are common questions businesses ask when comparing warehouse storage, fulfillment support, inventory control, and European distribution planning."
          />

          <div className="mt-12 space-y-4">
            {service.content.faqs.map((faq, index) => (
              <details
                key={faq.question}
                open={index === 0}
                className="overflow-hidden rounded-[1.25rem] border border-slate-200 bg-white shadow-[0_12px_28px_rgba(8,17,31,0.04)]"
              >
                <summary className="cursor-pointer list-none px-6 py-5 text-lg font-black text-[#08111f] marker:hidden">
                  <span className="flex items-center justify-between gap-5">
                    <span>{faq.question}</span>
                    <span className="text-[#d88700]">+</span>
                  </span>
                </summary>
                <p className="px-6 pb-6 leading-8 text-slate-600">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function SupplyChainPage({ service, faqSchema }) {
  const trustItems = [
    {
      icon: FaRoute,
      value: "End-to-End",
      label: "Connected logistics planning",
    },
    {
      icon: FaFileLines,
      value: "Visibility",
      label: "Tracking and status communication",
    },
    {
      icon: FaTruckMoving,
      value: "Multi-Mode",
      label: "Road, air, ocean, and warehouse coordination",
    },
    {
      icon: FaGlobe,
      value: "EU Flow",
      label: "European distribution support",
    },
  ];

  const solutionCards = [
    {
      icon: FaRoute,
      title: "End-to-End Logistics Planning",
      text:
        "End-to-end supply chain planning connects supplier pickup, transport, storage, delivery scheduling, and communication into one structured flow.",
    },
    {
      icon: FaGears,
      title: "Vendor and Supplier Coordination",
      text:
        "Vendor coordination helps align pickup timing, shipment details, transport requirements, and delivery expectations across multiple partners.",
    },
    {
      icon: FaBoxesPacking,
      title: "Order Fulfillment Support",
      text:
        "Order fulfillment support connects inventory, warehouse handling, labeling, dispatch planning, and customer-facing delivery workflows.",
    },
    {
      icon: FaTruckMoving,
      title: "Transport Coordination",
      text:
        "Transport coordination helps choose the right logistics mode based on urgency, cargo type, destination, and cost visibility.",
    },
    {
      icon: FaWarehouse,
      title: "Warehousing and Distribution Support",
      text:
        "Supply chain planning linked with warehousing improves stock positioning, order preparation, and European outbound distribution readiness.",
    },
    {
      icon: FaFileLines,
      title: "Performance Tracking and Reporting",
      text:
        "Performance tracking supports delivery reliability, transit-time visibility, process improvement, and better day-to-day logistics decisions.",
    },
  ];

  const industryCards = [
    {
      icon: FaCartShopping,
      title: "E-commerce",
      text: "Order fulfillment, inventory movement, and reliable customer delivery coordination across Europe.",
    },
    {
      icon: FaShip,
      title: "Import & Export",
      text: "Arrival planning, freight coordination, warehousing, and structured onward distribution support.",
    },
    {
      icon: FaStore,
      title: "Retail & Wholesale",
      text: "Replenishment planning, stock flow, and scheduled delivery support for commercial distribution.",
    },
    {
      icon: FaGears,
      title: "Manufacturing",
      text: "Inbound materials, spare parts, and outbound finished goods movement in one coordinated workflow.",
    },
    {
      icon: FaCarSide,
      title: "Automotive",
      text: "Supply chain support for parts flow, scheduled deliveries, and operational cargo coordination.",
    },
    {
      icon: FaShieldHalved,
      title: "Healthcare",
      text: "Structured logistics support for commercial healthcare supplies and visibility-driven movement planning.",
    },
    {
      icon: FaWarehouse,
      title: "Distribution Businesses",
      text: "Warehouse-connected planning for faster stock movement, handoff control, and outbound flow.",
    },
    {
      icon: FaGlobe,
      title: "Growing Brands",
      text: "Useful for businesses scaling into Europe and needing more predictable logistics operations.",
    },
  ];

  const processSteps = [
    {
      number: "01",
      title: "Workflow Review",
      text:
        "We review suppliers, cargo movement, storage needs, delivery requirements, and communication gaps across the current process.",
    },
    {
      number: "02",
      title: "Planning Structure",
      text:
        "We build a more structured workflow around pickup, transport, warehousing, fulfillment, and final delivery coordination.",
    },
    {
      number: "03",
      title: "Partner Alignment",
      text:
        "Suppliers, carriers, warehouses, and delivery teams are connected through clearer timing, responsibilities, and shipment communication.",
    },
    {
      number: "04",
      title: "Performance Control",
      text:
        "Ongoing visibility, reporting, and delivery tracking help reduce delays, improve planning, and support better logistics decisions.",
    },
  ];

  const heroBullets = [
    "End-to-end planning from supplier pickup to final delivery.",
    "Vendor, carrier, warehouse, and customer communication in one workflow.",
    "Transport coordination across road, air, ocean, and warehouse operations.",
    "Performance tracking, cost visibility, and better logistics control.",
  ];

  const netherlandsBullets = [
    "The Netherlands works as a central logistics base for import handling, storage, fulfillment, and European distribution.",
    "Strong access through Rotterdam, Amsterdam, The Hague, Utrecht, Eindhoven, Tilburg, and Venlo logistics regions.",
    "Useful for importers, exporters, e-commerce brands, manufacturers, and growing businesses.",
    "Practical support for cargo entering by road, air, or ocean before onward European movement.",
  ];

  const europeBullets = [
    "Coordinated logistics for suppliers, warehouses, carriers, and customers across multiple countries.",
    "Cross-border delivery planning and transport mode selection in one managed workflow.",
    "Better control over movement, cost, delivery timing, and customer expectations.",
    "Useful for European distribution through Germany, Belgium, France, Italy, Spain, Poland, and Scandinavia.",
  ];

  const whyChooseBullets = [
    "Supply chain Netherlands and Europe support.",
    "End-to-end logistics planning.",
    "Supplier pickup coordination and vendor communication.",
    "Order fulfillment and transport coordination.",
    "Warehousing, distribution, and centralized shipment communication.",
    "Performance tracking, transit-time visibility, and cost control support.",
  ];

  return (
    <main className="bg-white text-[#334155]">
      {faqSchema ? (
        <Script
          id={`${service.slug}-faq-schema`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      ) : null}

      <section className="relative overflow-hidden bg-[#08111f] text-white">
        <div className="absolute inset-0">
          <Image
            src={service.image}
            alt={service.title}
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,17,31,0.94),rgba(8,17,31,0.78),rgba(8,17,31,0.35))]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(245,166,35,0.16),transparent_28%),radial-gradient(circle_at_75%_80%,rgba(255,207,99,0.14),transparent_24%)]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-5 pb-36 pt-12 sm:px-8 lg:px-10 lg:pb-44 lg:pt-16">
          <Link
            href="/services"
            className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/8 px-4 py-2 text-sm font-semibold text-white/90 backdrop-blur transition hover:bg-white/14"
          >
            <FaArrowLeft />
            Back To Services
          </Link>

          <div className="mt-12 grid gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-[#f5a623]/15 px-4 py-2 text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#ffcc6f]">
                <FaRoute />
                Supply Chain Netherlands
              </span>

              <h1 className="mt-6 max-w-4xl text-5xl font-bold leading-[0.96] tracking-[-0.07em] sm:text-6xl lg:text-7xl">
                {service.content?.heroTitle || service.title}
              </h1>

              <p className="mt-6 max-w-3xl text-lg leading-8 text-white/78">
                {service.content?.intro?.[0]}
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-3 rounded-full bg-[linear-gradient(135deg,#f5a623,#ffcf63)] px-6 py-4 font-extrabold text-[#111827] shadow-[0_16px_35px_rgba(245,166,35,0.35)] transition hover:-translate-y-1"
                >
                  Get Supply Chain Support
                  <FaArrowRight />
                </Link>
                <Link
                  href="#services"
                  className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/8 px-6 py-4 font-extrabold text-white backdrop-blur transition hover:-translate-y-1 hover:bg-white/14"
                >
                  Explore Solutions
                </Link>
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-white/15 bg-white/10 p-6 shadow-[0_20px_60px_rgba(8,17,31,0.12)] backdrop-blur-xl lg:p-7">
              <h3 className="text-2xl font-bold text-white">
                Supply Chain Planning Snapshot
              </h3>

              <div className="mt-5 space-y-4">
                {heroBullets.map((item, index) => (
                  <div
                    key={item}
                    className="flex gap-4 rounded-[1.1rem] bg-white/10 p-4"
                  >
                    <span className="flex h-11 w-11 flex-none items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#f5a623,#ffcf63)] text-[#08111f]">
                      {index === 0 ? (
                        <FaRoute />
                      ) : index === 1 ? (
                        <FaGears />
                      ) : index === 2 ? (
                        <FaTruckMoving />
                      ) : (
                        <FaFileLines />
                      )}
                    </span>
                    <p className="text-sm leading-7 text-white/78">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 -mt-16 px-5 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl overflow-hidden rounded-[1.6rem] border border-slate-200 bg-white shadow-[0_20px_60px_rgba(8,17,31,0.12)] md:grid-cols-2 xl:grid-cols-4">
          {trustItems.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={item.label}
                className={`p-8 ${
                  index < trustItems.length - 1
                    ? "border-b border-slate-200 xl:border-b-0 xl:border-r"
                    : ""
                }`}
              >
                <Icon className="text-3xl text-[#d88700]" />
                <p className="mt-4 text-3xl font-bold leading-none text-[#08111f]">
                  {item.value}
                </p>
                <p className="mt-2 text-sm font-bold text-slate-500">
                  {item.label}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeader
              eyebrow={
                <>
                  <FaGlobe />
                  Why Supply Chain Management Matters
                </>
              }
              title="Structured Logistics Control Across Every Handoff"
              description={service.content.sections[0].paragraphs[0]}
            />

            <div className="mt-6 space-y-5 text-base leading-8 text-slate-600 sm:text-lg">
              <p>{service.content.sections[0].paragraphs[1]}</p>
              <p>{service.content.sections[0].paragraphs[2]}</p>
            </div>

            <ul className="mt-8 space-y-4">
              {heroBullets.map((item) => (
                <li key={item} className="flex gap-3">
                  <FaCircleCheck className="mt-1 flex-none text-[#d88700]" />
                  <span className="leading-7 text-slate-600">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative min-h-[360px] overflow-hidden rounded-[2rem] shadow-[0_20px_60px_rgba(8,17,31,0.12)] sm:min-h-[520px]">
            <Image
              src={service.image}
              alt="Supply chain planning in Europe"
              fill
              className="object-cover"
            />
            <div className="absolute bottom-6 left-6 rounded-[1.1rem] bg-white/92 px-5 py-4 text-[#08111f] shadow-[0_20px_60px_rgba(8,17,31,0.12)] backdrop-blur">
              <p className="flex items-center gap-2 font-black">
                <FaShieldHalved className="text-[#d88700]" />
                Connected Workflow Control
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="bg-[#f8fafc] py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <SectionHeader
            eyebrow={
              <>
                <FaRoute />
                Our Supply Chain Services
              </>
            }
            title="Complete Supply Chain Services for the Netherlands and Europe"
            description="Invictus Logistics offers supply chain services businesses can use to improve daily operations, shipment reliability, and logistics decision-making."
          />

          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {solutionCards.map((card) => {
              const Icon = card.icon;

              return (
                <article
                  key={card.title}
                  className="group relative overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white p-8 shadow-[0_14px_38px_rgba(8,17,31,0.06)] transition duration-300 hover:-translate-y-2 hover:border-[#f5a623]/45 hover:shadow-[0_20px_60px_rgba(8,17,31,0.12)]"
                >
                  <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-[#f5a623]/10 transition duration-300 group-hover:scale-125" />
                  <div className="relative z-10">
                    <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-[1.1rem] bg-[linear-gradient(135deg,#f5a623,#ffcf63)] text-2xl text-[#08111f]">
                      <Icon />
                    </div>
                    <h3 className="text-2xl font-bold text-[#08111f]">
                      {card.title}
                    </h3>
                    <p className="mt-4 leading-8 text-slate-600">
                      {card.text}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
          <div className="relative min-h-[360px] overflow-hidden rounded-[2rem] shadow-[0_20px_60px_rgba(8,17,31,0.12)] sm:min-h-[520px]">
            <Image
              src="/Warehouse.jpg"
              alt="Netherlands supply chain logistics hub"
              fill
              className="object-cover"
            />
            <div className="absolute bottom-6 left-6 rounded-[1.1rem] bg-white/92 px-5 py-4 text-[#08111f] shadow-[0_20px_60px_rgba(8,17,31,0.12)] backdrop-blur">
              <p className="flex items-center gap-2 font-black">
                <FaLocationDot className="text-[#d88700]" />
                Netherlands Logistics Hub
              </p>
            </div>
          </div>

          <div>
            <SectionHeader
              eyebrow={
                <>
                  <FaMap />
                  Supply Chain Netherlands
                </>
              }
              title="A Strong European Base for Coordinated Cargo Movement"
              description={service.content.sections[2].paragraphs[0]}
            />

            <p className="mt-6 text-base leading-8 text-slate-600 sm:text-lg">
              {service.content.sections[2].paragraphs[1]}
            </p>

            <ul className="mt-8 space-y-4">
              {netherlandsBullets.map((item) => (
                <li key={item} className="flex gap-3">
                  <FaCircleCheck className="mt-1 flex-none text-[#d88700]" />
                  <span className="leading-7 text-slate-600">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-[radial-gradient(circle_at_10%_20%,rgba(245,166,35,0.14),transparent_30%),linear-gradient(135deg,#08111f,#101b2f)] py-20 text-white">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
            <div>
              <SectionHeader
                dark
                eyebrow={
                  <>
                    <FaGlobe />
                    Supply Chain Europe
                  </>
                }
                title="Supply Chain Management Across Europe"
                description={service.content.sections[3].paragraphs[0]}
              />

              <p className="mt-6 text-base leading-8 text-white/75 sm:text-lg">
                {service.content.sections[3].paragraphs[1]}
              </p>

              <ul className="mt-8 space-y-4">
                {europeBullets.map((item) => (
                  <li key={item} className="flex gap-3">
                    <FaCircleCheck className="mt-1 flex-none text-[#f5a623]" />
                    <span className="leading-7 text-white/75">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative min-h-[360px] overflow-hidden rounded-[2rem] shadow-[0_20px_60px_rgba(8,17,31,0.12)] sm:min-h-[520px]">
              <Image
                src="/Supplay_Chain.jpg"
                alt="European supply chain network"
                fill
                className="object-cover"
              />
              <div className="absolute bottom-6 left-6 rounded-[1.1rem] bg-white/92 px-5 py-4 text-[#08111f] shadow-[0_20px_60px_rgba(8,17,31,0.12)] backdrop-blur">
                <p className="flex items-center gap-2 font-black">
                  <FaTruckMoving className="text-[#d88700]" />
                  European Distribution Workflow
                </p>
              </div>
            </div>
          </div>

          <div className="pt-20">
            <SectionHeader
              dark
              eyebrow={
                <>
                  <FaIndustry />
                  Industries We Support
                </>
              }
              title="Supply Chain Services for Different Business Models"
              description="Our supply chain services are useful for almost every business that moves goods and depends on more reliable coordination."
            />

            <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {industryCards.map((card) => {
                const Icon = card.icon;

                return (
                  <article
                    key={card.title}
                    className="rounded-[1.4rem] border border-white/12 bg-white/8 p-6 transition duration-300 hover:-translate-y-2 hover:bg-white/12"
                  >
                    <Icon className="text-3xl text-[#f5a623]" />
                    <h3 className="mt-4 text-xl font-bold text-white">
                      {card.title}
                    </h3>
                    <p className="mt-3 leading-7 text-white/72">{card.text}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10">
        <SectionHeader
          eyebrow={
            <>
              <FaListCheck />
              Our Process
            </>
          }
          title="How We Manage Your Supply Chain Workflow"
          description="Invictus Logistics keeps supply chain management practical, visible, and coordinated from first pickup through final delivery."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {processSteps.map((step) => (
            <article
              key={step.number}
              className="rounded-[1.5rem] border border-slate-200 bg-white p-8 shadow-[0_14px_35px_rgba(8,17,31,0.06)]"
            >
              <div className="mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-[#08111f] text-sm font-black text-white">
                {step.number}
              </div>
              <h3 className="text-xl font-bold text-[#08111f]">{step.title}</h3>
              <p className="mt-3 leading-8 text-slate-600">{step.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[#f8fafc] py-20">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:items-center lg:px-10">
          <div>
            <SectionHeader
              eyebrow={
                <>
                  <FaShieldHalved />
                  Why Choose Us
                </>
              }
              title="A Supply Chain Partner Built Around Visibility, Reliability, and Cost Control"
              description={service.content.sections[6].paragraphs[0]}
            />

            <ul className="mt-8 space-y-4">
              {whyChooseBullets.map((item) => (
                <li key={item} className="flex gap-3">
                  <FaCircleCheck className="mt-1 flex-none text-[#d88700]" />
                  <span className="leading-7 text-slate-600">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative min-h-[360px] overflow-hidden rounded-[2rem] shadow-[0_20px_60px_rgba(8,17,31,0.12)] sm:min-h-[520px]">
            <Image
              src="/Logistics_Team.jpg"
              alt="Professional supply chain support team"
              fill
              className="object-cover"
            />
            <div className="absolute bottom-6 left-6 rounded-[1.1rem] bg-white/92 px-5 py-4 text-[#08111f] shadow-[0_20px_60px_rgba(8,17,31,0.12)] backdrop-blur">
              <p className="flex items-center gap-2 font-black">
                <FaHeadset className="text-[#d88700]" />
                Live Supply Chain Support
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="quote" className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10">
        <div className="overflow-hidden rounded-[2.25rem] bg-[linear-gradient(90deg,rgba(8,17,31,0.92),rgba(8,17,31,0.62)),url('/Supplay_Chain.jpg')] bg-cover bg-center px-7 py-12 text-white sm:px-10 sm:py-16 lg:px-16 lg:py-20">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#f5a623]/15 px-4 py-2 text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#ffcc6f]">
            <FaPaperPlane />
            Get Reliable Supply Chain Support
          </span>

          <h2 className="mt-6 max-w-4xl text-4xl font-bold leading-[1.06] tracking-[-0.05em] sm:text-5xl lg:text-6xl">
            Create a More Predictable Logistics Workflow Across the Netherlands and Europe
          </h2>

          <p className="mt-5 max-w-3xl text-base leading-8 text-white/76 sm:text-lg">
            {service.content.sections[9].paragraphs[0]}
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 rounded-full bg-[linear-gradient(135deg,#f5a623,#ffcf63)] px-6 py-4 font-extrabold text-[#111827] shadow-[0_16px_35px_rgba(245,166,35,0.35)] transition hover:-translate-y-1"
            >
              Request Supply Chain Support
              <FaArrowRight />
            </Link>
            <a
              href="tel:+31685865799"
              className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/8 px-6 py-4 font-extrabold text-white backdrop-blur transition hover:-translate-y-1 hover:bg-white/14"
            >
              Call Logistics Team
              <FaPhone />
            </a>
          </div>
        </div>
      </section>

      <section className="bg-[#f8fafc] py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <SectionHeader
            eyebrow={
              <>
                <FaListCheck />
                FAQs
              </>
            }
            title="Supply Chain Questions Answered"
            description="Here are common questions businesses ask when comparing logistics management, vendor coordination, fulfillment support, and European supply chain visibility."
          />

          <div className="mt-12 space-y-4">
            {service.content.faqs.map((faq, index) => (
              <details
                key={faq.question}
                open={index === 0}
                className="overflow-hidden rounded-[1.25rem] border border-slate-200 bg-white shadow-[0_12px_28px_rgba(8,17,31,0.04)]"
              >
                <summary className="cursor-pointer list-none px-6 py-5 text-lg font-black text-[#08111f] marker:hidden">
                  <span className="flex items-center justify-between gap-5">
                    <span>{faq.question}</span>
                    <span className="text-[#d88700]">+</span>
                  </span>
                </summary>
                <p className="px-6 pb-6 leading-8 text-slate-600">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function ColdChainPage({ service, faqSchema }) {
  const trustItems = [
    {
      icon: FaTemperatureThreeQuarters,
      value: "Controlled",
      label: "Temperature-aware movement",
    },
    {
      icon: FaSnowflake,
      value: "Chilled + Frozen",
      label: "Cold product delivery support",
    },
    {
      icon: FaFileLines,
      value: "Monitoring",
      label: "Visibility across the cold chain",
    },
    {
      icon: FaTruckMoving,
      value: "Cross-Border",
      label: "European refrigerated coordination",
    },
  ];

  const solutionCards = [
    {
      icon: FaTemperatureThreeQuarters,
      title: "Temperature-Controlled Transport",
      text:
        "Temperature-controlled transport keeps sensitive goods within the right chilled, frozen, or ambient-controlled range during movement.",
    },
    {
      icon: FaRoute,
      title: "Cold Chain Supply Management",
      text:
        "Cold chain supply management connects pickup planning, storage, monitoring, transport, handover, and delivery communication into one process.",
    },
    {
      icon: FaSnowflake,
      title: "Refrigerated Delivery",
      text:
        "Refrigerated delivery supports fresh, chilled, and frozen goods moving to stores, distributors, customers, and commercial delivery points.",
    },
    {
      icon: FaShieldHalved,
      title: "Pharma Cold Chain Logistics",
      text:
        "Pharma cold chain logistics supports sensitive medicines, vaccines, biologics, and healthcare cargo with more careful planning and handling awareness.",
    },
    {
      icon: FaBoxesPacking,
      title: "Food Cold Chain Logistics",
      text:
        "Food cold chain logistics helps protect freshness, quality, and shelf life for dairy, seafood, frozen meals, produce, and chilled products.",
    },
    {
      icon: FaWarehouse,
      title: "Cold Storage Coordination",
      text:
        "Cold storage coordination supports short-term staging, import arrival handling, order preparation, and onward refrigerated transport planning.",
    },
  ];

  const industryCards = [
    {
      icon: FaShieldHalved,
      title: "Pharmaceuticals",
      text: "Temperature-sensitive logistics support for medicines, biologics, and regulated healthcare cargo.",
    },
    {
      icon: FaFileLines,
      title: "Healthcare Distribution",
      text: "Controlled planning for medical products, diagnostics, vaccines, and delivery visibility needs.",
    },
    {
      icon: FaBoxesPacking,
      title: "Food Importers",
      text: "Refrigerated and frozen movement support for commercial food distribution and European supply.",
    },
    {
      icon: FaSnowflake,
      title: "Frozen Food Brands",
      text: "Structured movement planning for frozen goods, low-temperature handling, and onward refrigerated delivery.",
    },
    {
      icon: FaStore,
      title: "Retail & Grocery",
      text: "Cold chain planning for stores, distribution points, e-commerce food orders, and customer-facing freshness control.",
    },
    {
      icon: FaShip,
      title: "Seafood & Meat",
      text: "Careful handling and refrigerated distribution support for sensitive fresh and frozen cargo categories.",
    },
    {
      icon: FaWarehouse,
      title: "Floriculture",
      text: "Controlled transport planning for flowers and plants that need freshness-preserving movement conditions.",
    },
    {
      icon: FaGears,
      title: "Specialty Chemicals",
      text: "Temperature-aware support for sensitive commercial goods that need more controlled logistics coordination.",
    },
  ];

  const processSteps = [
    {
      number: "01",
      title: "Condition Review",
      text:
        "We review product sensitivity, required temperature range, route, storage needs, and delivery expectations before movement starts.",
    },
    {
      number: "02",
      title: "Cold Chain Planning",
      text:
        "We select the right transport, storage, monitoring, and handover structure based on cargo type and cold chain requirements.",
    },
    {
      number: "03",
      title: "Coordinated Movement",
      text:
        "Pickup, storage, transport, and delivery are coordinated to help maintain product condition and reduce temperature-risk handoffs.",
    },
    {
      number: "04",
      title: "Visibility Support",
      text:
        "Your team receives clearer communication around shipment status, route progress, and delivery timing for better cold chain control.",
    },
  ];

  const heroBullets = [
    "Temperature-controlled transport for chilled, frozen, and ambient-sensitive cargo.",
    "Cold chain supply management with route planning, monitoring, and delivery coordination.",
    "Pharma and food cold chain logistics support across the Netherlands and Europe.",
    "Cold storage coordination and clearer shipment visibility from pickup to destination.",
  ];

  const netherlandsBullets = [
    "The Netherlands is a strong cold chain gateway for food, pharma, healthcare, and import-export movement.",
    "Useful for Rotterdam, Amsterdam, The Hague, Utrecht, Eindhoven, Venlo, and Tilburg logistics regions.",
    "Well connected to ports, airports, roads, and temperature-aware storage infrastructure.",
    "Practical for positioning sensitive goods closer to European customers and distribution points.",
  ];

  const europeBullets = [
    "Cross-border refrigerated movement with stronger planning across each handoff.",
    "Cold chain support connected to road freight, air freight, ocean freight, storage, and final-mile delivery.",
    "Better temperature protection for shipments moving from the Netherlands into Germany, Belgium, France, Spain, Italy, and wider Europe.",
    "Useful for businesses that need visibility, timing control, and stable product conditions across multiple markets.",
  ];

  const whyChooseBullets = [
    "Cold chain logistics Netherlands and Europe support.",
    "Temperature-controlled transport coordination.",
    "Refrigerated transport and chilled or frozen delivery planning.",
    "Cold storage coordination and cold chain supply management.",
    "Pharma and food cold chain logistics support.",
    "Route planning, shipment visibility, and cross-border delivery coordination.",
  ];

  return (
    <main className="bg-white text-[#334155]">
      {faqSchema ? (
        <Script
          id={`${service.slug}-faq-schema`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      ) : null}

      <section className="relative overflow-hidden bg-[#08111f] text-white">
        <div className="absolute inset-0">
          <Image
            src={service.image}
            alt={service.title}
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,17,31,0.94),rgba(8,17,31,0.78),rgba(8,17,31,0.35))]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(245,166,35,0.16),transparent_28%),radial-gradient(circle_at_75%_80%,rgba(255,207,99,0.14),transparent_24%)]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-5 pb-36 pt-12 sm:px-8 lg:px-10 lg:pb-44 lg:pt-16">
          <Link
            href="/services"
            className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/8 px-4 py-2 text-sm font-semibold text-white/90 backdrop-blur transition hover:bg-white/14"
          >
            <FaArrowLeft />
            Back To Services
          </Link>

          <div className="mt-12 grid gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-[#f5a623]/15 px-4 py-2 text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#ffcc6f]">
                <FaSnowflake />
                Cold Chain Netherlands
              </span>

              <h1 className="mt-6 max-w-4xl text-5xl font-bold leading-[0.96] tracking-[-0.07em] sm:text-6xl lg:text-7xl">
                {service.content?.heroTitle || service.title}
              </h1>

              <p className="mt-6 max-w-3xl text-lg leading-8 text-white/78">
                {service.content?.intro?.[0]}
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-3 rounded-full bg-[linear-gradient(135deg,#f5a623,#ffcf63)] px-6 py-4 font-extrabold text-[#111827] shadow-[0_16px_35px_rgba(245,166,35,0.35)] transition hover:-translate-y-1"
                >
                  Get Cold Chain Support
                  <FaArrowRight />
                </Link>
                <Link
                  href="#services"
                  className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/8 px-6 py-4 font-extrabold text-white backdrop-blur transition hover:-translate-y-1 hover:bg-white/14"
                >
                  Explore Solutions
                </Link>
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-white/15 bg-white/10 p-6 shadow-[0_20px_60px_rgba(8,17,31,0.12)] backdrop-blur-xl lg:p-7">
              <h3 className="text-2xl font-bold text-white">
                Cold Chain Planning Snapshot
              </h3>

              <div className="mt-5 space-y-4">
                {heroBullets.map((item, index) => (
                  <div
                    key={item}
                    className="flex gap-4 rounded-[1.1rem] bg-white/10 p-4"
                  >
                    <span className="flex h-11 w-11 flex-none items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#f5a623,#ffcf63)] text-[#08111f]">
                      {index === 0 ? (
                        <FaTemperatureThreeQuarters />
                      ) : index === 1 ? (
                        <FaRoute />
                      ) : index === 2 ? (
                        <FaShieldHalved />
                      ) : (
                        <FaWarehouse />
                      )}
                    </span>
                    <p className="text-sm leading-7 text-white/78">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 -mt-16 px-5 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl overflow-hidden rounded-[1.6rem] border border-slate-200 bg-white shadow-[0_20px_60px_rgba(8,17,31,0.12)] md:grid-cols-2 xl:grid-cols-4">
          {trustItems.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={item.label}
                className={`p-8 ${
                  index < trustItems.length - 1
                    ? "border-b border-slate-200 xl:border-b-0 xl:border-r"
                    : ""
                }`}
              >
                <Icon className="text-3xl text-[#d88700]" />
                <p className="mt-4 text-3xl font-bold leading-none text-[#08111f]">
                  {item.value}
                </p>
                <p className="mt-2 text-sm font-bold text-slate-500">
                  {item.label}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeader
              eyebrow={
                <>
                  <FaGlobe />
                  Why Cold Chain Matters
                </>
              }
              title="Protecting Product Quality Across Temperature-Sensitive Supply Chains"
              description={service.content.sections[1].paragraphs[0]}
            />

            <div className="mt-6 space-y-5 text-base leading-8 text-slate-600 sm:text-lg">
              <p>{service.content.sections[1].paragraphs[1]}</p>
              <p>{service.content.sections[1].paragraphs[2]}</p>
            </div>

            <ul className="mt-8 space-y-4">
              {heroBullets.map((item) => (
                <li key={item} className="flex gap-3">
                  <FaCircleCheck className="mt-1 flex-none text-[#d88700]" />
                  <span className="leading-7 text-slate-600">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative min-h-[360px] overflow-hidden rounded-[2rem] shadow-[0_20px_60px_rgba(8,17,31,0.12)] sm:min-h-[520px]">
            <Image
              src={service.image}
              alt="Cold chain logistics in Europe"
              fill
              className="object-cover"
            />
            <div className="absolute bottom-6 left-6 rounded-[1.1rem] bg-white/92 px-5 py-4 text-[#08111f] shadow-[0_20px_60px_rgba(8,17,31,0.12)] backdrop-blur">
              <p className="flex items-center gap-2 font-black">
                <FaShieldHalved className="text-[#d88700]" />
                Temperature-Protected Movement
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="bg-[#f8fafc] py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <SectionHeader
            eyebrow={
              <>
                <FaSnowflake />
                Our Cold Chain Services
              </>
            }
            title="Complete Cold Chain Logistics Services for the Netherlands and Europe"
            description="Invictus Logistics provides cold chain logistics services designed for different temperature ranges, shipment types, delivery timelines, and industry requirements."
          />

          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {solutionCards.map((card) => {
              const Icon = card.icon;

              return (
                <article
                  key={card.title}
                  className="group relative overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white p-8 shadow-[0_14px_38px_rgba(8,17,31,0.06)] transition duration-300 hover:-translate-y-2 hover:border-[#f5a623]/45 hover:shadow-[0_20px_60px_rgba(8,17,31,0.12)]"
                >
                  <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-[#f5a623]/10 transition duration-300 group-hover:scale-125" />
                  <div className="relative z-10">
                    <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-[1.1rem] bg-[linear-gradient(135deg,#f5a623,#ffcf63)] text-2xl text-[#08111f]">
                      <Icon />
                    </div>
                    <h3 className="text-2xl font-bold text-[#08111f]">
                      {card.title}
                    </h3>
                    <p className="mt-4 leading-8 text-slate-600">
                      {card.text}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
          <div className="relative min-h-[360px] overflow-hidden rounded-[2rem] shadow-[0_20px_60px_rgba(8,17,31,0.12)] sm:min-h-[520px]">
            <Image
              src="/Warehouse.jpg"
              alt="Netherlands cold chain logistics hub"
              fill
              className="object-cover"
            />
            <div className="absolute bottom-6 left-6 rounded-[1.1rem] bg-white/92 px-5 py-4 text-[#08111f] shadow-[0_20px_60px_rgba(8,17,31,0.12)] backdrop-blur">
              <p className="flex items-center gap-2 font-black">
                <FaLocationDot className="text-[#d88700]" />
                Netherlands Cold Chain Hub
              </p>
            </div>
          </div>

          <div>
            <SectionHeader
              eyebrow={
                <>
                  <FaMap />
                  Cold Chain Netherlands
                </>
              }
              title="A Strategic Base for Temperature-Sensitive Distribution"
              description={service.content.sections[3].paragraphs[0]}
            />

            <p className="mt-6 text-base leading-8 text-slate-600 sm:text-lg">
              {service.content.sections[3].paragraphs[1]}
            </p>

            <ul className="mt-8 space-y-4">
              {netherlandsBullets.map((item) => (
                <li key={item} className="flex gap-3">
                  <FaCircleCheck className="mt-1 flex-none text-[#d88700]" />
                  <span className="leading-7 text-slate-600">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-[radial-gradient(circle_at_10%_20%,rgba(245,166,35,0.14),transparent_30%),linear-gradient(135deg,#08111f,#101b2f)] py-20 text-white">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
            <div>
              <SectionHeader
                dark
                eyebrow={
                  <>
                    <FaGlobe />
                    Cold Chain Europe
                  </>
                }
                title="Cold Chain Logistics Across Europe"
                description={service.content.sections[4].paragraphs[0]}
              />

              <p className="mt-6 text-base leading-8 text-white/75 sm:text-lg">
                {service.content.sections[4].paragraphs[1]}
              </p>

              <ul className="mt-8 space-y-4">
                {europeBullets.map((item) => (
                  <li key={item} className="flex gap-3">
                    <FaCircleCheck className="mt-1 flex-none text-[#f5a623]" />
                    <span className="leading-7 text-white/75">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative min-h-[360px] overflow-hidden rounded-[2rem] shadow-[0_20px_60px_rgba(8,17,31,0.12)] sm:min-h-[520px]">
              <Image
                src="/Cold_Chain1.jpg"
                alt="European cold chain network"
                fill
                className="object-cover"
              />
              <div className="absolute bottom-6 left-6 rounded-[1.1rem] bg-white/92 px-5 py-4 text-[#08111f] shadow-[0_20px_60px_rgba(8,17,31,0.12)] backdrop-blur">
                <p className="flex items-center gap-2 font-black">
                  <FaTruckMoving className="text-[#d88700]" />
                  Refrigerated Distribution Flow
                </p>
              </div>
            </div>
          </div>

          <div className="pt-20">
            <SectionHeader
              dark
              eyebrow={
                <>
                  <FaIndustry />
                  Industries We Support
                </>
              }
              title="Cold Chain Logistics for Different Temperature-Sensitive Sectors"
              description="Our cold chain logistics services are useful for many industries that depend on stable product conditions during storage and transport."
            />

            <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {industryCards.map((card) => {
                const Icon = card.icon;

                return (
                  <article
                    key={card.title}
                    className="rounded-[1.4rem] border border-white/12 bg-white/8 p-6 transition duration-300 hover:-translate-y-2 hover:bg-white/12"
                  >
                    <Icon className="text-3xl text-[#f5a623]" />
                    <h3 className="mt-4 text-xl font-bold text-white">
                      {card.title}
                    </h3>
                    <p className="mt-3 leading-7 text-white/72">{card.text}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10">
        <SectionHeader
          eyebrow={
            <>
              <FaListCheck />
              Our Process
            </>
          }
          title="How We Manage Your Cold Chain Movement"
          description="Invictus Logistics keeps temperature-sensitive logistics practical, visible, and coordinated across storage, transport, and delivery."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {processSteps.map((step) => (
            <article
              key={step.number}
              className="rounded-[1.5rem] border border-slate-200 bg-white p-8 shadow-[0_14px_35px_rgba(8,17,31,0.06)]"
            >
              <div className="mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-[#08111f] text-sm font-black text-white">
                {step.number}
              </div>
              <h3 className="text-xl font-bold text-[#08111f]">{step.title}</h3>
              <p className="mt-3 leading-8 text-slate-600">{step.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[#f8fafc] py-20">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:items-center lg:px-10">
          <div>
            <SectionHeader
              eyebrow={
                <>
                  <FaShieldHalved />
                  Why Choose Us
                </>
              }
              title="A Cold Chain Partner Built Around Condition Control and Delivery Reliability"
              description={service.content.sections[8].paragraphs[0]}
            />

            <ul className="mt-8 space-y-4">
              {whyChooseBullets.map((item) => (
                <li key={item} className="flex gap-3">
                  <FaCircleCheck className="mt-1 flex-none text-[#d88700]" />
                  <span className="leading-7 text-slate-600">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative min-h-[360px] overflow-hidden rounded-[2rem] shadow-[0_20px_60px_rgba(8,17,31,0.12)] sm:min-h-[520px]">
            <Image
              src="/Logistics_Team.jpg"
              alt="Professional cold chain support team"
              fill
              className="object-cover"
            />
            <div className="absolute bottom-6 left-6 rounded-[1.1rem] bg-white/92 px-5 py-4 text-[#08111f] shadow-[0_20px_60px_rgba(8,17,31,0.12)] backdrop-blur">
              <p className="flex items-center gap-2 font-black">
                <FaHeadset className="text-[#d88700]" />
                Live Cold Chain Support
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="quote" className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10">
        <div className="overflow-hidden rounded-[2.25rem] bg-[linear-gradient(90deg,rgba(8,17,31,0.92),rgba(8,17,31,0.62)),url('/Cold_Chain1.jpg')] bg-cover bg-center px-7 py-12 text-white sm:px-10 sm:py-16 lg:px-16 lg:py-20">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#f5a623]/15 px-4 py-2 text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#ffcc6f]">
            <FaPaperPlane />
            Get Reliable Cold Chain Support
          </span>

          <h2 className="mt-6 max-w-4xl text-4xl font-bold leading-[1.06] tracking-[-0.05em] sm:text-5xl lg:text-6xl">
            Protect Temperature-Sensitive Cargo with Better Planning, Monitoring, and Visibility
          </h2>

          <p className="mt-5 max-w-3xl text-base leading-8 text-white/76 sm:text-lg">
            {service.content.sections[9].paragraphs[0]}
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 rounded-full bg-[linear-gradient(135deg,#f5a623,#ffcf63)] px-6 py-4 font-extrabold text-[#111827] shadow-[0_16px_35px_rgba(245,166,35,0.35)] transition hover:-translate-y-1"
            >
              Request Cold Chain Support
              <FaArrowRight />
            </Link>
            <a
              href="tel:+31685865799"
              className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/8 px-6 py-4 font-extrabold text-white backdrop-blur transition hover:-translate-y-1 hover:bg-white/14"
            >
              Call Logistics Team
              <FaPhone />
            </a>
          </div>
        </div>
      </section>

      <section className="bg-[#f8fafc] py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <SectionHeader
            eyebrow={
              <>
                <FaListCheck />
                FAQs
              </>
            }
            title="Cold Chain Questions Answered"
            description="Here are common questions businesses ask when comparing temperature-controlled logistics, refrigerated movement, monitoring, and cold chain system support."
          />

          <div className="mt-12 space-y-4">
            {service.content.faqs.map((faq, index) => (
              <details
                key={faq.question}
                open={index === 0}
                className="overflow-hidden rounded-[1.25rem] border border-slate-200 bg-white shadow-[0_12px_28px_rgba(8,17,31,0.04)]"
              >
                <summary className="cursor-pointer list-none px-6 py-5 text-lg font-black text-[#08111f] marker:hidden">
                  <span className="flex items-center justify-between gap-5">
                    <span>{faq.question}</span>
                    <span className="text-[#d88700]">+</span>
                  </span>
                </summary>
                <p className="px-6 pb-6 leading-8 text-slate-600">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export default async function ServiceDetailPage({ params }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const faqSchema = service.content?.faqs?.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: service.content.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      }
    : null;

  if (service.slug === "road-freight" && service.content) {
    return <RoadFreightPage service={service} faqSchema={faqSchema} />;
  }

  if (service.slug === "air-freight" && service.content) {
    return <AirFreightPage service={service} faqSchema={faqSchema} />;
  }

  if (service.slug === "ocean-freight" && service.content) {
    return <OceanFreightPage service={service} faqSchema={faqSchema} />;
  }

  if (service.slug === "warehousing" && service.content) {
    return <WarehousingPage service={service} faqSchema={faqSchema} />;
  }

  if (service.slug === "supply-chain" && service.content) {
    return <SupplyChainPage service={service} faqSchema={faqSchema} />;
  }

  if (service.slug === "cold-chain" && service.content) {
    return <ColdChainPage service={service} faqSchema={faqSchema} />;
  }

  return <DefaultServicePage service={service} faqSchema={faqSchema} />;
}
