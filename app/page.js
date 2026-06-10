'use client'
import { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import Tracking from './components/Tracking'
import Stats from './components/Stats'
import Testimonials from './components/Testimonials'
import CTA from './components/CTA'
import Footer from './components/Footer'
import StatsOverlay from './components/StatsOverlay'
export default function Home() {
  const [trackingId, setTrackingId] = useState('')
  
  const handleTrack = () => {
    if (trackingId) {
      alert(`Tracking shipment: ${trackingId}`)
    } else {
      alert('Please enter a tracking number')
    }
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-gradient-to-b from-gray-50 to-white">
      
      
      <Hero />
      <StatsOverlay/>

      
      <Services />
      
      <Tracking 
        trackingId={trackingId} 
        setTrackingId={setTrackingId}
        handleTrack={handleTrack}
      />
      
      
      
      <Testimonials />
      
      <CTA />
      
  
    </div>
  )
}


// 'use client'
// import { useState } from 'react'
// import { FaTruck, FaPlane, FaShip, FaShippingFast, FaGlobe, FaShieldAlt, FaClock, FaSearch, FaPhone, FaEnvelope, FaMapMarkerAlt, FaRoute, FaWarehouse, FaBoxOpen, FaChartLine, FaHeadset, FaUserTie, FaAward, FaChevronRight } from 'react-icons/fa'
// import Testimonials from './components/Testimonials'
// import Hero from './components/Hero'

// export default function Home() {
//   const [trackingId, setTrackingId] = useState('')
//   const [isMenuOpen, setIsMenuOpen] = useState(false)
  
//   const handleTrack = () => {
//     if (trackingId) {
//       alert(`Tracking shipment: ${trackingId}`)
//     } else {
//       alert('Please enter a tracking number')
//     }
//   }

//   const services = [
//     {
//       icon: <FaPlane className="text-4xl" />,
//       title: 'Air Freight',
//       description: 'Express air cargo  with real-time tracking across 150+ countries.',
//       features: ['Same Day Delivery', 'Global Coverage', 'Temperature Control'],
//       gradient: 'from-[#FAB045] to-[#f8c468]'
//     },
//     {
//       icon: <FaShip className="text-4xl" />,
//       title: 'Ocean Freight',
//       description: 'Cost-effective sea freight with comprehensive FCL/LCL options.',
//       features: ['Port to Port', 'Door to Door', 'Customs Clearance'],
//       gradient: 'from-[#A0A1A2] to-[#c0c1c2]'
//     },
//     {
//       icon: <FaTruck className="text-4xl" />,
//       title: 'Road Transport',
//       description: 'Efficient nationwide land transportation network.',
//       features: ['LTL & FTL', 'Temperature Control', 'Express Delivery'],
//       gradient: 'from-[#FAB045] to-[#f8c468]'
//     },
//     {
//       icon: <FaWarehouse className="text-4xl" />,
//       title: 'Warehousing',
//       description: 'Secure storage  with advanced inventory management.',
//       features: ['Secure Storage', 'Inventory Management', 'Order Fulfillment'],
//       gradient: 'from-[#A0A1A2] to-[#c0c1c2]'
//     }
//   ]

//   const features = [
//     { 
//       icon: <FaShippingFast />, 
//       title: 'Fast Delivery', 
//       desc: '24/7 Express Services',
//       color: 'text-[#FAB045]'
//     },
//     { 
//       icon: <FaGlobe />, 
//       title: 'Global Reach', 
//       desc: '150+ Countries',
//       color: 'text-[#A0A1A2]'
//     },
//     { 
//       icon: <FaShieldAlt />, 
//       title: 'Secure Shipping', 
//       desc: 'Insured Shipments',
//       color: 'text-[#FAB045]'
//     },
//     { 
//       icon: <FaClock />, 
//       title: 'Real-time Tracking', 
//       desc: 'Live Updates',
//       color: 'text-[#A0A1A2]'
//     },
//   ]

//   const stats = [
//     { 
//       number: '150+', 
//       label: 'Countries', 
//       description: 'Global Coverage',
//       icon: <FaGlobe className="text-2xl" />
//     },
//     { 
//       number: '99.8%', 
//       label: 'Success Rate', 
//       description: 'On-time Delivery',
//       icon: <FaChartLine className="text-2xl" />
//     },
//     { 
//       number: '15K+', 
//       label: 'Deliveries', 
//       description: 'Monthly Shipments',
//       icon: <FaBoxOpen className="text-2xl" />
//     },
//     { 
//       number: '24/7', 
//       label: 'Support', 
//       description: 'Customer Service',
//       icon: <FaHeadset className="text-2xl" />
//     },
//   ]

//   const quickLinks = [
//     { title: 'Home', href: '#' },
//     { title: 'Services', href: '#' },
//     { title: 'Tracking', href: '#' },
//     { title: 'About Us', href: '#' },
//     { title: 'Contact', href: '#' },
//     { title: 'Careers', href: '#' }
//   ]

//   const serviceLinks = [
//     { title: 'Air Freight', href: '#' },
//     { title: 'Ocean Freight', href: '#' },
//     { title: 'Road Transport', href: '#' },
//     { title: 'Warehousing', href: '#' },
//     { title: 'Supply Chain', href: '#' },
//     { title: 'Customs Clearance', href: '#' }
//   ]

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
//       {/* Enhanced Navigation */}
//       <nav className="bg-white shadow-xl sticky top-0 z-50 border-b border-gray-200">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center py-4">
//             <div className="flex items-center space-x-4">
//               <div className="w-12 h-12 bg-gradient-to-r from-[#FAB045] to-[#f8c468] rounded-xl flex items-center justify-center">
//                 <FaRoute className="text-white text-2xl" />
//               </div>
//               <div>
//                 <h1 className="text-2xl font-bold text-gray-900">SwiftLogistics</h1>
//                 <p className="text-sm text-[#A0A1A2] font-medium">Global Delivery </p>
//               </div>
//             </div>
            
//             {/* Desktop Menu */}
//             <div className="hidden lg:flex items-center space-x-8">
//               {quickLinks.slice(0, 5).map((link) => (
//                 <a 
//                   key={link.title} 
//                   href={link.href}
//                   className="text-gray-700 hover:text-[#FAB045] font-medium transition-colors duration-300 relative group"
//                 >
//                   {link.title}
//                   <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#FAB045] group-hover:w-full transition-all duration-300"></span>
//                 </a>
//               ))}
//               <button className="bg-gradient-to-r from-[#FAB045] to-[#f8c468] hover:from-[#e8a035] hover:to-[#e8a035] text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 hover:shadow-lg hover:scale-105">
//                 Book Now
//               </button>
//             </div>

//             {/* Mobile Menu Button */}
//             <button 
//               onClick={() => setIsMenuOpen(!isMenuOpen)}
//               className="lg:hidden text-gray-700"
//             >
//               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//               </svg>
//             </button>
//           </div>

//           {/* Mobile Menu */}
//           {isMenuOpen && (
//             <div className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-lg border-t border-gray-200">
//               <div className="px-4 py-6 space-y-4">
//                 {quickLinks.map((link) => (
//                   <a 
//                     key={link.title} 
//                     href={link.href}
//                     className="block text-gray-700 hover:text-[#FAB045] font-medium py-2"
//                     onClick={() => setIsMenuOpen(false)}
//                   >
//                     {link.title}
//                   </a>
//                 ))}
//                 <button className="w-full bg-gradient-to-r from-[#FAB045] to-[#f8c468] text-white font-semibold py-3 px-6 rounded-xl mt-4">
//                   Book Now
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       </nav>

//       {/* Enhanced Hero Section */}
//       <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
//         <div className="absolute inset-0 opacity-20">
//           <div className="absolute top-0 left-0 w-full h-full">
//             <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#FAB045] rounded-full mix-blend-overlay filter blur-3xl"></div>
//             <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#A0A1A2] rounded-full mix-blend-overlay filter blur-3xl"></div>
//           </div>
//         </div>
        
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-24">
//           <div className="max-w-5xl mx-auto">
//             <div className="text-center mb-12">
//               <span className="inline-block bg-gradient-to-r from-[#FAB045] to-[#f8c468] text-white px-6 py-2 rounded-full text-sm font-semibold mb-6 shadow-lg">
//                 Trusted Worldwide Logistics Partner
//               </span>
//               <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
//                 Precision <span className="text-[#FAB045]">Logistics</span> 
//               </h1>
//               <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
//                 Delivering excellence across borders with advanced tracking, 
//                 secure handling, and reliable global transportation.
//               </p>
//               <div className="flex flex-col sm:flex-row gap-6 justify-center mb-20">
//                 <button className="bg-gradient-to-r from-[#FAB045] to-[#f8c468] hover:from-[#e8a035] hover:to-[#e8a035] text-white font-semibold py-4 px-10 rounded-xl text-lg transition-all duration-300 hover:shadow-xl hover:scale-105 flex items-center justify-center">
//                   <FaTruck className="mr-3" />
//                   Get Started
//                 </button>
//                 <button className="border-2 border-white/50 hover:border-[#FAB045] text-white hover:text-[#FAB045] font-semibold py-4 px-10 rounded-xl text-lg transition-all duration-300 backdrop-blur-sm bg-white/5">
//                   <FaSearch className="inline mr-3" />
//                   Track Shipment
//                 </button>
//               </div>
//             </div>

//             {/* Enhanced Features */}
//             <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
//               {features.map((feature, index) => (
//                 <div 
//                   key={index} 
//                   className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-center border border-white/20 hover:border-[#FAB045] transition-all duration-300 group hover:shadow-xl hover:-translate-y-1"
//                 >
//                   <div className={`${feature.color} mb-4 text-4xl flex justify-center group-hover:scale-110 transition-transform duration-300`}>
//                     {feature.icon}
//                   </div>
//                   <h4 className="font-bold text-xl mb-2 group-hover:text-[#FAB045] transition-colors duration-300">{feature.title}</h4>
//                   <p className="text-sm text-gray-300">{feature.desc}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>
//       <Hero/>
//      <Testimonials/>
//       {/* Services Section */}
//       <section className="py-20 bg-gradient-to-b from-white to-gray-50">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-20">
//             <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
//               Our <span className="text-[#FAB045]">Services</span>
//             </h2>
//             <p className="text-[#A0A1A2] text-xl max-w-3xl mx-auto">
//               Comprehensive logistics  designed for modern business needs.
//             </p>
//           </div>

//           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
//             {services.map((service, index) => (
//               <div 
//                 key={index} 
//                 className="bg-white rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 overflow-hidden group hover:-translate-y-2"
//               >
//                 <div className={`h-2 bg-gradient-to-r ${service.gradient}`}></div>
//                 <div className="p-8">
//                   <div className={`mb-6 transform group-hover:scale-110 transition-transform duration-500 ${
//                     service.gradient.includes('FAB045') ? 'text-[#FAB045]' : 'text-[#A0A1A2]'
//                   }`}>
//                     {service.icon}
//                   </div>
//                   <h3 className="text-2xl font-bold mb-4 text-gray-900 group-hover:text-[#FAB045] transition-colors duration-300">
//                     {service.title}
//                   </h3>
//                   <p className="text-[#A0A1A2] mb-8 leading-relaxed">{service.description}</p>
//                   <ul className="space-y-4 mb-8">
//                     {service.features.map((feature, idx) => (
//                       <li key={idx} className="flex items-center text-gray-700 group-hover:text-gray-900 transition-colors duration-300">
//                         <div className={`w-2 h-2 rounded-full mr-3 ${
//                           service.gradient.includes('FAB045') ? 'bg-[#FAB045]' : 'bg-[#A0A1A2]'
//                         }`}></div>
//                         {feature}
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//                 <div className="px-8 pb-8">
//                   <button className={`flex items-center font-semibold group-hover:translate-x-2 transition-transform duration-300 ${
//                     service.gradient.includes('FAB045') 
//                       ? 'text-[#FAB045] hover:text-[#e8a035]' 
//                       : 'text-[#A0A1A2] hover:text-gray-800'
//                   }`}>
//                     Learn More
//                     <FaChevronRight className="ml-2 group-hover:ml-4 transition-all duration-300" />
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Enhanced Tracking Section */}
//       <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-50 relative">
//         <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
//           <div className="max-w-4xl mx-auto">
//             <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-200">
//               <div className="text-center mb-12">
//                 <div className="w-20 h-20 bg-gradient-to-r from-[#FAB045] to-[#f8c468] rounded-2xl flex items-center justify-center mx-auto mb-6">
//                   <FaSearch className="text-white text-3xl" />
//                 </div>
//                 <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
//                   Track Your <span className="text-[#FAB045]">Shipment</span>
//                 </h2>
//                 <p className="text-[#A0A1A2] text-lg">
//                   Real-time tracking updates for all your global shipments
//                 </p>
//               </div>

