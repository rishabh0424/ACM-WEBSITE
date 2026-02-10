'use client'

import { motion } from 'framer-motion'
import { BookOpen, Calendar, User } from 'lucide-react'
import NewsletterHero from '@/components/ui/newsletter-hero'

const posts = [
  {
    id: 1,
    title: 'The Future of AI in Software Development',
    date: '2024-02-04',
    author: 'ACM Tech Team',
    excerpt: 'Exploring how artificial intelligence is revolutionizing the way we write, test, and deploy code. From AI-powered IDEs to automated testing frameworks.',
    category: 'Technology',
    readTime: '5 min read'
  },
  {
    id: 2,
    title: 'Building Scalable Web Applications with Next.js',
    date: '2024-02-02',
    author: 'Web Dev Team',
    excerpt: 'A comprehensive guide to creating high-performance web applications using Next.js 14, covering server components, routing, and optimization techniques.',
    category: 'Web Development',
    readTime: '8 min read'
  },
  {
    id: 3,
    title: 'ACM Hackathon 2024: Highlights and Winners',
    date: '2024-01-30',
    author: 'Events Team',
    excerpt: 'Recap of our most successful hackathon yet! Over 200 participants, 50 projects, and incredible innovations. Meet the winners and see their amazing projects.',
    category: 'Events',
    readTime: '6 min read'
  },
  {
    id: 4,
    title: 'Getting Started with Cloud Computing',
    date: '2024-01-28',
    author: 'Cloud Team',
    excerpt: 'An introduction to cloud computing concepts, services, and best practices. Learn about AWS, Azure, and Google Cloud Platform fundamentals.',
    category: 'Cloud',
    readTime: '7 min read'
  }
]

export default function NewsletterPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <NewsletterHero />
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-gradient-to-b from-black to-gray-900">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Latest Articles
          </h2>
          <p className="text-gray-400 text-base">Insights, tutorials, and stories from our community</p>
        </motion.div>

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

              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/5 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
