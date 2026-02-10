import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

interface FAQProps {
  title?: string
  subtitle?: string
  categories: Record<string, string>
  faqData: Record<string, Array<{ question: string; answer: string }>>
  className?: string
  [key: string]: any
}

export const FAQ = ({ 
  title = "FAQs",
  subtitle = "",
  categories,
  faqData,
  className,
  ...props 
}: FAQProps) => {
  const categoryKeys = Object.keys(categories)
  const [selectedCategory, setSelectedCategory] = useState(categoryKeys[0])

  return (
    <section 
      className={cn(
        "relative w-full min-h-screen overflow-hidden py-20",
        className
      )}
      {...props}
    >
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <motion.h2 
            className="text-5xl md:text-6xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
          >
            {title}
          </motion.h2>
        </motion.div>

        <motion.div 
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          viewport={{ once: true }}
        >
          {Object.entries(categories).map(([key, label], index) => (
            <motion.button
              key={key}
              onClick={() => setSelectedCategory(key)}
              className={cn(
                "relative overflow-hidden whitespace-nowrap rounded-lg border px-4 py-2 text-sm font-semibold transition-all duration-300",
                selectedCategory === key
                  ? "border-blue-400 text-white bg-gradient-to-r from-blue-500/30 to-cyan-500/30 shadow-lg shadow-blue-500/20"
                  : "border-gray-600 bg-gray-900/30 text-gray-300 hover:text-white hover:border-gray-500"
              )}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.05, duration: 0.4 }}
              viewport={{ once: true }}
            >
              <span className="relative z-10">{label}</span>
            </motion.button>
          ))}
        </motion.div>

        <div className="space-y-4">
          <AnimatePresence mode="wait">
            {Object.entries(faqData).map(([category, questions]) => {
              if (selectedCategory === category) {
                return (
                  <motion.div
                    key={category}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="space-y-4"
                  >
                    {questions.map((faq, index) => (
                      <FAQItem key={index} {...faq} index={index} />
                    ))}
                  </motion.div>
                )
              }
              return null
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

const FAQItem = ({ question, answer, index }: { question: string; answer: string; index: number }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      viewport={{ once: true }}
      className={cn(
        "rounded-lg border transition-all duration-300",
        isOpen 
          ? "bg-gradient-to-br from-blue-900/40 to-cyan-900/30 border-blue-500/50 shadow-lg shadow-blue-500/10" 
          : "bg-gray-900/40 border-gray-700 hover:border-gray-600"
      )}
    >
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between gap-4 p-4 text-left"
        whileHover={{ backgroundColor: "rgba(59, 130, 246, 0.1)" }}
      >
        <span
          className={cn(
            "text-base md:text-lg font-semibold transition-colors duration-200 flex-1",
            isOpen ? "text-blue-300" : "text-gray-300"
          )}
        >
          {question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="flex-shrink-0"
        >
          <ChevronDown
            className={cn(
              "h-5 w-5 transition-colors duration-200",
              isOpen ? "text-blue-400" : "text-gray-500"
            )}
          />
        </motion.div>
      </motion.button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ delay: 0.1, duration: 0.2 }}
              className="px-4 pb-4 pt-2 border-t border-gray-700/50"
            >
              <p className="text-gray-400 leading-relaxed text-sm md:text-base">
                {answer}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