//               <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 rounded-2xl p-8">
//                 <div className="flex flex-col lg:flex-row gap-6">
//                   <div className="flex-1">
//                     <div className="relative">
//                       <div className="absolute left-6 top-1/2 transform -translate-y-1/2">
//                         <FaBoxOpen className="text-[#FAB045] text-xl" />
//                       </div>
//                       <input
//                         type="text"
//                         value={trackingId}
//                         onChange={(e) => setTrackingId(e.target.value)}
//                         placeholder="Enter tracking number (e.g., TRK123456789)"
//                         className="w-full pl-16 pr-6 py-5 rounded-xl bg-white/10 border-2 border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-[#FAB045] text-lg transition-all duration-300"
//                       />
//                     </div>
//                     <p className="text-sm text-gray-400 mt-3 ml-4">Recent: TRK789012345 • SL2024001234</p>
//                   </div>
//                   <button 
//                     onClick={handleTrack}
//                     className="bg-gradient-to-r from-[#FAB045] to-[#f8c468] hover:from-[#e8a035] hover:to-[#e8a035] text-white font-semibold py-5 px-10 rounded-xl text-lg transition-all duration-300 hover:shadow-xl hover:scale-105 flex items-center justify-center whitespace-nowrap"
//                   >
//                     <FaSearch className="mr-3" />
//                     Track Now
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Stats Section */}
//       <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
//             {stats.map((stat, index) => (
//               <div 
//                 key={index} 
//                 className="bg-white rounded-2xl shadow-xl p-8 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-gray-100"
//               >
//                 <div className="w-16 h-16 bg-gradient-to-r from-[#FAB045] to-[#f8c468] rounded-2xl flex items-center justify-center mx-auto mb-6">
//                   <div className="text-white">
//                     {stat.icon}
//                   </div>
//                 </div>
//                 <div className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">{stat.number}</div>
//                 <div className="text-lg font-semibold text-gray-800 mb-1">{stat.label}</div>
//                 <p className="text-[#A0A1A2] text-sm">{stat.description}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Testimonials Section */}
//       <section className="py-20 bg-gradient-to-b from-white to-gray-50">
//         <Testimonials />
//       </section>

