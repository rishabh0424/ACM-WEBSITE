'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { Code, Users, CheckCircle2, ArrowRight, Mouse } from 'lucide-react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import { FAQ } from '@/components/ui/faq-tabs'
import dynamic from "next/dynamic";

const InteractiveRobotSpline = dynamic(
  () =>
    import("@/components/ui/interactive-3d-robot").then(
      (mod) => mod.InteractiveRobotSpline
    ),
  { ssr: false, loading: () => <div className="w-full h-full bg-gray-900"></div> }
);


export default function JoinPage() {
  const [step, setStep] = useState(1)
  const [selectedType, setSelectedType] = useState<'technical' | 'nonTechnical' | null>(null)
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null)
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
    experience: '',
    expectations: '',
    availability: '',
    linkedIn: '',
    github: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log({ ...formData, departmentType: selectedType, domain: selectedDomain })
    alert('Application submitted successfully!')
  }

  const domains = [
    { name: 'Web Development', icon: '🌐' },
    { name: 'AI & Machine Learning', icon: '🤖' },
    { name: 'Mobile Development', icon: '📱' },
    { name: 'Cloud Computing', icon: '☁️' }
  ]

  const ROBOT_SCENE_URL = "https://prod.spline.design/PyzDhpQ9E5f1E3MT/scene.splinecode"

  return (
    <div className="min-h-screen bg-black text-white relative">
      <style>{`
        .spline-hide-branding {
          position: fixed;
          bottom: 0;
          right: 0;
          width: 200px;
          height: 60px;
          background: black;
          z-index: 40;
          pointer-events: none;
        }
      `}</style>
      <div className="spline-hide-branding"></div>
      <div className="fixed inset-0 z-0">
        <InteractiveRobotSpline
          scene={ROBOT_SCENE_URL}
          className="w-full h-full"
        />
      </div>

      <Navbar />
      
      <Link href="/">
        <motion.button
          className="fixed top-24 left-6 z-50 text-gray-400 hover:text-blue-400 transition-colors text-sm font-semibold"
          whileHover={{ x: -3 }}
        >
          ← Back
        </motion.button>
      </Link>
      
      <div className="relative z-10 min-h-screen flex flex-col">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="relative w-full pt-20 pb-40"
            >
              <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-10"
                  >
                    <h1 className="text-4xl md:text-5xl font-bold mb-3">
                      <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                        Choose Your Path
                      </span>
                    </h1>
                    
                    <p className="text-gray-300 text-base md:text-lg">
                      Join the team that matches your passion and unlock your potential in the world of technology
                    </p>
                  </motion.div>

                  <div className="flex justify-between items-center gap-20 mt-48 pb-32">
                    {[
                      {
                        type: 'technical' as const,
                        icon: Code,
                        title: 'Technical',
                        description: 'Build, code, and innovate. Perfect for developers, programmers, and tech enthusiasts.',
                      },
                      {
                        type: 'nonTechnical' as const,
                        icon: Users,
                        title: 'Non-Technical',
                        description: 'Create, manage, and communicate. Ideal for designers, writers, and organizers.',
                      }
                    ].map((item, idx) => {
                      const Icon = item.icon
                      return (
                        <motion.div
                          key={item.type}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          whileHover={{ scale: 1.02, y: -4 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => { setSelectedType(item.type); setStep(2) }}
                          className="cursor-pointer group relative bg-black/40 backdrop-blur-md border border-blue-500/30 rounded-2xl p-8 hover:border-blue-400/60 transition-all shadow-xl hover:shadow-blue-500/20 w-full max-w-sm"
                        >
                          <div className="relative z-10">
                            <motion.div
                              whileHover={{ scale: 1.1 }}
                              className="mb-4"
                            >
                              <Icon className="w-12 h-12 text-blue-400" />
                            </motion.div>
                            
                            <h3 className="text-2xl font-bold mb-3 text-blue-300">
                              {item.title}
                            </h3>
                            
                            <p className="text-gray-400 text-sm leading-relaxed mb-6">
                              {item.description}
                            </p>
                            
                            <motion.div
                              className="flex items-center gap-2 text-blue-400 font-semibold text-sm"
                              whileHover={{ x: 3 }}
                            >
                              <span>Get Started</span>
                              <ArrowRight size={16} />
                            </motion.div>
                          </div>
                        </motion.div>
                      )
                    })}
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center gap-2"
                  >
                    <motion.div
                      animate={{ y: [0, 8, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <Mouse className="w-6 h-6 text-blue-400" />
                    </motion.div>
                    <motion.div
                      animate={{ opacity: [1, 0.5, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="text-xs text-gray-400"
                    >
                      Scroll to explore
                    </motion.div>
                  </motion.div>


                </div>
              </div>
            </motion.div>
          )}

          {step === 2 && selectedType && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex-1 flex items-center justify-center px-4 py-12"
            >
              <div className="max-w-5xl w-full">
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center mb-16"
                >
                  <h1 className="text-5xl md:text-6xl font-bold mb-6">
                    <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                      Select Your Domain
                    </span>
                  </h1>
                  <p className="text-gray-300 text-lg">Choose the area that interests you most</p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-6 mb-12">
                  {domains.map((domain, idx) => (
                    <motion.div
                      key={domain.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedDomain(domain.name)}
                      className={`cursor-pointer relative bg-gradient-to-br from-blue-900/20 to-cyan-900/20 backdrop-blur-xl border-2 rounded-2xl p-8 transition-all ${
                        selectedDomain === domain.name
                          ? 'border-blue-400 shadow-lg shadow-blue-500/30'
                          : 'border-blue-500/30 hover:border-blue-400'
                      }`}
                    >
                      <div className="text-5xl mb-4">{domain.icon}</div>
                      <p className="text-xl font-semibold text-white">{domain.name}</p>
                      {selectedDomain === domain.name && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute top-4 right-4"
                        >
                          <CheckCircle2 size={24} className="text-blue-400" />
                        </motion.div>
                      )}
                    </motion.div>
                  ))}
                </div>

                <div className="flex justify-center gap-4 pt-6">
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setStep(1)}
                    className="px-8 py-3 bg-gray-800/80 backdrop-blur-sm rounded-xl text-white font-semibold hover:bg-gray-700 transition-all border border-gray-700"
                  >
                    Back
                  </motion.button>
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setStep(3)}
                    disabled={!selectedDomain}
                    className="px-12 py-3 bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-600 rounded-xl text-white font-semibold shadow-lg shadow-blue-500/30 hover:shadow-blue-500/60 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    <span>Continue</span>
                    <ArrowRight size={20} />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex-1 flex items-center justify-center px-4 py-12"
            >
              <div className="max-w-4xl w-full">
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center mb-12"
                >
                  <h1 className="text-5xl md:text-6xl font-bold mb-4">
                    <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                      ACM Club Registration
                    </span>
                  </h1>
                  <p className="text-gray-300 text-lg">Complete your membership application</p>
                </motion.div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Information */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gradient-to-br from-blue-900/20 to-cyan-900/20 backdrop-blur-xl border border-blue-500/30 rounded-2xl p-8"
                  >
                    <h3 className="text-xl font-bold text-blue-400 mb-6">Personal Information</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                        className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:border-blue-500 focus:outline-none text-white placeholder-gray-500"
                        placeholder="Full Name"
                      />
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:border-blue-500 focus:outline-none text-white placeholder-gray-500"
                        placeholder="College Email"
                      />
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:border-blue-500 focus:outline-none text-white placeholder-gray-500"
                        placeholder="Phone Number"
                      />
                      <input
                        type="text"
                        required
                        value={formData.studentId}
                        onChange={(e) => setFormData({...formData, studentId: e.target.value})}
                        className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:border-blue-500 focus:outline-none text-white placeholder-gray-500"
                        placeholder="Student ID"
                      />
                    </div>
                  </motion.div>

                  {/* Academic Information */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-gradient-to-br from-blue-900/20 to-cyan-900/20 backdrop-blur-xl border border-blue-500/30 rounded-2xl p-8"
                  >
                    <h3 className="text-xl font-bold text-blue-400 mb-6">Academic Information</h3>
                    <div className="grid md:grid-cols-3 gap-4">
                      <select
                        required
                        value={formData.year}
                        onChange={(e) => setFormData({...formData, year: e.target.value})}
                        className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:border-blue-500 focus:outline-none text-white"
                      >
                        <option value="">Select Year</option>
                        <option value="1st">1st Year</option>
                        <option value="2nd">2nd Year</option>
                        <option value="3rd">3rd Year</option>
                        <option value="4th">4th Year</option>
                      </select>
                      <input
                        type="text"
                        required
                        value={formData.branch}
                        onChange={(e) => setFormData({...formData, branch: e.target.value})}
                        className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:border-blue-500 focus:outline-none text-white placeholder-gray-500"
                        placeholder="Branch/Department"
                      />
                      <input
                        type="text"
                        value={formData.section}
                        onChange={(e) => setFormData({...formData, section: e.target.value})}
                        className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:border-blue-500 focus:outline-none text-white placeholder-gray-500"
                        placeholder="Section"
                      />
                    </div>
                  </motion.div>

                  {/* Skills & Experience */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-gradient-to-br from-blue-900/20 to-cyan-900/20 backdrop-blur-xl border border-blue-500/30 rounded-2xl p-8"
                  >
                    <h3 className="text-xl font-bold text-blue-400 mb-6">Skills & Experience</h3>
                    <div className="space-y-4">
                      <input
                        type="text"
                        value={formData.skills}
                        onChange={(e) => setFormData({...formData, skills: e.target.value})}
                        className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:border-blue-500 focus:outline-none text-white placeholder-gray-500"
                        placeholder="Your Skills (e.g., Python, Web Dev, Design)"
                      />
                      <textarea
                        value={formData.experience}
                        onChange={(e) => setFormData({...formData, experience: e.target.value})}
                        className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:border-blue-500 focus:outline-none text-white placeholder-gray-500 resize-none"
                        rows={3}
                        placeholder="Previous Experience/Projects (if any)"
                      />
                    </div>
                  </motion.div>

                  {/* Motivation & Expectations */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-gradient-to-br from-blue-900/20 to-cyan-900/20 backdrop-blur-xl border border-blue-500/30 rounded-2xl p-8"
                  >
                    <h3 className="text-xl font-bold text-blue-400 mb-6">Motivation & Expectations</h3>
                    <div className="space-y-4">
                      <textarea
                        required
                        value={formData.whyJoin}
                        onChange={(e) => setFormData({...formData, whyJoin: e.target.value})}
                        className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:border-blue-500 focus:outline-none text-white placeholder-gray-500 resize-none"
                        rows={3}
                        placeholder="Why do you want to join ACM Club?"
                      />
                      <textarea
                        value={formData.expectations}
                        onChange={(e) => setFormData({...formData, expectations: e.target.value})}
                        className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:border-blue-500 focus:outline-none text-white placeholder-gray-500 resize-none"
                        rows={3}
                        placeholder="What do you expect from ACM Club?"
                      />
                    </div>
                  </motion.div>

                  {/* Availability & Social Links */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-gradient-to-br from-blue-900/20 to-cyan-900/20 backdrop-blur-xl border border-blue-500/30 rounded-2xl p-8"
                  >
                    <h3 className="text-xl font-bold text-blue-400 mb-6">Availability & Social Links</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <select
                        value={formData.availability}
                        onChange={(e) => setFormData({...formData, availability: e.target.value})}
                        className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:border-blue-500 focus:outline-none text-white"
                      >
                        <option value="">Select Availability</option>
                        <option value="weekdays">Weekdays</option>
                        <option value="weekends">Weekends</option>
                        <option value="both">Both</option>
                      </select>
                      <input
                        type="url"
                        value={formData.linkedIn}
                        onChange={(e) => setFormData({...formData, linkedIn: e.target.value})}
                        className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:border-blue-500 focus:outline-none text-white placeholder-gray-500"
                        placeholder="LinkedIn Profile (optional)"
                      />
                      <input
                        type="url"
                        value={formData.github}
                        onChange={(e) => setFormData({...formData, github: e.target.value})}
                        className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:border-blue-500 focus:outline-none text-white placeholder-gray-500"
                        placeholder="GitHub Profile (optional)"
                      />
                    </div>
                  </motion.div>

                  {/* Submit Buttons */}
                  <div className="flex justify-center gap-4 pt-6">
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setStep(2)}
                      className="px-8 py-3 bg-gray-800/80 backdrop-blur-sm rounded-xl text-white font-semibold hover:bg-gray-700 transition-all border border-gray-700"
                    >
                      Back
                    </motion.button>
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-12 py-3 bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-600 rounded-xl text-white font-semibold shadow-lg shadow-blue-500/30 hover:shadow-blue-500/60 transition-all"
                    >
                      Submit Application
                    </motion.button>
                  </div>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <FAQ
        title="Frequently Asked Questions"
        categories={{
          "general": "General",
          "events": "Events",
          "membership": "Membership",
          "technical": "Technical"
        }}
        faqData={{
          "general": [
            {
              question: "What is ACM and why should I join?",
              answer: "ACM is a student chapter dedicated to promoting computer science and technology education through workshops, events, and networking opportunities."
            },
            {
              question: "Do I need prior experience to join?",
              answer: "No prior experience is required! We welcome students from all backgrounds and skill levels."
            },
            {
              question: "What are the membership benefits?",
              answer: "Members get access to exclusive workshops, networking events, mentorship programs, and opportunities to work on real-world projects."
            },
            {
              question: "How often do you conduct meetings?",
              answer: "We conduct regular meetings and events throughout the semester. Check our events page for the latest schedule."
            }
          ],
          "events": [
            {
              question: "How often does ACM organize events?",
              answer: "We organize events regularly throughout the semester, including workshops, hackathons, and guest lectures."
            },
            {
              question: "Can I attend events if I'm not a member?",
              answer: "Yes! Most of our events are open to all students. However, members get priority registration and exclusive perks."
            },
            {
              question: "What types of events do you organize?",
              answer: "We organize workshops on various technologies, hackathons, coding competitions, guest lectures from industry experts, and networking sessions."
            },
            {
              question: "How do I register for events?",
              answer: "You can register for events through our website or by contacting us directly. Registration details are shared on our social media channels."
            }
          ],
          "membership": [
            {
              question: "Is there a membership fee?",
              answer: "Basic membership is free! We ensure all core activities remain accessible to everyone."
            },
            {
              question: "What is the membership duration?",
              answer: "Membership is valid for one academic year. You can renew your membership at the beginning of each new academic year."
            },
            {
              question: "What are the membership requirements?",
              answer: "You just need to be a student and fill out our membership form. There are no other prerequisites."
            },
            {
              question: "Can I get a membership certificate?",
              answer: "Yes! Active members receive certificates of participation and membership recognition at the end of the academic year."
            }
          ],
          "technical": [
            {
              question: "What programming languages do you focus on?",
              answer: "We cover a wide range including Python, JavaScript, Java, C++, and more based on member interests."
            },
            {
              question: "Do you teach web development?",
              answer: "Yes! We conduct workshops on web development covering frontend, backend, and full-stack technologies."
            },
            {
              question: "Are there AI/ML workshops?",
              answer: "Absolutely! We regularly conduct workshops on machine learning, deep learning, and AI applications."
            },
            {
              question: "Can I get help with my projects?",
              answer: "Yes! We have mentorship programs and project guidance sessions where experienced members help with your projects."
            }
          ]
        }}
      />
    </div>
  )
}
