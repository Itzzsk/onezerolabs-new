'use client'

import { useRef, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

// UI/UX design images for left and right columns
const uiuxDesigns = [
  '/uiux/design1.png',
  '/uiux/Picsart_25-02-08_19-41-54-723.jpg',
  '/uiux/Picsart_24-07-31_14-01-09-597.jpg',
  '/uiux/design4.png',
  '/uiux/u25.jpg',
  '/uiux/Picsart_24-12-27_19-31-24-413.jpg',
]

// Graphic design images for middle column
const graphicDesigns = [
  '/graphicdesigns/Picsart_25-03-16_18-07-44-231.jpg',
  '/graphicdesigns/Picsart_25-03-09_17-30-39-120.jpg',
  '/graphicdesigns/Picsart_24-12-15_18-01-42-142.jpg',
  '/graphicdesigns/Picsart_25-01-04_14-20-24-939.jpg',
  '/graphicdesigns/Picsart_25-02-22_17-57-32-185.jpg',
  '/graphicdesigns/Picsart_25-03-04_16-53-14-678.jpg',
]

export default function CombinedScrollSection() {
  const section1Ref = useRef(null)
  
  // Section 1 scroll progress
  const { scrollYProgress: section1Progress } = useScroll({
    target: section1Ref,
    offset: ['start start', 'end end']
  })

  // Enable smooth scrolling
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth'
    return () => {
      document.documentElement.style.scrollBehavior = 'auto'
    }
  }, [])

  // HARD CUT at the end - text stays until 95% then instantly disappears
  const blur = useTransform(
    section1Progress, 
    [0, 0.05, 0.12, 0.95, 0.951], 
    ['60px', '30px', '0px', '0px', '100px']
  )
  
  const opacity = useTransform(
    section1Progress, 
    [0, 0.05, 0.12, 0.95, 0.951], 
    [0, 0.2, 1, 1, 0]
  )

  // Section 1: Parallax for image columns
  const columnY = useTransform(section1Progress, [0, 1], ['0%', '30%'])

  return (
    <>
      {/* SECTION 1: Image Gallery with Blur Text */}
      <section 
        ref={section1Ref} 
        className="relative bg-black overflow-hidden scroll-smooth"
        style={{ minHeight: '300vh' }}
      >
        {/* Dark gradient background */}
        <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-zinc-900/50 via-zinc-950/80 to-black" />
        
        {/* Three Column Layout */}
        <div className="absolute inset-0 w-full h-full flex flex-row gap-1 sm:gap-2 md:gap-4 lg:gap-6 px-0 sm:px-3 md:px-4 lg:px-7 py-0 sm:py-3 md:py-4 opacity-40">
          
          {/* LEFT COLUMN */}
          <motion.div 
            style={{ y: columnY }}
            className="w-[25%] sm:w-[28%] md:w-[28%] lg:w-[28%] flex flex-col gap-1 sm:gap-3 md:gap-4 lg:gap-6 -ml-[10%] sm:ml-0"
          >
            {uiuxDesigns.slice(0, 3).map((design, index) => (
              <div 
                key={`left-${index}`}
                className="relative bg-gradient-to-br from-gray-800/30 via-gray-900/40 to-zinc-900/50 backdrop-blur-md rounded-md sm:rounded-xl md:rounded-2xl lg:rounded-3xl p-1.5 sm:p-3 md:p-3.5 lg:p-4 border border-gray-700/40 shadow-[0_8px_32px_rgba(0,0,0,0.6)] h-[28vh] sm:h-auto"
              >
                <div className="relative overflow-hidden rounded-sm sm:rounded-lg md:rounded-xl lg:rounded-2xl bg-gradient-to-br from-zinc-900/50 to-black/80 h-full">
                  <img
                    src={design}
                    alt={`UI/UX Design ${index + 1}`}
                    className="w-full h-full object-cover"
                    draggable={false}
                    loading="lazy"
                  />
                </div>
              </div>
            ))}
          </motion.div>

          {/* MIDDLE COLUMN */}
          <motion.div 
            style={{ y: columnY }}
            className="w-[60%] sm:w-[44%] md:w-[44%] lg:w-[44%] flex flex-col gap-2 sm:gap-4 md:gap-6 lg:gap-8 pt-[5%] sm:pt-[6%] md:pt-[8%]"
          >
            {graphicDesigns.map((design, index) => (
              <div 
                key={`middle-${index}`}
                className="relative bg-gradient-to-br from-gray-800/35 via-gray-900/45 to-zinc-900/55 backdrop-blur-md rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-3xl p-2.5 sm:p-4 md:p-5 lg:p-6 border border-gray-700/50 shadow-[0_12px_48px_rgba(0,0,0,0.7)]"
              >
                <div className="relative overflow-hidden rounded-md sm:rounded-lg md:rounded-xl lg:rounded-2xl bg-gradient-to-br from-zinc-900/60 to-black/90">
                  <img
                    src={design}
                    alt={`Graphic Design ${index + 1}`}
                    className="w-full h-auto object-contain"
                    draggable={false}
                    loading="lazy"
                  />
                </div>
              </div>
            ))}
          </motion.div>

          {/* RIGHT COLUMN */}
          <motion.div 
            style={{ y: columnY }}
            className="w-[25%] sm:w-[28%] md:w-[28%] lg:w-[28%] flex flex-col gap-1 sm:gap-3 md:gap-4 lg:gap-6 -mr-[10%] sm:mr-0"
          >
            {uiuxDesigns.slice(3, 6).map((design, index) => (
              <div 
                key={`right-${index}`}
                className="relative bg-gradient-to-br from-gray-800/30 via-gray-900/40 to-zinc-900/50 backdrop-blur-md rounded-md sm:rounded-xl md:rounded-2xl lg:rounded-3xl p-1.5 sm:p-3 md:p-3.5 lg:p-4 border border-gray-700/40 shadow-[0_8px_32px_rgba(0,0,0,0.6)] h-[28vh] sm:h-auto"
              >
                <div className="relative overflow-hidden rounded-sm sm:rounded-lg md:rounded-xl lg:rounded-2xl bg-gradient-to-br from-zinc-900/50 to-black/80 h-full">
                  <img
                    src={design}
                    alt={`UI/UX Design ${index + 4}`}
                    className="w-full h-full object-cover"
                    draggable={false}
                    loading="lazy"
                  />
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/80 pointer-events-none" />

        {/* Centered Text - HARD CUT at end */}
        <div className="fixed top-0 left-0 right-0 h-screen flex items-center justify-center pointer-events-none z-[100] px-4 sm:px-6 md:px-8">
          <motion.div
            style={{ 
              opacity,
              filter: useTransform(blur, (value) => `blur(${value})`)
            }}
            transition={{
              duration: 0.1,
              ease: "linear"
            }}
            className="relative text-white text-center"
          >
            <h2 
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold font-poppins whitespace-nowrap"
              style={{
                color: '#ffffff',
                letterSpacing: '-0.02em',
                lineHeight: '1.2'
              }}
            >
              Launching the next generation
            </h2>
            
            <h2 
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold font-poppins whitespace-nowrap mt-2 sm:mt-3 md:mt-4"
              style={{
                color: '#ffffff',
                letterSpacing: '-0.02em',
                lineHeight: '1.2'
              }}
            >
              of Intelligent Experiences.
            </h2>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: With solid black background behind content */}
      <section 
        className="relative min-h-screen bg-black overflow-hidden"
      >
        {/* Solid black background layer */}
        <div className="absolute inset-0 bg-black z-0" />

        {/* Content wrapper */}
        <div className="relative z-10 min-h-screen flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-24 py-20">
          
          {/* Single 3D Rotating Circle */}
          <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 flex-shrink-0 cursor-pointer order-1 lg:order-2">
            <div className="relative w-full h-full">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 via-gray-300/15 to-gray-500/20 shadow-2xl backdrop-blur-sm">
                <div className="absolute inset-4 bg-gradient-to-br from-white/30 to-transparent rounded-full blur-sm"></div>
              </div>
              
              <motion.div
                className="absolute inset-8 rounded-full border-2 border-white/30"
                animate={{
                  rotate: 360,
                  scale: [1, 1.05, 1]
                }}
                transition={{
                  rotate: { duration: 8, repeat: Infinity, ease: "linear" },
                  scale: { duration: 3, repeat: Infinity }
                }}
              />
              
              <motion.div 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full"
                style={{
                  background: 'radial-gradient(circle, rgba(255, 255, 255, 0.9) 0%, rgba(200, 200, 200, 0.5) 40%, transparent 70%)',
                  filter: 'blur(8px)'
                }}
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.6, 1, 0.6],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity
                }}
              />
            </div>
          </div>

          {/* Text content */}
          <div className="relative z-10 flex-1 order-2 lg:order-1">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold leading-tight font-poppins text-white">
              We design systems that evolve,
            </h2>
            
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold leading-tight mt-2 sm:mt-3 font-poppins text-white">
              brands that adapt, and
            </h2>
            
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold leading-tight mt-2 sm:mt-3 font-poppins text-white">
              experiences that endure.
            </h2>
          </div>

          {/* Background ambient lights */}
          <div className="absolute top-1/2 right-1/4 w-48 h-48 sm:w-64 sm:h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/3 w-40 h-40 sm:w-56 sm:h-56 bg-gray-300/5 rounded-full blur-3xl"></div>
        </div>
      </section>
    </>
  )
}
