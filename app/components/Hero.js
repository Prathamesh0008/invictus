'use client'
import { useState, useEffect, useRef } from 'react'
import { FaTruck, FaSearch } from 'react-icons/fa'
import GetStartedModal from './GetStartedModal'
import Lottie from 'lottie-react'
import lightningLottie from '@/public/lottie/Loading_car.json'
import GlobalLottie from '@/public/lottie/Global Network.json'
import SecuredLottie from '@/public/lottie/Secured.json'
import DeliveryLottie from '@/public/lottie/Dlivery Map.json'
import Link from "next/link";
const Counter = ({ end, duration = 2000, suffix = '', prefix = '', decimals = 0, className = '' }) => {
  const [count, setCount] = useState(0)
  const countRef = useRef(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true
          animateCounter()
        }
      })
    }, { threshold: 0.1 })

    if (countRef.current) observer.observe(countRef.current)

    return () => {
      if (countRef.current) observer.unobserve(countRef.current)
    }
  }, [])

  const animateCounter = () => {
    const startTime = Date.now()
    const startValue = 0

    const updateCounter = () => {
      const currentTime = Date.now()
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      const currentValue = startValue + (end - startValue) * easeOutQuart

      setCount(parseFloat(currentValue.toFixed(decimals)))

      if (progress < 1) requestAnimationFrame(updateCounter)
    }

    requestAnimationFrame(updateCounter)
  }

  return (
    <span ref={countRef} className={className}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  )
}

