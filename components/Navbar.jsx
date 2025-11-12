'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useAnimation } from 'framer-motion'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const controls = useAnimation()

  const menuItems = [
    { label: 'Work', href: '/portfolio' },
    { label: 'Services', href: '/services' },
    { label: 'Impact', href: '/about' },
  ]

  const bottomLinks = [
    { label: 'Contact', href: '/contact' },
    { label: 'Latest', href: '/blog' },
    { label: 'Careers', href: '/careers' },
  ]

  // Watch scroll to toggle animations
  useEffect(() => {
    const handleScroll = () => {
      const scrolledValue = window.scrollY > 50
      setScrolled(scrolledValue)
      if (scrolledValue) {
        controls.start({ opacity: 0, y: -20, transition: { duration: 0.3 } })
      } else {
        controls.start({ opacity: 1, y: 0, transition: { duration: 0.3 } })
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [controls])

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  return (
    <>
      {/* Header - ALWAYS ON TOP with highest z-index */}
      <nav className="fixed top-0 w-full z-[200] bg-transparent pointer-events-none">
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 pointer-events-auto">
          <div className="flex justify-between items-center pt-4 sm:pt-6 md:pt-8 lg:pt-10 xl:pt-12 pb-3 sm:pb-4 md:pb-6 lg:pb-8 xl:pb-10">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 sm:gap-3 md:gap-4 relative z-[210]">
              <div className="relative w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 xl:w-20 xl:h-20 transition-transform hover:scale-105">
                <Image
                  src="/logo.jpg"
                  alt="OneZeroLabs Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>

              {/* Company Name - Animated, Hidden on small screens when scrolled */}
              <motion.span
                animate={controls}
                className="font-bold text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-white tracking-wider origin-left hidden xs:block"
                style={{ originX: 0 }}
              >
                ONEZEROLABS
              </motion.span>
            </Link>

            {/* Menu Button */}
            <button
              onClick={() => setIsOpen(true)}
              className="relative z-[210] px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 lg:px-8 lg:py-3.5 xl:px-10 xl:py-4 bg-gray-700 hover:bg-gray-600 text-white text-xs sm:text-sm md:text-base lg:text-lg font-medium rounded-lg transition-all hover:scale-105 flex items-center justify-center min-w-[70px] sm:min-w-[80px] md:min-w-[90px]"
              aria-label="Open menu"
            >
              {!scrolled && <span className="hidden sm:inline">Menu</span>}
              {scrolled && (
                <div className="flex flex-col justify-center gap-1 w-5 h-5 sm:w-6 sm:h-6">
                  <span className="block h-0.5 bg-white rounded"></span>
                  <span className="block h-0.5 bg-white rounded"></span>
                </div>
              )}
              {!scrolled && <span className="sm:hidden">Menu</span>}
            </button>
          </div>
        </div>
      </nav>

      {/* Fullscreen Menu Overlay - BELOW navbar */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Menu Background */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black z-[150] flex flex-col items-center justify-center overflow-hidden"
            >
              {/* Menu Content - Centered */}
              <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 text-center">
                {/* Main Menu Items - Stacked Vertically in Center */}
                <motion.nav
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="space-y-2 sm:space-y-3 md:space-y-4 mb-12 sm:mb-16 md:mb-20"
                >
                  {menuItems.map((item, idx) => (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + idx * 0.1 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-white hover:text-gray-400 transition-colors leading-tight"
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  ))}
                </motion.nav>

                {/* Bottom Links - Horizontal Row Below */}
                <motion.nav
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 md:gap-8 lg:gap-10 xl:gap-12"
                >
                  {bottomLinks.map((link, idx) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 + idx * 0.05 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className="block text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-gray-400 hover:text-white transition-colors"
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}
                </motion.nav>
              </div>
            </motion.div>

            {/* Close Button Overlay - Same level as navbar */}
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsOpen(false)}
              className="fixed top-4 right-4 sm:top-6 sm:right-6 md:top-8 md:right-8 lg:top-10 lg:right-12 xl:top-12 xl:right-16 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 flex items-center justify-center text-white hover:text-gray-400 transition-colors z-[210] bg-gray-800/80 rounded-lg backdrop-blur-md hover:bg-gray-700/80"
              aria-label="Close menu"
            >
              <svg 
                className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </motion.button>
          </>
        )}
      </AnimatePresence>
    </>
  )
}