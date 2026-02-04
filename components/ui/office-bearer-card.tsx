'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Crown, Linkedin, Github, Twitter, Mail } from 'lucide-react'
import Image from 'next/image'

interface OfficeBearerProps {
  name: string
  position: string
  image: string
  bio?: string
  social: {
    linkedin?: string
    github?: string
    twitter?: string
    email?: string
  }
}

export const OfficeBearerCard = ({ name, position, image, bio, social }: OfficeBearerProps) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useState(() => {
    setIsMobile(typeof window !== 'undefined' && window.innerWidth < 768)
  })

  const socialIcons = {
    linkedin: Linkedin,
    github: Github,
    twitter: Twitter,
    email: Mail
  }

  return (
    <motion.div
      className="relative group"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Glowing Background */}
      <motion.div
        className="absolute -inset-4 bg-gradient-to-r from-yellow-500/20 via-amber-500/20 to-orange-500/20 rounded-3xl blur-xl md:blur-2xl"
        animate={{
          opacity: isHovered ? 0.6 : 0.3,
          scale: isHovered ? 1.05 : 1,
        }}
        transition={{ duration: 0.5 }}
      />

      {/* Main Card */}
      <motion.div
        className="relative bg-gradient-to-br from-gray-900/90 via-gray-800/90 to-gray-900/90 backdrop-blur-xl rounded-2xl border-2 border-yellow-500/30 overflow-hidden"
        whileHover={isMobile ? {} : { y: -8, scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {/* Animated Border Gradient */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(251, 191, 36, 0.3), transparent)',
          }}
          animate={{
            x: isHovered ? ['-100%', '200%'] : '0%',
          }}
          transition={{
            duration: 1.5,
            repeat: isHovered ? Infinity : 0,
            ease: "linear",
          }}
        />

        {/* Crown Badge */}
        <div className="absolute top-3 right-3 md:top-4 md:right-4 z-10">
          <motion.div
            className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-yellow-400 to-amber-600 flex items-center justify-center shadow-lg shadow-yellow-500/50"
            animate={{
              rotate: isHovered && !isMobile ? [0, -10, 10, -10, 0] : 0,
              scale: isHovered && !isMobile ? [1, 1.1, 1] : 1,
            }}
            transition={{ duration: 0.6 }}
          >
            <Crown className="w-5 h-5 md:w-6 md:h-6 text-white" />
          </motion.div>
        </div>

        {/* Content Container */}
        <div className="relative p-6 md:p-8">
          {/* Profile Image */}
          <div className="flex justify-center mb-4 md:mb-6">
            <motion.div
              className="relative"
              whileHover={isMobile ? {} : { scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
            >
              {/* Rotating Ring */}
              <motion.div
                className="absolute -inset-2 rounded-full"
                style={{
                  background: 'conic-gradient(from 0deg, #fbbf24, #f59e0b, #d97706, #fbbf24)',
                }}
                animate={isMobile ? {} : { rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />
              
              {/* Inner Ring */}
              <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 blur-sm" />
              
              {/* Image Container */}
              <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-gray-900">
                <Image
                  src={image}
                  alt={name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 96px, 128px"
                />
              </div>

              {/* Pulse Effect */}
              {!isMobile && (
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-yellow-400"
                  animate={{
                    scale: [1, 1.3, 1.3],
                    opacity: [0.5, 0, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeOut",
                  }}
                />
              )}
            </motion.div>
          </div>

          {/* Name & Position */}
          <div className="text-center mb-4 md:mb-6">
            <motion.h3
              className="text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-amber-400 to-orange-400 mb-2"
              animate={{
                backgroundPosition: isHovered && !isMobile ? ['0% 50%', '100% 50%'] : '0% 50%',
              }}
              transition={{ duration: 2, repeat: isHovered && !isMobile ? Infinity : 0 }}
              style={{ backgroundSize: '200% 200%' }}
            >
              {name}
            </motion.h3>
            <p className="text-yellow-400 font-semibold text-xs md:text-sm uppercase tracking-widest mb-2 md:mb-3">
              {position}
            </p>
            {bio && (
              <p className="text-gray-300 text-xs md:text-sm leading-relaxed">
                {bio}
              </p>
            )}
          </div>

          {/* Social Links */}
          <div className="flex justify-center gap-2 md:gap-3">
            {Object.entries(social).map(([platform, url]) => {
              const IconComponent = socialIcons[platform as keyof typeof socialIcons]
              if (!IconComponent || !url) return null

              return (
                <motion.a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 md:w-10 md:h-10 rounded-lg bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 flex items-center justify-center text-yellow-400 hover:text-white hover:border-yellow-400 transition-colors"
                  whileHover={isMobile ? {} : {
                    scale: 1.15,
                    y: -3,
                    boxShadow: "0 10px 30px rgba(251, 191, 36, 0.4)",
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <IconComponent size={16} />
                </motion.a>
              )
            })}
          </div>
        </div>

        {/* Bottom Shine Effect */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent"
          animate={{
            opacity: isHovered ? [0.3, 1, 0.3] : 0.3,
          }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </motion.div>
    </motion.div>
  )
}
