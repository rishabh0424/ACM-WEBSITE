'use client'

import { motion } from 'framer-motion'
import { Bell, Calendar, AlertTriangle, BookOpen, Clock, User, Zap, Users, Lightbulb, Code } from 'lucide-react'
import { useRouter } from 'next/navigation'
import AnnouncementsHero from '@/components/ui/announcements-hero'
import HorizontalFlipGallery from '@/components/ui/horizontal-flip-gallery'
import NewsletterPage from '@/components/ui/newsletter-page'
import { ServiceCarousel, type Service } from '@/components/ui/services-card'

const notices = [
  {
    id: 1,
    title: 'Exam Schedule Change - Immediate Action Required',
    date: '2024-02-05',
    content: 'Due to unforeseen circumstances, the mid-term examination schedule has been revised. Please check the updated schedule on the portal immediately.',
    priority: 'critical',
    type: 'notice'
  },
  {
    id: 2,
    title: 'Workshop Registration Deadline Extended',
    date: '2024-02-03',
    content: 'The registration deadline for the upcoming Web Development Workshop has been extended to February 10th. Don\'t miss this opportunity!',
    priority: 'high',
    type: 'notice'
  }
]

const posts = [
  {
    id: 1,
    title: 'DDC - Design & Development Challenge',
    date: '2024-02-04',
    author: 'ACM Events Team',
    excerpt: 'Our flagship event bringing together designers and developers to create innovative solutions. Experience the thrill of collaborative problem-solving.',
    category: 'Events',
    readTime: '5 min read',
    type: 'blog'
  },
  {
    id: 2,
    title: 'Infuturum - Future of Technology',
    date: '2024-02-02',
    author: 'ACM Tech Team',
    excerpt: 'A visionary event exploring emerging technologies and their impact on society. Join us in shaping the future of innovation.',
    category: 'Events',
    readTime: '6 min read',
    type: 'blog'
  }
]

const announcements: Service[] = [
  {
    number: "001",
    title: "Web Development Bootcamp",
    description: "Join us for an intensive 3-day web development bootcamp covering React, Next.js, and modern web technologies.",
    icon: Code,
    gradient: "from-blue-100 to-blue-200 dark:from-blue-900/50 dark:to-blue-800/50"
  },
  {
    number: "002",
    title: "ACM Membership Drive 2024",
    description: "Register now for ACM membership and get access to exclusive events, workshops, and networking opportunities.",
    icon: Users,
    gradient: "from-purple-100 to-purple-200 dark:from-purple-900/50 dark:to-purple-800/50"
  },
  {
    number: "003",
    title: "Hackathon Registration Open",
    description: "Annual ACM Hackathon is here! Form your teams and register before the deadline.",
    icon: Zap,
    gradient: "from-orange-100 to-orange-200 dark:from-orange-900/50 dark:to-orange-800/50"
  },
  {
    number: "004",
    title: "Innovation Workshop",
    description: "Explore cutting-edge technologies and learn from industry experts in this hands-on workshop.",
    icon: Lightbulb,
    gradient: "from-green-100 to-green-200 dark:from-green-900/50 dark:to-green-800/50"
  }
]

export default function AnnouncementsPage() {
  const router = useRouter();
  
  return (
    <div className="min-h-screen bg-black text-white">
      <AnnouncementsHero />
      
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black to-gray-900">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="min-h-screen flex flex-col justify-center py-8"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
            General Announcements
          </h2>
          <p className="text-gray-400 text-base mb-6">Check out what's happening in our community</p>
          
          <ServiceCarousel services={announcements} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="min-h-screen flex flex-col justify-center py-8"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
            Important Notices
          </h2>
          
          <div className="space-y-6 mb-16">
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
                      : 'bg-orange-500/20 text-orange-400 border-orange-500/30'
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
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="min-h-screen flex flex-col justify-center py-8"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
            Newsletter & Blog
          </h2>
          
          <div className="mb-8 flex justify-center">
            <HorizontalFlipGallery />
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {posts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative bg-gray-900/50 backdrop-blur-sm border border-purple-800/30 rounded-2xl p-6 hover:border-purple-500/50 transition-all duration-300 cursor-pointer"
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 bg-purple-500/20 text-purple-400 text-xs font-semibold rounded-full border border-purple-500/30">
                    {post.category}
                  </span>
                  <span className="text-gray-500 text-sm">{post.readTime}</span>
                </div>

                <h3 className="text-xl md:text-2xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors">
                  {post.title}
                </h3>

                <p className="text-gray-400 leading-relaxed mb-4">
                  {post.excerpt}
                </p>

                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <User size={14} />
                    {post.author}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar size={14} />
                    {new Date(post.date).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric', 
                      year: 'numeric' 
                    })}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Newsletter Section */}
        <NewsletterPage />
      </div>
    </div>
  )
}
