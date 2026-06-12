"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  FaBoxOpen,
  FaFileInvoiceDollar,
  FaGlobeEurope,
  FaTruckMoving,
} from "react-icons/fa";

const terms = [
  {
    title: "Acceptance Of Terms",
    text: "By requesting a quote, booking a shipment, using our website, or communicating with Invictus Logistics for freight, warehousing, customs, or delivery services, you agree to these Terms and Conditions. If you act on behalf of a company, you confirm that you are authorized to accept these terms for that company.",
  },
  {
    title: "Shipment Booking And Service Scope",
    text: "Our services may include freight coordination, pickup, delivery, warehousing support, customs documentation assistance, shipment tracking, and carrier communication. Each booking is subject to service availability, cargo type, route feasibility, carrier acceptance, and any written quotation or service confirmation issued by us.",
  },
  {
    title: "Customer Responsibilities",
    text: "You must provide complete and accurate information, including sender details, receiver details, cargo description, weight, dimensions, value, pickup and delivery addresses, and any special handling needs. Incorrect or incomplete details may cause delays, extra charges, customs issues, refusal of transport, or cancellation of service.",
  },
  {
    title: "Packaging, Labelling And Cargo Readiness",
    text: "Cargo must be safely packed for transport, handling, loading, storage, and route conditions. Fragile, high-value, temperature-sensitive, oversized, or regulated goods must be declared before booking. We may refuse shipments that are unsafe, poorly packed, incorrectly labelled, prohibited, or unsuitable for the requested transport method.",
  },
  {
    title: "Restricted And Prohibited Goods",
    text: "Customers must not submit illegal, hazardous, restricted, stolen, counterfeit, or undeclared regulated goods. Dangerous goods, batteries, chemicals, medicines, perishables, high-value items, or controlled products may require prior approval, special documents, permits, or carrier acceptance.",
  },
  {
    title: "Rates, Charges And Payment",
    text: "Quoted rates may be based on shipment details provided at the time of request. Final charges may change if the actual weight, dimensions, service route, customs duties, storage time, waiting time, failed delivery attempts, address changes, special handling, or carrier fees differ from the original information. Payment terms must be followed as stated in the quotation, invoice, or written agreement.",
  },
  {
    title: "Customs, Duties And Compliance",
    text: "For international shipments, the customer is responsible for accurate customs documents, invoices, licenses, declarations, product descriptions, and compliance with import and export regulations. Duties, taxes, inspections, penalties, demurrage, storage, or customs-related charges are the responsibility of the customer or consignee unless agreed otherwise in writing.",
  },
  {
    title: "Delivery Timelines And Delays",
    text: "Estimated delivery times are provided for planning purposes and are not guaranteed unless a specific guaranteed service is confirmed in writing. Delays may occur due to weather, traffic, customs inspections, port congestion, carrier schedules, public holidays, incorrect addresses, security checks, force majeure events, or circumstances outside our reasonable control.",
  },
  {
    title: "Tracking And Communication",
    text: "We aim to provide clear shipment updates using available carrier, warehouse, and operational information. Tracking updates may not always be real-time and can depend on third-party systems, scanning events, and route checkpoints.",
  },
  {
    title: "Liability And Claims",
    text: "Our liability may be limited by applicable transport laws, carrier terms, international conventions, and the specific service used. Claims for loss, damage, or delay must be reported promptly with supporting documents, photographs, shipment references, invoices, and packaging evidence. We are not responsible for losses caused by insufficient packaging, incorrect declarations, prohibited goods, customer instructions, customs actions, or events beyond our control.",
  },
  {
    title: "Cancellation, Storage And Failed Delivery",
    text: "Cancellation requests must be made before operational work or carrier booking begins. If a shipment cannot be collected or delivered because of unavailable contacts, incorrect details, consignee refusal, missing documents, or unpaid charges, additional fees may apply for waiting time, return transport, redelivery, storage, or disposal where permitted by law.",
  },
  {
    title: "Changes To These Conditions",
    text: "We may update these Terms and Conditions when our services, legal requirements, carrier rules, or business processes change. The latest version published on this page applies to website use and future service requests.",
  },
];

const stats = [
  { end: 24, suffix: "/7", label: "Support" },
  { end: 180, suffix: "+", label: "Routes" },
  { end: 100, suffix: "%", label: "Safe Handling" },
];

function CountUp({ end, suffix = "", duration = 1400 }) {
  const [value, setValue] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasAnimated) return;

        setHasAnimated(true);
        const startedAt = performance.now();

        const tick = (currentTime) => {
          const progress = Math.min((currentTime - startedAt) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);

          setValue(Math.round(end * eased));

          if (progress < 1) {
            requestAnimationFrame(tick);
          }
        };

        requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [duration, end, hasAnimated]);

  return (
    <span ref={ref}>
      {value}
      {suffix}
    </span>
  );
}