//       {/* CTA Section */}
//       <section className="py-20 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
//           <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
//             Ready to Ship?
//           </h2>
//           <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
//             Join thousands of satisfied clients worldwide. Get a quote today!
//           </p>
//           <div className="flex flex-col sm:flex-row gap-6 justify-center">
//             <button className="bg-gradient-to-r from-[#FAB045] to-[#f8c468] hover:from-[#e8a035] hover:to-[#e8a035] text-white font-semibold py-4 px-10 rounded-xl text-lg transition-all duration-300 hover:shadow-xl hover:scale-105">
//               Request Quote
//             </button>
//             <button className="border-2 border-white text-white hover:bg-white/10 font-semibold py-4 px-10 rounded-xl text-lg transition-all duration-300">
//               Contact Sales
//             </button>
//           </div>
//         </div>
//       </section>

//       {/* Enhanced Footer */}
//       <footer className="bg-gradient-to-b from-gray-900 to-black text-white pt-16 pb-8">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
//             <div className="lg:col-span-2">
//               <div className="flex items-center space-x-4 mb-8">
//                 <div className="w-14 h-14 bg-gradient-to-r from-[#FAB045] to-[#f8c468] rounded-2xl flex items-center justify-center">
//                   <FaRoute className="text-white text-2xl" />
//                 </div>
//                 <div>
//                   <h2 className="text-3xl font-bold">SwiftLogistics</h2>
//                   <p className="text-[#A0A1A2] font-medium">Global Delivery </p>
//                 </div>
//               </div>
//               <p className="text-gray-400 max-w-md leading-relaxed">
//                 Delivering excellence across borders with precision, speed, and reliability. 
//                 Your trusted partner for global logistics .
//               </p>
//               <div className="flex space-x-4 mt-8">
//                 <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-[#FAB045] rounded-lg flex items-center justify-center transition-colors duration-300">
//                   <span className="font-semibold">F</span>
//                 </a>
//                 <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-[#FAB045] rounded-lg flex items-center justify-center transition-colors duration-300">
//                   <span className="font-semibold">T</span>
//                 </a>
//                 <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-[#FAB045] rounded-lg flex items-center justify-center transition-colors duration-300">
//                   <span className="font-semibold">L</span>
//                 </a>
//                 <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-[#FAB045] rounded-lg flex items-center justify-center transition-colors duration-300">
//                   <span className="font-semibold">I</span>
//                 </a>
//               </div>
//             </div>
            
