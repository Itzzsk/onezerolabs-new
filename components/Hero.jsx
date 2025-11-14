'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import dynamic from 'next/dynamic'
import './stars.css'

const Earth3D = dynamic(() => import('./Earth3D'), {
  ssr: false,
  loading: () => null,
})

function throttle(callback, limit) {
  let wait = false
  return (...args) => {
    if (!wait) {
      callback(...args)
      wait = true
      setTimeout(() => (wait = false), limit)
    }
  }
}

export default function Hero() {
  const [mounted, setMounted] = useState(false)
  const [earthLoaded, setEarthLoaded] = useState(false)
  const shouldReduceMotion = useReducedMotion()
  const [manualRotation, setManualRotation] = useState(0)
  const isInteracting = useRef(false)
  const lastPointerX = useRef(0)
  const currentRotation = useRef(0)

  useEffect(() => {
    setMounted(true)
    const timeout = setTimeout(() => setEarthLoaded(true), 100)
    return () => clearTimeout(timeout)
  }, [])

  const throttledSetRotation = useCallback(
    throttle((angle) => {
      setManualRotation(angle)
      currentRotation.current = angle
    }, 16),
    []
  )

  const handlePointerDown = useCallback((e) => {
    e.preventDefault()
    isInteracting.current = true
    lastPointerX.current = e.touches ? e.touches[0].clientX : e.clientX
  }, [])

  const handlePointerMove = useCallback((e) => {
    if (!isInteracting.current) return
    e.preventDefault()
    const currentX = e.touches ? e.touches[0].clientX : e.clientX
    const deltaX = currentX - lastPointerX.current
    const rotDelta = (deltaX / window.innerWidth) * 180
    currentRotation.current += rotDelta
    throttledSetRotation(currentRotation.current)
    lastPointerX.current = currentX
  }, [throttledSetRotation])

  const handlePointerUp = useCallback((e) => {
    e.preventDefault()
    isInteracting.current = false
  }, [])

  // Memoize background stars to prevent recalculation on every render
  const backgroundStars = useMemo(() => {
    const count = shouldReduceMotion ? 40 : 80
    return Array.from({ length: count }, (_, i) => ({
      id: `star-bg-${i}`,
      size: Math.random() * 3 + 1,
      top: Math.random() * 100,
      duration: 20 + Math.random() * 30,
      delay: Math.random() * -50,
    }))
  }, [shouldReduceMotion])

  // Memoize orbiting stars to prevent recalculation
  const orbitingStars = useMemo(() => {
    const count = shouldReduceMotion ? 25 : 50
    return Array.from({ length: count }, (_, i) => ({
      id: `orbit-star-${i}`,
      size: Math.random() * 3 + 2,
      orbitRadius: 35 + Math.random() * 15,
      startAngle: (i / count) * 360,
      duration: 30 + Math.random() * 20,
      delay: (i / count) * -50,
    }))
  }, [shouldReduceMotion])

  return (
    <section className="relative w-full h-screen bg-black overflow-hidden flex flex-col justify-center items-center select-none">
      {/* Background stars moving left */}
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

      {/* Earth container */}
      <div
        className="absolute bottom-0 left-0 right-0 z-20 overflow-hidden cursor-grab active:cursor-grabbing"
        style={{ height: '55vh' }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      >
        {/* Circular rotating stars BEHIND Earth */}
        {mounted && (
          <div
            className="absolute left-1/2 bottom-[20%] w-[180vw] aspect-square -translate-x-1/2 z-0 rotating-stars-ring"
            aria-hidden="true"
          >
            {orbitingStars.map((star) => (
              <div
                key={star.id}
                className="rotating-star"
                style={{
                  '--orbit-radius': `${star.orbitRadius}%`,
                  '--start-angle': `${star.startAngle}deg`,
                  '--duration': `${star.duration}s`,
                  width: `${star.size}px`,
                  height: `${star.size}px`,
                  animationDelay: `${star.delay}s`,
                }}
              />
            ))}
          </div>
        )}

        {/* Earth - in FRONT of rotating stars */}
        <div
          className="absolute left-1/2 bottom-0 aspect-square z-10"
          style={{
            width: '200vw',
            transform: 'translateX(-50%) translateY(65%)',
          }}
        >
          {mounted && earthLoaded && (
            <Earth3D manualRotation={manualRotation} autoRotate={!isInteracting.current} />
          )}
        </div>

        {/* Gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-40 sm:h-48 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none z-30" />
      </div>

      {/* Fullscreen button */}
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
        title="Fullscreen"
      >
        <svg
          className="w-5 h-5 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
          />
        </svg>
      </motion.button>
    </section>
  )
}
