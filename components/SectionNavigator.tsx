'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const SectionNavigator = () => {
  const [activeSection, setActiveSection] = useState('hero')

  const sections = [
    { id: 'hero', label: 'Hero' },
    { id: 'about', label: 'About' },
    { id: 'domains', label: 'Domains' },
    { id: 'team', label: 'Team' },
    { id: 'events', label: 'Events' },
    { id: 'join', label: 'Join' }
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.3 }
    )

    sections.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden lg:block">
      <div className="flex flex-col space-y-3 p-4 rounded-2xl bg-slate-900/30 backdrop-blur-xl border border-white/10">
        {sections.map(({ id, label }) => (
          <motion.button
            key={id}
            onClick={() => scrollToSection(id)}
            className="relative text-left text-sm font-medium tracking-wide text-white px-3 py-2"
            animate={{
              scale: activeSection === id ? 1 : 0.95,
              opacity: activeSection === id ? 1 : 0.6,
              x: activeSection === id ? 4 : 0
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <AnimatePresence>
              {activeSection === id && (
                <motion.div
                  layoutId="activeGlow"
                  className="absolute -inset-1 bg-cyan-500/20 rounded-lg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                />
              )}
            </AnimatePresence>
            
            <AnimatePresence>
              {activeSection === id && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute -left-2 top-1/2 -translate-y-1/2 w-1 h-4 bg-cyan-400 rounded-full"
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  exit={{ scaleY: 0 }}
                  transition={{ duration: 0.2 }}
                />
              )}
            </AnimatePresence>

            <span className="relative z-10">{label}</span>
          </motion.button>
        ))}
      </div>
    </nav>
  )
}

export default SectionNavigator