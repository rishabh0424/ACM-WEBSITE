'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { ArrowLeft, Code, Users, Palette, Megaphone, Calendar, TrendingUp, CheckCircle2, ArrowRight, Plus, Minus, HelpCircle, Brain, Sparkles, Eye, Search, Briefcase, Share2, Pen, Video, MessageCircle } from 'lucide-react'
import Link from 'next/link'

const faqs = [
  {
    question: 'What is ACM and why should I join?',
    answer: 'ACM (Association for Computing Machinery) is the world\'s largest educational and scientific computing society. Joining ACM gives you access to exclusive workshops, networking opportunities, industry connections, and hands-on project experience.'
  },
  {
    question: 'Do I need prior experience to join?',
    answer: 'No prior experience is required! We welcome students from all backgrounds and skill levels. Our community is built on learning together, and we provide mentorship and resources to help you grow.'
  },
  {
    question: 'Can I join multiple departments?',
    answer: 'While we encourage focus on one department initially, you can contribute to multiple departments based on your interests and availability. We value versatile members who want to explore different areas.'
  },
  {
    question: 'What is the time commitment?',
    answer: 'The time commitment varies by department and role. On average, members contribute 3-5 hours per week. We understand academic priorities and offer flexible participation options.'
  },
  {
    question: 'Are there any membership fees?',
    answer: 'Basic membership is free! However, there may be nominal fees for specific workshops, events, or ACM international membership benefits. We ensure all core activities remain accessible to everyone.'
  },
  {
    question: 'How does the selection process work?',
    answer: 'After submitting your application, our team reviews it within 5-7 days. Shortlisted candidates may be invited for a brief interview or task. We focus on enthusiasm, commitment, and cultural fit rather than just technical skills.'
  }
]

const FAQItem = ({ faq, index }: { faq: typeof faqs[0], index: number }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1, type: 'spring', stiffness: 100 }}
      whileHover={{ scale: 1.02, x: 10 }}
      className="relative group"
    >
      {/* Glow Effect */}
      <motion.div
        className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl opacity-0 group-hover:opacity-20 blur transition-opacity"
        animate={isOpen ? { opacity: 0.3 } : {}}
      />
      
      <div className="relative border border-gray-700 rounded-2xl overflow-hidden backdrop-blur-xl bg-gradient-to-br from-gray-900/60 to-gray-800/40 hover:border-blue-500/50 transition-all shadow-lg hover:shadow-blue-500/20">
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-6 py-5 flex items-center justify-between text-left group/button"
          whileHover={{ backgroundColor: 'rgba(59, 130, 246, 0.08)' }}
        >
          <div className="flex items-center gap-4 flex-1">
            <motion.div
              className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center border border-blue-500/30 flex-shrink-0"
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-blue-400 font-bold text-sm">{index + 1}</span>
            </motion.div>
            <span className="text-lg font-semibold text-white group-hover/button:text-blue-400 transition-colors pr-4">
              {faq.question}
            </span>
          </div>
          <motion.div
            animate={{ 
              rotate: isOpen ? 180 : 0,
              scale: isOpen ? 1.1 : 1
            }}
            transition={{ duration: 0.3, type: 'spring', stiffness: 200 }}
            className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center border border-blue-500/30"
          >
            {isOpen ? (
              <Minus className="w-5 h-5 text-blue-400" />
            ) : (
              <Plus className="w-5 h-5 text-gray-400 group-hover/button:text-blue-400 transition-colors" />
            )}
          </motion.div>
        </motion.button>
        
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="overflow-hidden"
            >
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="px-6 pb-6 pt-2"
              >
                <div className="pl-14 pr-4">
                  <div className="h-px bg-gradient-to-r from-blue-500/50 via-cyan-500/50 to-transparent mb-4" />
                  <p className="text-gray-300 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

