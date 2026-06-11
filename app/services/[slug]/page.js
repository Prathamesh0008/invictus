import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaArrowLeft, FaCheck } from "react-icons/fa";
import RelatedInformation from "./RelatedInformation";
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
    title: `${service.title} | Services`,
    description: service.description,
  };
}

export default async function ServiceDetailPage({ params }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  return (
    <main className="bg-white text-black">
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10">
        <Link
          href="/services"
          className="mb-8 inline-flex items-center gap-3 font-semibold text-[#E65100] transition hover:text-[#ff6a1a]"
        >
          <FaArrowLeft />
          Back To Services
        </Link>

        <div className="grid gap-10  cursor-pointer lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="relative h-[360px] overflow-hidden rounded-3xl bg-gray-100 shadow-xl sm:h-[520px]">
            <Image
              src={service.image}
              alt={service.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          <div>
            <p className="mb-4 text-sm  cursor-pointer font-semibold uppercase tracking-[0.25em] text-[#E65100]">
              {service.label}
            </p>

            <h1 className="text-4xl font-bold leading-tight text-gray-950 sm:text-5xl">
              {service.title}
            </h1>

            <p className="mt-6 text-lg leading-8 text-gray-600">
              {service.description}
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {service.points.map((point) => (
                <div
                  key={point}
                  className="flex items-center cursor-pointer gap-3 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm"
                >
                  <FaCheck className="flex-shrink-0 text-[#E65100] cursor-pointer" />
                  <span className="font-semibold text-gray-900">{point}</span>
                </div>
              ))}
            </div>    
          </div>
        </div>

        <div className="mt-14 rounded-3xl  border border-gray-200 bg-white p-6 shadow-xl sm:p-8 lg:p-10">
          <h2 className="text-3xl cursor-pointer font-bold text-gray-950">
            Related Information
          </h2>

          <p className="mt-3 max-w-3xl text-gray-600">
            Key points about this service and how it supports your cargo
            movement.
          </p>

          <RelatedInformation details={service.details} />
        </div>
      </section>
    </main>
  );
}
