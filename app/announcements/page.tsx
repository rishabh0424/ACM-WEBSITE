'use client'

import { motion } from 'framer-motion'
import { Bell, Calendar, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

const announcements = [
  {
    id: 1,
    title: 'Upcoming Workshop: Web Development Bootcamp',
    date: '2024-01-15',
    content: 'Join us for an intensive 3-day web development bootcamp covering React, Next.js, and modern web technologies.',
    category: 'Workshop',
    priority: 'high'
  },
  {
    id: 2,
    title: 'ACM Membership Drive 2024',
    date: '2024-01-10',
    content: 'Register now for ACM membership and get access to exclusive events, workshops, and networking opportunities.',
    category: 'General',
    priority: 'medium'
  },
  {
    id: 3,
    title: 'Hackathon Registration Open',
    date: '2024-01-08',
    content: 'Annual ACM Hackathon is here! Form your teams and register before the deadline.',
    category: 'Event',
    priority: 'high'
  }
]

export default function AnnouncementsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white">
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent pointer-events-none" />
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <Link href="/">
            <motion.button
              className="flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-colors mb-8"
              whileHover={{ x: -5 }}
            >
              <ArrowLeft size={20} />
              Back to Home
            </motion.button>
          </Link>

          <div className="flex items-center gap-4 mb-4">
            <motion.div
              className="p-3 bg-blue-500/20 rounded-xl border border-blue-500/30"
              whileHover={{ scale: 1.05 }}
            >
              <Bell className="w-8 h-8 text-blue-400" />
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-bold">
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Announcements
              </span>
            </h1>
          </div>
          <p className="text-gray-400 text-lg">Stay updated with the latest news and events from ACM</p>
        </motion.div>

        <div className="space-y-6">
          {announcements.map((announcement, index) => (
            <motion.div
              key={announcement.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 hover:border-blue-500/50 transition-all duration-300"
              whileHover={{ scale: 1.02, y: -5 }}
            >
              {announcement.priority === 'high' && (
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 bg-red-500/20 text-red-400 text-xs font-semibold rounded-full border border-red-500/30">
                    Important
                  </span>
                </div>
              )}

              <div className="flex items-center gap-2 mb-3">
                <span className="px-3 py-1 bg-blue-500/20 text-blue-400 text-xs font-semibold rounded-full border border-blue-500/30">
                  {announcement.category}
                </span>
                <div className="flex items-center gap-1 text-gray-500 text-sm">
                  <Calendar size={14} />
                  {new Date(announcement.date).toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric', 
                    year: 'numeric' 
                  })}
                </div>
              </div>

              <h3 className="text-xl md:text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                {announcement.title}
              </h3>

              <p className="text-gray-400 leading-relaxed">
                {announcement.content}
              </p>

              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