export default function Hero() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const iconBoxClass =
    'w-16 h-16 sm:w-20 sm:h-20 md:w-25 md:h-25 mx-auto overflow-visible'

  const features = [
    {
      icon: (
        <div className={iconBoxClass}>
          <Lottie
            animationData={lightningLottie}
            loop
            autoplay
            className="scale-[1.35]"
          />
        </div>
      ),
      title: 'Lightning Fast',
      desc: 'Same-Day Dispatch',
      color: 'text-[#FAB045]',
      gradient: 'from-[#FAB045] to-[#FFD700]',
    },
    {
      icon: (
        <div className={iconBoxClass}>
          <Lottie
            animationData={DeliveryLottie}
            loop
            autoplay
            className="scale-[1.35]"
          />
        </div>
      ),
      title: 'Live Tracking',
      desc: 'Real-time Updates',
      color: 'text-[#FAB045]',
      gradient: 'from-[#FAB045] to-[#FFD700]',
    },
    {
      icon: (
        <div className={iconBoxClass}>
          <Lottie
            animationData={SecuredLottie}
            loop
            autoplay
            className="scale-[1.55]"
          />
        </div>
      ),
      title: 'Armored Security',
      desc: 'Advanced Protection',
      color: 'text-[#FAB045]',
      gradient: 'from-[#FAB045] to-[#FFD700]',
    },
    {
      icon: (
        <div className={iconBoxClass}>
          <Lottie
            animationData={GlobalLottie}
            loop
            autoplay
            className="scale-[1.45]"
          />
        </div>
      ),
      title: 'Global Network',
      desc: '180+ Countries',
      color: 'text-[#FAB045]',
      gradient: 'from-[#FAB045] to-[#FFD700]',
    },
  ]

  const handleTrackShipment = () => {
    const trackingNumber = prompt('Please enter your tracking number:')
    if (trackingNumber) {
      alert(`Tracking number: ${trackingNumber}\n\nIn a real application, this would redirect to a tracking page.`)
    }
  }

  const handleGetStarted = () => {
    setIsModalOpen(true)
  }

  return (
    <>
      <section
        className="relative text-white overflow-hidden min-h-screen flex items-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/75 to-black/85"></div>

        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-[#FAB045]/20 to-transparent rounded-full blur-3xl animate-pulse"></div>
          <div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-l from-[#4CC9F0]/20 to-transparent rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: '2s' }}
          ></div>

          <div className="absolute inset-0 opacity-10">
            <div
              className="h-full w-full"
              style={{
                backgroundImage: `linear-gradient(90deg, transparent 95%, #FAB045 100%),
                               linear-gradient(0deg, transparent 95%, #4CC9F0 100%)`,
                backgroundSize: '60px 60px',
              }}
            ></div>
          </div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-6 sm:py-10 lg:py-12 2xl:py-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row items-center lg:items-center gap-6 lg:gap-8 xl:gap-16">
              <div className="lg:w-1/2 text-center lg:text-left">
                {/* <div className="mb-5 lg:mb-6">
                  <span className="inline-block bg-gradient-to-r from-[#E65100] to-[#f8c468] text-white px-4 py-1.5 sm:px-6 sm:py-2 md:px-7 md:py-2.5 rounded-full text-xs sm:text-sm font-bold tracking-wide shadow-2xl">
                    <span className="flex items-center justify-center">
                      
                    </span>
                  </span>
                </div> */}

                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-3 sm:mb-5 leading-tight tracking-tight font-medium">
                  <span className="block text-white">Precision</span>
                  <span className="block pb-1 leading-[1.2] bg-gradient-to-r from-[#ff7a00]/80 via-[#FF8F00]/70 to-[#ff7a00]/80 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto] font-medium antialiased">
                    Logistics
                  </span>
                </h1>

                <p className="text-base sm:text-lg md:text-xl text-gray-200 mb-6 sm:mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light">
                  Revolutionizing global supply chains with cutting-edge technology,
                  real-time visibility, and unparalleled security for your shipments.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 justify-center lg:justify-start">
                  <button
                    onClick={handleGetStarted}
                    className="group relative bg-gradient-to-r from-[#E65100] to-[#FFD700] hover:from-[#FF8F00] hover:to-[#FFC300] text-white font-bold py-2.5 sm:py-3 md:py-4 px-5 sm:px-7 md:px-8 rounded-xl text-sm sm:text-base transition-all duration-300 hover:shadow-2xl hover:scale-105 overflow-hidden"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    <span className="relative flex items-center justify-center">
                      <FaTruck className="mr-2 sm:mr-3 text-base sm:text-lg group-hover:animate-bounce" />
                      Launch Shipment
                    </span>
                  </button>

                <Link
  href="/tracking"
  className="group relative border-2 border-white/30 hover:border-[#FAB045]/50 text-white font-semibold py-2.5 sm:py-3 md:py-4 px-5 sm:px-7 md:px-8 rounded-xl text-sm sm:text-base transition-all duration-300 backdrop-blur-xl bg-white/5 hover:bg-white/10 inline-flex items-center justify-center"
>
  <span className="relative flex items-center justify-center">
    <FaSearch className="mr-2 sm:mr-3 group-hover:rotate-90 transition-transform duration-300" />
    <span className="group-hover:text-[#FAB045] transition-colors duration-300">
      Track Consignment
    </span>
  </span>
</Link>
                </div>
              </div>

              <div className="lg:w-1/2 w-full mt-6 lg:mt-0">
                <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-5">
                  {features.map((feature, index) => (
                    <div
                      key={index}
                      className="group relative bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-2xl rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5 border border-white/20 hover:border-[#FAB045]/50 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 overflow-hidden"
                    >
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                      ></div>

                      <div className="relative flex flex-col items-center text-center">
                        <div className={`${feature.color} mb-2 sm:mb-3 md:mb-4 text-2xl sm:text-3xl group-hover:scale-110 transition-transform duration-500`}>
                          {feature.icon}
                        </div>

                        <h4 className="font-bold text-sm sm:text-base md:text-lg mb-0.5 sm:mb-1 md:mb-2 group-hover:text-[#FAB045] transition-colors duration-300">
                          {feature.title}
                        </h4>

                        <p className="text-[11px] sm:text-xs text-gray-300 group-hover:text-white transition-colors duration-300">
                          {feature.desc}
                        </p>
                      </div>

                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-[#FAB045] to-[#4CC9F0] group-hover:w-10 sm:group-hover:w-12 transition-all duration-500"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx global>{`
        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .animate-gradient {
          animation: gradient 3s ease infinite;
        }
      `}</style>

      <GetStartedModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  )
}