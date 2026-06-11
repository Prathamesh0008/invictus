"use client";

import { useState } from "react";
import { FaChevronRight } from "react-icons/fa";

export default function RelatedInformation({ details }) {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleDetail = (index) => {
    setOpenIndex((current) => (current === index ? null : index));
  };

  return (
    <div className="mt-8 grid gap-4 md:grid-cols-2">
      {details.map((detail, index) => {
        const isOpen = openIndex === index;

        return (
          <button
            key={detail.title}
            type="button"
            onClick={() => toggleDetail(index)}
            className={`cursor-pointer rounded-2xl bg-gray-50 p-5 text-left transition hover:bg-[#E65100]/5 ${
              isOpen ? "ring-2 ring-[#E65100]/25" : ""
            }`}
          >
            <div className="flex gap-4">
              <FaChevronRight
                className={`mt-1 flex-shrink-0 text-[#E65100] transition-transform ${
                  isOpen ? "rotate-90" : ""
                }`}
              />
              <p className="leading-7 text-gray-800">{detail.title}</p>
            </div>

            <div
              className={`overflow-hidden transition-all duration-300 ${
                isOpen ? "mt-5 max-h-80" : "max-h-0"
              }`}
            >
              <div className="space-y-3 border-t border-gray-200 pt-4">
                {detail.points.map((point) => (
                  <div key={point} className="flex gap-3 text-sm text-gray-600">
                    <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-[#E65100]" />
                    <span className="leading-6">{point}</span>
                  </div>
                ))}
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
