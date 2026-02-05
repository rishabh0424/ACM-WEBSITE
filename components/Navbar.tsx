'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Menu, X, ChevronDown, Bell, Home, Info, Lightbulb, Calendar, Users, UserPlus, Grid3x3 } from 'lucide-react'
import CircularNavigation from '@/components/ui/circular-navigation-bar'

const navItems = [
  { name: 'About', href: '/who-we-are' },
  { name: 'Why Us', href: '/why-choose-acm' },
  { name: 'Domains', href: '/domains' },
  { 
    name: 'Events', 
    href: '/events',
    dropdown: [
      { name: 'DDC', href: '/events/ddc' },
      { name: 'Infuturum', href: '/events/infuturum' },
      { name: 'Gallery', href: '/events/gallery' }
    ]
  },
  { name: 'Team', href: '#team' },
  { name: 'Join', href: '/join' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [eventsOpen, setEventsOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [circularMenuOpen, setCircularMenuOpen] = useState(false)

  const mobileNavItems = [
    { name: 'Home', icon: Home, href: '/' },
    { name: 'About', icon: Info, href: '/who-we-are' },
    { name: 'Why Us', icon: Lightbulb, href: '/why-choose-acm' },
    { name: 'Domains', icon: Grid3x3, href: '/domains' },
    { name: 'Events', icon: Calendar, href: '/events' },
    { name: 'Team', icon: Users, href: '#team' },
    { name: 'Join', icon: UserPlus, href: '/join' },
  ]

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav
      className={`fixed top-0 w-full z-40 transition-all duration-300 ${
        scrolled ? 'bg-black/90 backdrop-blur-md border-b border-gray-800/50' : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          {/* Logo - Left Corner */}
          <motion.a
            href="/"
            whileHover={{ scale: 1.05 }}
          >
            <div className="relative w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32">
              <img
                src="/photos/logo.png"
                alt="ACM Logo"
                className="w-full h-full object-contain mix-blend-screen"
              />
            </div>
          </motion.a>

          {/* Desktop Navigation - Right Corner */}
          <div className="hidden md:flex items-center space-x-4 lg:space-x-8">
            {/* Announcement Button */}
            <motion.a
              href="/announcements"
              className="text-gray-300 hover:text-blue-400 transition-colors relative"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              title="Announcements"
            >
              <Bell size={20} />
            </motion.a>

            {navItems.map((item, index) => (
              item.dropdown ? (
                <div key={item.name} className="relative group">
                  <motion.a
                    href={item.href}
                    className="text-gray-300 hover:text-blue-400 transition-colors flex items-center gap-1 cursor-pointer"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    onMouseEnter={() => setEventsOpen(true)}
                  >
                    {item.name}
                    <ChevronDown size={16} className="group-hover:rotate-180 transition-transform" />
                  </motion.a>
                  {eventsOpen && (
                    <motion.div
                      className="absolute top-full left-0 mt-2 w-40 bg-black/95 backdrop-blur-md border border-gray-800 rounded-lg overflow-hidden"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      onMouseLeave={() => setEventsOpen(false)}
                    >
                      {item.dropdown.map((subItem) => (
                        <a
                          key={subItem.name}
                          href={subItem.href}
                          className="block px-4 py-2 text-gray-300 hover:text-blue-400 hover:bg-blue-500/10 transition-colors"
                        >
                          {subItem.name}
                        </a>
                      ))}
                    </motion.div>
                  )}
                </div>
              ) : (
                <motion.a
                  key={item.name}
                  href={item.href}
                  className="text-gray-300 hover:text-blue-400 transition-colors relative group"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  whileHover={{ y: -2 }}
                >
                  {item.name}
                  <motion.div
                    className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300"
                  />
                </motion.a>
              )
            ))}
            
            <motion.button
              onClick={() => window.location.href = '/join'}
              className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg text-white font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Join Now
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden text-white"
            onClick={() => isMobile ? setCircularMenuOpen(!circularMenuOpen) : setIsOpen(!isOpen)}
            whileTap={{ scale: 0.95 }}
          >
            <Menu size={24} />
          </motion.button>
        </div>
      </div>

      {/* Circular Navigation for Mobile */}
      {isMobile && (
        <CircularNavigation
          navItems={mobileNavItems}
          isOpen={circularMenuOpen}
          toggleMenu={() => setCircularMenuOpen(!circularMenuOpen)}
        />
      )}

      {/* Mobile Menu */}
      <motion.div
        className={`md:hidden bg-black/95 backdrop-blur-md border-t border-neon-blue/20 ${
          isOpen ? 'block' : 'hidden'
        }`}
        initial={{ opacity: 0, height: 0 }}
        animate={{ 
          opacity: isOpen ? 1 : 0, 
          height: isOpen ? 'auto' : 0 
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="px-4 py-4 space-y-4">
          {/* Announcement Button Mobile */}
          <a
            href="/announcements"
            className="flex items-center gap-2 text-gray-300 hover:text-blue-400 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            <Bell size={18} />
            Announcements
          </a>

          {navItems.map((item) => (
            item.dropdown ? (
              <div key={item.name}>
                <a
                  href={item.href}
                  className="block text-gray-300 hover:text-blue-400 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </a>
                <div className="pl-4 mt-2 space-y-2">
                  {item.dropdown.map((subItem) => (
                    <a
                      key={subItem.name}
                      href={subItem.href}
                      className="block text-gray-400 hover:text-blue-400 transition-colors text-sm"
                      onClick={() => setIsOpen(false)}
                    >
                      {subItem.name}
                    </a>
                  ))}
                </div>
              </div>
            ) : (
              <a
                key={item.name}
                href={item.href}
                className="block text-gray-300 hover:text-blue-400 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </a>
            )
          ))}
          <button 
            onClick={() => window.location.href = '/join'}
            className="w-full px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg text-white font-medium"
          >
            Join Now
          </button>
        </div>
      </motion.div>
    </motion.nav>
  )
}