'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Hexagon, Zap } from 'lucide-react'

interface IntroAnimationProps {
  onComplete: () => void
}

export default function IntroAnimation({ onComplete }: IntroAnimationProps) {
  const [showSkip, setShowSkip] = useState(false)
  const [particles] = useState(() => 
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 2,
    }))
  )

  useEffect(() => {
    const skipTimer = setTimeout(() => setShowSkip(true), 1000)
    const autoComplete = setTimeout(onComplete, 4000)
    
    return () => {
      clearTimeout(skipTimer)
      clearTimeout(autoComplete)
    }
  }, [onComplete])

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-gradient-to-br from-dark-900 via-dark-800 to-dark-700 flex items-center justify-center overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      {/* Animated Grid Background */}
      <div className="absolute inset-0 cyber-grid opacity-20" />
      
      {/* Scan Line Effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-transparent via-neon-blue/20 to-transparent h-1"
        animate={{ y: ['-100vh', '100vh'] }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      />

      {/* Floating Particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-1 h-1 bg-neon-blue rounded-full"
          style={{ left: `${particle.x}%`, top: `${particle.y}%` }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Main Logo Container */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Logo with Glow */}
        <motion.div
          className="relative mb-8"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
        >
          {/* Orbiting Elements */}
          {[0, 120, 240].map((rotation, i) => (
            <motion.div
              key={i}
              className="absolute inset-0"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              style={{ rotate: rotation }}
            >
              <div className="w-2 h-2 bg-neon-purple rounded-full absolute -top-40 left-1/2 transform -translate-x-1/2" />
            </motion.div>
          ))}
          
          {/* Main Logo */}
          <motion.div
            className="relative w-96 h-96 flex items-center justify-center"
            animate={{ 
              boxShadow: [
                "0 0 40px rgba(59,130,246,0.5)",
                "0 0 80px rgba(59,130,246,0.8)",
                "0 0 40px rgba(59,130,246,0.5)"
              ]
            }}
            transition={{ 
              boxShadow: { duration: 2, repeat: Infinity }
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-3xl blur-3xl" />
            <img
              src="/photos/logo.png"
              alt="ACM Logo"
              className="relative w-full h-full object-contain drop-shadow-2xl mix-blend-lighten"
              style={{ filter: 'brightness(1.2) contrast(1.1)' }}
            />
          </motion.div>
        </motion.div>

        {/* ACM Text */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2 }}
        >
          <motion.h1 
            className="text-6xl font-bold bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink bg-clip-text text-transparent mb-2"
            animate={{ 
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            ACM
          </motion.h1>
          <motion.p
            className="text-xl text-gray-300 tracking-wider"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5 }}
          >
            STUDENT CHAPTER
          </motion.p>
        </motion.div>

        {/* Loading Bar */}
        <motion.div
          className="mt-12 w-64 h-1 bg-gray-800 rounded-full overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3 }}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-neon-blue to-neon-purple"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 2.5, delay: 3, ease: "easeOut" }}
          />
        </motion.div>
      </div>

      {/* Skip Button */}
      {showSkip && (
        <button
          onClick={onComplete}
          className="group absolute bottom-8 right-8 z-50 flex items-center gap-2 px-5 py-2.5 bg-white/5 backdrop-blur-md border border-white/10 text-white hover:bg-white hover:text-black transition-all duration-300 rounded-full font-medium text-sm"
        >
          <span>Skip</span>
          <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
          </svg>
        </button>
      )}
    </motion.div>
  )
}