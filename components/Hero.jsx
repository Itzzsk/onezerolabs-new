'use client'

import { motion } from 'framer-motion'
import { useState, useEffect, useMemo, useCallback } from 'react'
import dynamic from 'next/dynamic'

const Earth3D = dynamic(() => import('./Earth3D'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center w-full h-full">
      <div className="text-cyan-400 text-sm">Loading Earth...</div>
    </div>
  ),
})

export default function Hero() {
  const [mounted, setMounted] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [manualRotation, setManualRotation] = useState(0)

  useEffect(() => setMounted(true), [])

  const handleMouseMove = useCallback(
    (e) => {
      if (!isHovering) return
      const rect = e.currentTarget.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width
      setManualRotation((x - 0.5) * 360)
    },
    [isHovering]
  )

  const handleMouseEnter = useCallback(() => setIsHovering(true), [])

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false)
    setManualRotation(0)
  }, [])

  // Background stars
  const backgroundStars = useMemo(
    () =>
      Array.from({ length: 50 }).map((_, i) => ({
        id: `bg-${i}`,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.7 + 0.3,
        duration: Math.random() * 4 + 3,
      })),
    []
  )

  // Stars near Earth left/right
  const earthSideStars = useMemo(() =>
    Array.from({ length: 10 }).map((_, i) => ({
      id: `side-${i}`,
      left: i < 5 ? Math.random() * 10 + 5 : 85 + Math.random() * 10, // Left 5%, Right 5%
      top: Math.random() * 50 + 25,
      size: Math.random() * 2 + 1,
      color: Math.random() < 0.5 ? '#bfbfbf' : '#ffffff',
      opacity: Math.random() * 0.9 + 0.1,
      duration: Math.random() * 4 + 3,
    })),
    []
  )

  // Earth stars (bottom area)
  const earthStars = useMemo(
    () =>
      Array.from({ length: 30 }).map((_, i) => ({
        id: `earth-${i}`,
        left: Math.random() * 100,
        top: Math.random() * 25 + 70,
        size: Math.random() * 2 + 0.8,
        color: Math.random() < 0.3 ? '#bfbfbf' : '#ffffff',
        opacity: Math.random() * 0.8 + 0.4,
        duration: Math.random() * 5 + 3,
      })),
    []
  )

  return (
    <section className="relative w-full h-screen bg-black overflow-hidden flex flex-col justify-center items-center select-none">
      {/* Background Stars */}
      {mounted && (
        <div className="absolute inset-0 z-0 will-change-transform">
          {backgroundStars.map((star) => (
            <motion.div
              key={star.id}
              className="absolute rounded-full bg-white"
              style={{
                left: `${star.left}%`,
                top: `${star.top}%`,
                width: `${star.size}px`,
                height: `${star.size}px`,
                filter: `drop-shadow(0 0 2px rgba(255,255,255,${star.opacity}))`,
              }}
              animate={{ opacity: [star.opacity * 0.3, star.opacity, star.opacity * 0.3] }}
              transition={{ duration: star.duration, repeat: Infinity, ease: 'easeInOut' }}
            />
          ))}
        </div>
      )}

      {/* Text Content shifted up 2% */}
      <div
        className="relative z-30 flex flex-col items-center justify-center max-w-5xl text-center px-6 mb-24"
        style={{ transform: 'translateY(-15%)' }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          style={{ willChange: 'transform, opacity' }}
        >
          <h1 className="text-[2.4rem] sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-white tracking-wider mb-6 leading-tight">
            ONEZEROLABS
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-gray-300 text-base sm:text-lg md:text-2xl font-semibold max-w-3xl mx-auto mb-5"
            style={{ willChange: 'transform, opacity' }}
          >
            Your Creative Partner for Design, Development and Growth.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-gray-400 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
            style={{ willChange: 'transform, opacity' }}
          >
            We craft modern Websites, intuitive Designs, and scalable Digital Solutions that help Businesses grow, engage, and stand out.
          </motion.p>
        </motion.div>
      </div>

      {/* Earth + Earth Stars */}
      <div
        className="absolute bottom-0 left-0 right-0 z-20 pointer-events-auto overflow-hidden"
        style={{ height: '55vh' }}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Earth Side Stars */}
        {mounted && (
          <div className="absolute inset-0 z-10">
            {earthSideStars.map((star) => (
              <motion.div
                key={star.id}
                className="absolute rounded-full"
                style={{
                  left: `${star.left}%`,
                  top: `${star.top}%`,
                  width: `${star.size}px`,
                  height: `${star.size}px`,
                  background: star.color,
                  boxShadow: `0 0 ${star.size * 2}px ${star.color}`,
                }}
                animate={{ opacity: [star.opacity * 0.4, star.opacity, star.opacity * 0.4] }}
                transition={{ duration: star.duration, repeat: Infinity, ease: 'easeInOut' }}
              />
            ))}
          </div>
        )}

        {/* Earth Stars */}
        {mounted && (
          <div className="absolute inset-0 z-10 will-change-transform">
            {earthStars.map((star) => (
              <motion.div
                key={star.id}
                className="absolute rounded-full"
                style={{
                  left: `${star.left}%`,
                  top: `${star.top}%`,
                  width: `${star.size}px`,
                  height: `${star.size}px`,
                  background: star.color,
                  boxShadow: `0 0 ${star.size * 2}px ${star.color}`,
                }}
                animate={{ opacity: [star.opacity * 0.4, star.opacity, star.opacity * 0.4] }}
                transition={{ duration: star.duration, repeat: Infinity, ease: 'easeInOut' }}
              />
            ))}
          </div>
        )}

        {/* Earth 3D Component */}
        <div
          className="absolute left-1/2 bottom-0 aspect-square will-change-transform"
          style={{
            width: '350vw',
            maxWidth: '4000px',
            transform: 'translateX(-50%) translateY(62%)',
          }}
        >
          {mounted && (
            <Earth3D manualRotation={manualRotation} autoRotate={!isHovering} />
          )}
        </div>

        {/* Gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-40 sm:h-48 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none z-30" />
      </div>

      {/* Fullscreen Button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="fixed bottom-5 right-5 sm:bottom-8 sm:right-8 z-40 p-2.5 sm:p-3 bg-white/10 backdrop-blur-xl border border-white/30 rounded-lg hover:bg-white/20 transition-all"
        title="Fullscreen"
      >
        <svg
          className="w-4 h-4 sm:w-5 sm:h-5 text-white"
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
