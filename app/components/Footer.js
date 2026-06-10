'use client'

import Image from 'next/image'
import logoImage from '../../public/logo/Logoinv.png'
import { FaChevronRight, FaMapMarkerAlt, FaPhone, FaEnvelope, FaHeadset } from 'react-icons/fa'

export default function Footer() {
  const quickLinks = [
    { title: 'Home', href: '/' },
    { title: 'Services', href: '/services' },
    { title: 'Tracking', href: '/tracking' },
    { title: 'About Us', href: '/about' },
    { title: 'Contact', href: '/contact' },
    { title: 'Careers', href: '/careers' }
  ]

  const serviceLinks = [
    { title: 'Air Freight', href: '/services' },
    { title: 'Ocean Freight', href: '/services' },
    { title: 'Road Freight', href: '/services' },
    { title: 'Warehousing', href: '/services' },
    { title: 'Supply Chain', href: '/services' },
    { title: 'Cold Chain ', href: '/services' }
  ]

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-white pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          <div className="lg:col-span-2">
            {/* Logo Only */}
            <div className="mb-8">
              <div className="relative w-50 h-40 rounded-xl overflow-hidden">
                <Image
                  src="/logo/Logoinv.png"
                  alt="Invictus Logi Logo"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
            
            <p className="text-gray-400 max-w-md leading-relaxed">
              Delivering excellence across borders with precision, speed, and reliability. 
              Your trusted partner for global logistics .
            </p>
            
            
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-8 flex items-center">
              <FaChevronRight className="text-[#FAB045] mr-2" />
              Quick Links
            </h3>
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.title}>
                  <a 
                    href={link.href} 
                    className="text-gray-400 hover:text-[#FAB045] transition-colors duration-300 flex items-center group"
                  >
                    <span className="w-1.5 h-1.5 bg-[#FAB045] rounded-full mr-3 opacity-0 group-hover:opacity-100"></span>
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-8 flex items-center">
              <FaChevronRight className="text-[#FAB045] mr-2" />
              Services
            </h3>
            <ul className="space-y-4">
              {serviceLinks.map((link) => (
                <li key={link.title}>
                  <a 
                    href={link.href} 
                    className="text-gray-400 hover:text-[#FAB045] transition-colors duration-300 flex items-center group"
                  >
                    <span className="w-1.5 h-1.5 bg-[#A0A1A2] rounded-full mr-3 opacity-0 group-hover:opacity-100"></span>
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-8 flex items-center">
              <FaChevronRight className="text-[#FAB045] mr-2" />
              Contact Us
            </h3>
            <ul className="space-y-6 text-gray-400">
              <li className="flex items-start">
                <FaMapMarkerAlt className="text-[#FAB045] mt-1 mr-4 flex-shrink-0" />
                <div>
                  <p className="font-medium">Leyweg 836,</p>
                  <p className="text-sm">2545GR &apos;s-Gravenhage</p>
                </div>
              </li>
              <li className="flex items-center">
                <FaPhone className="text-[#FAB045] mr-4" />
                +31685865799
              </li>
              <li className="flex min-w-0 items-center">
                <FaEnvelope className="text-[#FAB045] mr-4" />
                <span className="min-w-0 break-all">info@invictuslogi.com</span>
              </li>
              <li className="flex items-center">
                <FaHeadset className="text-[#FAB045] mr-4" />
                24/7 Customer Support
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 mb-4 md:mb-0">
              © 2024 Invictus Logistics. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-gray-500 text-sm md:justify-end">
              <a href="#" className="hover:text-[#FAB045] transition-colors duration-300">Privacy Policy</a>
              <a href="#" className="hover:text-[#FAB045] transition-colors duration-300">Terms of Service</a>
              <a href="#" className="hover:text-[#FAB045] transition-colors duration-300">Cookie Policy</a>
              <a href="#" className="hover:text-[#FAB045] transition-colors duration-300">Sitemap</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
