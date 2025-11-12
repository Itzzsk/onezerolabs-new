'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    message: '',
    agreePolicy: false
  })

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    // Add your form submission logic here
  }

  return (
    <main className="relative w-full h-screen overflow-hidden">
      {/* Split Layout Container */}
      <div className="flex h-full">
        
        {/* LEFT SIDE - 3D Animated Background */}
        <motion.div 
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative w-1/2 bg-black flex flex-col justify-end p-8 lg:p-12 xl:p-16"
        >
          {/* 3D Floating Objects Background - Placeholder */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Add your 3D objects here - for now using gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 via-black to-purple-900/20" />
            
            {/* Animated Circles - mimicking floating 3D objects */}
            <motion.div
              animate={{
                y: [0, -30, 0],
                x: [0, 20, 0],
                rotate: [0, 180, 360]
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute top-1/4 left-1/4 w-32 h-32 bg-red-600/30 rounded-full blur-xl"
            />
            
            <motion.div
              animate={{
                y: [0, 40, 0],
                x: [0, -30, 0],
                rotate: [0, -180, -360]
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
              className="absolute bottom-1/3 right-1/4 w-40 h-40 bg-purple-600/20 rounded-full blur-xl"
            />

            <motion.div
              animate={{
                y: [0, -20, 0],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5
              }}
              className="absolute top-1/2 left-1/2 w-24 h-24 bg-gray-600/30 rounded-full blur-lg"
            />
          </div>

          {/* Contact Navigation Pills */}
          <div className="relative z-10 flex gap-4 mb-8">
            <button className="px-6 py-2 bg-white/10 backdrop-blur-sm text-white rounded-full text-sm font-medium hover:bg-white/20 transition-all">
              Inquiries
            </button>
            <button className="px-6 py-2 bg-white/10 backdrop-blur-sm text-white rounded-full text-sm font-medium hover:bg-white/20 transition-all">
              Find us
            </button>
            <button className="px-6 py-2 bg-white/10 backdrop-blur-sm text-white rounded-full text-sm font-medium hover:bg-white/20 transition-all">
              Follow us
            </button>
          </div>

          {/* Email and Phone */}
          <div className="relative z-10">
            <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 font-poppins leading-tight">
              interact@fantasy.co
            </h1>
            <p className="text-white/60 text-lg font-poppins">+1 212-941-5220</p>
          </div>
        </motion.div>

        {/* RIGHT SIDE - Contact Form */}
        <motion.div 
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative w-1/2 bg-white flex items-center justify-center p-8 lg:p-12 xl:p-16"
        >
          <div className="w-full max-w-lg">
            <h2 className="text-4xl lg:text-5xl font-bold text-black mb-2 font-poppins">
              Get in touch
            </h2>
            <p className="text-gray-500 text-lg mb-8 font-poppins">
              We'd love to hear from you and your team
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Input */}
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-0 py-3 border-0 border-b-2 border-gray-300 focus:border-black focus:outline-none text-lg font-poppins placeholder-gray-400 transition-colors"
                />
              </div>

              {/* Company Input */}
              <div>
                <input
                  type="text"
                  name="company"
                  placeholder="Company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-0 py-3 border-0 border-b-2 border-gray-300 focus:border-black focus:outline-none text-lg font-poppins placeholder-gray-400 transition-colors"
                />
              </div>

              {/* Email Input */}
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-0 py-3 border-0 border-b-2 border-gray-300 focus:border-black focus:outline-none text-lg font-poppins placeholder-gray-400 transition-colors"
                />
              </div>

              {/* Message Textarea */}
              <div>
                <textarea
                  name="message"
                  placeholder="Message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  required
                  className="w-full px-0 py-3 border-0 border-b-2 border-gray-300 focus:border-black focus:outline-none text-lg font-poppins placeholder-gray-400 resize-none transition-colors"
                />
              </div>

              {/* Privacy Policy Checkbox */}
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  name="agreePolicy"
                  id="agreePolicy"
                  checked={formData.agreePolicy}
                  onChange={handleChange}
                  required
                  className="mt-1 w-5 h-5 border-2 border-gray-300 rounded cursor-pointer"
                />
                <label htmlFor="agreePolicy" className="text-sm text-gray-600 font-poppins">
                  I agree to the{' '}
                  <a href="/privacy-policy" className="text-black underline hover:text-gray-700">
                    privacy policy
                  </a>
                  .
                </label>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end pt-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={!formData.agreePolicy}
                  className="px-10 py-4 bg-gray-300 hover:bg-gray-400 text-black font-semibold rounded-lg font-poppins text-base transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Submit
                </motion.button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </main>
  )
}
