'use client'

import skills from '../data/skills.json'
import { motion } from 'framer-motion'

export default function SkillShowcase() {
  return (
    <section className="section bg-gray-50">
      <div className="container-max">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="section-title"
        >
          Technologies We Use
        </motion.h2>

        <div className="space-y-12">
          {Object.entries(skills).map(([category, items]) => (
            <div key={category}>
              <h3 className="text-2xl font-bold mb-6 capitalize">{category}</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {items.map((skill, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.1 }}
                    className="flex flex-col items-center justify-center p-6 bg-white rounded-lg border border-gray-200 hover:border-blue-400 transition-colors"
                  >
                    <span className="text-4xl mb-2">{skill.icon}</span>
                    <span className="text-sm font-semibold text-center">{skill.name}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
