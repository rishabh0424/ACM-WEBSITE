'use client'

import { motion } from 'framer-motion'
import { AlertTriangle, Clock } from 'lucide-react'
import ImportantNoticeHero from '@/components/ui/important-notice-hero'

const notices = [
  {
    id: 1,
    title: 'Exam Schedule Change - Immediate Action Required',
    date: '2024-02-05',
    content: 'Due to unforeseen circumstances, the mid-term examination schedule has been revised. Please check the updated schedule on the portal immediately.',
    priority: 'critical'
  },
  {
    id: 2,
    title: 'Workshop Registration Deadline Extended',
    date: '2024-02-03',
    content: 'The registration deadline for the upcoming Web Development Workshop has been extended to February 10th. Don\'t miss this opportunity!',
    priority: 'high'
  },
  {
    id: 3,
    title: 'Campus Network Maintenance',
    date: '2024-02-01',
    content: 'Scheduled network maintenance will occur on February 8th from 2 AM to 6 AM. Internet services will be temporarily unavailable.',
    priority: 'medium'
  }
]

export default function ImportantNoticePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <ImportantNoticeHero />
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-gradient-to-b from-black to-gray-900">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Critical Updates
          </h2>
          <p className="text-gray-400 text-base">Urgent notices requiring immediate attention</p>
        </motion.div>

        <div className="space-y-6">
          {notices.map((notice, index) => (
            <motion.div
              key={notice.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative bg-gray-900/50 backdrop-blur-sm border border-orange-800/30 rounded-2xl p-6 hover:border-orange-500/50 transition-all duration-300"
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <div className="absolute top-4 right-4">
                <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${
                  notice.priority === 'critical' 
                    ? 'bg-red-500/20 text-red-400 border-red-500/30' 
                    : notice.priority === 'high'
                    ? 'bg-orange-500/20 text-orange-400 border-orange-500/30'
                    : 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
                }`}>
                  {notice.priority.toUpperCase()}
                </span>
              </div>

              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className="w-5 h-5 text-orange-400" />
                <div className="flex items-center gap-1 text-gray-500 text-sm">
                  <Clock size={14} />
                  {new Date(notice.date).toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric', 
                    year: 'numeric' 
                  })}
                </div>
              </div>

              <h3 className="text-xl md:text-2xl font-bold text-white mb-3 group-hover:text-orange-400 transition-colors">
                {notice.title}
              </h3>

              <p className="text-gray-400 leading-relaxed">
                {notice.content}
              </p>

              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/0 via-orange-500/5 to-orange-500/0 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
