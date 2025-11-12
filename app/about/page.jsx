'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function About() {
  return (
    <main className="min-h-screen pt-20">
      <div className="container-max section">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="section-title"
        >
          About OneZeroLabs
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-4xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-3xl font-bold mb-4">Who We Are</h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              OneZeroLabs is a full-stack development studio focused on building modern, scalable solutions for educational institutions and businesses.
            </p>
            <p className="text-gray-600 mb-4 leading-relaxed">
              We specialize in web applications, mobile development, and educational technology solutions. Our team brings expertise in Node.js, React, Firebase, and MongoDB.
            </p>
            <p className="text-gray-600 leading-relaxed">
              We're committed to delivering high-quality, user-centric solutions that solve real problems and drive measurable results.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-blue-600 to-cyan-500 rounded-lg p-8 text-white"
          >
            <h3 className="text-2xl font-bold mb-4">Our Expertise</h3>
            <ul className="space-y-3">
              <li>✓ Full-Stack Web Development</li>
              <li>✓ Mobile App Development</li>
              <li>✓ Educational Technology</li>
              <li>✓ Database Design & Optimization</li>
              <li>✓ API Integration</li>
              <li>✓ Technical Consulting</li>
            </ul>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="bg-gray-50 rounded-lg p-8 max-w-2xl mx-auto"
        >
          <h3 className="text-2xl font-bold mb-4">Let's Work Together</h3>
          <p className="text-gray-600 mb-6">
            Have a project in mind? Let's discuss how we can help bring your vision to life.
          </p>
          <Link href="/contact" className="btn-primary">
            Get In Touch
          </Link>
        </motion.div>
      </div>
    </main>
  )
}
