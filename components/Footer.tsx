'use client'

import { motion } from 'framer-motion'
import { Github, Linkedin, Twitter, Instagram, Mail, MapPin, Hexagon, MessageSquare } from 'lucide-react'
import { SocialCard } from '@/components/ui/social-card'
import { 
  staggerContainer, 
  cardVariant, 
  textReveal,
  parallaxSlow,
  viewportConfig,
  easing
} from '@/lib/animations'

const Footer = () => {
  // Animation variants for footer
  const footerVariants = {
    hidden: { 
      opacity: 0, 
      y: 60,
      filter: "blur(2px)"
    },
    visible: { 
      opacity: 1, 
      y: 0,
      filter: "blur(0px)",
      transition: { 
        duration: 1, 
        ease: easing 
      }
    }
  }

  const linkVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        duration: 0.6, 
        ease: easing 
      }
    }
  }

  const socialVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { 
        duration: 0.5, 
        ease: easing 
      }
    }
  }

  // Floating particles
  const particles = Array.from({ length: 4 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 15 + 10,
  }))

  const quickLinks = [
    { name: 'About Us', href: '#about' },
    { name: 'Events', href: '#events' },
    { name: 'Team', href: '#team' },
    { name: 'Blog', href: '#blog' }
  ]

  const resources = [
    { name: 'Workshops', href: '#workshops' },
    { name: 'Projects', href: '#projects' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Contact', href: '#contact' },
    { name: 'Give Feedback', href: '#feedback' }
  ]

  const socialLinks = [
    { icon: Github, href: 'https://github.com/acm-chapter', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com/company/acm-chapter', label: 'LinkedIn' },
    { icon: Twitter, href: 'https://twitter.com/acm_chapter', label: 'Twitter' },
    { icon: Instagram, href: 'https://www.instagram.com/acm_bu/', label: 'Instagram' }
  ]

  return (
    <motion.footer 
      className="relative bg-transparent border-t border-gray-800/50 overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      variants={footerVariants}
    >
      {/* Animated Background Particles */}
      <motion.div variants={parallaxSlow}>
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full bg-neon-blue/10"
            style={{
              width: particle.size,
              height: particle.size,
              left: `${particle.x}%`,
              top: `${particle.y}%`,
            }}
          />
        ))}
      </motion.div>

      {/* Network Lines Background */}
      <div className="absolute inset-0 cyber-grid opacity-5" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          {/* Left Column - Brand */}
          <motion.div className="lg:col-span-2" variants={cardVariant}>
            {/* Logo */}
            <motion.div 
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-24 h-24 flex items-center justify-center mb-6">
                <img
                  src="/photos/logo.png"
                  alt="ACM Logo"
                  className="w-full h-full object-contain mix-blend-lighten"
                  style={{ filter: 'brightness(1.2) contrast(1.1)' }}
                />
              </div>
            </motion.div>

            {/* Description */}
            <motion.p 
              className="text-gray-300 mb-8 leading-relaxed max-w-md"
              variants={textReveal}
            >
              Empowering the next generation of computing leaders through innovation, 
              collaboration, and excellence in technology education.
            </motion.p>

            {/* Give Feedback Button */}
            <motion.div
              variants={linkVariants}
            >
              <motion.a
                href="/feedback"
                className="inline-flex items-center gap-2 px-6 py-3 bg-transparent border border-blue-500/30 rounded-lg text-blue-400 font-semibold hover:bg-blue-500/10 hover:border-blue-500/50 transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <MessageSquare size={18} />
                Give Feedback
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={cardVariant}>
            <h4 className="text-lg font-semibold text-gray-100 mb-6">Quick Links</h4>
            <motion.ul 
              className="space-y-4"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
            >
              {quickLinks.map((link) => (
                <motion.li key={link.name} variants={linkVariants}>
                  <motion.a
                    href={link.href}
                    className="text-gray-400 hover:text-neon-blue transition-all duration-300 flex items-center group"
                    whileHover={{ x: 8 }}
                  >
                    <span className="w-1 h-1 bg-neon-blue rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.name}
                  </motion.a>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          {/* Resources */}
          <motion.div variants={cardVariant}>
            <h4 className="text-lg font-semibold text-gray-100 mb-6">Resources</h4>
            <motion.ul 
              className="space-y-4"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
            >
              {resources.filter(link => link.name !== 'Give Feedback').map((link) => (
                <motion.li key={link.name} variants={linkVariants}>
                  <motion.a
                    href={link.href}
                    className="text-gray-400 hover:text-neon-blue transition-all duration-300 flex items-center group"
                    whileHover={{ x: 8 }}
                  >
                    <span className="w-1 h-1 bg-neon-blue rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.name}
                  </motion.a>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          {/* Social Card */}
          <motion.div variants={cardVariant} className="flex justify-center md:justify-end">
            <SocialCard 
              title="Connect Us On"
              socialLinks={[
                { href: 'https://www.instagram.com/acm_bu/', icon: <Instagram className="w-6 h-6" />, className: 'box1' },
                { href: 'https://twitter.com/acm_chapter', icon: <Twitter className="w-6 h-6" />, className: 'box2', delay: '0.2s' },
                { href: 'https://github.com/acm-chapter', icon: <Github className="w-6 h-6" />, className: 'box3', delay: '0.4s' },
              ]}
            />
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          className="pt-8 border-t border-gray-800/50"
          variants={cardVariant}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Contact Info */}
            <motion.div 
              className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-8"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
            >
              <motion.div 
                className="flex items-center space-x-2 text-gray-400"
                variants={linkVariants}
              >
                <Mail size={16} className="text-neon-blue" />
                <span>contact@acm-chapter.org</span>
              </motion.div>
              <motion.div 
                className="flex items-center space-x-2 text-gray-400"
                variants={linkVariants}
              >
                <MapPin size={16} className="text-neon-blue" />
                <span>University Campus, Tech Building</span>
              </motion.div>
            </motion.div>

            {/* Copyright */}
            <motion.p 
              className="text-gray-500 text-sm"
              variants={textReveal}
            >
              © 2024 ACM Student Chapter. All rights reserved.
            </motion.p>
          </div>
        </motion.div>
      </div>

      {/* Subtle Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-neon-blue/5 via-transparent to-transparent pointer-events-none" />
    </motion.footer>
  )
}

export default Footer
