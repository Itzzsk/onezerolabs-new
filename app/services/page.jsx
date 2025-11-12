'use client'

import Services from './service'

import ServicesSection from '@/components/ServicesSection'
import ServicesSectionTwo from '@/components/ServicesSectionTwo'
import ServicesSectionThree from '@/components/ServicesSectionThree'
import ContactSection from '@/components/ContactSection'
export default function ServicesPage() {
  return (
    <main className="relative bg-black overflow-x-hidden">
      {/* Services Grid */}
      <Services />

      {/* Contact Section - Half Screen */}


      {/* Service Sections Flow */}
      <div className="relative z-10">
        <ServicesSection />
        <ServicesSectionTwo />
        <ServicesSectionThree />
        <ContactSection />
      </div>
  
    </main>
  )
}