'use client'

import { useEffect, useState } from 'react'
import {
  FaBox,
  FaCalendarAlt,
  FaCheckCircle,
  FaClipboardCheck,
  FaMapMarkerAlt,
  FaRoute,
  FaSearch,
  FaShip,
  FaTruckLoading,
  FaUserTie,
} from 'react-icons/fa'

export default function Tracking({ trackingId, setTrackingId }) {
  const [hasSearched, setHasSearched] = useState(false)
  const [activeStep, setActiveStep] = useState(0)
  const [error, setError] = useState('')
  const [submittedTrackingId, setSubmittedTrackingId] = useState('')

  const normalizedTrackingId = trackingId.trim().toUpperCase()
  const displayTrackingId = submittedTrackingId || normalizedTrackingId || 'TRK123456789'

  const shipmentSteps = [
    {
      title: 'Tracking Request',
      label: 'Request received',
      location: 'Online tracking desk',
      time: 'Step 1',
      icon: FaClipboardCheck,
    },
    {
      title: 'Shipment Registered',
      label: 'Cargo details verified',
      location: 'Operations center',
      time: 'Step 2',
      icon: FaBox,
    },
    {
      title: 'Picked Up',
      label: 'Shipment collected',
      location: 'Origin facility',
      time: 'Step 3',
      icon: FaTruckLoading,
    },
    {
      title: 'In Transit',
      label: 'Moving through freight network',
      location: 'Air / Sea / Road route',
      time: 'Step 4',
      icon: FaRoute,
    },
    {
      title: 'Customs & Sorting',
      label: 'Clearance and sorting in progress',
      location: 'Destination hub',
      time: 'Step 5',
      icon: FaShip,
    },
    {
      title: 'Delivered',
      label: 'Proof of delivery completed',
      location: 'Final destination',
      time: 'Step 6',
      icon: FaCheckCircle,
    },
  ]

  useEffect(() => {
    if (!hasSearched || activeStep >= shipmentSteps.length - 1) return

    const timer = setTimeout(() => {
      setActiveStep((step) => step + 1)
    }, 900)

    return () => clearTimeout(timer)
  }, [activeStep, hasSearched, shipmentSteps.length])

  const handleTrackNow = (event) => {
    event?.preventDefault()

    if (!normalizedTrackingId) {
      setHasSearched(false)
      setActiveStep(0)
      setError('Please enter a tracking number to continue.')
      return
    }

    setError('')
    setTrackingId(normalizedTrackingId)
    setSubmittedTrackingId(normalizedTrackingId)
    setActiveStep(0)
    setHasSearched(true)
  }

  return (
    <section className="bg-white py-14 sm:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-2xl">
          <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
            <div className="bg-gray-950 p-6 text-white sm:p-8 lg:p-10">
              <div className="mb-8 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-[#E65100] to-[#FFD700] text-2xl shadow-lg">
                <FaSearch />
              </div>

              <h2 className="text-3xl font-bold leading-tight sm:text-4xl">
                Shipment <span className="text-[#FFD700]">Tracking</span>
              </h2>
              <p className="mt-4 max-w-md leading-relaxed text-white/70">
                Enter your tracking number and follow each shipment step from
                request to delivery.
              </p>

              <form
                onSubmit={handleTrackNow}
                className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-4"
              >
                <label
                  htmlFor="tracking-number"
                  className="mb-3 block text-sm font-semibold text-white/80"
                >
                  Tracking Number
                </label>
                <div className="relative">
                  <FaBox className="absolute left-4 top-1/2 -translate-y-1/2 text-[#FFD700]" />
                  <input
                    id="tracking-number"
                    type="text"
                    value={trackingId}
                    onChange={(e) => {
                      setTrackingId(e.target.value)
                      setError('')
                    }}
                    placeholder="TRK123456789"
                    className="w-full rounded-xl border border-white/15 bg-white/10 py-4 pl-12 pr-4 text-white outline-none transition placeholder:text-white/35 focus:border-[#FFD700] focus:bg-white/15"
                  />
                </div>
                {error && <p className="mt-3 text-sm text-[#FFD700]">{error}</p>}

                <button
                  type="submit"
                  className="mt-5 flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-[#E65100] to-[#FFD700] px-6 py-4 font-semibold text-white shadow-lg transition hover:from-[#FF8F00] hover:to-[#E65100]"
                >
                  <FaSearch className="mr-3" />
                  Track Shipment
                </button>
              </form>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <FaUserTie className="mb-3 text-[#FFD700]" />
                  <p className="text-sm text-white/55">Support</p>
                  <p className="font-bold">24/7 Available</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <FaCalendarAlt className="mb-3 text-[#FFD700]" />
                  <p className="text-sm text-white/55">Latest Update</p>
                  <p className="font-bold">
                    {hasSearched ? `Step ${activeStep + 1}` : 'Ready'}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 sm:p-8 lg:p-10">
              <div className="mb-8 grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl bg-[#E65100]/10 p-4">
                  <p className="text-sm font-semibold text-gray-500">Status</p>
                  <p className="mt-2 font-bold text-[#E65100]">
                    {hasSearched
                      ? shipmentSteps[activeStep].title
                      : 'Ready To Track'}
                  </p>
                </div>
                <div className="rounded-2xl bg-gray-50 p-4">
                  <p className="text-sm font-semibold text-gray-500">Tracking ID</p>
                  <p className="mt-2 break-all font-bold text-gray-900">
                    {displayTrackingId}
                  </p>
                </div>
                <div className="rounded-2xl bg-gray-50 p-4">
                  <p className="text-sm font-semibold text-gray-500">Service</p>
                  <p className="mt-2 font-bold text-gray-900">Air / Sea / Road</p>
                </div>
              </div>

              <div className="rounded-2xl border border-gray-200 p-5">
                <div className="mb-6 flex flex-col gap-3 border-b border-gray-100 pb-5 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#E65100]">
                      Shipment Progress
                    </p>
                    <h3 className="mt-2 text-2xl font-bold text-gray-900">
                      Track step by step
                    </h3>
                  </div>
                  <div className="inline-flex w-fit items-center rounded-full bg-[#FFD700]/20 px-4 py-2 text-sm font-semibold text-gray-900">
                    <FaMapMarkerAlt className="mr-2 text-[#E65100]" />
                    Global Freight
                  </div>
                </div>

                <div className="space-y-0">
                  {shipmentSteps.map((step, index) => {
                    const Icon = step.icon
                    const isComplete = hasSearched && index < activeStep
                    const isCurrent = hasSearched && index === activeStep
                    const isPending = !hasSearched || index > activeStep

                    return (
                      <div key={step.title} className="relative flex gap-4 pb-7 last:pb-0">
                        {index !== shipmentSteps.length - 1 && (
                          <div
                            className={`absolute left-6 top-12 h-full w-[2px] ${
                              isComplete ? 'bg-[#E65100]' : 'bg-gray-200'
                            }`}
                          />
                        )}

                        <div
                          className={`relative z-10 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full text-lg shadow-sm ${
                            isComplete
                              ? 'bg-[#E65100] text-white'
                              : isCurrent
                                ? 'bg-[#FFD700] text-gray-900'
                                : 'bg-gray-100 text-gray-400'
                          }`}
                        >
                          <Icon />
                        </div>

                        <div className="min-w-0 flex-1 rounded-2xl border border-gray-100 bg-gray-50 p-4">
                          <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                            <div>
                              <p
                                className={`font-bold ${
                                  isPending ? 'text-gray-500' : 'text-gray-900'
                                }`}
                              >
                                {step.title}
                              </p>
                              <p className="mt-1 text-sm text-gray-600">{step.label}</p>
                            </div>
                            <span
                              className={`w-fit rounded-full px-3 py-1 text-xs font-semibold ${
                                isComplete
                                  ? 'bg-[#E65100]/10 text-[#E65100]'
                                  : isCurrent
                                    ? 'bg-[#FFD700]/30 text-gray-900'
                                    : 'bg-white text-gray-400'
                              }`}
                            >
                              {isComplete
                                ? 'Completed'
                                : isCurrent
                                  ? 'Current'
                                  : 'Pending'}
                            </span>
                          </div>

                          <div className="mt-4 grid gap-3 text-sm text-gray-500 sm:grid-cols-2">
                            <p>{step.location}</p>
                            <p className="sm:text-right">{step.time}</p>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
