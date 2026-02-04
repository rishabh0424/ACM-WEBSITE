'use client'

import { motion } from 'framer-motion'
import { useRef } from 'react'
import { Award, Globe, Lightbulb, Target } from 'lucide-react'
import { 
  fadeUp, 
  fadeUpDelayed, 
  staggerContainer, 
  cardVariant, 
  textReveal,
  parallaxSlow,
  hoverLift,
  viewportConfig 
} from '@/lib/animations'

export default function AboutSection() {
  const ref = useRef(null)

  const features = [
    {
      icon: Target,
      title: "Mission-Driven",
      description: "Advancing computing as a science and profession through innovation and collaboration."
    },
    {
      icon: Globe,
      title: "Global Network",
      description: "Connect with ACM's worldwide community of computing professionals and researchers."
    },
    {
      icon: Lightbulb,
      title: "Innovation Hub",
      description: "Foster creativity and breakthrough thinking in emerging technologies."
    },
    {
      icon: Award,
      title: "Excellence",
      description: "Maintain the highest standards in technical education and professional development."
    }
  ]

  return (
    <motion.section 
      id="about" 
      className="py-20 bg-transparent" 
      ref={ref}
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      variants={fadeUp}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
              About ACM
            </span>
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-400 max-w-4xl mx-auto leading-relaxed font-light"
            variants={fadeUpDelayed}
          >
            The Association for Computing Machinery (ACM) is the world's largest educational 
            and scientific computing society, uniting computing educators, researchers, and professionals.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-24">
          {/* Content */}
          <motion.div
            variants={cardVariant}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
          >
            <h3 className="text-4xl font-bold text-gray-100 mb-8 tracking-tight">
              Shaping the Future of Computing
            </h3>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed font-light">
              Our student chapter serves as a bridge between academic learning and professional excellence. 
              We provide a platform for students to engage with cutting-edge research, industry trends, 
              and collaborative projects that define the future of technology.
            </p>
            <p className="text-gray-400 text-lg mb-10 leading-relaxed font-light">
              Through workshops, competitions, and networking events, we cultivate the next generation 
              of computing leaders who will drive innovation across industries and transform society.
            </p>
            
            <motion.button
              className="btn-primary text-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.open('https://www.acm.org/', '_blank')}
            >
              About ACM
            </motion.button>
          </motion.div>

          {/* Visual Element */}
          <motion.div
            className="relative"
            variants={cardVariant}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
          >
            <div className="relative p-10 rounded-3xl border border-blue-500/20 bg-gray-900/20 backdrop-blur-sm">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-3xl" />
              <div className="relative z-10">
                <div className="text-7xl font-bold text-blue-400 mb-6">1947</div>
                <div className="text-2xl text-gray-100 mb-3 font-semibold">Founded</div>
                <div className="text-gray-400 text-lg font-light leading-relaxed">
                  ACM was established as the world's first educational and scientific computing society
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Features Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="text-center p-8 rounded-2xl border border-blue-500/20 bg-gray-900/20 backdrop-blur-sm hover:border-blue-500/40 transition-all group"
              variants={cardVariant}
              whileHover={{ ...hoverLift, borderColor: "rgba(59, 130, 246, 0.4)" }}
            >
              <motion.div
                className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 flex items-center justify-center group-hover:from-blue-500/30 group-hover:to-purple-500/30 transition-all"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <feature.icon className="w-10 h-10 text-blue-400" />
              </motion.div>
              <h4 className="text-xl font-semibold text-gray-100 mb-4">{feature.title}</h4>
              <p className="text-gray-400 leading-relaxed font-light">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  )
}
