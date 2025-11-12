'use client'

import testimonials from '../data/testimonials.json'
import { motion } from 'framer-motion'
import { useState } from 'react'

export default function Testimonials() {
  const [current, setCurrent] = useState(0)

  return (
    <section className="section bg-white">
      <div className="container-max">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="section-title"
        >
          What Our Clients Say
        </motion.h2>

        <div className="max-w-3xl mx-auto">
          <motion.div
            key={current}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-gray-50 rounded-lg p-12 border border-gray-200"
          >
            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-yellow-400 text-xl">★</span>
              ))}
            </div>

            <p className="text-2xl font-bold mb-6">
              "{testimonials[current].quote}"
            </p>

            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-full" />
              <div>
                <p className="font-bold">{testimonials[current].author}</p>
                <p className="text-gray-600 text-sm">{testimonials[current].role}</p>
              </div>
            </div>
          </motion.div>

          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={() => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
              className="w-12 h-12 rounded-full border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
            >
              ←
            </button>
            <button
              onClick={() => setCurrent((prev) => (prev + 1) % testimonials.length)}
              className="w-12 h-12 rounded-full border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