const departments = {
  technical: [
    { id: 'nlp', name: 'Natural Language Processing', icon: MessageCircle, description: 'Work with text analysis and language models', color: 'from-blue-500 to-cyan-500' },
    { id: 'genai', name: 'Generative AI', icon: Sparkles, description: 'Create AI models that generate content', color: 'from-purple-500 to-pink-500' },
    { id: 'rl', name: 'Reinforcement Learning', icon: TrendingUp, description: 'Build intelligent decision-making systems', color: 'from-green-500 to-emerald-500' },
    { id: 'cv', name: 'Computer Vision', icon: Eye, description: 'Develop image and video analysis systems', color: 'from-orange-500 to-red-500' },
    { id: 'research', name: 'Research', icon: Search, description: 'Explore cutting-edge AI technologies', color: 'from-indigo-500 to-purple-500' },
  ],
  nonTechnical: [
    { id: 'management', name: 'Management Team', icon: Briefcase, description: 'Lead operations and strategic planning', color: 'from-blue-500 to-indigo-500' },
    { id: 'pr', name: 'PR/Outreach Team', icon: Megaphone, description: 'Build relationships and partnerships', color: 'from-yellow-500 to-orange-500' },
    { id: 'creative', name: 'Creative Team', icon: Palette, description: 'Design visual content and branding', color: 'from-pink-500 to-rose-500' },
    { id: 'multimedia', name: 'Multimedia Team', icon: Video, description: 'Create video and audio content', color: 'from-purple-500 to-violet-500' },
    { id: 'social', name: 'Social Media', icon: Share2, description: 'Manage online presence and engagement', color: 'from-cyan-500 to-blue-500' },
  ]
}

