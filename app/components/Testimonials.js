"use client";

import Image from "next/image";
import { FaQuoteLeft, FaStar } from "react-icons/fa";
import clientDavid from "../assets/testimonials/client-david-real.png";
import clientEmily from "../assets/testimonials/client-emily-real.png";
import clientJames from "../assets/testimonials/client-james-real.png";
import clientMichael from "../assets/testimonials/client-michael-real.png";
import clientSarah from "../assets/testimonials/client-sarah-real.png";

export default function Testimonials() {
  const testimonials = [
    {
      name: "Michael Rodriguez",
      company: "TechGiant Inc.",
      role: "Supply Chain Director",
      image: clientMichael,
      content:
        "SwiftLogistics transformed our global distribution network. Their tracking and communication are exceptional.",
      rating: 5,
    },
    {
      name: "Sarah Chen",
      company: "Global Retail Corp",
      role: "Logistics Manager",
      image: clientSarah,
      content:
        "We reduced shipping costs while improving delivery times. Their team is responsive and professional.",
      rating: 5,
    },
    {
      name: "James Wilson",
      company: "PharmaPlus",
      role: "Operations Head",
      image: clientJames,
      content:
        "The cold chain solutions for our products are outstanding. Temperature monitoring gives us peace of mind.",
      rating: 5,
    },
    {
      name: "Emily Thompson",
      company: "AutoParts Global",
      role: "Logistics Coordinator",
      image: clientEmily,
      content:
        "Their customs clearance service saved us many hours. Everything arrives on time, every time.",
      rating: 5,
    },
    {
      name: "David Miller",
      company: "Export House",
      role: "Export Manager",
      image: clientDavid,
      content:
        "Outstanding service. Our international shipments have never been smoother.",
      rating: 5,
    },
  ];

  const carouselItems = [...testimonials, ...testimonials];

  return (
    <section className="bg-white pt-12 pb-3 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
            What our Clients say!
          </h2>

          <div className="mx-auto mt-4 flex w-44 items-center justify-center gap-2">
            <span className="h-1 w-28 rounded-full bg-[#E65100]/30" />
            <span className="h-1 w-3 rounded-full bg-[#E65100]" />
          </div>
        </div>

        <div className="testimonial-mask overflow-hidden">
          <div className="testimonial-track flex w-max gap-8 pb-2 sm:pb-8">
            {carouselItems.map((item, index) => (
              <article
                key={`${item.name}-${index}`}
                className="flex h-[430px] w-[290px] flex-shrink-0 flex-col rounded-2xl border border-gray-100 bg-white p-7 shadow-[0_18px_45px_rgba(0,0,0,0.08)]"
              >
                <div className="mx-auto mb-5 h-20 w-20 overflow-hidden rounded-full border-4 border-white shadow-lg ring-2 ring-[#E65100]/20">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={80}
                    height={80}
                    className="h-full w-full object-cover"
                  />
                </div>

                <h4 className="text-center text-base font-bold text-gray-900">
                  {item.name}
                </h4>

                <p className="mt-1 text-center text-sm text-gray-500">
                  {item.role}
                </p>

                <div className="mt-5 flex justify-center">
                  {[...Array(item.rating)].map((_, i) => (
                    <FaStar key={i} className="text-sm text-[#FFD700]" />
                  ))}
                </div>

                <div className="relative mt-7 flex-1">
                  <FaQuoteLeft className="absolute -left-1 -top-3 text-4xl text-gray-100" />

                  <p className="relative z-10 text-base leading-relaxed text-gray-700">
                    {item.content}
                  </p>
                </div>

                <p className="mt-6 text-center text-sm font-semibold text-[#E65100]">
                  {item.company}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .testimonial-mask {
          scrollbar-width: none;
        }

        .testimonial-track {
          animation: testimonial-scroll 28s linear infinite;
        }

        .testimonial-mask:hover .testimonial-track {
          animation-play-state: paused;
        }

        @keyframes testimonial-scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
}
