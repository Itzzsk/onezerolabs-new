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
  
  const descOpacity = useTransform(scrollYProgress, [0.15, 0.25, 0.55, 0.7], [0, 1, 1, 0])
  const descScale = useTransform(scrollYProgress, [0.15, 0.25], [0.95, 1])
  const buttonOpacity = useTransform(scrollYProgress, [0.15, 0.25, 0.55, 0.7], [0, 1, 1, 0])
  const buttonScale = useTransform(scrollYProgress, [0.15, 0.25], [0.95, 1])
  
  // Background fade in AND fade out - returns to normal
  const bgOpacity = useTransform(scrollYProgress, [0, 0.1, 0.85, 1], [0, 1, 1, 0])

  const handleMouseMove = (e) => {
    setMousePosition({
      x: e.clientX,
      y: e.clientY
    })
  }

  return (
    <>
      {/* Section container with background image */}
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
        {/* Background with fade in AND fade out */}
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

          {/* Title */}
          <div className="absolute inset-0 flex items-center justify-start px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24 pointer-events-none">
            <motion.div
              style={{
                y: titleY,
                opacity: titleOpacity,
                scale: titleScale
              }}
            >
              <motion.p 
                className="text-purple-500 text-xs sm:text-sm md:text-base lg:text-lg font-bold font-poppins mb-2 sm:mb-3 md:mb-4 lg:mb-6 tracking-wider"
              >
                01
              </motion.p>
              
              <h2 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl 2xl:text-[10rem] font-bold leading-[0.9] text-white font-poppins max-w-6xl">
                Full-Stack
                <br />
                Development
              </h2>
            </motion.div>
          </div>

          {/* Description */}
          <motion.div
            style={{
              opacity: descOpacity,
              scale: descScale
            }}
            className="fixed bottom-[25vh] sm:bottom-[22vh] md:bottom-[20vh] left-4 sm:left-6 md:left-8 lg:left-12 xl:left-16 2xl:left-24 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-xl z-50 pointer-events-none"
          >
            <p className="text-white/80 text-xs sm:text-sm md:text-base lg:text-lg font-poppins leading-relaxed">
              Driving AI transformation for products, platforms, and people.
            </p>
          </motion.div>

          {/* Button */}
          <motion.div
            style={{
              opacity: buttonOpacity,
              scale: buttonScale
            }}
            className="fixed bottom-[12vh] sm:bottom-[11vh] md:bottom-[10vh] left-4 sm:left-6 md:left-8 lg:left-12 xl:left-16 2xl:left-24 z-50 pointer-events-auto"
          >
            <button className="group relative px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 lg:px-8 lg:py-4 bg-white/10 backdrop-blur-md border border-white/30 rounded-full text-white font-poppins text-xs sm:text-sm md:text-base lg:text-lg hover:bg-white/20 hover:border-white/50 transition-all duration-300 flex items-center gap-2">
              Explore
              <svg 
                className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 lg:w-5 lg:h-5 group-hover:translate-x-1 transition-transform" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </motion.div>

        </div>
      </section>
    </>
  )
}