export default function JoinPage() {
  const [step, setStep] = useState(1)
  const [selectedType, setSelectedType] = useState<'technical' | 'nonTechnical' | null>(null)
  const [selectedDept, setSelectedDept] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    studentId: '',
    year: '',
    branch: '',
    section: '',
    whyJoin: '',
    skills: '',
    previousExperience: '',
    expectations: '',
    availability: '',
    socialLinks: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log({ ...formData, departmentType: selectedType, department: selectedDept })
    alert('Application submitted successfully!')
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        {/* Gradient Orbs - Blue Theme */}
        <motion.div
          className="absolute top-0 left-0 w-[600px] h-[600px] bg-blue-600/40 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-cyan-600/40 rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 left-1/3 w-[550px] h-[550px] bg-blue-500/40 rounded-full blur-3xl"
          animate={{
            x: [0, -50, 0],
            y: [0, -50, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.05)_1px,transparent_1px)] bg-[size:50px_50px]" />
        
        {/* Floating Particles */}
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/60 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link href="/">
          <motion.button
            className="flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-colors mb-8"
            whileHover={{ x: -5 }}
          >
            <ArrowLeft size={20} />
            Back to Home
          </motion.button>
        </Link>

        {/* Progress Bar */}
        <div className="mb-16">
          <div className="flex items-center justify-center gap-2 md:gap-4">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center">
                <motion.div
                  className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg border-2 ${
                    step >= s 
                      ? 'bg-gradient-to-br from-blue-500 to-cyan-500 text-white border-blue-400 shadow-lg shadow-blue-500/50' 
                      : 'bg-gray-800/50 text-gray-500 border-gray-700'
                  }`}
                  animate={{ 
                    scale: step === s ? [1, 1.1, 1] : 1,
                  }}
                  transition={{ duration: 0.5, repeat: step === s ? Infinity : 0, repeatDelay: 1 }}
                >
                  {step > s ? <CheckCircle2 size={24} /> : s}
                </motion.div>
                {s < 3 && (
                  <motion.div 
                    className={`w-12 md:w-20 h-1 rounded-full ${
                      step > s ? 'bg-gradient-to-r from-blue-500 to-cyan-500' : 'bg-gray-800'
                    }`}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: step > s ? 1 : 0 }}
                    transition={{ duration: 0.5 }}
                  />
                )}
              </div>
            ))}
          </div>
          <motion.div 
            className="text-center mt-6 text-gray-300 font-semibold text-lg"
            key={step}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {step === 1 && '🎯 Choose Department Type'}
            {step === 2 && '🚀 Select Your Domain'}
            {step === 3 && '📝 Complete Registration'}
          </motion.div>
        </div>

        <AnimatePresence mode="wait">
          {/* Step 1: Department Type */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="max-w-5xl mx-auto"
            >
              <motion.h1 
                className="text-5xl md:text-7xl font-bold text-center mb-6"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 100 }}
              >
                <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent drop-shadow-2xl">
                  Choose Your Path
                </span>
              </motion.h1>
              <motion.p 
                className="text-gray-300 text-center mb-16 text-xl max-w-3xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Join the team that matches your passion and unlock your potential in the world of technology
              </motion.p>

              <div className="grid md:grid-cols-2 gap-8">
                <motion.div
                  whileHover={{ scale: 1.03, y: -8, rotateY: 5 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => { setSelectedType('technical'); setStep(2) }}
                  className="cursor-pointer group relative bg-gradient-to-br from-blue-600/30 via-blue-500/20 to-cyan-600/30 backdrop-blur-xl border-2 border-blue-400/40 rounded-3xl p-8 hover:border-blue-300 transition-all shadow-2xl hover:shadow-blue-500/60"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl" />
                  <motion.div
                    className="absolute inset-0 rounded-3xl"
                    animate={{
                      boxShadow: [
                        '0 0 20px rgba(59, 130, 246, 0.3)',
                        '0 0 60px rgba(59, 130, 246, 0.5)',
                        '0 0 20px rgba(59, 130, 246, 0.3)',
                      ],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Code className="w-16 h-16 text-blue-300 mb-6" />
                  </motion.div>
                  <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text text-transparent">Technical</h3>
                  <p className="text-gray-300 mb-6 text-lg leading-relaxed">
                    Build, code, and innovate. Perfect for developers, programmers, and tech enthusiasts.
                  </p>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-blue-400" /> Natural Language Processing</li>
                    <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-blue-400" /> Generative AI</li>
                    <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-blue-400" /> Computer Vision</li>
                    <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-blue-400" /> Research</li>
                  </ul>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.03, y: -8, rotateY: -5 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => { setSelectedType('nonTechnical'); setStep(2) }}
                  className="cursor-pointer group relative bg-gradient-to-br from-cyan-600/30 via-blue-500/20 to-blue-600/30 backdrop-blur-xl border-2 border-cyan-400/40 rounded-3xl p-8 hover:border-cyan-300 transition-all shadow-2xl hover:shadow-cyan-500/60"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 to-blue-400/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl" />
                  <motion.div
                    className="absolute inset-0 rounded-3xl"
                    animate={{
                      boxShadow: [
                        '0 0 20px rgba(6, 182, 212, 0.3)',
                        '0 0 60px rgba(6, 182, 212, 0.5)',
                        '0 0 20px rgba(6, 182, 212, 0.3)',
                      ],
                    }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                  />
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Users className="w-16 h-16 text-cyan-300 mb-6" />
                  </motion.div>
                  <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">Non-Technical</h3>
                  <p className="text-gray-300 mb-6 text-lg leading-relaxed">
                    Create, manage, and communicate. Ideal for designers, writers, and organizers.
                  </p>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-cyan-400" /> Management Team</li>
                    <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-cyan-400" /> PR/Outreach</li>
                    <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-cyan-400" /> Creative Team</li>
                    <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-cyan-400" /> Social Media</li>
                  </ul>
                </motion.div>
              </div>

              {/* FAQs Section */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, type: 'spring' }}
                className="mt-24 pt-16 border-t border-gray-800/50 relative"
              >
                {/* Background Decoration */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
                
                <div className="text-center mb-16 relative">
                  <motion.div
                    className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 mb-6 shadow-lg shadow-blue-500/50"
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <HelpCircle className="w-10 h-10 text-white" />
                  </motion.div>
                  <motion.h2 
                    className="text-4xl md:text-5xl font-bold mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
                      Frequently Asked Questions
                    </span>
                  </motion.h2>
                  <motion.p 
                    className="text-gray-400 text-lg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    Everything you need to know about joining ACM
                  </motion.p>
                </div>

                <div className="space-y-4 max-w-4xl mx-auto relative">
                  {faqs.map((faq, index) => (
                    <FAQItem key={index} faq={faq} index={index} />
                  ))}
                </div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1 }}
                  className="text-center mt-16 relative"
                >
                  <div className="relative inline-block">
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl blur-xl opacity-50"
                      animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.5, 0.7, 0.5],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <div className="relative p-8 bg-gradient-to-br from-blue-900/40 to-cyan-900/40 backdrop-blur-xl rounded-2xl border border-blue-500/30 shadow-2xl">
                      <p className="text-gray-200 mb-6 text-lg font-semibold">Still have questions?</p>
                      <motion.a
                        href="mailto:contact@acm.org"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl text-white font-semibold shadow-lg shadow-blue-500/50 hover:shadow-blue-500/70 transition-all group"
                      >
                        <span>Contact Us</span>
                        <motion.div
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </motion.div>
                      </motion.a>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          )}

          {/* Step 2: Department Selection */}
          {step === 2 && selectedType && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 100 }}
              className="max-w-6xl mx-auto"
            >
              <motion.h1 
                className="text-5xl md:text-7xl font-bold text-center mb-6"
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                transition={{ type: 'spring', stiffness: 100 }}
              >
                <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent drop-shadow-2xl">
                  Choose Your Domain
                </span>
              </motion.h1>
              <motion.p 
                className="text-gray-300 text-center mb-20 text-xl max-w-3xl mx-auto leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                Select the department that aligns with your passion and skills. Each domain offers unique opportunities for growth.
              </motion.p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                {departments[selectedType].map((dept, index) => (
                  <motion.div
                    key={dept.id}
                    initial={{ opacity: 0, y: 50, rotateX: -20 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{ delay: index * 0.15, type: 'spring', stiffness: 80 }}
                    whileHover={{ scale: 1.08, y: -20, rotateZ: 3, transition: { duration: 0.3 } }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedDept(dept.id)}
                    className={`cursor-pointer relative group ${
                      selectedDept === dept.id 
                        ? 'bg-gradient-to-br from-blue-600/50 to-cyan-600/50 border-2 border-blue-400 shadow-2xl shadow-blue-500/70' 
                        : 'bg-gradient-to-br from-gray-900/70 to-gray-800/50 border-2 border-gray-700 hover:border-blue-500/60 hover:shadow-2xl hover:shadow-blue-500/40'
                    } backdrop-blur-xl rounded-3xl p-8 transition-all`}
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    {/* Glow Effect */}
                    <motion.div
                      className={`absolute -inset-1 bg-gradient-to-r ${dept.color} rounded-3xl opacity-0 group-hover:opacity-30 blur-xl transition-opacity`}
                      animate={selectedDept === dept.id ? { opacity: 0.4 } : {}}
                    />
                    
                    {/* Content */}
                    <div className="relative z-10">
                      <motion.div
                        className={`w-24 h-24 rounded-2xl bg-gradient-to-br ${dept.color} flex items-center justify-center mb-6 shadow-2xl mx-auto`}
                        whileHover={{ rotate: [0, -15, 15, -15, 0], scale: 1.2 }}
                        transition={{ duration: 0.6 }}
                      >
                        <dept.icon className="w-12 h-12 text-white" strokeWidth={2.5} />
                      </motion.div>
                      
                      <h3 className="text-2xl font-bold mb-3 text-center text-white group-hover:text-blue-300 transition-colors">
                        {dept.name}
                      </h3>
                      <p className="text-gray-300 text-center text-base leading-relaxed group-hover:text-gray-200 transition-colors">
                        {dept.description}
                      </p>
                      
                      {/* Selection Indicator */}
                      <AnimatePresence>
                        {selectedDept === dept.id && (
                          <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            exit={{ scale: 0, rotate: 180 }}
                            className="absolute -top-4 -right-4 w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center shadow-2xl shadow-blue-500/60 border-4 border-gray-900"
                          >
                            <CheckCircle2 className="text-white" size={28} strokeWidth={3} />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="flex justify-center gap-6 mt-4">
                <motion.button
                  whileHover={{ scale: 1.08, x: -8 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setStep(1)}
                  className="px-12 py-4 bg-gray-800/90 backdrop-blur-sm rounded-xl text-white font-bold text-lg hover:bg-gray-700 transition-all border-2 border-gray-700 hover:border-gray-600 shadow-xl"
                >
                  ← Back
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.08, boxShadow: '0 25px 70px rgba(59, 130, 246, 0.7)' }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => selectedDept && setStep(3)}
                  disabled={!selectedDept}
                  className="px-12 py-4 bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-600 rounded-xl text-white font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3 shadow-2xl shadow-blue-500/60 hover:shadow-blue-500/80 transition-all border-2 border-blue-400/50 relative overflow-hidden group"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-400"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.6 }}
                  />
                  <span className="relative z-10">Continue</span>
                  <ArrowRight size={22} className="relative z-10" />
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Registration Form */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="max-w-3xl mx-auto"
            >
              <motion.h1 
                className="text-5xl md:text-7xl font-bold text-center mb-6"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring' }}
              >
                <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent drop-shadow-2xl">
                  Join ACM Club
                </span>
              </motion.h1>
              <motion.p 
                className="text-gray-300 text-center mb-12 text-xl max-w-3xl mx-auto leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                Become part of our vibrant tech community and unlock endless opportunities for growth, learning, and innovation
              </motion.p>

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Personal Information */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.01 }}
                  className="bg-gradient-to-br from-blue-900/20 to-cyan-900/20 backdrop-blur-xl border border-blue-500/30 rounded-2xl p-6 shadow-xl hover:shadow-blue-500/30 transition-all"
                >
                  <h3 className="text-xl font-bold text-blue-400 mb-4 flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
                      <Users size={18} />
                    </div>
                    Personal Information
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2 text-gray-300">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                        className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all text-white placeholder-gray-500"
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2 text-gray-300">College Email *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all text-white placeholder-gray-500"
                        placeholder="your.email@college.edu"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2 text-gray-300">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all text-white placeholder-gray-500"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2 text-gray-300">Student ID *</label>
                      <input
                        type="text"
                        required
                        value={formData.studentId}
                        onChange={(e) => setFormData({...formData, studentId: e.target.value})}
                        className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all text-white placeholder-gray-500"
                        placeholder="2024CS001"
                      />
                    </div>
                  </div>
                </motion.div>

                {/* Academic Information */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  whileHover={{ scale: 1.01 }}
                  className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 backdrop-blur-xl border border-purple-500/30 rounded-2xl p-6 shadow-xl hover:shadow-purple-500/30 transition-all"
                >
                  <h3 className="text-xl font-bold text-purple-400 mb-4 flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center">
                      <Code size={18} />
                    </div>
                    Academic Details
                  </h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2 text-gray-300">Current Year *</label>
                      <select
                        required
                        value={formData.year}
                        onChange={(e) => setFormData({...formData, year: e.target.value})}
                        className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none transition-all text-white"
                      >
                        <option value="">Select Year</option>
                        <option value="1">1st Year</option>
                        <option value="2">2nd Year</option>
                        <option value="3">3rd Year</option>
                        <option value="4">4th Year</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2 text-gray-300">Branch/Major *</label>
                      <select
                        required
                        value={formData.branch}
                        onChange={(e) => setFormData({...formData, branch: e.target.value})}
                        className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none transition-all text-white"
                      >
                        <option value="">Select Branch</option>
                        <option value="CSE">Computer Science</option>
                        <option value="IT">Information Technology</option>
                        <option value="ECE">Electronics & Communication</option>
                        <option value="EEE">Electrical Engineering</option>
                        <option value="MECH">Mechanical Engineering</option>
                        <option value="OTHER">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2 text-gray-300">Section</label>
                      <input
                        type="text"
                        value={formData.section}
                        onChange={(e) => setFormData({...formData, section: e.target.value})}
                        className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none transition-all text-white placeholder-gray-500"
                        placeholder="A, B, C..."
                      />
                    </div>
                  </div>
                </motion.div>

                {/* Club Interest */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  whileHover={{ scale: 1.01 }}
                  className="bg-gradient-to-br from-cyan-900/20 to-blue-900/20 backdrop-blur-xl border border-cyan-500/30 rounded-2xl p-6 shadow-xl hover:shadow-cyan-500/30 transition-all"
                >
                  <h3 className="text-xl font-bold text-cyan-400 mb-4 flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                      <CheckCircle2 size={18} />
                    </div>
                    Tell Us About Yourself
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2 text-gray-300">Why do you want to join ACM Club? *</label>
                      <textarea
                        required
                        value={formData.whyJoin}
                        onChange={(e) => setFormData({...formData, whyJoin: e.target.value})}
                        rows={3}
                        className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 focus:outline-none transition-all resize-none text-white placeholder-gray-500"
                        placeholder="Share your motivation and what excites you about joining ACM..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2 text-gray-300">Your Skills & Interests *</label>
                      <textarea
                        required
                        value={formData.skills}
                        onChange={(e) => setFormData({...formData, skills: e.target.value})}
                        rows={3}
                        className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 focus:outline-none transition-all resize-none text-white placeholder-gray-500"
                        placeholder="e.g., Web Development, Python, UI/UX Design, Event Management..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2 text-gray-300">Previous Club/Project Experience</label>
                      <textarea
                        value={formData.previousExperience}
                        onChange={(e) => setFormData({...formData, previousExperience: e.target.value})}
                        rows={3}
                        className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 focus:outline-none transition-all resize-none text-white placeholder-gray-500"
                        placeholder="Any previous experience with clubs, projects, or tech communities..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2 text-gray-300">What do you expect from ACM? *</label>
                      <textarea
                        required
                        value={formData.expectations}
                        onChange={(e) => setFormData({...formData, expectations: e.target.value})}
                        rows={2}
                        className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 focus:outline-none transition-all resize-none text-white placeholder-gray-500"
                        placeholder="Your expectations and goals from joining ACM..."
                      />
                    </div>
                  </div>
                </motion.div>

                {/* Additional Information */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  whileHover={{ scale: 1.01 }}
                  className="bg-gradient-to-br from-green-900/20 to-emerald-900/20 backdrop-blur-xl border border-green-500/30 rounded-2xl p-6 shadow-xl hover:shadow-green-500/30 transition-all"
                >
                  <h3 className="text-xl font-bold text-green-400 mb-4 flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center">
                      <TrendingUp size={18} />
                    </div>
                    Additional Details
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2 text-gray-300">Weekly Availability (Hours) *</label>
                      <select
                        required
                        value={formData.availability}
                        onChange={(e) => setFormData({...formData, availability: e.target.value})}
                        className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none transition-all text-white"
                      >
                        <option value="">Select your availability</option>
                        <option value="2-4">2-4 hours/week</option>
                        <option value="4-6">4-6 hours/week</option>
                        <option value="6-8">6-8 hours/week</option>
                        <option value="8+">8+ hours/week</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2 text-gray-300">Social Links (LinkedIn, GitHub, Portfolio)</label>
                      <input
                        type="text"
                        value={formData.socialLinks}
                        onChange={(e) => setFormData({...formData, socialLinks: e.target.value})}
                        className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none transition-all text-white placeholder-gray-500"
                        placeholder="https://linkedin.com/in/yourprofile, https://github.com/username"
                      />
                    </div>
                  </div>
                </motion.div>

                <div className="flex justify-center gap-4 pt-6">
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.05, x: -5 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setStep(2)}
                    className="px-8 py-3 bg-gray-800/80 backdrop-blur-sm rounded-xl text-white font-semibold hover:bg-gray-700 transition-all border border-gray-700 hover:border-gray-600"
                  >
                    Back
                  </motion.button>
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.05, boxShadow: '0 20px 60px rgba(59, 130, 246, 0.5)' }}
                    whileTap={{ scale: 0.95 }}
                    className="px-12 py-3 bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-600 rounded-xl text-white font-semibold shadow-lg shadow-blue-500/30 hover:shadow-blue-500/60 transition-all relative overflow-hidden group"
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '100%' }}
                      transition={{ duration: 0.5 }}
                    />
                    <span className="relative z-10">Submit Application</span>
                  </motion.button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
