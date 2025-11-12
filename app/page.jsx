'use client'

import { useRef } from 'react'
import { useScroll } from 'framer-motion'

// 🪐 Components
import Hero from '../components/Hero'
import ScrollBlurTextAppearSection from '../components/ScrollBlurTextAppearSection'
import ServicesSection from '@/components/ServicesSection'
import ServicesSectionTwo from '@/components/ServicesSectionTwo'
import ServicesSectionThree from '@/components/ServicesSectionThree'
import ServicesGrid from '@/components/ServicesGrid'
import ContactSection from '@/components/ContactSection'
import FeaturedProjects from '../components/FeaturedProjects'
import Stats from '../components/Stats'
import SkillShowcase from '../components/SkillShowcase'
import Testimonials from '../components/Testimonials'

export default function Home() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  return (
    <main ref={containerRef} className="relative bg-black overflow-x-hidden">
      
      {/* ======================= 🌍 HERO SECTION ======================= */}
      <Hero />

      {/* ======================= 🪄 TEXT + IMAGE GALLERY ======================= */}
      <ScrollBlurTextAppearSection />

      {/* ======================= ⚡ SERVICES FLOW ======================= */}
      <div className="relative z-10">
        <ServicesSection />
        <ServicesSectionTwo />
        <ServicesSectionThree />
      </div>

      {/* Divider Line */}
      <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent my-8"></div>

      {/* ======================= 💼 SERVICES GRID ======================= */}
      <ServicesGrid />

      {/* ======================= ✉️ CONTACT SECTION ======================= */}
      <ContactSection />

      {/* Divider Line */}
      <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent my-8"></div>

      {/* ======================= 🚀 FEATURED PROJECTS ======================= */}
      <FeaturedProjects />

      {/* ======================= 📊 COMPANY STATS ======================= */}
      <Stats />

      {/* ======================= 🧠 SKILL SHOWCASE ======================= */}
      <SkillShowcase />

      {/* ======================= 💬 TESTIMONIALS ======================= */}
      <Testimonials />
    </main>
  )
}