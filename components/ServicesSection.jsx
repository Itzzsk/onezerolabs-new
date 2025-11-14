'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function ServicesSection() {
  const containerRef = useRef(null)
  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  const [hover, setHover] = useState(false)
  const [mounted, setMounted] = useState(false)

  // ⭐ Prevents hydration mismatch
  const [stars, setStars] = useState([])

  useEffect(() => {
    setMounted(true)

    // ⭐ Generate stars ONLY on client
    const generatedStars = Array.from({ length: 100 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 70,
      size: Math.random() * 2 + 1,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 2,
    }))

    setStars(generatedStars)
  }, [])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  // Smooth motion transforms
  const titleY = useTransform(scrollYProgress, [0, 0.4, 0.7], ['50vh', '0vh', '-100vh'])
  const titleOpacity = useTransform(scrollYProgress, [0, 0.15, 0.6, 0.75], [0, 1, 1, 0])
  const descOpacity = useTransform(scrollYProgress, [0.15, 0.3, 0.6, 0.75], [0, 1, 1, 0])
  const buttonOpacity = useTransform(scrollYProgress, [0.2, 0.3, 0.6, 0.8], [0, 1, 1, 0])
  const heroOpacity = useTransform(scrollYProgress, [0.1, 0.3, 0.6, 0.8], [0, 1, 1, 0])
  const astroOpacity = useTransform(scrollYProgress, [0.15, 0.3, 0.7, 0.8], [0, 1, 1, 0])

  const handleMove = (e) => setMouse({ x: e.clientX, y: e.clientY })

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-[200vh] bg-black overflow-hidden z-30"
      onMouseMove={handleMove}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {/* BACKGROUND STARS (SSR-SAFE) */}
      <div className="absolute inset-0 z-0 bg-black">
        {stars.map((star) => (
          <motion.div
            key={star.id}
            className="absolute rounded-full bg-white"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
            }}
            animate={{ opacity: [0.1, 0.4, 0.1] }}
            transition={{
              duration: star.duration,
              repeat: Infinity,
              delay: star.delay,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* FLOATING ASTRONAUT */}
      <motion.div
        className="absolute right-[4%] bottom-[10%] w-[140px] sm:w-[200px] md:w-[240px] lg:w-[280px] pointer-events-none z-20"
        style={{ opacity: astroOpacity }}
        animate={{ y: [0, -20, 0], rotate: [-2, 2, -2] }}
        transition={{
          y: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
          rotate: { duration: 5, repeat: Infinity, ease: 'easeInOut' },
        }}
      >
        <img
          src="/astro.png"
          alt="Astronaut"
          className="w-full object-contain"
          style={{ filter: 'drop-shadow(0 20px 40px rgba(0,220,200,0.2))' }}
        />
      </motion.div>

      {/* VIEW CURSOR */}
      {hover && (
        <motion.div
          className="fixed pointer-events-none z-[9999]"
          style={{
            left: `${mouse.x}px`,
            top: `${mouse.y - 50}px`,
            transform: 'translateX(-50%)',
          }}
          animate={{ opacity: 1, scale: [0.9, 1] }}
          transition={{ duration: 0.1 }}
        >
          <div className="bg-[#0f172a]/80 backdrop-blur-md text-cyan-300 px-5 py-2 rounded-xl text-sm shadow-2xl border border-cyan-400/40">
            VIEW
          </div>
        </motion.div>
      )}

      {/* SCROLL-DRIVEN CONTENT */}
      <div className="sticky top-0 w-full h-screen overflow-visible z-30">
        {/* Main Title */}
        <motion.div
          className="absolute inset-0 flex items-center justify-start px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32"
          style={{ y: titleY, opacity: titleOpacity }}
        >
          <div className="max-w-[60%]">
            <motion.p className="text-cyan-400 text-xs sm:text-sm font-bold tracking-widest mb-2 sm:mb-4">
              01
            </motion.p>

            <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[0.9] text-white">
              Full-Stack
              <br />
              Development
            </h2>
          </div>
        </motion.div>

        {/* Description */}
        <motion.div
          style={{ opacity: descOpacity }}
          className="fixed bottom-[22vh] sm:bottom-[24vh] left-4 sm:left-8 md:left-16 lg:left-24 xl:left-32 max-w-[90%] sm:max-w-md md:max-w-lg"
        >
          <p className="text-white/80 text-sm sm:text-base md:text-lg leading-relaxed">
            We architect robust, scalable, and seamless full-stack systems that bridge innovation and performance — from backend APIs to futuristic UI.
          </p>
        </motion.div>

        {/* Explore Button */}
        <motion.div
          style={{ opacity: buttonOpacity }}
          className="fixed bottom-[10vh] sm:bottom-[12vh] left-4 sm:left-8 md:left-16 lg:left-24 xl:left-32"
        >
          <button className="group px-5 py-2.5 sm:px-6 sm:py-3 bg-cyan-500/10 backdrop-blur-xl border border-cyan-400/30 rounded-full text-white font-medium text-xs sm:text-sm md:text-base flex items-center gap-2 hover:bg-cyan-400/20 hover:border-cyan-300 transition-all duration-300">
            Explore
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform"
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
  )
}
