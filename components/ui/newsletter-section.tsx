'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Send } from 'lucide-react'

interface NewsletterInputProps {
  placeholder?: string
  [key: string]: any
}

const NewsletterInput = (props: NewsletterInputProps) => {
  const { placeholder, ...rest } = props
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    })
  }

  return (
    <div className="relative w-full">
      <div className="relative w-full">
        <input
          type="email"
          className="peer relative z-10 border-2 border-blue-500/30 h-12 w-full rounded-lg bg-gray-900/50 px-4 font-light outline-none transition-all duration-200 ease-in-out focus:bg-gray-900 focus:border-blue-500 placeholder:text-gray-400"
          placeholder={placeholder}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          {...rest}
        />
        {isHovering && (
          <>
            <div
              className="absolute pointer-events-none top-0 left-0 right-0 h-[2px] z-20 rounded-t-lg overflow-hidden"
              style={{
                background: `radial-gradient(30px circle at ${mousePosition.x}px 0px, #3b82f6 0%, transparent 70%)`,
              }}
            />
            <div
              className="absolute pointer-events-none bottom-0 left-0 right-0 h-[2px] z-20 rounded-b-lg overflow-hidden"
              style={{
                background: `radial-gradient(30px circle at ${mousePosition.x}px 2px, #3b82f6 0%, transparent 70%)`,
              }}
            />
          </>
        )}
      </div>
    </div>
  )
}

export const NewsletterSection = () => {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubmitted(true)
      setEmail('')
      setTimeout(() => setSubmitted(false), 3000)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="min-h-screen flex items-center justify-center py-8"
    >
      <div className="w-full max-w-2xl px-4">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-900/20 via-purple-900/20 to-blue-900/20 border border-blue-500/20 p-12 md:p-16">
          {/* Background gradient effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-blue-500/5 pointer-events-none" />

          <div className="relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <Mail className="w-12 h-12 mx-auto text-blue-400 mb-4" />
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
                Get Latest Updates
              </h2>
              <p className="text-gray-300 text-lg">
                Subscribe to our newsletter and stay updated with the latest ACM events, workshops, and announcements.
              </p>
            </motion.div>

            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-3 mt-8"
            >
              <div className="flex-1">
                <NewsletterInput
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                  required
                />
              </div>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative inline-flex justify-center items-center overflow-hidden rounded-lg bg-blue-600 px-6 py-3 text-white font-semibold transition-all duration-300 ease-in-out hover:shadow-lg hover:shadow-blue-500/50"
              >
                <span className="flex items-center gap-2">
                  <Send className="w-4 h-4" />
                  Subscribe
                </span>
                <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-13deg)_translateX(-100%)] group-hover:duration-1000 group-hover:[transform:skew(-13deg)_translateX(100%)]">
                  <div className="relative h-full w-8 bg-white/20" />
                </div>
              </motion.button>
            </motion.form>

            {submitted && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-4 p-3 bg-green-500/20 border border-green-500/50 rounded-lg text-green-300"
              >
                ✓ Thank you for subscribing! Check your email for confirmation.
              </motion.div>
            )}

            <p className="text-gray-400 text-sm mt-6">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