//             <div>
//               <h3 className="text-xl font-bold mb-8 flex items-center">
//                 <FaChevronRight className="text-[#FAB045] mr-2" />
//                 Quick Links
//               </h3>
//               <ul className="space-y-4">
//                 {quickLinks.map((link) => (
//                   <li key={link.title}>
//                     <a 
//                       href={link.href} 
//                       className="text-gray-400 hover:text-[#FAB045] transition-colors duration-300 flex items-center"
//                     >
//                       <span className="w-1.5 h-1.5 bg-[#FAB045] rounded-full mr-3 opacity-0 group-hover:opacity-100"></span>
//                       {link.title}
//                     </a>
//                   </li>
//                 ))}
//               </ul>
//             </div>
            
//             <div>
//               <h3 className="text-xl font-bold mb-8 flex items-center">
//                 <FaChevronRight className="text-[#FAB045] mr-2" />
//                 Services
//               </h3>
//               <ul className="space-y-4">
//                 {serviceLinks.map((link) => (
//                   <li key={link.title}>
//                     <a 
//                       href={link.href} 
//                       className="text-gray-400 hover:text-[#FAB045] transition-colors duration-300 flex items-center"
//                     >
//                       <span className="w-1.5 h-1.5 bg-[#A0A1A2] rounded-full mr-3 opacity-0 group-hover:opacity-100"></span>
//                       {link.title}
//                     </a>
//                   </li>
//                 ))}
//               </ul>
//             </div>
            
