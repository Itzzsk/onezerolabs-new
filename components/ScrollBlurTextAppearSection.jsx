'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

// 🔥 PUBLIC FOLDER PATHS
// Put ALL these images inside: public/uiux/ and public/graphicdesigns/
const uiuxLeft = [
  '/uiux/design1.png',
  '/uiux/Picsart_25-02-08_19-41-54-723.jpg',
  '/uiux/design3.png',
]

const uiuxRight = [
  '/uiux/design4.png',
  '/uiux/Picsart_25-02-09_19-09-23-886.jpg',
  '/uiux/u25.jpg',
]

const graphics = [
  '/graphicdesigns/Picsart_24-12-15_18-01-42-142.jpg',
  '/graphicdesigns/Picsart_25-01-04_14-20-24-939.jpg',
  '/graphicdesigns/Picsart_25-02-22_17-57-32-185.jpg',
  '/graphicdesigns/Picsart_25-03-01_19-03-26-625.jpg',
  '/graphicdesigns/Picsart_25-03-04_16-53-14-678.jpg',
  '/graphicdesigns/Picsart_25-03-09_17-30-39-120.jpg',
  '/graphicdesigns/Picsart_25-03-16_18-07-44-231.jpg',
]

export default function GalleryScroll() {
  const ref = useRef(null)
  const [isMobile, setIsMobile] = useState(false)

  // Prevents SSR crash
  useEffect(() => {
    if (typeof window === 'undefined') return
    const detect = () => setIsMobile(window.innerWidth < 768)
    detect()
    window.addEventListener('resize', detect)
    return () => window.removeEventListener('resize', detect)
  }, [])

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  })

  const fadePoints = isMobile
    ? [0, 0.02, 0.1, 0.18, 0.25]
    : [0, 0.05, 0.25, 0.65, 0.8]

  const textOpacity = useTransform(scrollYProgress, fadePoints, [0, 1, 1, 1, 0])
  const textBlur = useTransform(scrollYProgress, fadePoints, ['40px', '10px', '0px', '0px', '40px'])

  return (
    <section
      ref={ref}
      className="relative w-full bg-black overflow-hidden"
      style={{ minHeight: '450vh' }}
    >

      <div
        className={`absolute inset-0 pointer-events-none z-10 ${
          isMobile ? 'bg-black/60' : 'bg-black/25'
        }`}
      />

      {/* ALWAYS 3 COLUMNS */}
      <div className="absolute inset-0 grid grid-cols-3 gap-6 px-2 sm:px-8 md:px-16 pt-20">

        {/* LEFT */}
        <div className="flex flex-col gap-8">
          {uiuxLeft.map((src, i) => (
            <div key={i} className="bg-zinc-900/40 border border-zinc-700/30 p-2 rounded-2xl">
              <img
                src={src}
                alt=""
                loading="lazy"
                className={`w-full h-full object-cover opacity-60 ${
                  isMobile ? 'scale-[1.25]' : 'scale-[1.05]'
                }`}
              />
            </div>
          ))}
        </div>

        {/* CENTER */}
        <div className="flex flex-col gap-10 mt-10">
          {graphics.map((src, i) => (
            <div key={i} className="bg-zinc-900/40 border border-zinc-700/30 p-2 rounded-2xl">
              <img
                src={src}
                alt=""
                loading="lazy"
                className={`w-full h-full object-cover opacity-60 ${
                  isMobile ? 'scale-[1.20]' : 'scale-[1.05]'
                }`}
              />
            </div>
          ))}
        </div>

        {/* RIGHT */}
        <div className="flex flex-col gap-8">
          {uiuxRight.map((src, i) => (
            <div key={i} className="bg-zinc-900/40 border border-zinc-700/30 p-2 rounded-2xl">
              <img
                src={src}
                alt=""
                loading="lazy"
                className={`w-full h-full object-cover opacity-60 ${
                  isMobile ? 'scale-[1.25]' : 'scale-[1.05]'
                }`}
              />
            </div>
          ))}
        </div>

      </div>

      {/* CENTER TEXT */}
      <motion.div
        style={{ opacity: textOpacity, filter: textBlur }}
        className="fixed inset-0 z-[70] flex items-center justify-center pointer-events-none"
      >
        <div className="px-4 text-center leading-tight">
          <h1 className="text-white font-bold text-3xl sm:text-4xl md:text-5xl xl:text-6xl">
            Launching the next generation
          </h1>
          <h1 className="text-white font-bold mt-1 text-3xl sm:text-4xl md:text-5xl xl:text-6xl">
            of Intelligent Experiences.
          </h1>
        </div>
      </motion.div>

    </section>
  )
}