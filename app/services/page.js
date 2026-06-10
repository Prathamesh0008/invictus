"use client";

import Image from "next/image";
import Link from "next/link";
import { FaArrowRight, FaCheck } from "react-icons/fa";
import { services } from "./servicesData";

export default function ServicesPage() {
  return (
    <main className="bg-white text-black">
      <section className="mx-auto max-w-[1700px] px-5 pt-20 sm:px-8 lg:px-12">
        <div className="mb-16 text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-[#E65100]">
            Our Services
          </p>

          <h1 className="mx-auto max-w-4xl text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
            Complete logistics solutions for every shipment.
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-600">
            From road freight to cold chain, we manage your cargo with speed,
            safety and professional handling.
          </p>
        </div>

        <div className="space-y-16">
          {services.map((service, index) => (
            <div
              key={service.title}
              className={`grid items-center gap-12 rounded-3xl border border-gray-200 bg-white p-6 shadow-xl sm:p-8 lg:grid-cols-2 lg:p-10 ${
                index % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
              }`}
            >
              <div className="relative h-[360px] overflow-hidden rounded-2xl bg-gray-100 sm:h-[500px] lg:h-[560px]">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover transition duration-700 hover:scale-105"
                />
              </div>

              <div className="lg:px-10">
                <p className="mb-5 text-sm font-semibold uppercase tracking-[0.22em] text-[#E65100]">
                  {service.label}
                </p>

                <h2 className="text-4xl font-bold sm:text-5xl">
                  {service.title}
                </h2>

                <p className="mt-6 max-w-xl text-lg leading-8 text-gray-600">
                  {service.description}
                </p>

                <div className="mt-8 space-y-4">
                  {service.points.map((point) => (
                    <div key={point} className="flex items-center gap-4">
                      <FaCheck className="text-[#E65100]" />
                      <span className="text-lg font-semibold text-gray-900">
                        {point}
                      </span>
                    </div>
                  ))}
                </div>

                <Link
                  href={`/services/${service.slug}`}
                  className="mt-10 inline-flex items-center gap-3 rounded-xl bg-[#E65100] px-7 py-4 font-bold uppercase text-white transition hover:bg-[#ff6a1a]"
                >
                  Learn More
                  <FaArrowRight />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