//             <div>
//               <h3 className="text-xl font-bold mb-8 flex items-center">
//                 <FaChevronRight className="text-[#FAB045] mr-2" />
//                 Contact Us
//               </h3>
//               <ul className="space-y-6 text-gray-400">
//                 <li className="flex items-start">
//                   <FaMapMarkerAlt className="text-[#FAB045] mt-1 mr-4 flex-shrink-0" />
//                   <div>
//                     <p className="font-medium">123 Logistics Street</p>
//                     <p className="text-sm">Global Business District</p>
//                   </div>
//                 </li>
//                 <li className="flex items-center">
//                   <FaPhone className="text-[#FAB045] mr-4" />
//                   +1 (555) 123-4567
//                 </li>
//                 <li className="flex items-center">
//                   <FaEnvelope className="text-[#FAB045] mr-4" />
//                   info@swiftlogistics.com
//                 </li>
//                 <li className="flex items-center">
//                   <FaHeadset className="text-[#FAB045] mr-4" />
//                   24/7 Customer Support
//                 </li>
//               </ul>
//             </div>
//           </div>
          
//           <div className="border-t border-gray-800 pt-8">
//             <div className="flex flex-col md:flex-row justify-between items-center">
//               <p className="text-gray-500 mb-4 md:mb-0">
//                 © 2024 SwiftLogistics. All rights reserved.
//               </p>
//               <div className="flex space-x-6 text-gray-500 text-sm">
//                 <a href="#" className="hover:text-[#FAB045] transition-colors duration-300">Privacy Policy</a>
//                 <a href="#" className="hover:text-[#FAB045] transition-colors duration-300">Terms of Service</a>
//                 <a href="#" className="hover:text-[#FAB045] transition-colors duration-300">Cookie Policy</a>
//                 <a href="#" className="hover:text-[#FAB045] transition-colors duration-300">Sitemap</a>
//               </div>
//             </div>
//           </div>
//         </div>
//       </footer>
//     </div>
//   )
// }
