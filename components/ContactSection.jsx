'use client'

import Link from 'next/link'

export default function ContactSection() {
  return (
    <section className="relative w-full bg-white overflow-hidden z-40" style={{ minHeight: '60vh' }}>
      {/* Content */}
      <div className="relative z-10 w-full py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24">
        
        <div className="max-w-2xl">
          {/* Heading */}
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-black font-poppins mb-6 sm:mb-8 leading-[1.1]">
            We'd love to hear from you.
          </h2>

          {/* Description */}
          <p className="text-gray-700 text-base sm:text-lg md:text-xl font-poppins mb-8 sm:mb-10 leading-relaxed">
            Ready to start your next project? Get in touch with us today and let's create something amazing together.
          </p>

          {/* CTA Button */}
          <div>
            <Link href="/contact">
              <button className="px-8 sm:px-10 py-4 sm:py-5 bg-black text-white font-bold rounded-full font-poppins text-base sm:text-lg hover:bg-gray-900 transition-all duration-300 shadow-lg hover:shadow-xl">
                Get in Touch
              </button>
            </Link>
          </div>

          {/* Email */}
          <div className="mt-10 sm:mt-12">
            <p className="text-gray-600 text-sm sm:text-base font-poppins mb-2">Email us directly:</p>
            <a 
              href="mailto:hello@oneszerolabs.com"
              className="text-black text-lg sm:text-xl font-poppins hover:text-purple-600 transition-colors duration-300"
            >
              hello@oneszerolabs.com
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
