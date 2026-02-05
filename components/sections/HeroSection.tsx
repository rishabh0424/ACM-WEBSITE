'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Zap } from 'lucide-react'

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 pb-8">


      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
        {/* AI SOCIETY Title */}
        <motion.h1
          className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black mb-8 sm:mb-12 tracking-wider"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent drop-shadow-2xl">
            AI SOCIETY
          </span>
        </motion.h1>

        {/* Logos Section */}
        <motion.div
          className="flex items-center justify-center gap-8 sm:gap-12 md:gap-20 mb-12 sm:mb-16"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* SCSCET Logo - Left */}
          <motion.div
            className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 flex items-center justify-center bg-blue-500/10 rounded-2xl border-2 border-blue-500/30"
            whileHover={{ scale: 1.1, y: -5 }}
            transition={{ duration: 0.3 }}
          >
            <img
              src="/scscet-logo.png"
              alt="SCSCET Logo"
              className="w-full h-full object-contain p-4"
            />
          </motion.div>

          {/* Bennett University Logo - Right */}
          <motion.div
            className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 flex items-center justify-center bg-blue-500/10 rounded-2xl border-2 border-blue-500/30"
            whileHover={{ scale: 1.1, y: -5 }}
            transition={{ duration: 0.3 }}
          >
            <img
              src="/bennett-logo.png"
              alt="Bennett University Logo"
              className="w-full h-full object-contain p-4"
            />
          </motion.div>
        </motion.div>

        {/* Badge */}
        <motion.div
          className="inline-flex items-center px-4 py-2 rounded-full border border-border-subtle bg-dark-elevated/50 text-text-muted text-xs sm:text-sm font-medium mb-6 sm:mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.1 }}
        >
          <Zap className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-cyan-400" />
          Elite Tech Community
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-display font-bold mb-4 sm:mb-6 leading-[1.1] tracking-tight text-text-primary"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.1 }}
        >
          Advancing<br />
          <span className="blue-text-gradient">Computing</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-base sm:text-lg md:text-xl text-text-muted mb-8 sm:mb-12 max-w-2xl mx-auto leading-relaxed px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.1 }}
        >
          Join the premier ACM Student Chapter where innovation meets excellence.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-12 sm:mb-24 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.1 }}
        >
          <motion.button
            className="btn-primary"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>Join ACM Now</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>

          <motion.button
            className="btn-secondary"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Explore Domains
          </motion.button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden sm:block"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-5 h-8 border border-border-blue rounded-full flex justify-center bg-dark-card/20">
          <motion.div
            className="w-1 h-2 bg-accent-blue-bright rounded-full mt-2"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  )
}