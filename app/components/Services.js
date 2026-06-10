'use client'

import {
  FaCheckCircle,
  FaPlaneDeparture,
  FaShip,
  FaTruckMoving,
  FaWarehouse,
} from 'react-icons/fa'

export default function Services() {
  const services = [
    {
      icon: FaPlaneDeparture,
      title: 'Air Freight',
      description:
        'Express air cargo with real-time tracking across 150+ countries.',
      features: ['Same Day Delivery', 'Global Coverage', 'Temperature Control'],
      gradient: 'from-[#E65100] to-[#FF8F00]',
    },
    {
      icon: FaShip,
      title: 'Ocean Freight',
      description:
        'Cost-effective sea freight with comprehensive FCL/LCL options.',
      features: ['Port to Port', 'Door to Door', 'Customs Clearance'],
      gradient: 'from-[#FFD700] to-[#FF8F00]',
    },
    {
      icon: FaTruckMoving,
      title: 'Road Transport',
      description: 'Efficient nationwide land transportation network.',
      features: ['LTL & FTL', 'Temperature Control', 'Express Delivery'],
      gradient: 'from-[#E65100] to-[#FFD700]',
    },
    {
      icon: FaWarehouse,
      title: 'Warehousing',
      description: 'Secure storage with advanced inventory management.',
      features: ['Secure Storage', 'Inventory Management', 'Order Fulfillment'],
      gradient: 'from-[#FFD700] to-[#E65100]',
    },
  ]

  return (
    <section className="bg-white pt-10 pb-3 sm:py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-9">
        <div className="mb-8 px-2 text-center sm:mb-10">
          <h2 className="inline-block bg-gradient-to-r from-[#FFD700] to-[#E65100] bg-clip-text text-3xl font-bold text-transparent sm:text-4xl lg:text-5xl">
            Our Services
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-gray-600 sm:text-lg">
            Complete freight and logistics support for air, sea, road, and
            storage operations.
          </p>
        </div>

        <div className="grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4 lg:gap-8">
          {services.map((service, index) => {
            const Icon = service.icon

            return (
            <div
              key={index}
              className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-lg transition-all duration-300 hover:border-[#E65100]/40 hover:shadow-2xl"
            >
              <div
                className={`h-2 rounded-t-2xl bg-gradient-to-r ${service.gradient}`}
              />

              <div className="flex flex-1 flex-col p-6 sm:p-7 lg:p-8">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#E65100]/10 text-[#E65100] ring-1 ring-[#E65100]/10 transition duration-300 group-hover:bg-[#E65100] group-hover:text-white">
                  <Icon className="text-3xl" aria-hidden="true" />
                </div>

                <h3 className="mb-4 text-2xl font-bold leading-tight text-gray-900">
                  {service.title}
                </h3>

                <p className="mb-7 min-h-[72px] text-base leading-relaxed text-gray-600">
                  {service.description}
                </p>

                <ul className="space-y-3 border-t border-gray-100 pt-6">
                  {service.features.map((feature, i) => (
                    <li
                      key={i}
                      className="flex items-center text-base text-gray-800"
                    >
                      <FaCheckCircle
                        className="mr-4 flex-shrink-0 text-base text-[#E65100]"
                        aria-hidden="true"
                      />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
