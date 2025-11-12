'use client'

import { useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function ServicesSection() {
  const containerRef = useRef(null)
  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  const [hover, setHover] = useState(false)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  })

  // Animations
  const titleY = useTransform(scrollYProgress, [0, 0.4, 0.7], ['50vh', '0vh', '-100vh'])
  const titleOpacity = useTransform(scrollYProgress, [0, 0.15, 0.6, 0.75], [0, 1, 1, 0])
  const descOpacity = useTransform(scrollYProgress, [0.15, 0.3, 0.6, 0.75], [0, 1, 1, 0])
  const buttonOpacity = useTransform(scrollYProgress, [0.2, 0.3, 0.6, 0.8], [0, 1, 1, 0])
  const bgOpacity = useTransform(scrollYProgress, [0, 0.15, 0.8, 1], [0, 1, 1, 0])
  const heroOpacity = useTransform(scrollYProgress, [0.1, 0.3, 0.6, 0.8], [0, 1, 1, 0])
  const astroOpacity = useTransform(scrollYProgress, [0.15, 0.3, 0.7, 0.8], [0, 1, 1, 0])

  const handleMove = (e) => setMouse({ x: e.clientX, y: e.clientY })

  const stars = Array.from({ length: 100 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 70,
    size: Math.random() * 2 + 1,
    duration: Math.random() * 3 + 2,
    delay: Math.random() * 2
  }))

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-[200vh] z-30 overflow-hidden"
      onMouseMove={handleMove}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {/* 🌌 Deep Space Background */}
      <motion.div
        className="fixed top-0 left-0 w-full h-screen z-0 overflow-hidden"
        style={{
          background: 'radial-gradient(circle at 50% 20%, #000000 0%, #050505 50%, #0a0a0a 100%)',
          opacity: bgOpacity
        }}
      >
        {/* Stars */}
        {stars.map(star => (
          <motion.div
            key={star.id}
            className="absolute rounded-full bg-white"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              boxShadow: '0 0 6px 2px rgba(255,255,255,0.3)'
            }}
            animate={{ opacity: [0.2, 1, 0.2] }}
            transition={{
              duration: star.duration,
              repeat: Infinity,
              delay: star.delay,
              ease: 'easeInOut'
            }}
          />
        ))}

        {/* Subtle Cyan-Green Nebula */}
        <motion.div
          className="absolute inset-0 mix-blend-screen opacity-50"
          animate={{
            background: [
              'radial-gradient(circle at 25% 30%, rgba(0,200,150,0.08), transparent 60%)',
              'radial-gradient(circle at 70% 70%, rgba(0,220,200,0.08), transparent 60%)'
            ]
          }}
          transition={{ duration: 10, repeat: Infinity, repeatType: 'reverse' }}
        />
      </motion.div>

      {/* 🖥 Full-Stack Image */}
      <motion.div
        className="fixed right-0 sm:right-[5%] md:right-[8%] lg:right-[10%] top-1/2 -translate-y-1/2 z-20 pointer-events-none"
        style={{ opacity: heroOpacity }}
      >
        <motion.div
          className="relative w-[200px] sm:w-[350px] md:w-[450px] lg:w-[550px] xl:w-[650px] aspect-[16/10] bg-white/5 backdrop-blur-2xl rounded-l-2xl sm:rounded-3xl border-l border-y sm:border border-white/10 shadow-[0_0_40px_rgba(0,220,200,0.15)] overflow-hidden"
          animate={{
            y: [0, -10, 0],
            rotateY: [0, 5, 0],
            rotateX: [0, -3, 0]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        >
          <img
            src="/full.jpeg"
            alt="Full Stack Development"
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-[rgba(0,220,200,0.08)]" />
        </motion.div>
      </motion.div>

      {/* 👩‍🚀 Astronaut */}
      <motion.div
        className="fixed right-[2%] sm:right-[4%] md:right-[6%] bottom-[8%] sm:bottom-[10%] w-[120px] sm:w-[180px] md:w-[220px] lg:w-[280px] pointer-events-none z-40"
        style={{ opacity: astroOpacity }}
        animate={{
          y: [0, -20, 0],
          rotate: [-2, 2, -2],
        }}
        transition={{
          y: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
          rotate: { duration: 5, repeat: Infinity, ease: 'easeInOut' }
        }}
      >
        <img
          src="/astro.png"
          alt="Astronaut"
          className="w-full object-contain"
          style={{
            filter: 'drop-shadow(0 20px 40px rgba(0,220,200,0.2))'
          }}
        />
      </motion.div>

      {/* 🖱 Floating VIEW Cursor */}
      {hover && (
        <motion.div
          className="fixed pointer-events-none z-[9999]"
          style={{
            left: `${mouse.x}px`,
            top: `${mouse.y - 50}px`,
            transform: 'translateX(-50%)'
          }}
          animate={{ opacity: 1, scale: [0.9, 1] }}
          transition={{ duration: 0.1 }}
        >
          <div className="bg-[#0f172a]/80 backdrop-blur-md text-cyan-300 px-5 py-2 rounded-xl font-poppins text-sm shadow-2xl border border-cyan-400/40">
            VIEW
          </div>
        </motion.div>
      )}

      {/* 🚀 Scroll Section */}
      <div className="sticky top-0 w-full h-screen overflow-visible z-50">
        {/* Title - NO TEXT SHADOW */}
        <motion.div
          className="absolute inset-0 flex items-center justify-start px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 pointer-events-none"
          style={{ y: titleY, opacity: titleOpacity }}
        >
          <div className="max-w-[60%] sm:max-w-none">
            <motion.p className="text-cyan-400 text-xs sm:text-sm font-bold tracking-widest mb-2 sm:mb-4">
              01
            </motion.p>
            <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-bold leading-[0.9] text-white">
              Full-Stack
              <br />
              Development
            </h2>
          </div>
        </motion.div>

        {/* Description */}
        <motion.div
          style={{ opacity: descOpacity }}
          className="fixed bottom-[22vh] sm:bottom-[24vh] left-4 sm:left-8 md:left-16 lg:left-24 xl:left-32 max-w-[90%] sm:max-w-md md:max-w-lg pointer-events-none"
        >
          <p className="text-white/80 text-sm sm:text-base md:text-lg leading-relaxed font-poppins">
            We architect robust, scalable, and seamless full-stack systems that bridge innovation and performance — from backend APIs to futuristic UI.
          </p>
        </motion.div>

        {/* Button */}
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
