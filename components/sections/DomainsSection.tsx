'use client'

import { motion } from 'framer-motion'
import { useRef } from 'react'
import { Brain, Code, Shield, Palette, Trophy, Database } from 'lucide-react'
import { 
  fadeUp, 
  fadeUpDelayed, 
  staggerContainer, 
  cardVariant, 
  textReveal,
  parallaxSlow,
  hoverLift,
  hoverGlow,
  viewportConfig 
} from '@/lib/animations'

export default function DomainsSection() {
  const ref = useRef(null)

  const domains = [
    {
      icon: Brain,
      title: "Artificial Intelligence",
      description: "Explore machine learning, deep learning, and AI applications that are reshaping industries.",
      color: "from-purple-500 to-pink-500",
      projects: ["Neural Networks", "Computer Vision", "NLP"]
    },
    {
      icon: Code,
      title: "Web Development",
      description: "Master modern web technologies and build scalable, responsive applications.",
      color: "from-blue-500 to-cyan-500",
      projects: ["React Apps", "Full-Stack", "APIs"]
    },
    {
      icon: Trophy,
      title: "Competitive Programming",
      description: "Sharpen algorithmic thinking and compete in prestigious programming contests.",
      color: "from-yellow-500 to-orange-500",
      projects: ["ICPC", "CodeForces", "LeetCode"]
    },
    {
      icon: Shield,
      title: "Cybersecurity",
      description: "Protect digital assets and learn ethical hacking, cryptography, and security protocols.",
      color: "from-red-500 to-pink-500",
      projects: ["Penetration Testing", "Cryptography", "Security Audits"]
    },
    {
      icon: Palette,
      title: "UI/UX Design",
      description: "Create intuitive and beautiful user experiences through design thinking and prototyping.",
      color: "from-green-500 to-teal-500",
      projects: ["Design Systems", "Prototyping", "User Research"]
    },
    {
      icon: Database,
      title: "Data Science",
      description: "Extract insights from data using statistical analysis, visualization, and machine learning.",
      color: "from-indigo-500 to-purple-500",
      projects: ["Data Analysis", "Visualization", "Predictive Models"]
    }
  ]

  return (
    <motion.section 
      id="domains" 
      className="py-20 bg-transparent relative overflow-hidden" 
      ref={ref}
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      variants={fadeUp}
    >
      {/* Background Elements */}
      <motion.div 
        className="absolute inset-0 cyber-grid opacity-5"
        variants={parallaxSlow}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center mb-20"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          <motion.h2 
            className="text-5xl md:text-6xl font-bold mb-8 tracking-tight"
            variants={textReveal}
          >
            <span className="gradient-text">
              Our Domains
            </span>
          </motion.h2>
          <motion.p
            className="text-xl text-gray-400 max-w-4xl mx-auto leading-relaxed font-light"
            variants={fadeUpDelayed}
          >
            Dive deep into specialized areas of computing and technology. 
            Each domain offers unique opportunities for learning, research, and innovation.
          </motion.p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          {domains.map((domain, index) => (
            <motion.div
              key={domain.title}
              className="group relative"
              variants={cardVariant}
            >
              <motion.div
                className="relative p-10 rounded-3xl border border-gray-800 bg-gray-900/20 backdrop-blur-sm hover:border-blue-500/40 transition-all duration-300 h-full"
                whileHover={{ ...hoverLift, ...hoverGlow }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {/* Gradient Background on Hover */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${domain.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`}
                />
                
                {/* Icon */}
                <motion.div
                  className={`w-20 h-20 rounded-full bg-gradient-to-r ${domain.color} p-0.5 mb-8`}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="w-full h-full bg-gray-900 rounded-full flex items-center justify-center">
                    <domain.icon className="w-10 h-10 text-white" />
                  </div>
                </motion.div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-gray-100 mb-6 group-hover:text-blue-400 transition-colors">
                  {domain.title}
                </h3>
                
                <p className="text-gray-400 mb-8 leading-relaxed font-light">
                  {domain.description}
                </p>

                {/* Projects */}
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-blue-400 mb-3">Key Areas:</h4>
                  <div className="flex flex-wrap gap-2">
                    {domain.projects.map((project) => (
                      <span
                        key={project}
                        className="px-3 py-1 text-xs bg-gray-800 text-gray-300 rounded-full border border-gray-700 group-hover:border-blue-500/30 transition-colors"
                      >
                        {project}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Hover Arrow */}
                <motion.div
                  className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity"
                  initial={{ x: -10 }}
                  whileHover={{ x: 0 }}
                >
                  <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <motion.div
                      className="w-4 h-4 border-r-2 border-t-2 border-blue-400 transform rotate-45"
                      whileHover={{ scale: 1.2 }}
                    />
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center mt-16"
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={fadeUpDelayed}
        >
          <motion.button
            className="px-10 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl text-white font-semibold text-lg hover:shadow-lg hover:shadow-blue-500/25 transition-all"
            whileHover={{ ...hoverLift }}
            whileTap={{ scale: 0.95 }}
          >
            Explore All Domains
          </motion.button>
        </motion.div>
      </div>
    </motion.section>
  )
}
