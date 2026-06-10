'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FaArrowRight, FaPhoneAlt } from 'react-icons/fa';
import ctaBg from '../assets/cta/ship-sunset-cta.png';
import GetQuoteModal from './GetQuoteModal';

export default function CTA() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const goToContact = () => router.push('/contact');

  return (
    <section className="relative overflow-hidden bg-gray-950 pt-8 pb-16 sm:py-28">
      <Image
        src={ctaBg}
        alt="Yacht sailing across the ocean at sunset"
        fill
        sizes="100vw"
        className="object-cover"
        priority={false}
      />
      <div className="absolute inset-0 bg-sky-950/35" />
      <div className="absolute inset-0 bg-gradient-to-r from-gray-950/70 via-sky-950/35 to-[#E65100]/10" />

      <div className="container relative z-10 mx-auto px-4 text-center sm:px-6 lg:px-8">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.28em] text-[#FFD700]">
          Fast Global Logistics
        </p>

        <h2 className="mx-auto max-w-3xl text-4xl font-bold leading-tight text-white md:text-5xl">
          Ready to <span className="text-[#FF8F00]">Ship?</span>
        </h2>

        <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-white/80">
          Move your cargo with reliable freight support across sea, air, and
          road networks. Get a quote today.
        </p>

        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
          <button
            onClick={openModal}
            className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-[#E65100] to-[#FFD700] px-8 py-4 text-lg font-semibold text-white shadow-xl transition hover:from-[#FF8F00] hover:to-[#E65100]"
          >
            Request Quote
            <FaArrowRight className="ml-3 text-sm" />
          </button>

          <button
            onClick={goToContact}
            className="inline-flex items-center justify-center rounded-xl border-2 border-white/80 px-8 py-4 text-lg font-semibold text-white transition hover:bg-white hover:text-gray-950"
          >
            <FaPhoneAlt className="mr-3 text-sm" />
            Contact Sales
          </button>
        </div>
      </div>

      {isModalOpen && <GetQuoteModal isOpen={isModalOpen} onClose={closeModal} />}
    </section>
  );
}
