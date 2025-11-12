'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function Portfolio() {
  const [selectedCategory, setSelectedCategory] = useState('All')

  // Hardcoded projects - NO JSON FILE NEEDED
  const projects = [
    {
      id: 1,
      title: "Smart College Attendance Management",
      slug: "college-attendance-system",
      description: "Real-time attendance system with anonymous social features for students",
      category: "Web App",
      technologies: ["Node.js", "MongoDB", "Firebase", "React", "Cloudinary"],
      featured: true
    },
    {
      id: 2,
      title: "Crop Yield Prediction with AI",
      slug: "crop-yield-prediction",
      description: "Advanced ML model for forecasting crop yields with interactive visualizations",
      category: "AI/ML",
      technologies: ["React", "Python", "TensorFlow", "Charts.js"],
      featured: true
    },
    {
      id: 3,
      title: "E-Commerce Platform",
      slug: "ecommerce-platform",
      description: "Full-featured e-commerce website with payment integration",
      category: "Web App",
      technologies: ["Next.js", "Stripe", "MongoDB", "Tailwind CSS"],
      featured: false
    }
  ]

  const categories = ['All', 'Web App', 'AI/ML', 'Mobile']
  
  const filteredProjects = selectedCategory === 'All' 
    ? projects 
    : projects.filter(p => p.category === selectedCategory)

  return (
    <main className="min-h-screen pt-20 bg-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-12"
        >
          Our Portfolio
        </motion.h1>
        
        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-16"
        >
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                selectedCategory === cat
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-900 text-gray-300 hover:bg-gray-800 border border-gray-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Link href={`/portfolio/${project.slug}`}>
                <div className="group bg-gradient-to-br from-black to-gray-950 border border-gray-800 rounded-2xl overflow-hidden hover:border-purple-600 hover:-translate-y-2 transition-all duration-500 cursor-pointer h-full">
                  {/* Image Placeholder */}
                  <div className="aspect-video bg-gradient-to-br from-purple-900/20 to-blue-900/20 flex items-center justify-center">
                    <span className="text-6xl opacity-20">
                      {project.category === 'Web App' && '🌐'}
                      {project.category === 'AI/ML' && '🤖'}
                      {project.category === 'Mobile' && '📱'}
                    </span>
                  </div>

                  <div className="p-6">
                    {/* Category Badge */}
                    <span className="inline-block text-xs font-semibold text-purple-400 bg-purple-900/30 px-3 py-1 rounded-full mb-3">
                      {project.category}
                    </span>
                    
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">
                      {project.title}
                    </h3>
                    
                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                      {project.description}
                    </p>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.slice(0, 3).map(tech => (
                        <span key={tech} className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded">
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded">
                          +{project.technologies.length - 3}
                        </span>
                      )}
                    </div>

                    {/* Link */}
                    <div className="text-purple-400 font-semibold group-hover:text-purple-300 transition-colors">
                      View Case Study →
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="text-center text-gray-400 py-20">
            <p className="text-xl">No projects found in this category.</p>
          </div>
        )}
      </div>
    </main>
  )
}
