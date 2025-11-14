'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import './stars.css'

const Earth3D = dynamic(() => import('./Earth3D'), {
  ssr: false,
  loading: () => null,
})

export default function Hero() {
  const [mounted, setMounted] = useState(false)
  const [earthLoaded, setEarthLoaded] = useState(false)
  const shouldReduceMotion = useReducedMotion()

  // Prevent SSR/CSR mismatch
  const [backgroundStars, setBgStars] = useState([])
  const [orbitingStars, setOrbitStars] = useState([])

  useEffect(() => {
    setMounted(true)

    // Load Earth slightly later (avoids white flash)
    const timeout = setTimeout(() => setEarthLoaded(true), 150)

    // Generate stars ONLY on client
    const bgCount = shouldReduceMotion ? 40 : 80
    const orbitCount = shouldReduceMotion ? 25 : 50

    setBgStars(
      Array.from({ length: bgCount }, (_, i) => ({
        id: `bg-${i}`,
        size: Math.random() * 3 + 1,
        top: Math.random() * 100,
        duration: 20 + Math.random() * 30,
        delay: Math.random() * -50,
      }))
    )

    setOrbitStars(
      Array.from({ length: orbitCount }, (_, i) => ({
        id: `orbit-${i}`,
        size: Math.random() * 3 + 2,
        radius: 35 + Math.random() * 15,
        angle: (i / orbitCount) * 360,
        duration: 30 + Math.random() * 20,
        delay: (i / orbitCount) * -50,
      }))
    )

    return () => clearTimeout(timeout)
  }, [shouldReduceMotion])

  return (
    <section className="relative w-full h-screen bg-black overflow-hidden flex flex-col justify-center items-center select-none">

      {/* Background stars */}
      {mounted && (
        <div className="absolute inset-0 z-0 stars-container" aria-hidden="true">
          {backgroundStars.map((star) => (
            <div
              key={star.id}
              className="moving-star"
              style={{
                width: `${star.size}px`,
                height: `${star.size}px`,
                top: `${star.top}%`,
                animationDuration: `${star.duration}s`,
                animationDelay: `${star.delay}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* Text content */}
      <div
        className="relative z-30 flex flex-col items-center text-center px-6 mb-24"
        style={{ transform: 'translateY(-15%)' }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-[2.4rem] sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-white tracking-wider mb-6 leading-tight">
            ONEZEROLABS
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-gray-300 text-base sm:text-lg md:text-2xl font-semibold mb-5 max-w-3xl"
          >
            Your Creative Partner for Design, Development and Growth.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-gray-400 text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed"
          >
            We craft modern Websites, intuitive Designs, and scalable Digital Solutions that help Businesses grow, engage, and stand out.
          </motion.p>
        </motion.div>
      </div>

      {/* Earth + rotating star ring */}
      <div className="absolute bottom-0 left-0 right-0 z-20 overflow-hidden" style={{ height: '55vh' }}>

        {/* Rotating stars behind Earth */}
        {mounted && (
          <div className="earth-stars-ring absolute left-1/2 bottom-[20%] w-[160vw] aspect-square -translate-x-1/2 z-0">
            {orbitingStars.map((star) => (
              <div
                key={star.id}
                className="orbit-star"
                style={{
                  '--radius': `${star.radius}%`,
                  '--angle': `${star.angle}deg`,
                  '--duration': `${star.duration}s`,
                  width: `${star.size}px`,
                  height: `${star.size}px`,
                  animationDelay: `${star.delay}s`,
                }}
              />
            ))}
          </div>
        )}

        {/* Earth */}
        <div
          className="
            absolute left-1/2 bottom-0 aspect-square z-10
            translate-x-[-50%]

            translate-y-[48%]      /* mobile */
            sm:translate-y-[58%]   /* tablet */
            md:translate-y-[60%]   /* medium */
            lg:translate-y-[62%]   /* desktop */
          "
          style={{
            width: '180vw',
          }}
        >
          {mounted && earthLoaded && <Earth3D autoRotate={true} />}
        </div>

        {/* Gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-40 sm:h-48 bg-gradient-to-t from-black via-black/40 to-transparent z-30" />
      </div>

      {/* Fullscreen Button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        onClick={() => {
          if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen()
          } else {
            document.exitFullscreen()
          }
        }}
        className="fixed bottom-5 right-5 z-40 p-3 bg-white/10 backdrop-blur-xl border border-white/30 rounded-lg hover:bg-white/20 transition-all"
      >
        <svg
          className="w-5 h-5 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
        </svg>
      </motion.button>
    </section>
  )
}
