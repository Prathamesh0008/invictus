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


