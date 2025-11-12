'use client'

import { useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function ServicesSection() {
  const containerRef = useRef(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  })

  const titleY = useTransform(scrollYProgress, [0, 0.4, 0.7], ['50vh', '0vh', '-120vh'])
  const titleOpacity = useTransform(scrollYProgress, [0, 0.15, 0.6, 0.75], [0, 1, 1, 0])
  const titleScale = useTransform(scrollYProgress, [0, 0.15, 0.6], [0.8, 1, 1])
  
  // Background fade in/out - ONLY for background
  const bgOpacity = useTransform(scrollYProgress, [0, 0.1, 0.85, 1], [0, 1, 1, 0])

  const handleMouseMove = (e) => {
    setMousePosition({
      x: e.clientX,
      y: e.clientY
    })
  }

  return (
    <>
      {/* Section container */}
      <section 
        ref={containerRef} 
        className="relative w-full z-30"
        style={{ 
          height: '200vh', 
          minHeight: '200vh'
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {/* Background with fade in/out - SEPARATE from content */}
        <motion.div
          className="fixed top-0 left-0 w-full h-screen pointer-events-none z-0"
          style={{
            backgroundImage: 'url(/bg.jpeg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'fixed',
            opacity: bgOpacity
          }}
        />

        {/* Custom VIEW button */}
        {isHovering && (
          <motion.div
            className="fixed pointer-events-none z-[9999]"
            style={{
              left: `${mousePosition.x}px`,
              top: `${mousePosition.y - 60}px`,
              transform: 'translateX(-50%)',
            }}
            animate={{
              opacity: 1,
            }}
            transition={{ 
              duration: 0.1,
              type: 'tween'
            }}
          >
            <div className="bg-gray-800/90 backdrop-blur-sm text-white px-5 py-2.5 rounded-lg font-poppins font-medium text-sm shadow-2xl whitespace-nowrap">
              VIEW
            </div>
          </motion.div>
        )}

        {/* Sticky content wrapper */}
        <div className="sticky top-0 w-full h-screen overflow-visible z-50 relative">

          {/* Title - POSITIONED ABOVE BOTTOM (NOT AT ABSOLUTE BOTTOM) */}
          <div className="absolute left-0 right-0 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24 pointer-events-none" style={{ bottom: '15vh' }}>
            <motion.div
              style={{
                y: titleY,
                opacity: titleOpacity,
                scale: titleScale
              }}
            >
              <h2 className="text-7xl xs:text-8xl sm:text-9xl md:text-[8rem] lg:text-[10rem] xl:text-[12rem] 2xl:text-[15rem] font-bold leading-[0.85] text-white font-poppins max-w-7xl">
                Services
              </h2>
            </motion.div>
          </div>

        </div>
      </section>
    </>
  )
}