export default function TermsAndConditionsPage() {
  return (
    <main className="bg-white text-[#111827]">
      <section className="relative min-h-[520px] overflow-hidden bg-[#071120]">
        <Image
          src="/Road_fright.jpg"
          alt="Road freight truck on a logistics route"
          fill
          sizes="100vw"
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#071120]/68 via-[#071120]/28 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#071120]/18 via-transparent to-transparent" />

        <div className="relative mx-auto flex min-h-[520px] max-w-7xl items-center px-5 py-20 sm:px-8">
          <div className="max-w-3xl">
            <p className="mb-5 text-sm font-bold uppercase tracking-[0.35em] text-[#FFD700]">
              Invictus Logistics
            </p>
            <h1 className="max-w-3xl text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
              Terms And Conditions For Logistics Services
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/78">
              Clear service conditions for freight coordination, shipment
              handling, customs support, delivery timelines, payments, and cargo
              responsibility.
            </p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex w-fit items-center justify-center rounded-md bg-[#E65100] px-7 py-4 text-sm font-bold text-white transition hover:bg-[#FF8F00]"
              >
                Request Support
              </Link>
              <Link
                href="/services"
                className="inline-flex w-fit items-center justify-center rounded-md border border-white/35 px-7 py-4 text-sm font-bold text-white transition hover:border-[#FFD700] hover:text-[#FFD700]"
              >
                View Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[1fr_0.9fr]">
        <div className="relative min-h-[360px] overflow-hidden rounded-lg shadow-[0_22px_60px_rgba(18,51,59,0.14)] sm:min-h-[460px]">
          <Image
            src="/pexels.jpg"
            alt="Freight containers and logistics transport"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#071120]/30 via-transparent to-transparent" />
        </div>

        <div>
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#E65100]">
            Service Conditions
          </p>
          <h2 className="mt-4 text-3xl font-bold leading-tight text-[#12333B] sm:text-4xl">
            Logistics works best when cargo, documents, and expectations are
            clear from the start.
          </h2>
          <p className="mt-6 text-base leading-8 text-gray-600">
            These conditions explain how bookings are handled, what information
            customers must provide, how charges may apply, and what happens when
            routes, customs, carriers, or delivery circumstances change.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="border-l-4 border-[#FFD700] bg-[#F6F8FA] p-5"
              >
                <p className="text-2xl font-bold text-[#E65100]">
                  <CountUp end={stat.end} suffix={stat.suffix} />
                </p>
                <p className="mt-1 text-sm font-semibold text-gray-600">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#F6F8FA] py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#E65100]">
              Terms Of Service
            </p>
            <h2 className="mt-4 text-3xl font-bold text-[#12333B] sm:text-4xl">
              Our Logistics Conditions
            </h2>
            <p className="mt-5 leading-8 text-gray-600">
              Please read these terms before booking a shipment or using our
              freight, delivery, warehousing, customs, or support services.
            </p>
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            {terms.map((term, index) => (
              <article
                key={term.title}
                className="border border-gray-200 bg-white p-6 shadow-sm"
              >
                <div className="mb-4 flex items-center gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E65100] text-sm font-bold text-white">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-lg font-bold text-[#12333B]">
                    {term.title}
                  </h3>
                </div>
                <p className="text-sm leading-7 text-gray-600">{term.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="grid bg-white text-[#071120] lg:grid-cols-2">
        <div className="px-5 py-14 sm:px-8 lg:px-[max(2rem,calc((100vw-80rem)/2))] lg:py-20">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#E65100]">
            Need Clarification?
          </p>
          <h2 className="mt-4 max-w-xl text-3xl font-bold leading-tight text-[#071120] sm:text-4xl">
            Our team can help confirm service terms before your shipment moves.
          </h2>
          <p className="mt-5 max-w-xl leading-8 text-gray-600">
            Contact us before booking if your cargo needs special handling,
            customs review, temperature control, insurance guidance, or route
            confirmation.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="inline-flex rounded-md bg-[#E65100] px-7 py-4 text-sm font-bold text-white transition hover:bg-[#FF8F00]"
            >
              Contact Support
            </Link>
            <a
              href="tel:+31685865799"
              className="inline-flex items-center gap-3 rounded-md border border-[#12333B]/20 bg-[#F6F8FA] px-7 py-4 text-sm font-bold text-[#071120] transition hover:border-[#E65100] hover:text-[#E65100]"
            >
              <FaTruckMoving aria-hidden="true" />
              +31685865799
            </a>
          </div>
        </div>

        <div className="relative min-h-[340px]">
          <Image
            src="/client.jpg"
            alt="Logistics team coordinating client shipment support"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[#12333B]/18" />
        </div>
      </section>
    </main>
  );
}
